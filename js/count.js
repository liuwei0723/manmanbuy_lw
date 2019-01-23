$(function () {
    var id = GetQueryString('productId')
    // var id=20;
    getmoneyctrlproduct(id)
    function getmoneyctrlproduct(id) {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrlproduct',
            data: {
                productid: id,
            },
            success:function(data){
                console.log(data);
                var html=template('count',data);
                $('#main').html(html);
                // console.log(html);
                // mui('.mui-scroll-wrapper').scroll({
                //     indicators: false,
                //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                // });
            }
        })
    }




    function GetQueryString(name){  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})