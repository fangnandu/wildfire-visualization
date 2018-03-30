/* =====================
basic functions
===================== */
$("#previous").hide();
$("#alertpoint").show()
$("#alertpolygon").hide()

$("#legend_allOwners").hide();
$("#legendDIV_background").hide();



var defaultMapview = function(){
  map.setView([-33.438321, -70.690991], 4);
};

var clearMap = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

var pointPopup = function(feature) {
  thePopup = L.popup({className: 'popup'})
      .setContent(
        "<br><em class='popup-body'> occrence time: </em>" +
        feature.properties["ACQ_DATE"] +
        "<br><em class='popup-body'>Day Or Night: </em>" +
        feature.properties.DAYNIGHT +
        "<br><em class='popup-body'> FRP(intensity): </em>" +
        feature.properties.FRP
      );
    return(thePopup);
};

var polyPopUp = function(feature) {
    thePopup = L.popup({className: 'poly-popup'})
      .setContent(
        "<br><em class='popup-body'> Admin district 1 : </em>" +
        feature.properties.NAME_1 +
        "<br><em class='popup-body'> Admin district 2 : </em>" +
        feature.properties.NAME_2 +
        "<br><em class='popup-body'> Admin district 3 : </em>" +
        feature.properties.NAME_3 +
        "<br><em class='popup-body'> number of 2012-2017 wildfires: </em>" +
        feature.properties.NUMPOINTS
      );
    return(thePopup);
};


/* =====================
Basemap
===================== */
var map = L.map('map', {
  zoomControl: false
});

var zoom = L.control.zoom({position: 'topright'}).addTo(map);
defaultMapview();

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19,
  minZoom: 0,
  ext: 'png'
}).addTo(map);


titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
           maxZoom: 18,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);

var nMap=function(){
          titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
               maxZoom: 18,
               attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
          }).addTo(mymap).bringToFront();
      };

/* =====================
Slide functions
===================== */
var slide1Func = function() {
  // Reset map
  clearMap();
  defaultMapview();
  $("#alertpoint").show()
  $("#alertpolygon").hide()
  $("#legend_allOwners").show();
  $("#legendDIV_background").show();


  pricesArray = _.map(parsedData.features,
    function(feature){
      return feature.properties.FRP;
  });

    theLimits = chroma.limits(pricesArray, 'q', 5);
    myStyle = function(feature){
      if (feature.properties.FRP < theLimits[1]) {
        return {fillColor: colorRamp[0], stroke: false};
      } else if (feature.properties.FRP < theLimits[2]) {
        return {fillColor: colorRamp[1], stroke: false};
      } else if (feature.properties.FRP < theLimits[3]) {
        return {fillColor: colorRamp[2], stroke: false};
      } else if (feature.properties.FRP < theLimits[4]) {
        return {fillColor: colorRamp[3], stroke: false};
      } else {
        return {fillColor: colorRamp[4], stroke: false};
      }
    };

  featureGroup =
    L.geoJson(parsedData, {
    style: myStyle,

    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.85});
    },

    onEachFeature: function (feature, layer) {
        layer.bindPopup(pointPopup(feature));
    }
  })
//question: the markerClusterGroup is not a function
  //featureGroup2 = L.markerClusterGroup().addLayer(featureGroup)

  map.addLayer(featureGroup);
};

var slide2Func = function() {
  clearMap();
  $("#alertpoint").show()
  $("#alertpolygon").hide()
  map.setView([-33.438321, -70.690991], 10);

  pricesArray = _.map(parsedData.features,
    function(feature){
      return feature.properties.FRP;
  });

  theLimits = chroma.limits(pricesArray, 'q', 5);


  myStyle = function(feature){
    if (feature.properties.FRP < theLimits[1]) {
      return {fillColor: colorRamp[0], stroke: false};
    } else if (feature.properties.FRP < theLimits[2]) {
      return {fillColor: colorRamp[1], stroke: false};
    } else if (feature.properties.FRP < theLimits[3]) {
      return {fillColor: colorRamp[2], stroke: false};
    } else if (feature.properties.FRP < theLimits[4]) {
      return {fillColor: colorRamp[3], stroke: false};
    } else {
      return {fillColor: colorRamp[4], stroke: false};
    }
  };

  featureGroup = L.geoJson(parsedData, {
    style: myStyle,

    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.85});
    },

    onEachFeature: function (feature, layer) {
        layer.bindPopup(pointPopup(feature));
    }
  });
  map.addLayer(featureGroup);
};

