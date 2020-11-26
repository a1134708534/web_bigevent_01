// 1开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// ajaxPrefilter是ajax拦截器 params里传的是ajax请求 
$.ajaxPrefilter(function(params){
    //拼接对应服务器地址
    params.url = baseURL + params.url
    if (params.url.indexOf('/my/') !== -1){//indexOf 判断字符串中是否有 没有就返回-1
        params.headers = {
            Authorization:localStorage.getItem('token') || ''
            // 对象赋值用冒号，属性赋值用 = 
        }
    }
    // 登录拦截
    params.complete = function(res){
        //responseJSON 获取信息
        if (res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token')//清除本地值
            location.href = '/login.html'
        }
    }
    //总结： 全部都要加的写
})