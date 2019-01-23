 $(function(){
     
     var id=getQueryString('id');
     console.log(id);
    $.ajax({
        url:'http://localhost:9090/api/getdiscountproduct',
        data:{
            productid:id,
        },
        success:function(data){
           console.log(data);
        var html=template('producktpl',data);
        $('.content').html(html);
        }
    });
    
    // $('.back').on('click',function(){
    //     location="discount.html";
    // })

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
 })