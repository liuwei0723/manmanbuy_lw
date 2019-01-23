$(function(){

    // 首先获取页面传过来的url中得到id
    var id = getQueryString('productId')
    // 发送请求页面数据
    
    
    $.ajax({
        url: "http://localhost:9090/api/getproduct",
        data: {
            productid: id
        },
        success: function(res){
            console.log(res);
            console.log(res.result[0].productImg);
            $('.detail>.shop').text(res.result[0].productName); 
            $('.detail .imgfor').html(res.result[0].productImg);

        }
    })

    $.ajax({
        url: "http://localhost:9090/api/getproductcom",
        data: {
            productid: id
        },
        success: function(res){
            console.log(res);
            var html = template('commentTpl',res);
            console.log(html);
            $('.shop-content').html(html);
        }
    })


    // mui.init({
    //     pullRefresh : {
    //       container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //       down : {
    //         height:50,//可选,默认50.触发下拉刷新拖动距离,
    //         auto: false,//可选,默认false.首次加载自动下拉刷新一次
    //         contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
    //         contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
    //         contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
    //         callback :function(){
    //             setTimeout(function(){
    //                 mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    //             }, 2000);
    //         } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //       },
    //       up : {
    //         height:50,//可选.默认50.触发上拉加载拖动距离
    //         auto:false,//可选,默认false.自动上拉加载一次
    //         contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
    //         contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
    //         callback :function(){
    //             setTimeout(function(){
    //                 // mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    //                 mui('#refreshContainer').pullRefresh().enablePullupToRefresh(true);
    //             }, 2000); 
    //         } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //       }
    //     }
    //   });



    //获取url中key的值函数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    
})

