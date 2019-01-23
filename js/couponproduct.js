$(function () {
    var id = getQueryString('couponid');
    console.log(id);
    
    $.ajax({
        url: 'http://localhost:9090/api/getcouponproduct',
        data: {
            couponid:id
        },
        success: function (data) {
            console.log(data);
            var html = template('fenyeTpl', data);
                 $('#main ul').html(html)
           
        }
    })
    // 点击图片显示盒子
    $('#main .coupon').on('tap', 'li>a', function () {
        console.log(111);
        var obc= $(this).data('img');
        console.log(obc);
        
        $('.maskimg').html(obc)
        console.log(obc);
        
        $('.mask2').show()
        
    })
    $('.error').on('tap', function () {
        $('.mask2').hide();
    })
     mui.init({
         pullRefresh: {
             container: "#main", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
             down: {
                 contentrefresh: "正在加载中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                 callback: function () {
                     setTimeout(function () {
                         mui('#main').pullRefresh().endPulldownToRefresh(); //refresh completed
                         // mui('#refreshContainer').pullRefresh().endPulldown()

                     }, 2000)
                 }
             },
             up: {
                 contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                 callback: function () {
                     setTimeout(function () {
                         // 7. 没有数据了 结束上拉加载 并且提示没有更多数据了
                         mui('#main').pullRefresh().endPullupToRefresh();
                     }, 2000)
                 }
             }
         }
     });
    


     function getQueryString(name) {
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
       var r = window.location.search.substr(1).match(reg);
       // console.log(r); 
       if (r != null) return decodeURI(r[2]);
       return null;
   }
})