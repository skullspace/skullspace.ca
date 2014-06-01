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

  // tabmenu
  $('#menu').tabify();

  // twitter
  $.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=skullspacewpg&count=8&callback=?",
  function(data){
    $.each(data, function(i,item){
      $("#twitter_feed ul").append("<li>"+item.text.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/g, "<a href='$1'>$1</a>")+"</li>");
    });
  });

  // flickr
  var url = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&tags=website&api_key=5b1e087229399735670b25418d55dd0f&user_id=58435337@N05&callback=?';

  $.getJSON(url);

  // vimeo
  $.getJSON("http://vimeo.com/api/v2/skullspace/videos.json?callback=?",function(data){
    $.each(data.slice(0,5),function(i,item){
      $('#vimeo_feed').append('<div>' +
          '<img rel="#video-overlay" width="150" height="100"' +
          'src="'              + item.thumbnail_medium + '"' +
          ' data-mobile-url="' + item.mobile_url +'"' +
          ' data-title="'      + item.title + '"' +
          ' data-upload-date="'+ item.upload_date + '"' +
          ' data-id="'          + item.id + '"' +
          '/><br />' +
          '<a href="' +
          item.mobile_url  + '">' +
          item.title       + '</a><br />' +
          item.upload_date.replace(/ .*/g, '') +
          '</div>');
    });
    $('img[rel]').overlay({
      mask: {
        color:     'black',
        loadSpeed: 200,
        opacity:   0.7
      }
    });
  });
  $("img[rel]").live('onLoad',function(e){
    var element = $(this),
        overlay = element.data('overlay').getOverlay(),
        id      = element.data('id');
        console.log(element);
    overlay.html("<iframe src='http://player.vimeo.com/video/"+ id +"' width='500' height='500' frameborder='0'></iframe>");
  }).live('onClose',function(e){
    var element = $(this),
    overlay = element.data('overlay').getOverlay();

    overlay.empty();

  });
});

$(function(){
  var latlng = new google.maps.LatLng(49.895960,-97.144287),
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
