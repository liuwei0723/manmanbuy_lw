$(function () {
  var num = 1;
  var shopid = 0;
  var areaid = 0;
  getshop();
  getregion()
  getContent(shopid, areaid);
  // 站点的点击事件
  $(".zuobian .yi").on("tap", function () {
    $(this).find("i").addClass("xuanzhuan");
    $(this).siblings().find("i").removeClass("xuanzhuan");
    num++;
      console.log(num)
    if (num % 2 == 0) {
      $(".yincang1").show().siblings().hide();
    } else {
      $(".yincang1").hide();
      $(".yi").find("i").removeClass("xuanzhuan");
    };
  });
  // 地区的点击事件
  $(".zuobian .er").on("tap", function () {
    $(this).find("i").addClass("xuanzhuan");
    $(this).siblings().find("i").removeClass("xuanzhuan");
    num++;
    console.log(num)
    if (num % 2 == 0) {
      $(".yincang2").show().siblings().hide();
    } else {
      $(".yincang").hide();
      $(".er").find("i").removeClass("xuanzhuan");
    }
  });


  // 价格排序的点击事件
  $(".zuobian .san").on("tap", function () {
    $(this).find("i").addClass("xuanzhuan");
    $(this).siblings().find("i").removeClass("xuanzhuan");
    num++;
    if (num % 2 == 0) {
      $(".yincang3").show().siblings().hide();
    } else {
      $(".yincang3").hide()
      $(".san").find("i").removeClass("xuanzhuan");
    }
  });
  // 站点里面各个电商的点击渲染事件
  $(".exhibition").on("tap", ".xuanze1", function () {
    var iid = $(this).find('i').data("iid");
    shopid = $(this).data("id");
    var name = $(this).data("shop-name");
    getContent(shopid, areaid, )
    $(".yincang1").hide();
    $(".yi").find("i").removeClass("xuanzhuan");

    $(".weitchover").text(name);
    $(this).find("i").addClass("action");
    $(this).siblings().find("i").removeClass("action");
    num = 1;
    // console.log( $(this).find("i"))
  });
  // 分地区点击渲染事件
  $(".exhibition").on("tap", ".xuanze2", function () {
    areaid = $(this).data("id");
    var iid = $(this).find('i').data("iid");
    var name = $(this).data("shop-name");
    console.log(name)
    // if(iid==areaid){
    //   $(this).find("i").addClass("action");
    //   $(this).siblings().find("i").removeClass("action");
    // }else{
    //   $(this).parent().find("i").removeClass("action")
    // }
    getContent(shopid, areaid, );
    $(".yincang2").hide();
    $(".er").find("i").removeClass("xuanzhuan");
    num = 1;
    var name = name.substr(0, 2)
    $(".weitchover2").text(name);
    $(this).find("i").addClass("action");
    $(this).siblings().find("i").removeClass("action");
  });
  // 封装的渲染函数
  function getContent(shopid, areaid, ) {
    $.ajax({
      url: "//localhost:9090/api/getgsproduct",
      data: {
        shopid: shopid,
        areaid: areaid
      },
      success: function (result) {
        // console.log(result.result.length)
        var html = template("mainTpl", result);
        $(".xuanran").html(html);
      }
    })
  }
  //  为页面添加页面滚动监听事件


  $(window).bind('touchmove', function(e) { 
    // e.preventdefault();               //禁用默认滚动行为，需要自己实现滚动
    console.log($(this).scrollTop()); // 计算你的屏幕高度
    var wst = $(window).scrollTop()
    // console.log(wst)
    if (wst >= 600) {
      $(".position").show();
    } else {
      $(".position").hide();
    }
});
  // $(window).scroll(function () {
  //   var wst = $(window).scrollTop()
  //   // console.log(wst)
  //   if (wst >= 600) {
  //     $(".position").fadeIn(500);
  //   } else {
  //     $(".position").fadeOut(400);
  //   }
  // })
  //  锚点点击回到顶部事件
  $(".position").on("tap", function () {
    // let time = setInterval(() => {
    //   let top = $(document).scrollTop()
    //   if (top == 0) {
    //     clearInterval(time);
    //   }
    //   $(document).scrollTop(top - 100);
    // }, 30)
      $(window).scrollTop(0);
   
  })


  function getshop() {
    $.ajax({
      url: "//localhost:9090/api/getgsshop",
      success: function (data) {
        // console.log(data.result)
        var html = template("yiTpl", {
          result: data.result
        });
        $(".yincang1").html(html);
        // num++;
        // // console.log(num);
        // if (num % 2 == 0) {
        //   $(".yincang1").show().siblings().hide();
        // } else {
        //   $(".yincang1").hide();
        //   $(".yi").find("i").removeClass("xuanzhuan");
        // }
      }
    })
  }

  function getregion() {
    $.ajax({
      url: "//localhost:9090/api/getgsshoparea",
      success: function (result) {
        // console.log(result);
        var html = template("erTpl", result);
        $(".yincang2").html(html);
        //   num++;
        //   // console.log(num);
        //   if(num%2==0){
        //     $(".yincang2").show().siblings().hide();
        //   }else{
        //     $(".yincang").hide();
        //     $(".er").find("i").removeClass("xuanzhuan");
        //   }
      }
    })
  };
  //   mui.init({
  //     pullRefresh: {
  //         container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
  //         down: {
  //             contentdown: "你正在下拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
  //             contentover: "拉到底了你可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
  //             contentrefresh: "正在拼命刷新中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
  //             callback: function () {//必选
  //                 // 模拟请求过程写了一个延迟的定时器 让结束代码延迟2秒钟执行
  //                 setTimeout(function () {
  //                     /* 注意官网文档的结束下拉刷新的代码有错 现在新版本MUI已经更新为 endPulldownToRefresh函数了
  //                       使用最新的endPulldownToRefresh结束下拉刷新 */
  //                     // mui('#refreshContainer').pullRefresh().endPulldown();
  //                     // 做数据请求刷新页面 业务要你自己写 数据刷新完成后要结束下拉加载的效果
  //                     // getContent(shopid,areaid);
  //                     mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
  //                 }, 2000);
  //             }
  //         },
  //         up: {
  //             contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
  //             contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
  //             callback: function () {
  //                 // 模拟请求过程写了一个延迟的定时器 让结束代码延迟2秒钟执行
  //                 setTimeout(function () {                            
  //                     // 结束上拉加载 但是还有数据
  //                     mui('#refreshContainer').pullRefresh().endPullupToRefresh();
  //                     // 结束上拉加载 并且提示没有更多数据了
  //                     mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
  //                 }, 2000);
  //             }
  //         }
  //     }
  // });

})