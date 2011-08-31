function jsonFlickrApi(data){
  $.each(data.photos.photo.slice(0,20),function(i,photo){
    var src= "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg",
    img = new Image();
    img.src = src;
    window.img= img;
    $("#flickr_feed").append("<img src='"+src+"'/>");
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
      $("#vimeo_feed").append("<div> <iframe src='http://player.vimeo.com/video/"+
          item.id+"' width='150' height='85' frameborder='0'></iframe> <a href='"+
          item.mobile_url+"'>"+
          item.title+"</a><cite>"+
          item.upload_date+"</cite></div>");
    });
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
