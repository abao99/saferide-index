$(document).ready(function (){
	/* 平順捲動的動作 */
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
});
	/* 啟用 scrollspy 選單 */
	$('body').scrollspy({
  		target: '#navbar',
  		
	});

  /* info 輪播*/
  $('.carousel').carousel({
    interval: 3000,
    
  });

  /* GOOGLE MAP */
    var divmap=document.getElementById("goomap");
      //設定地圖的中心點
    var lat=24.170566;
    var lng=120.609932;
    var latlng = new google.maps.LatLng(lat,lng);
              
    var gmap= new google.maps.Map(divmap,{
      zoom:15,
      center: latlng,   
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
              
    var marker = new google.maps.Marker({
      position: latlng,
      icon:"./images/map1.gif",
      map: gmap,
      title:"MY Company!!"              
    });
    google.maps.event.addListener(marker, "click", function(event){
      var infowindow = new google.maps.InfoWindow({

        content:
          "<div>"+"this is my Company!!"+"</div>"
        });
      infowindow.open(gmap,marker);

    });
    /* GOOGLE MAP */


    /* Ajax info new */
    $.ajax({
      type:"POST",
      url:"http://www.saferide.byethost9.com/saferide/php/select_new.php",
      dataType:"json",
      
      success:showval,
      
      error:function(data){
        alert("error");
      },
    });

    function showval(data){
      
      var msg1=[];
      var msg2="";
      
      for(i=0;i<data.length;i++){
        msg1[i] ='<div class="item">'+
                '<div class="panel panel-warning">'+
                  '<div class="panel-heading">'+
                    '<h2 class="panel-title">'+data[i].news_title + '</h2>'+
                  '</div>'+
                  '<div class="panel-body lead">'+
                    data[i].news_content+
                  '</div>'+
                '</div>'+
              '</div>';

        msg2 += '<li class="list-group-item">'+
                  data[i].news_title+
                    '</li>';
        
      if(i==0)
        $("#msg0").html(msg1[i]);

      if(i==1)
        $("#msg1").html(msg1[i]);

      if(i==2)
        $("#msg2").html(msg1[i]);

      if(i==3)
        $("#msg3").html(msg1[i]);
      }
      $("#list1").html(msg2);   
    }
    /* Ajax info new */
});