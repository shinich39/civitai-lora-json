"use strict";
var utils = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // index.js
  var utils_js_exports = {};
  __export(utils_js_exports, {
    compareObject: () => compareObject,
    compareString: () => compareString,
    copyObject: () => copyObject,
    createArray: () => createArray,
    encryptString: () => encryptString,
    generateObjectId: () => generateObjectId,
    generateRandomNumber: () => generateRandomNumber,
    generateRandomString: () => generateRandomString,
    generateUUID: () => generateUUID,
    getClampedNumber: () => getClampedNumber,
    getContainedNumber: () => getContainedNumber,
    getContainedSize: () => getContainedSize,
    getCoveredSize: () => getCoveredSize,
    getMaxValue: () => getMaxValue,
    getMeanValue: () => getMeanValue,
    getMinValue: () => getMinValue,
    getModeValue: () => getModeValue,
    getRandomValue: () => getRandomValue,
    getRelativePath: () => getRelativePath,
    groupByKey: () => groupByKey,
    isArray: () => isArray,
    isBoolean: () => isBoolean,
    isBooleanArray: () => isBooleanArray,
    isEmpty: () => isEmpty,
    isEmptyArray: () => isEmptyArray,
    isEmptyObject: () => isEmptyObject,
    isEmptyString: () => isEmptyString,
    isFunction: () => isFunction,
    isNull: () => isNull,
    isNumber: () => isNumber,
    isNumberArray: () => isNumberArray,
    isNumeric: () => isNumeric,
    isObject: () => isObject,
    isObjectArray: () => isObjectArray,
    isSameType: () => isSameType,
    isString: () => isString,
    isStringArray: () => isStringArray,
    parseCommand: () => parseCommand,
    parsePath: () => parsePath,
    parseQueryString: () => parseQueryString,
    parseTemplate: () => parseTemplate,
    promiseAll: () => promiseAll,
    queryObject: () => queryObject,
    shuffleArray: () => shuffleArray,
    sortArray: () => sortArray,
    sortBy: () => sortBy,
    splitFloat: () => splitFloat,
    splitInt: () => splitInt,
    spreadArray: () => spreadArray,
    toFullWidth: () => toFullWidth,
    toHalfWidth: () => toHalfWidth,
    wait: () => wait
  });
  var __uniq__ = 0;
  function isBoolean(obj) {
    return typeof obj === "boolean";
  }
  function isNumber(obj) {
    return typeof obj === "number" && !Number.isNaN(obj) && Number.isFinite(obj);
  }
  function isNumeric(obj) {
    if (isString(obj)) {
      return !Number.isNaN(parseFloat(obj)) && Number.isFinite(parseFloat(obj));
    } else {
      return isNumber(obj);
    }
  }
  function isString(obj) {
    return typeof obj === "string";
  }
  function isEmptyString(obj) {
    return isString(obj) && obj.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "";
  }
  function isObject(obj) {
    return typeof obj === "object" && obj !== null;
  }
  function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
  }
  function isNull(obj) {
    return typeof obj === "object" && obj === null;
  }
  function isArray(obj) {
    if (Array && Array.isArray) {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }
  }
  function isBooleanArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isBoolean(item)) {
        return false;
      }
    }
    return true;
  }
  function isNumberArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isNumber(item)) {
        return false;
      }
    }
    return true;
  }
  function isStringArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isString(item)) {
        return false;
      }
    }
    return true;
  }
  function isObjectArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isObject(item)) {
        return false;
      }
    }
    return true;
  }
  function isEmptyArray(obj) {
    return isArray(obj) && obj.length === 0;
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isEmpty(obj) {
    return obj === void 0 || isNull(obj);
  }
  function isUndefined(obj) {
    return obj === void 0;
  }
  function isSameType(objA, objB) {
    return isNull(objA) && isNull(objB) || typeof objA === typeof objB && objA.constructor === objB.constructor;
  }
  function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  function generateRandomString(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  }
  function generateObjectId() {
    return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3).toString(16) + "xxxxxx".replace(/x/g, function(v) {
      return Math.floor(Math.random() * 16).toString(16);
    }) + (__uniq__++).toString(16).padStart(6, "0");
  }
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v;
      if (c == "x") {
        v = r;
      } else {
        v = r & 3 | 8;
      }
      return v.toString(16);
    });
  }
  function getClampedNumber(num, min, max) {
    return Math.min(max, Math.max(num, min));
  }
  function getContainedNumber(num, min, max) {
    num -= min;
    max -= min;
    if (num < 0) {
      num = num % max + max;
    }
    if (num >= max) {
      num = num % max;
    }
    return num + min;
  }
  function splitInt(str) {
    return str.split(/([0-9]+)/);
  }
  function splitFloat(str) {
    return str.split(/([0-9]+\.[0-9]+)+/);
  }
  function getRelativePath(from, to) {
    from = (from + "/").replace(/[\\\/]+/g, "/").replace(/^\.?\//, "");
    to = (to + "/").replace(/[\\\/]+/g, "/").replace(/^\.?\//, "");
    let result = "";
    while (!to.startsWith(from)) {
      result += "../";
      from = from.substring(0, from.lastIndexOf("/", from.length - 2) + 1);
    }
    result += to.substring(from.length, to.length);
    return result.replace(/[\\\/]$/, "");
  }
  function toHalfWidth(str) {
    return str.replace(/[！-～]/g, function(ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 65248);
    }).replace(/[^\S\r\n]/g, " ");
  }
  function toFullWidth(str) {
    return str.replace(/[!-~]/g, function(ch) {
      return String.fromCharCode(ch.charCodeAt(0) + 65248);
    }).replace(/[^\S\r\n]/g, "\u3000");
  }
  function compareString(strA, strB) {
    function C(a, b) {
      const dp = [];
      for (let i = 0; i < a.length + 1; i++) {
        dp.push([]);
        for (let j = 0; j < b.length + 1; j++) {
          dp[i][j] = 0;
        }
      }
      return dp;
    }
    function M(dp, a, b) {
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          if (a[i - 1] === b[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }
      return dp;
    }
    function P(dp, a, b) {
      let MATCH = 0, INSERT = 1, DELETE = -1, res = [], matches = 0, i = a.length, j = b.length;
      while (i > 0 || j > 0) {
        const prev = res[res.length - 1];
        const itemA = a[i - 1];
        const itemB = b[j - 1];
        if (i > 0 && j > 0 && itemA === itemB) {
          if (prev && prev.type === MATCH) {
            prev.value = itemA + prev.value;
          } else {
            res.push({ type: MATCH, value: itemA });
          }
          matches++;
          i--;
          j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          if (prev && prev.type === INSERT) {
            prev.value = itemB + prev.value;
          } else {
            res.push({ type: INSERT, value: itemB });
          }
          j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
          if (prev && prev.type === DELETE) {
            prev.value = itemA + prev.value;
          } else {
            res.push({ type: DELETE, value: itemA });
          }
          i--;
        }
      }
      return {
        acc: matches * 2 / (a.length + b.length),
        result: res.reverse()
      };
    }
    return P(M(C(strA, strB), strA, strB), strA, strB);
  }
  function encryptString(str, salt) {
    if (salt.length === 0) {
      return str;
    }
    let res = "", i = 0;
    while (salt.length < str.length) {
      salt += salt;
    }
    while (i < str.length) {
      res += String.fromCharCode(str.charCodeAt(i) ^ salt.charCodeAt(i));
      i++;
    }
    return res;
  }
  function parseCommand(str) {
    let result = [], i = 0, tmp = str.replace(/\\'|\\"/g, "00"), bracket = null, part = "";
    while (i < str.length) {
      if (!bracket) {
        if (tmp[i] === "'" || tmp[i] === '"') {
          bracket = str[i];
        } else if (tmp[i] === " ") {
          if (part !== "") {
            result.push(part);
            part = "";
          }
        } else {
          part += str[i];
        }
      } else {
        if (tmp[i] === bracket) {
          result.push(part);
          part = "";
          bracket = null;
        } else {
          part += str[i];
        }
      }
      i++;
    }
    if (part.trim() !== "") {
      result.push(part);
    }
    return result;
  }
  function parseQueryString(str) {
    let parts = str.split("?").pop().split("&"), result = {};
    for (const part of parts) {
      const kv = part.split("=").map(decodeURIComponent);
      if (!result[kv[0]]) {
        result[kv[0]] = [decodeURIComponent(kv[1])];
      } else {
        result[kv[0]].push(decodeURIComponent(kv[1]));
      }
    }
    return result;
  }
  function parseTemplate(str, obj) {
    return str.replace(/\$\{[^}]*?\}/g, function(item) {
      let target = obj, keys = item.substring(2, item.length - 1).split(/\.|\[['"]?|['"]?\]/).filter(Boolean), key = keys.pop();
      while (isObject(target) && keys.length > 0) {
        target = target[keys.shift()];
      }
      if (!isObject(target) && !isArray(target)) {
        return "";
      } else {
        return target[key];
      }
    });
  }
  function parsePath(str) {
    str = str.replace(/[\\\/]+/g, "/").replace(/\/$/, "").replace(/^\.?\//, "");
    let dirs = str.split("/"), filename = "", basename = "", dirname = ".", extname = "";
    if (dirs.length > 0) {
      basename = dirs.pop();
      if (/\.[^\\\/.]+?$/.test(basename)) {
        extname = "." + basename.split(".").pop();
      }
      filename = basename.replace(new RegExp(extname + "$"), "");
    }
    if (dirs.length > 0) {
      dirname = dirs.join("/");
    }
    return {
      dirs,
      filename,
      basename,
      dirname,
      extname
    };
  }
  function createArray(len, value) {
    let arr = new Array(len);
    if (isFunction(value)) {
      for (let i = 0; i < len; i++) {
        arr[i] = value(i);
      }
    } else if (isObject(value)) {
      for (let i = 0; i < len; i++) {
        arr[i] = copyObject(value);
      }
    } else if (isArray(value)) {
      for (let i = 0; i < len; i++) {
        arr[i] = copyObject(value);
      }
    } else if (typeof value !== "undefined") {
      for (let i = 0; i < len; i++) {
        arr[i] = value;
      }
    }
    return arr;
  }
  function getMinValue(arr) {
    return arr.reduce(function(prev, curr) {
      if (curr < prev) {
        return curr;
      } else {
        return prev;
      }
    }, arr[0] || 0);
  }
  function getMaxValue(arr) {
    return arr.reduce(function(prev, curr) {
      if (curr > prev) {
        return curr;
      } else {
        return prev;
      }
    }, arr[0] || 0);
  }
  function getMeanValue(arr) {
    return arr.reduce(function(prev, curr) {
      return prev + curr;
    }, 0) / arr.length;
  }
  function getModeValue(arr) {
    let seen = {}, maxValue = arr[0], maxCount = 1;
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      if (!seen[value]) {
        seen[value] = 1;
      } else {
        seen[value] += 1;
      }
      if (seen[value] > maxCount) {
        maxValue = value;
        maxCount = seen[value];
      }
    }
    return maxValue;
  }
  function compareObject(a, b) {
    const priority = [
      isUndefined,
      isNull,
      isBoolean,
      isNumber,
      isString,
      isObject,
      isArray,
      isFunction
    ];
    const aIdx = priority.findIndex(function(fn) {
      return fn(a);
    });
    const bIdx = priority.findIndex(function(fn) {
      return fn(b);
    });
    if (aIdx !== bIdx) {
      return aIdx - bIdx;
    } else if (aIdx === 0 || aIdx === 1) {
      return 0;
    } else if (aIdx === 2) {
      if (a !== b) {
        return 0;
      } else if (a) {
        return 1;
      } else {
        return -1;
      }
    } else if (aIdx === 3) {
      return a - b;
    } else if (aIdx === 4) {
      return a.localeCompare(b, void 0, {
        numeric: true
      });
    } else if (aIdx === 5) {
      return Object.keys(a).length - Object.keys(b).length;
    } else if (aIdx === 6) {
      return a.length - b.length;
    } else {
      return 0;
    }
  }
  function sortArray(arr, desc) {
    desc = Boolean(desc);
    return arr.sort(function(a, b) {
      if (desc) {
        return !compareObject(a, b);
      } else {
        return compareObject(a, b);
      }
    });
  }
  function sortBy(arr, sorter) {
    if (typeof sorter === "string") {
      sorter = sorter.split(" ").filter(Boolean);
    }
    return arr.sort(function(a, b) {
      for (const key of sorter) {
        const d = /^-/.test(key), k = key.replace(/^-/, ""), r = compareObject(a[k], b[k]);
        if (r !== 0) {
          if (d) {
            return -r;
          } else {
            return r;
          }
        }
      }
      return 0;
    });
  }
  function shuffleArray(arr) {
    let i = arr.length;
    while (i > 0) {
      let j = Math.floor(Math.random() * i);
      i--;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function getRandomValue(arr) {
    return arr[Math.floor(generateRandomNumber(0, arr.length))];
  }
  function spreadArray(arr) {
    function getFirstIndexes(a) {
      if (a.length < 1) {
        return;
      }
      let result = [];
      for (let i = 0; i < a.length; i++) {
        result.push(0);
      }
      return result;
    }
    function getNextIndexes(a, indexes) {
      for (let i = a.length - 1; i >= 0; i--) {
        if (indexes[i] < a[i].length - 1) {
          indexes[i] += 1;
          return indexes;
        }
        indexes[i] = 0;
      }
      return;
    }
    function getValues(a, indexes) {
      let result = [];
      for (let i = 0; i < a.length; i++) {
        result.push(a[i][indexes[i]]);
      }
      return result;
    }
    function exec() {
      let result = [];
      let indexes = getFirstIndexes(arr);
      while (indexes) {
        result.push(getValues(arr, indexes));
        indexes = getNextIndexes(arr, indexes);
      }
      return result;
    }
    return exec();
  }
  function copyObject(obj) {
    let result;
    if (isArray(obj)) {
      result = [];
    } else {
      result = {};
    }
    for (const [key, value] of Object.entries(obj)) {
      if (isObject(value)) {
        result[key] = copyObject(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  function groupByKey(arr, key) {
    let group = {};
    for (const obj of arr) {
      const k = String(obj[key]);
      if (!group[k]) {
        group[k] = [obj];
      } else {
        group[k].push(obj);
      }
    }
    return group;
  }
  function queryObject(obj, qry) {
    const QUERY_OPERATORS = {
      and: ["$and"],
      notAnd: ["$notAnd", "$nand"],
      or: ["$or"],
      notOr: ["$notOr", "$nor"],
      not: ["$not"],
      include: ["$include", "$in"],
      exclude: ["$exclude", "$nin"],
      greaterThan: ["$greaterThan", "$gt"],
      greaterThanOrEqual: ["$greaterThanOrEqual", "$gte"],
      lessThan: ["$lessThan", "$lt"],
      lessThanOrEqual: ["$lessThanOrEqual", "$lte"],
      equal: ["$equal", "$eq"],
      notEqual: ["$notEqual", "$neq", "$ne"],
      exists: ["$exists"],
      function: ["$function", "$func", "$fn"],
      regexp: ["$regexp", "$regex", "$re", "$reg"]
    };
    function A(d, q) {
      for (const [key, value] of Object.entries(q)) {
        if (!B(d, value, key.split("."))) {
          return false;
        }
      }
      return true;
    }
    function B(d, q, k) {
      const o = k.shift();
      if (k.length > 0) {
        if (isObject(d)) {
          return B(d[o], q, k);
        } else {
          return false;
        }
      }
      return C(d, q, o);
    }
    function C(d, q, o) {
      if (QUERY_OPERATORS.and.indexOf(o) > -1) {
        for (const v of q) {
          if (!A(d, v)) {
            return false;
          }
        }
        return true;
      } else if (QUERY_OPERATORS.notAnd.indexOf(o) > -1) {
        return !C(d, q, "$and");
      } else if (QUERY_OPERATORS.or.indexOf(o) > -1) {
        for (const v of q) {
          if (A(d, v)) {
            return true;
          }
        }
        return false;
      } else if (QUERY_OPERATORS.notOr.indexOf(o) > -1) {
        return !C(d, q, "$or");
      } else if (QUERY_OPERATORS.not.indexOf(o) > -1) {
        return !A(d, q);
      } else if (QUERY_OPERATORS.include.indexOf(o) > -1) {
        if (isArray(d)) {
          for (const v of d) {
            if (!C(v, q, "$include")) {
              return false;
            }
          }
          return true;
        } else {
          for (const v of q) {
            if (C(d, v, "$equal")) {
              return true;
            }
          }
          return false;
        }
      } else if (QUERY_OPERATORS.exclude.indexOf(o) > -1) {
        return !C(d, q, "$include");
      } else if (QUERY_OPERATORS.greaterThan.indexOf(o) > -1) {
        return d > q;
      } else if (QUERY_OPERATORS.greaterThanOrEqual.indexOf(o) > -1) {
        return d >= q;
      } else if (QUERY_OPERATORS.lessThan.indexOf(o) > -1) {
        return d < q;
      } else if (QUERY_OPERATORS.lessThanOrEqual.indexOf(o) > -1) {
        return d <= q;
      } else if (QUERY_OPERATORS.equal.indexOf(o) > -1) {
        if (isArray(d) && isArray(q)) {
          if (d.length !== q.length) {
            return false;
          }
          for (let i = 0; i < q.length; i++) {
            if (!C(d[i], q[i], "$equal")) {
              return false;
            }
          }
          return true;
        } else {
          return d === q;
        }
      } else if (QUERY_OPERATORS.notEqual.indexOf(o) > -1) {
        return !C(d, q, "$equal");
      } else if (QUERY_OPERATORS.exists.indexOf(o) > -1) {
        return (d !== null && d !== void 0) === Boolean(q);
      } else if (QUERY_OPERATORS.function.indexOf(o) > -1) {
        return q(d);
      } else if (QUERY_OPERATORS.regexp.indexOf(o) > -1) {
        return q.test(d);
      } else if (!isObject(d)) {
        return false;
      } else if (isObject(q)) {
        return A(d[o], q);
      } else {
        return C(d[o], q, "$equal");
      }
    }
    return A(obj, qry);
  }
  function getContainedSize(src, dst) {
    const aspectRatio = src.width / src.height;
    if (aspectRatio < dst.width / dst.height) {
      return {
        width: dst.height * aspectRatio,
        height: dst.height
      };
    } else {
      return {
        width: dst.width,
        height: dst.width / aspectRatio
      };
    }
  }
  function getCoveredSize(src, dst) {
    const aspectRatio = src.width / src.height;
    if (aspectRatio < dst.width / dst.height) {
      return {
        width: dst.width,
        height: dst.width / aspectRatio
      };
    } else {
      return {
        width: dst.height * aspectRatio,
        height: dst.height
      };
    }
  }
  function wait(delay) {
    return new Promise(function(resolve) {
      return setTimeout(resolve, delay);
    });
  }
  function promiseAll(funcs) {
    return funcs.reduce(function(prevPromise, currFunction) {
      return prevPromise.then(function(prev) {
        return currFunction().then(function(curr) {
          return prev.concat([curr]);
        });
      });
    }, Promise.resolve([]));
  }
  return __toCommonJS(utils_js_exports);
})();
