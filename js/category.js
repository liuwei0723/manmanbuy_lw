$(function () {
    $.ajax({
        url: "http://localhost:9090/api/getcategorytitle",
        success: function (data) {
            console.log(data);
            var html = template('titleTpl',data);
            $('.mui-table-view').html(html);
            $('.title').on('tap',function () {
                var id = $(this).data('id');
                var that = this
                $.ajax({
                    url:'http://localhost:9090/api/getcategory',
                    data:{
                        titleid:id
                    },
                    success:function(data){
                        console.log(data);
                        var html = template('secondary',data);
                        if($(that).parent().children().length<=1){
                            $(that).parent().append(html);
                        }
                    }
                })
            })
        }
    });
})