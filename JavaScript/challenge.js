// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow({minWidth:60});

  const locationButton = document.getElementById("location");

  // locationButton.textContent = "Pan to Current Location";
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    
    document.getElementById("kilometers").innerHTML = "5/5km";
    document.getElementById("time-past").innerHTML = "35min";

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You!");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// var target = document.getElementById('output');
// var watchId;

// function appendLocation(location, verb) {
//   verb = verb || 'updated';
//   var newLocation = document.createElement('p');
//   newLocation.innerHTML = 'Location ' + verb + ':  ' + location.coords.latitude + ', ' + location.coords.longitude + '';
//   target.appendChild(newLocation);
// }

// if ('geolocation' in navigator) {
//   document.getElementById('location').addEventListener('click', function () {
//     navigator.geolocation.getCurrentPosition(function (location) {
//       appendLocation(location, 'fetched');
//     });
//     watchId = navigator.geolocation.watchPosition(appendLocation);
//   });
// } else {
//   target.innerText = 'Geolocation API not supported.';
// }
// $('#location').click(function(){
        
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position){
//           console.log(position);
//           $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false", function(data) {
//             console.log(data);
//           })
//           var img = new Image();
//           img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=800x400&sensor=false";
//           $('#output').html(img);
//         });
        
//     }

//   });