var slide3Func = function() {
  // Reset map
  defaultMapview();
  $("#alertpoint").show()
  $("#alertpolygon").hide()
  map.removeLayer(featureGroup);
  map.setView([-33.438321, -70.690991], 10);

  myStyle = function(feature){
    return {
      stroke: true,
      strokeOpacity: 1,
      fillOpacity: 0.5,
      color: colorRamp[4],
      radius: feature.properties.FRP/10
    };
  };

  featureGroup = L.geoJson(parsedData, {
   style: myStyle,
   pointToLayer: function(feature, latlng) {
       return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.85});
   },
   onEachFeature: function (feature, layer) {
       layer.bindPopup(pointPopup(feature));
   }

 }).addTo(map);

};

var slide4Func = function() {
  clearMap();
  $("#alertpoint").hide()
  $("#alertpolygon").show()
  defaultMapview();

  mobilityArray = _.map(msasParsed.features,
    function(msa){
      return msa.properties.NUMPOINTS;
  });

  theLimits = chroma.limits(mobilityArray, 'q', 5);

  // Define color scheme
  colorPolygons = function(feature){
    if (feature.properties.NUMPOINTS < theLimits[1]) {
      return colorRamp[0];
    } else if (feature.properties.NUMPOINTS < theLimits[2]) {
      return colorRamp[1];
    } else if (feature.properties.NUMPOINTS < theLimits[3]) {
      return colorRamp[2];
    } else if (feature.properties.NUMPOINTS < theLimits[4]) {
      return colorRamp[3];
    } else {
      return colorRamp[4];
    }
  };

  myStyle = function(feature){
    var theStyle = {
      color: colorPolygons(feature),
      fillOpacity: 0.75,
      stroke: true,
      strokeOpacity: 1,
      weight: 1
    };
    return(theStyle);
  };

  featureGroup = L.geoJson(msasParsed, {
    style: myStyle,

    onEachFeature: function(feature, layer) {
        layer.bindPopup(polyPopUp(feature));
    }
  });
  map.addLayer(featureGroup);
};


/* =====================
State object
===================== */
var state = {
  "slideNumber": 0,
  "slideData": [
    {
      "title": "The overall occurence and intensity of wildfires in Chile in2018",
      "text": slide1text
    },
    {
      "title": "Interactive Guide and Santiago wildfire occurance visualization",
      "text": slide2text
    },
    {
      "title": "Santiago area visualization",
      "text": slide3text
    },
    {
      "title": "Suggestions for administration level",
      "text": slide4text
    },

  ]
};

/* =====================
Data
===================== */
var pointDat = "https://raw.githubusercontent.com/fangnandu/midterm-data/master/fire_2018.json";
var msas = "https://raw.githubusercontent.com/fangnandu/midterm-data/master/admin3_count.json";

var colorRamp = ["#C07CBE","#DFBCDD","#FEFDFC","#FCD47F","#FBAC02"];

/* =====================
Functionality
===================== */
var parsedData;
var msasParsed;
var test;
var theLimits;

var myStyle = {};

$.ajax(msas).done(function(msas) {
  // Parse JSON
  msasParsed = JSON.parse(msas);
});

$.ajax(pointDat).done(function(pointDat) {
  // Parse JSON
  parsedData = JSON.parse(pointDat);
  // Show the initial slide
  featureGroup = L.geoJson(parsedData, {
    style: {
      fillColor: colorRamp[4],
      stroke: false
    },

    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.85});
    },
  });
  featureGroup = L.markerClusterGroup().addLayer(featureGroup)

  map.addLayer(featureGroup);



  // Click functionality
  //  Button functions
  var clickNextButton = function() {
    if(state.slideNumber < state.slideData.length) {
      state.slideNumber += 1;
    } else {
      state.slideNumber = 1;
    }
    $(".Slide-title").html(state.slideData[state.slideNumber - 1].title);
    $(".Slide-text").html(state.slideData[state.slideNumber - 1].text);
    showTheSlide(state.slideNumber);
  };

  var clickPreviousButton = function() {
    if(state.slideNumber > 1) {
      state.slideNumber -= 1;
    } else {
      state.slideNumber = state.slideData.length;
    }
    $(".Slide-title").html(state.slideData[state.slideNumber - 1].title);
    $(".Slide-text").html(state.slideData[state.slideNumber - 1].text);
    showTheSlide(state.slideNumber);
  };
  //  Function to call the appropriate slide function
  var showTheSlide = function(slideNumber) {
    switch(slideNumber) {
      case 1:
        slide1Func();
        break;
      case 2:
        slide2Func();
        break;
      case 3:
        slide3Func();
        break;
      case 4:
        slide4Func();
        break;

      default:
        break;
      }
  };
  //  On clicks call the clickbutton functions, calling the showslide function
  $('#next').click(function() {
    clickNextButton();
    $('#previous').show();

    if (state.slideNumber == 4){
      $('#next').hide()
    }
  });


  $('#previous').click(function() {
    clickPreviousButton();
    $('#next').show();
    if (state.slideNumber == 1){
      $('#previous').hide()
    }
  });
});
