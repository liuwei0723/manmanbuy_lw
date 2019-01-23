$(function(){
   $.ajax({
      url:'http://localhost:9090/api/getinlanddiscount',
      success:function(data){
   //  console.log(data)
    var html=template('discounttpl',data);
    $('.content ul').html(html);
      } 
   });
   
})