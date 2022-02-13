export function formatDate(date, fmt) {
  // 1、获取年份
  // y+ —> 1个或者多个y yyyy yyy yy y ——> 2019 019 19 9
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    // fmt = fmt.replace(yyyy, ('2019').substr(4 - 4));
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 一位要补零
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


      // 防抖函数
     export function debounce(func,delay){
        let timer = null
        // ...args:表示回调函数可以传多个参数
        return function(...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() =>{
            func.apply(this,args)
          },delay)
        }
      }
