$(function(){
    
    quest(1);
    
    new Page({
        id: 'pagination',
        curPage: 1, //初始页码
        pageTotal: 14, //总页数
        pageAmount: 10, //每页多少条
        dataTotal: 144, //总共多少条数据
        pageSize: 5, //可选,分页个数
        showPageTotalFlag: true, //是否显示数据统计
        showSkipInputFlag: true, //是否支持跳转
        getPage: function(Page) {
            //获取当前页数
            quest(Page); 
        }
    });
       


    function quest(Page){
        $.ajax({
            url:'http://localhost:9090/api/getmoneyctrl',
            data:{
                pageid:Page,
            },
            success:function(data){
            console.log(data);
              var html=template('haitaotpl',data);
              $('.content ul').html(html);
    
            }
        });
    }

});

