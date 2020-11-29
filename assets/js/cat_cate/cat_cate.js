$(function () {
    // 初始化文章分类列表
    initAreCateList()
    var form = layui.form
    // 渲染文章
    function initAreCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }
    // 添加类别功能
    var indexAdd = null
    var layer = layui.layer
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            // 取消确定按钮
            type: 1,
            title: '文章类别',
            area: ['500px', '300px'],
            content: $('#dialog-add').html()
        });
    })
    // 提交文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章添加失败')
                }
                initAreCateList()
                layer.msg('文章添加成功')
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    // 修改事件绑定
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            // 取消确定按钮
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#dialog-edit').html()
        });
        //获取id 发送ajax 渲染到页面
        var Id = $(this).attr('data-id')
        // console.log(Id);
        // 发送 ajax请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章修改失败')
                }
                initAreCateList()
                layer.msg('文章修改成功')
                layer.close(indexEdit)
            }
        })
    })

    // 通过委托绑定点击按钮 删除
    $('body').on('click','.btn-delet',function(e){
        var id = $(this).attr('data-id')
        // 弹出提示框
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            // 发起ajax请求
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if (res.status !== 0){
                        return layer.msg(res.message)
                    }
                    // 成功后重新渲染
                    initAreCateList()
                    layer.msg('删除成功')
                    layer.close(index);
                }
            })
          });
    })
})
