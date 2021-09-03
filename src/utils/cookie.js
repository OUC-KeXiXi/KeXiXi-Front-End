//获取cookie、
export function getCookie(name) {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

export function getAllCookie(){
  return document.cookie
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expires) {
  let ex_date = new Date()
  ex_date.setDate(ex_date.getDate() + expires);
  document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + ex_date.toGMTString());
}

//删除cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1);
  let c_val = getCookie(name)
  if (c_val != null)
    document.cookie = name + "=" + c_val + ";expires=" + exp.toGMTString();
}
