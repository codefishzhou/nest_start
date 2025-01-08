/**
 * 判断类型
 */

 export const callType = type => {
    return Object.prototype.toString.call(type);
  };
  
  export const keyIsExist = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  
  export const isNull = obj => {
    return callType(obj) === '[object Null]';
  };
  
  export const isNumber = obj => {
    return callType(obj) === '[object Number]';
  };
  
  export const isString = obj => {
    return callType(obj) === '[object String]';
  };
  
  export const isUndefined = obj => {
    return callType(obj) === '[object Undefined]';
  };
  
  export const isArray = obj => {
    //   Array.isArray(obj)
    return callType(obj) === '[object Array]';
  };
  
  export const isObject = obj => {
    //   return Object.keys(obj).length === 0
    return callType(obj) === '[object Object]';
  };
  
  export const isFunction = func => {
    return callType(func) === '[object Function]';
  };
  
  export const isMap = map => {
    return callType(map) === '[object Map]';
  };
  
  export function isRegExp(v) {
    return callType(v) === '[object RegExp]';
  }
  
  /**
   * 判断是不是为null、Undefined、{}、[]、''、' '、NaN
   * @param {any} obj
   */
  export const isEmpty = obj => {
    if (isNull(obj)) {
      return true;
    }
    if (isUndefined(obj)) {
      return true;
    }
    if (obj.length === 0) {
      return true;
    }
    if (JSON.stringify(obj) === '[]') {
      return true;
    }
    if (obj === '') {
      return true;
    }
    if (!obj) {
      return true;
    }
    return false;
  };
  