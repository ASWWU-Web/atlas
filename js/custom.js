//Global vars.
var parallax = [];

//Startup script
$(document).ready(function(){
  $(".smooth").smoothScroll({
    offset:-74,
    speed:"auto",
    autoCoefficient:2
  });
  addParallax("#late","./media/IMG_6201.jpg");
  addParallax("#spilled_coffee","./media/Sept.%2017-2.jpg");
  //addParallax("#coffee-table","./media/coffee-table.jpg");
  addParallax("#atlas-coffee","./media/Sept.%2017-6.jpg");
  //Attach this function to scroll event.
  // TODO: use bootstrap .affix() to do this. http://getbootstrap.com/javascript/#affix
  $(window).scroll(function() {
    if(getScrollHeight() < 10){
      $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
    } else {
      $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
    }
  });
  //In case the page doesn't load on the Top.
  if(getScrollHeight() < 10){
    isTop = true;
    $('#navbar').addClass('bg-transparent').removeClass('bg-inverse');
  } else {
    isTop = false;
    $('#navbar').addClass('bg-inverse').removeClass('bg-transparent');
  }

  var button = "<div class='col col-xs-12 text-white text-xs-center'><a href='https://www.instagram.com/the_atlas/' target='about_blank' class='btn btn-primary'>Open with Instagram</a></div>";
  //Instagram feed stuff.
  $.getJSON("https://aswwu.com/server/feed?name=atlas", function(data){
    var feed =``;
    $.each(data.data, function(i,o){
      if(i >= 6){
        return false;
      }
      var html = `
      <div class="col-md-6">
        <div class="fh5co-press-item to-animate fadeInUp animated">
					<a class="fh5co-press-img" href="` + o.link + `" style="background-image: url(` +  o.images.low_resolution.url+ `)">
						</a>
					<div class="fh5co-press-text">
						<p>` + o.caption.text + `</p>
					</div>
          <a href="`+ o.link + `" target="about_blank"><div class="fh5co-like text-black"><font color="red"> &hearts;</font> ` + o.likes.count + `</div></a>
				</div>
      </div>
          `;
      feed += html;
    });

    $("#atlasFeed").append(feed + button);
  }).fail(function(){
    $("#atlasFeed").append("<div class='col col-xs-12 text-xs-center'><p><font color='red'>Failed to fetch instagram content.</font></p></div>" + button);
  });

  //Add baristas.
  var baristas = [
    {"role": "Manager","username": "Brian.Paredes", "photo": "/profiles/1920/1840-2024509.jpg", "full_name": "Brian Andrew Paredes"},
    {"role": "Assistant Manger","username": "Hunter.Giesbrecht", "photo": "profiles/1819/03160-2038751.jpg", "full_name": "Hunter Giesbrecht"},
    {"role": "Marketing Coordinator","username":"Charmaine.Tan","photo": "profiles/1920/1249-2049290.jpg", "full_name": "Charmaine Tan"},
    {"role": "Beverage Specialist", "username":"Annalise.Harvey", "photo":"profiles/1819/01002-2022270.jpg", "full_name":"Annalise Harvey"},
    {"username": "Andrew.Nascimento", "photo": "profiles/1819/02776-2052796.jpg", "full_name": "Andrew Nascimento"},
    {"username": "Breanna.Scully", "photo": "profiles/1920/1129-2034359.jpg", "full_name": "Breanna Scully"},
    {"username": "Brooklyn.Anderson", "photo": "profiles/1819/00966-2044615.jpg", "full_name": "Brooklyn Anderson"},
    {"username": "Gregory.Birge", "photo": "/profiles/1920/2258-2019445.jpg", "full_name": "Gregory Birge"},
    {"username": "Jonathan.Gillespie", "photo": "profiles/1819/02220-2054485.jpg", "full_name": "Jonathan Gillespie"},
    {"username": "Ryan.Rojas", "photo": "profiles/1718/00358-2036350.jpg", "full_name": "Ryan Rojas"},
    {"username": "Zachary.Macomber", "photo":"/profiles/1920/966-2048546.jpg", "full_name":"Zachary Macomber"},
    {"username": "Zack.Hoffer", "photo": "/profiles/1920/1740-2037147.jpg", "full_name": "Zack Hoffer"}
  ];

  $.each(baristas,function(i,v){
    var role = "Barista";
    if(v.role){
      role = v.role;
    }
    var outerHTML = `
      <div class="person col col-md-4">
      <a id="` + i + `profile" href="https://aswwu.com/mask/profile/` + v.username + `/1920` + `" target="_blank"></a>
      </div>`;
    $("#baristas").append(outerHTML);
    if(v.photo == "None"){
      $("#" + i + "profile").parent().remove();
      return false;
    }
    var html = `
      <div class="img-container">
        <img src="https://aswwu.com/media/img-sm/`+ v.photo + `" alt="`+ v.full_name + `">
      </div>
      <h3 class="name">`+ v.full_name + `</h3>
      <div class="position">`+ role + `</div>
    `;
    $("#" + i + "profile").append(html);
  });

  $(window).resize(function() {
    google.maps.event.trigger(map, "resize");
  })

});

//GLOBAL FUNCTIONS

//parallax handler
function addParallax(id, imgUrl) {
  $(id).css('background-image',"url(" + imgUrl + ")");
}

//Returns any of the valid scroll variables or zero if there is an error.
function getScrollHeight() {
  var height = 0;
  try {
    height = window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
  }
  catch (e) {
    height = 0;
  }
  return height;
}

//Google maps stuff
function initMap() {
  var atlas = {lat: 46.049530, lng: -118.388233};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: atlas,
    disableDefaultUI: true,
    scrollwheel:false,
    zoomControl: true,
    styles: [
      {
        featureType: 'all',
        stylers: [
          {hue: "#ae8648"},
          {saturation: 70},
          {lightness: 0},
          {gamma: 1}
        ]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
  });

  var image = {
    url: './media/coffeeMarker.png',
    anchor: new google.maps.Point(20,40),
    origin: new google.maps.Point(0, 0),
    size: new google.maps.Size(128, 128),
    scaledSize: new google.maps.Size(40,40)
  };
  var infowindow = new google.maps.InfoWindow({
    content: "<a href='https://www.google.com/maps/dir//46.049527,-118.3882132/' target='_blank'>Get Directions</a>",
    pixelOffset: new google.maps.Size(-44,0)
  });
  var marker = new google.maps.Marker({
    position: atlas,
    map: map,
    icon: image
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
