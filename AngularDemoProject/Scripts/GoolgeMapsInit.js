var mark;
var map;
var map2;
function initMap() {
    try {
        var lng = 0;
        var lat = 0;
        if (document.getElementById("lon34map_lat") != null && document.getElementById("lon34map_lat") != "") {
            lat = document.getElementById("lon34map_lat").value;
        }
        if (document.getElementById("lon34map_lng") != null && document.getElementById("lon34map_lng") != "") {
            lng = document.getElementById("lon34map_lng").value;
        }
        if (lat == 0) {
            lat = 27.7054567;
            lng = 85.3248698;
        }

        var myLatlng = new google.maps.LatLng(lat, lng);

        var myOptions = {
            zoom: 19,
            center: myLatlng,
        }

        map = new google.maps.Map(document.getElementById('map'), myOptions);


        mark = new google.maps.Marker({
            position: myLatlng,
            map: map,
            editable: true,
            draggable: true
        });

        google.maps.event.addListener(mark, "dragend", function (event) {
            // get lat/lon of click
            var clickLat = event.latLng.lat();
            var clickLon = event.latLng.lng();

            console.log(clickLat);
            console.log(clickLon);
            // show in input box
            document.getElementById("lon34map_lat").value = clickLat.toFixed(7);
            document.getElementById("lon34map_lng").value = clickLon.toFixed(7);
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('SearchBox'));

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                mark.setPosition(place.geometry.location);

                var currentLat = mark.getPosition().lat();;
                var currentLon = mark.getPosition().lng();

                console.log(currentLat);
                console.log(currentLon);
                // show in input box
                document.getElementById("lon34map_lat").value = currentLat.toFixed(7);
                document.getElementById("lon34map_lng").value = currentLon.toFixed(7);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                console.log(place);

            });
            map.fitBounds(bounds);

        });

        lng = 0;
        lat = 0;
        if (document.getElementById("lon63map_lat") != null && document.getElementById("lon63map_lat") != "") {
            lat = document.getElementById("lon63map_lat").value;
        }
        if (document.getElementById("lon63map_lng") != null && document.getElementById("lon63map_lng") != "") {
            lng = document.getElementById("lon63map_lng").value;
        }
        if (lat == 0) {
            lat = 27.7054567;
            lng = 85.3248698;
        }

        myLatlng = new google.maps.LatLng(lat, lng);

        myOptions = {
            zoom: 19,
            center: myLatlng,
        }

        map2 = new google.maps.Map(document.getElementById('map2'), myOptions);
        mark2 = new google.maps.Marker({
            position: myLatlng,
            map: map2,
            editable: true,
            draggable: true
        });

        google.maps.event.addListener(mark2, "dragend", function (event) {
            // get lat/lon of click
            var clickLat = event.latLng.lat();
            var clickLon = event.latLng.lng();

            console.log(clickLat);
            console.log(clickLon);
            // show in input box
            document.getElementById("lon63map_lat").value = clickLat.toFixed(7);
            document.getElementById("lon63map_lng").value = clickLon.toFixed(7);
        });

        // Create the search box and link it to the UI element.
        var input2 = document.getElementById('pac-input2');
        var searchBox2 = new google.maps.places.SearchBox(input2);
        map2.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('SearchBox2'));

        // Bias the SearchBox results towards current map's viewport.
        map2.addListener('bounds_changed', function () {
            searchBox2.setBounds(map2.getBounds());
        });

        // more details for that place.
        searchBox2.addListener('places_changed', function () {
            var places = searchBox2.getPlaces();

            if (places.length == 0) {
                return;
            }

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                mark2.setPosition(place.geometry.location);

                var currentLat = mark2.getPosition().lat();;
                var currentLon = mark2.getPosition().lng();

                console.log(currentLat);
                console.log(currentLon);
                // show in input box
                document.getElementById("lon63map_lat").value = currentLat.toFixed(7);
                document.getElementById("lon63map_lng").value = currentLon.toFixed(7);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
                console.log(place);
            });
            map2.fitBounds(bounds);
        });
    } catch (err) {
        console.log("Googel Map Error: " + err);
    }
}