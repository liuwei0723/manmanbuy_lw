$(function () {
    let url = geturl('brandtitleid');
    $.ajax({
        type: "get",
        url: "http://localhost:9090/api/getbrand",
        data: {
            brandtitleid: url
        },
        dataType: "json",
        success: function (obj) {
            // console.log(obj)
            let html = template('shop-top', obj)
            $('#item1 ul').html(html)
            // let html2=template('list-sui',obj)
           
        }
    });

    $.ajax({
        type: "get",
        url: "http://localhost:9090/api/getbrandproductlist",
        data: {
            brandtitleid: url,
            pagesize: 10,
        },
        dataType: "json",
        success: function (obj) {
            let html = template('list-tow', obj);
            $('#item2 ul').html(html)
            console.log(obj);
           
            for(let k of obj.result){
                $.ajax({
                    type: "get",
                    url: "http://localhost:9090/api/getproductcom",
                    data: {
                        productid:k.productId
                    },
                    dataType: "json",
                    success: function (res) {
                        let html2 = template('list-xx', {
                            productId:obj.productId,
                            list:obj.result,
                            data:res.result
                        });
                        $('#item3 ul').html(html2)
                    }
                });
            }
        }
    });
})
$('.btn-top').on('tap',()=>{
    let time=setInterval(() => {
        let top=$(document).scrollTop();
        // console.log(top)
        if(top==0){
            clearInterval(time)
        }
        $(document).scrollTop(top-10)
    }, 30);
})
function geturl(str) {
    let url = location.search;
    let res = undefined;
    url = url.substr(1);
    url = url.split('&');
    url.forEach(ele => {
        if (ele.indexOf(str) != -1) {
            res = ele.split('=')[1]
        }
    })
    return res
}