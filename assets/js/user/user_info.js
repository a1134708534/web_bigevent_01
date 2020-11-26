$(function () {
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度在1 ~6之间"
            }

        }
    })
    initUserinfo()
    //3重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 用户重新渲染 渲染为第一次的值
        initUserinfo()
    })
    // 4 修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更改信息失败')
                }
                layer.msg('更改用户信息成功')
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInof()
            }
        })
    })
})
var form = layui.form;

var layer = layui.layer
//用户信息初始化
function initUserinfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        success: function (res) {
            // 判断
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            // 获取值 赋值 formUserinfo
            form.val('formUserinfo', res.data)
        }
    })
}