$(function () {
    $.ajax({
        url: 'http://localhost:9090/api/getcoupon',
        success: function (data) {
            // console.log(data);
            var html = template('couponTpl', data);
            // console.log(html);
            $('#main ul').html(html)
        }
    })
    // 点击li标签跳转
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });



    // 上拉下拉初始化
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
})