"use strict";

import fs from "node:fs";
import path from "node:path";
import * as cheerio from 'cheerio';
import moment from "moment";
import dotenv from "dotenv";
import { queryObject } from "./libs/utils.mjs";

dotenv.config();

const CONTINUE = false;
const ENABLE_STOP = false;
const OUTPUT_PATH = "./dist/latest.json";
const BACKUP_PATH = `./dist/${moment().format("YYYYMMDD")}.json`;
const INFO_PATH = `./dist/info.json`;
const MAX_MODEL_COUNT = 100;
const MIN_DOWNLOAD_COUNT = 100;

// -1: Infinity
const MAX_COLLECTED_MODEL_COUNT = -1;

async function getModels(limit, nextPage) {
  const params = new URLSearchParams({
    limit,
    types: "LORA",

    // query: "DreamShaper",
    
    // sort: "Newest",
    // sort: "Most Downloaded",
    sort: "Highest Rated",

    // period: "AllTime",
    // period: "Year",
    // period: "Month",
    period: "Week",
    // period: "Day",
  });

  const url = nextPage || "https://civitai.com/api/v1/models?"+params.toString();

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.API_KEY}`,
  }

  // console.log("URL:", url);
  // console.log("Headers:", headers);

  const res = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return await res.json();  
}

function debug(obj) {
  fs.writeFileSync("./debug.json", JSON.stringify(obj, null , 2), "utf-8");
}

;(async () => {
  let lastURL;

  if (CONTINUE && fs.existsSync(INFO_PATH)) {
    const info = JSON.parse(fs.readFileSync(INFO_PATH, "utf8"));
    lastURL = info.lastURL;
  }

  const prev = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
  if (!prev.data) {
    prev.data = [];
  }

  let modelCount = 0,
      modelRes = await getModels(MAX_MODEL_COUNT, lastURL);

  const save = function() {
    prev.dataCount = prev.data.length;
    prev.updatedAt = Date.now();

    prev.data = prev.data.sort((a, b) => 
      (b.stats.downloadCount || 0) - (a.stats.downloadCount || 0)
    );

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prev), "utf8");
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(prev, null, 2), "utf8");
    fs.writeFileSync(INFO_PATH, JSON.stringify({
      lastURL: lastURL,
      dataCount: prev.dataCount,
      updatedAt: prev.updatedAt,
    }), "utf8");
  }

  // debug(modelRes);

  while(true) {
    console.log(`${modelRes.items.length} models found`);

    const prevDataLen = prev.data.length;

    // Debug
    // for (let i = 0; i < modelRes.items.length; i++) {
    //   console.log(`Model[${i}]: ${modelRes.items[i].name}`);
    // }

    let stop = false;
    for (const model of modelRes.items) {

      if (!model?.creator?.username) {
        console.error(`${model.name}'s creator not found`);
        continue;
      }

      if (model.stats.downloadCount < MIN_DOWNLOAD_COUNT) {
        console.error(`${model.name}'s downloadCount is ${model.stats.downloadCount}`);
        if (ENABLE_STOP) {
          stop = true;
          break;
        } else {
          continue;
        }
      }

      console.log(`Model(${modelCount++}): ${model.name}`);
  
      for (const version of model.modelVersions) {
        const updatedAt = version.publishedAt || version.updatedAt || version.createdAt;
  
        // Check updated date
        const prevData = prev.data.find((item) => item.modelId == model.id && 
          item.versionId == version.id);

        if (prevData) {
          // console.log(`Previous data found: ${model.name}:${version.name}`);
          if (prevData.updatedAt && updatedAt && prevData.updatedAt == updatedAt) {
            // console.log(`No update yet: ${prevData.updatedAt} == ${updatedAt}`);
            continue;
          }
        }

        // "trainedWords": [
        //   "analog style",
        //   "modelshoot style",
        //   "nsfw",
        //   "nudity"
        // ],
        const trainedWords = version.trainedWords;
        if (!trainedWords || trainedWords.length < 1) {
          continue;
        }
        
        let filenames = [];
        for (const file of version.files) {
          const extension = path.extname(file.name);
          const filename = path.basename(file.name, extension);
          filenames.push(filename);
        }

        // Remove duplicated values
        filenames = filenames.filter((item, index, arr) => arr.indexOf(item) == index);

        if (!prevData) {
          prev.data.push({
            updatedAt: updatedAt,
            modelId: model.id,
            modelName: model.name,
            versionId: version.id,
            versionName: version.name,
            filenames: filenames,
            stats: version.stats || {},
            words: trainedWords,
          });
        } else {
          Object.assign(prevData, {
            updatedAt: updatedAt,
            modelId: model.id,
            modelName: model.name,
            versionId: version.id,
            versionName: version.name,
            filenames: filenames,
            stats: version.stats || {},
            words: trainedWords,
          });
        }
      }

      // console.log(`${prev.data.length} data collected`);
    }

    console.log(`Data collected: ${prevDataLen} => ${prev.data.length}`);

    if (stop) {
      break;
    }
    if (modelRes.items.length == 0 || !modelRes?.metadata?.nextPage) {
      console.log("No more models");
      break;
    }
    if (MAX_COLLECTED_MODEL_COUNT > -1 && MAX_COLLECTED_MODEL_COUNT <= modelCount) {
      console.log(`Model counts exceeds MAX_MODEL_COUNT: ${modelCount} >= ${MAX_COLLECTED_MODEL_COUNT}`);
      break;
    }

    lastURL = modelRes.metadata.nextPage;
    save();
    modelRes = await getModels(MAX_MODEL_COUNT, lastURL);
  }

  save();
  
  console.log(`Collection completed`);
})();