// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Framework7.$;

// Event listener to run specific code for specific pages


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

// ======================== OPENING CONTAINER HANDLER ===============================//
/**right panel open event handling**/
$$('.panel-right').on('open', function () {
        rightView.loadPage('panel-right3.html');
        $$('#navbar-prayer-points').addClass('active');

        $$('#navbar-pending-requests').removeClass('active');
        $$('#navbar-friends').removeClass('active');
        $$('#footer-text').html('Prayer Points');
});


$$('.panel-right').on('opened', function () {
    $$('.label-checkbox').on('click' , function() {
        var id = $$(this).find('.accept').val();
        alert(id);
        $('#'+id).fadeOut('2000' , function() {
            $(this).remove();
        });
    });
});



$$('.panel-left').on('opened', function() {
    $('.topbar').hide();
    $$('#global-activity-map-link').on('click', function(){
        mainView.loadPage('global.html');
        myApp.closePanel('panel-left');
    });

    //we bind the events to the list.

    $$(".left-panel-list > li").on("click", function() {
        var page_name = $(this).attr("data-page");
        mainView.loadPage(page_name);
    });

    var map = '';
    var mapOptions = {
        zoom: 8,
        zoomControl: true, 
        mapTypeControl: false , 
        panControl : false, 
        streetViewControl : false,
        center: new google.maps.LatLng(-34.397, 150.644)
      };

    if(map != '')
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions); //initiazling the map.


});
// ======================== OPENING CONTAINER HANDLER ===============================//


$$('#navbar-prayer-points').on('click', function () {
        rightView.loadPage('panel-right3.html');
        $$(this).addClass('active');

        $$('#navbar-pending-requests').removeClass('active');
        $$('#navbar-friends').removeClass('active');

        $$('#footer-text').html('Prayer Points');
});

$$('#navbar-pending-requests').on('click', function () {
        rightView.loadPage('panel-right2.html');
        $$(this).addClass('active');
        $$('#footer-text').html('Pending Requests');

        $$('#navbar-prayer-points').removeClass('active');
        $$('#navbar-friends').removeClass('active');
});

$$('#navbar-friends').on('click', function() {
    $$(this).addClass('active');
    rightView.loadPage('friends.html');

    $$('#navbar-prayer-points').removeClass('active');
    $$('#navbar-pending-requests').removeClass('active');
    $$('#footer-text').html('Requests');

});



//mainView.loadPage('global.html');
//$('.topbar').show();

//initially we load the sign up view in the main panel
mainView.loadPage('main-view.html');
$('.topbar').show();

/**panel open event handling**/

