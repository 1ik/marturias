$$(document).on('pageInit', function (e) {
 	
	var global_activity_map = '';

	var mapOptions = {
        zoom: 8,
        zoomControl: false, 
        mapTypeControl: false , 
        panControl : false, 
        streetViewControl : false,
        center: new google.maps.LatLng(-34.397, 150.644)
    };

	if(global_activity_map == '') {
		global_activity_map = new google.maps.Map(document.getElementById('global-activity-map-container'),mapOptions);

	}

    var categories_showing = [];


    $('.global-categories > li > input').change(function() {

        if($(this).prop('checked') ) {
            alert("latitude and longitude under "+ this.value + " will be shown when response arrieves");
        } else {
            alert("all markers under "+ this.value + " will be removed from the map");
        }
        
    });
});

