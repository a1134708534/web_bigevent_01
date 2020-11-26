$(function () {
    // 密码校验规则
    var form = layui.form
    form.verify({
        // 1.1密码
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // 1.2新旧密码不重复
        samePwd:function(value){
            if(value == $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        } ,
        // 1.3 新密码两次相同
        rePwd:function(value){
            if (value !== $('[name=rePwd]').val()){
                return '两次密码不一致'
            }
        }
    })
    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()//阻止默认
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layui.layer.msg('修改失败')
                }
                layui.layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})