$(function () {
    $('.btn-top').on('tap', () => {
        let time = setInterval(() => {
            let top = $(document).scrollTop();
            console.log(top)
            if (top == 0) {
                clearInterval(time)
            }
            $(document).scrollTop(top - 5)
        }, 30);
    })
    $.ajax({
        type: "get",
        url: "http://localhost:9090/api/getbrandtitle",
        // data: "data",
        dataType: "json",
        success: function (obj) {
            let res = {
                '电视': [],
                '空调': [],
                '影音': [],
                '冰箱': [],
                '厨卫': [],
                '手机': [],
                '相机': [],
            }
            res['电视'] = filter(['电视'], obj.result)
            res['空调'] = filter(['空调'], obj.result)
            res['影音'] = filter(['DVD', 'dvd', '影'], obj.result)
            res['冰箱'] = filter(['冰箱'], obj.result)
            res['厨卫'] = filter(['洗衣机', '热水'], obj.result)
            res['相机'] = filter(['相机'], obj.result)
            res['手机'] = filter(['手机'], obj.result)
            obj.res = res;
            console.log(obj)
            let html = template('tpl', obj)
            $('#accordion').html(html)

        }
    });
})
let qq = ['电视']

function filter(qq, data) {
    let arr = []
    for (let k of qq) {
        data.forEach(ele => {
            if (ele.brandTitle.indexOf(k) != -1) {
                arr.push(ele)
            }
        });
    }
    return arr
}