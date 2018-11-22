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
    {"role": "Manager","username": "Nicolette.Horning", "photo": "profiles/1819/03335-2038764.jpg", "email": "", "full_name": "Nicolette Horning", "views": "141"},
    {"role": "Assistant Manger","username": "Hunter.Giesbrecht", "photo": "profiles/1819/03160-2038751.jpg", "email": "", "full_name": "Hunter Giesbrecht", "views": "22"},
    {"role": "Syrup Specialist", "username": "rachael.wright", "photo": "profiles/1718/01750-2026386.jpg", "email": "", "full_name": "Rachael Wright", "views": "33"},
    {"username": "Amanda.Maizar", "photo": "profiles/1819/01549-2027046.jpg", "email": "", "full_name": "Amanda Maizar", "views": "82"},
    {"username": "Andrew.Nascimento", "photo": "profiles/1819/02776-2052796.jpg", "email": "", "full_name": "Andrew Nascimento", "views": "19"},
    {"username": "brian.paredes", "photo": "profiles/1718/02419-2024509.jpg", "email": "Brian.paredes@wallawalla.edu", "full_name": "Brian Andrew Paredes", "views": "14"},
    {"username": "Brooklyn.Anderson", "photo": "profiles/1819/00966-2044615.jpg", "email": "None", "full_name": "Brooklyn Anderson", "views": "34"},
    {"username": "Charmaine.Tan", "photo": "profiles/1819/02156-2049290.jpg", "email": "guess.....", "full_name": "Charmaine Tan", "views": "23"},
    {"username": "grant.slavens", "photo": "profiles/1718/01121-2017575.jpg", "email": "grant.slavens@wallawalla.eduNone", "full_name": "Grant Slavens", "views": "35"},
    {"username": "gregory.birge", "photo": "profiles/1819/01762-2019445.jpg", "email": "None", "full_name": "Gregory Birge", "views": "44"},
    {"username": "Jonathan.Gillespie", "photo": "profiles/1819/02220-2054485.jpg", "email": "Jonathan.Gillespie@wallawalla.edu", "full_name": "Jonathan Gillespie", "views": "55"},
    {"username": "joshua.huh", "photo": "profiles/1819/03328-1499491.jpg", "email": "joshua.huh@wallawalla.edu", "full_name": "Joshua Huh", "views": "30"},
    {"username": "Zack.Hoffer", "photo": "profiles/1819/02408-2037147.jpg", "email": "", "full_name": "Zack Hoffer", "views": "97"},
    {"username": "Stephanie.Smith", "photo": "images/default_mask/default.jpg", "email": "", "full_name": "Stephanie Smith", "views": "0"}
  ];

  $.each(baristas,function(i,v){
    var role = "Barista";
    if(v.role){
      role = v.role;
    }
    var outerHTML = `
      <div class="person col col-md-4">
      <a id="` + i + `profile" href="https://aswwu.com/mask/profile/` + v.username + `" target="_blank"></a>
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
