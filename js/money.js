$(function () {
    cagetoryMoney(1);
    new Page({
        id: 'pagination',
        pageTotal: 14, //必填,总页数
        pageAmount: 10,  //每页多少条
        dataTotal: 144, //总共多少条数据
        curPage:1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag:false, //是否显示数据统计,不填默认不显示
        showSkipInputFlag:false, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数
           cagetoryMoney(page);
        }
    })
    function cagetoryMoney(page) {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: page,
            },
            success: function (data) {
                console.log(data);
                var html = template('list', data);
                $('#main .mui-table-view').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    indicators: false,
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                
            }
        })
    }
})