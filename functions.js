function jsonFlickrApi(data){
  $.each(data.photos.photo.slice(0,20),function(i,photo){
    var src= "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg",
    url = 'http://www.flickr.com/photos/skullspace/'+photo.id,
    img = new Image();
    img.src = src;
    window.img= img;
    $("#flickr_feed").append("<a href="+url+"><img src='"+src+"'/></a>");
  });
}

$(function(){
  // twitter
  $.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name=skullspacewpg&count=10&callback=?",
  function(data){
    $.each(data, function(i,item){
      $("#twitter_feed ul").append("<li>"+item.text+"</li>");
    });
  });

  //flickr
  var url = 'http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=5b1e087229399735670b25418d55dd0f&user_id=58435337@N05&callback=?';

  $.getJSON(url);

  $.getJSON("http://vimeo.com/api/v2/skullspace/videos.json?callback=?",function(data){
    $.each(data.reverse().slice(0,5),function(i,item){
      $('#vimeo_feed').append('<div>'+
          '<img rel="#mies1" width="150" height="100"'+
          'src="'              + item.thumbnail_medium + '"'+
          ' data-mobile-url="' + item.mobile_url +'"' +
          ' data-title="'      + item.title + '"' +
          ' data-upload-date="'+ item.upload_date + '"'+
          ' data-id="'          + item.id + '"'+
          '/>'+
          '<a href="'+
          item.mobile_url  + '">' +
          item.title       + '</a><cite>'+
          item.upload_date + '</cite>'+
          '</div>');
    });
    $('img[rel]').overlay();
    $("img[rel]").bind('onLoad',function(e){
      var element = $(this),
          overlay = element.overlay().getOverlay(),
          id      = element.data('id'); // this is undefined. 'data' is an array or a list...
          console.log(element);
      overlay.html("<iframe src='http://player.vimeo.com/video/"+ id +"' width='500' height='500' frameborder='0'></iframe>");
    }).bind('onClose',function(e){
      var element = $(this),
      overlay = element.overlay().getOverlay();

      //overlay.empty();

    })

  });
});

$(function(){
  var latlng = new google.maps.LatLng(49.899669,-97.142344),
      myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },
  map    = new google.maps.Map(document.getElementById("map_canvas"), myOptions),
  marker = new google.maps.Marker({
    position: latlng,
         map: map
  });
});
