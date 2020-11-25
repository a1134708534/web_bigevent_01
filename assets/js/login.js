$(function () {
    // 1.点击去注册绑定事件，显示注册页面
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 点击去登录绑定事件，显示注册页面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //    确认密码校验规则
        repwd: function (value) {
            //选择器必须带空格，选中是后代中的input，name属性
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一样'
            }
        }
    })

    //获取layer事件
    var layer = layui.layer;
    // 注册监听事件
    $('#reg_box').on('submit', function (e) {
        e.preventDefault();
        // 阻止表单默认提交
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                //判断条件
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后代码出来
                layer.msg('恭喜您，注册成功')
            },
        })
        // 注册完成之后模仿点击事件页面跳转
        $('#link_login').click()
        //清空表单内容
        $('#reg_box')[0].reset()
    })
    // 4 登录功能
    $('#login_box').submit(function(e){
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !==0){
                    return layer.msg(res.message)
                }
                //提示信息 保存token 值到本第 跳转页面
                layer.msg('恭喜您，登陆成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})