$(function(){
    var categoryid = getQueryString('categoryid');
    $.ajax({
        url:'http://localhost:9090/api/getcategorybyid',
        data:{
            categoryid:categoryid
        },
        success:function(data){
            console.log(data);
            
            if(data.result.length==0){
                alert('404')
                return false;
            }
            $('.thirdly').html(data.result[0].category);
            // categoryId: 101, category: "血压计", titleId: 6, 
            //_id: "5806e6ea48985cb016b0834d", __v: 0
        }
    });



    var pageid=1;
    getproductList()
    console.log(categoryid);
    // 获取分类

    //获取分类数据
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容

                callback: function () {
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    //设置正在刷新的时间为3秒，dom的innerHTML 为“正在刷新 和 上次刷新时间”。
                    pageid = 1;
                    getproductList();
                    setTimeout(function(){
                                            
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    mui('#refreshContainer').pullRefresh().refresh(true);
                    },1000)
                    
                }
            },
            up: {
                callback: function () {
                    pageid++;
                    $.ajax({
                        url:"http://localhost:9090/api/getproductlist",
                        data:{
                            categoryid:categoryid,
                            pageid:pageid
                        },
                        success: function (data) {
                            console.log(data);

                            if(data.result.length>0){
                                setTimeout(function(){
                                    var html = template('categoryData',data);
                                    $('.item').append(html);
                                    
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                },1000)
                              
                            }else{

                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
                            

                           
                        }
                    });
                    
                }
                
            },
            
        }
    });

    



    function getproductList() {
        $.ajax({
            url:"http://localhost:9090/api/getproductlist",
            data:{
                categoryid:categoryid,
                pageid:pageid
            },
            success:function(data){
                console.log(data);
                
                var html = template('categoryData',data);
                $('.item').html(html)

                $('.ontap').on('tap',function(){
                    var productid = $(this).data('productid');
                    location = 'productDetails.html?categoryid='+categoryid+'&productId='+productid
                })
            }
        })
    }

    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    } 
})