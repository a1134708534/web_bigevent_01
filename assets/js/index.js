//入口函数
$(function () {
    // 1获取用户信息
    getUserInof();
    // 2退出按钮
    $('#btnLogot').on('click', function () {
        layer.confirm('是否确定退出', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //确定退出清空本地值
            localStorage.removeItem('token')
            //跳转页面
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//获取用户信息变量 写道入口函数外面
// 原因：要作为全局变量 其它页面也会需要调用
function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers:{
            Authorization:localStorage.getItem('token') || ''//传字符串空的 不能得到null
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功 调用渲染头像函数
            renderAvatar(res.data)
        }
    })
}

//渲染函数头像
function renderAvatar(user) {
    // 1 渲染用户名 (呢称优先 没有就用name)
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
        // 有头像的情况下
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}