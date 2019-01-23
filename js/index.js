$(function () {
    var baseUrl = 'http://47.52.242.30:9090';
    // 渲染首页菜单栏
    $.ajax({
        url: baseUrl + '/api/getindexmenu',
        success: function (data) {
            console.log(data);
            var html = template('indexMenuTpl', data);
            $('#nav .mui-row').html(html);

            $("#nav>.rows > .btn-more:nth-last-child(-n+4)").hide();
        }
    })
    $.ajax({
        url: baseUrl + '/api/getmoneyctrl',
        success: function (data) {
            console.log(data);
            var html = template('moneyCtrlTpl', data);

            $('#productList .content ul').html(html);
        }
    })



    //点击更多切换多4个图标
    $("#nav>.rows").on('tap', '.btn-more:nth-of-type(8)', function () {
        // console.log(1121);
        $("#nav > .rows > .btn-more:nth-child(n+9)").fadeToggle(400);


        // if($(this).index()==7){

        // }
    })

    // 回到顶部

    $('.btn-back').on('tap', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);//100毫秒滚动到顶

    })



    // 初始化轮播图插件 可以实现自动轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1500 //自动轮播周期,默认为0 不自动轮播
    })

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

})