var myApp = new Framework7({
    modalTitle: 'Framework7',
    animateNavBackIcon: true
});

//swipeout handler


// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: false
});

var leftView = myApp.addView('.view-left', {
    dynamicNavbar: true
});



// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

// Demo Photo Browsers
var photoBrowserPhotos = [
    'img/beach.jpg',
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    'img/monkey.jpg',
    'img/mountains.jpg'
];
var photoBrowserStandalone = myApp.photoBrowser({
    photos: photoBrowserPhotos
});
var photoBrowserPopup = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'popup'
});
var photoBrowserPage = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'page',
    backLinkText: 'Back'
});
var photoBrowserDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark'
});
var photoBrowserPopupDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark',
    type: 'popup'
});

// Events for specific pages when it initialized
$$(document).on('pageInit', function (e) {

    if( e.detail.page.url == "main-view.html" ) {
        $('.topbar').show();
    }


    if(e.detail.page.url == 'encouraging-words.html')
    {
        $$('.profile_item-bookmark').on("click", function(){
            var bookmark = $(this).find('i.fa');
            if(bookmark.hasClass('fa-bookmark-o')) {

                bookmark.removeClass('fa-bookmark-o').addClass('fa-bookmark');
                var id = $(this).attr('data-favorite');
                var json = {
                    'favorite-id' : id,
                    'action-type' : 'make-favorite'
                };
                alert("sending request to server with " + JSON.stringify(json));
            } else {

                bookmark.removeClass('fa-bookmark').addClass('fa-bookmark-o');
                var id = $(this).attr('data-favorite');
                var json = {
                    'favorite-id' : id,
                    'action-type' : 'make-unfavorite'
                };

                alert("sending request to server with " + JSON.stringify(json));
            }

        });


        $('.encouraging-words-share').on( "click" , function() {

            var shares = $(this).parent().find('.active');
            var string = "This prayer point will be shared with ";

            var medias = [];

            $.each(shares, function(key,value){
                medias.push($(value).data('media'));
                $(value).removeClass('active');
            });

            var id =  $(this).attr('data-encouraging-word');

            var jsonObj = {
                'word-id' : id,
                'medias' : medias
            };

            alert(JSON.stringify(jsonObj) + " will be sent to server" );
        });
    }

    if( e.detail.page.url == 'miracle-journal.html') {
        $$('.miracle-journal-share').on('click', function() {
            sendShares(this, 'miracle-journal');
        });
    }






    if(e.detail.page.view.selector == ".view-main") {

        //which means it has been instructed to load page into the main view.
        //so after the page has been loaded into the mainview. 
        //we show the mainview by closing the left-panel.
        //becase right now content's will be loaded on mainview by clicking on the left panel's lsit items.
        myApp.closePanel('panel-left');
    }



    var page = e.detail.page;
    // Handle Modals Page event when it is init
    if (page.name === 'modals') {
        $$('.demo-alert').on('click', function () {
            myApp.alert('Hello!');
        });
        $$('.demo-confirm').on('click', function () {
            myApp.confirm('Are you feel good today?', function () {
                myApp.alert('Great!');
            });
        });
        $$('.demo-prompt').on('click', function () {
            myApp.prompt('What is your name?', function (data) {
                // @data contains input value
                myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                    myApp.alert('Ok, your name is ' + data + ' ;)');
                });
            });
        });
    }



    //Preloader page events
    if (page.name === 'preloader') {
        $$('.demo-indicator').on('click', function () {
            myApp.showIndicator();
            setTimeout(function () {
                myApp.hideIndicator();
            }, 2000);
        });
        $$('.demo-preloader').on('click', function () {
            myApp.showPreloader();
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
        $$('.demo-preloader-custom').on('click', function () {
            myApp.showPreloader('My text...');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
    }
    //Swipe to delete events callback demo
    if (page.name === 'swipe-delete') {
        $$('.demo-remove-callback').on('deleted', function () {
            myApp.alert('Thanks, item removed!');
        });
    }
    // Action sheet, we use it on two pages
    if (page.name === 'swipe-delete' || page.name === 'modals' || page.name === 'media-lists') {
        $$('.demo-actions').on('click', function () {
            myApp.actions([
                // First buttons group
                [
                    // Group Label
                    {
                        text: 'Here comes some optional description or warning for actions below',
                        label: true
                    },
                    // First button
                    {
                        text: 'Alert',
                        onClick: function () {
                            myApp.alert('He Hoou!');
                        }
                    },
                    // Another red button
                    {
                        text: 'Nice Red Button ',
                        red: true,
                        onClick: function () {
                            myApp.alert('You have clicked red button!');
                        }
                    },
                ],
                // Second group
                [
                    {
                        text: 'Cancel',
                        bold: true
                    }
                ]
            ]);
        });
    }
    //Messages page
    if (page.name === 'messages') {
        var conversationStarted = false;
        var answers = [
            'Yes!',
            'No',
            'Hm...',
            'I am not sure',
            'And what about you?',
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'
        ];
        var answerTimeout;
        $$('.ks-messages-form').on('submit', function (e) {
            e.preventDefault();
            var input = $$(this).find('.ks-messages-input');
            var messageText = input.val();
            if (messageText.length === 0) return;
            // Empty input
            input.val('');
            // Add Message
            myApp.addMessage({
                text: messageText,
                type: 'sent',
                day: !conversationStarted ? 'Today' : false,
                time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            });
            conversationStarted = true;
            // Add answer after timeout
            if (answerTimeout) clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                myApp.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received'
                });
            }, 2000);
        });
        $$('.ks-send-message').on('click', function () {
            $$('.ks-messages-form').trigger('submit');
        });
    }
    // Pull To Refresh Demo
    if (page.name === 'pull-to-refresh') {
        // Dummy Content
        var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
        var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
        // Pull to refresh content
        var ptrContent = $$(page.container).find('.pull-to-refresh-content');
        // Add 'refresh' listener on it
        ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
                var song = songs[Math.floor(Math.random() * songs.length)];
                var author = authors[Math.floor(Math.random() * authors.length)];
                var linkHTML = '<li class="item-content">' +
                                    '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title-row">' +
                                            '<div class="item-title">' + song + '</div>' +
                                        '</div>' +
                                        '<div class="item-subtitle">' + author + '</div>' +
                                    '</div>' +
                                '</li>';
                ptrContent.find('ul').prepend(linkHTML);
                // When loading done, we need to "close" it
                myApp.pullToRefreshDone();
            }, 2000);
        });
    }
    // Sortable toggler
    if (page.name === 'sortable-list') {
        $$('.list-block.sortable').on('open', function () {
            $$('.sortable-toggle').text('Done');
        });
        $$('.list-block.sortable').on('close', function () {
            $$('.sortable-toggle').text('Edit');
        });
    }


    // Photo Browser Examples
    if (page.name === 'photo-browser') {
        $$('.ks-pb-standalone').on('click', function () {
            photoBrowserStandalone.open();
        });
        $$('.ks-pb-popup').on('click', function () {
            photoBrowserPopup.open();
        });
        $$('.ks-pb-page').on('click', function () {
            photoBrowserPage.open();
        });
        $$('.ks-pb-popup-dark').on('click', function () {
            photoBrowserPopupDark.open();
        });
        $$('.ks-pb-standalone-dark').on('click', function () {
            photoBrowserDark.open();
        });
    }


    var facebook = false;
    var twitter = false;
    var gplus = false;
    var share = false;


    $('.prayer-share').on( "click" , function() {
            var shares = $(this).parent().find('.active');
            var string = "This prayer point will be shared with ";
            $.each(shares, function(key,value){
                string += $(value).data('media');
                string += ",";
                $(value).removeClass('active');
            });

            alert(string);
    });

    $('.swipeout i').on( "click" , function() {
        $(this).toggleClass('active');
    });

    var global_activity_map = '';

    var mapOptions = {
        zoom: 8,
        zoomControl: false, 
        mapTypeControl: false , 
        panControl : false, 
        streetViewControl : false,
        center: new google.maps.LatLng(-34.397, 150.644)
    };

    if(front_map == '')
        front_map = new google.maps.Map(document.getElementById('signup-page-map-canvas'),mapOptions);

    /**handling the signup page's events */
        //clicking on login will open the login page.
        $('#login-button').on("click", function(){
            mainView.loadPage('login.html');
        });
    /**handling the signup page's events */


    
    /**login page handler**/
        $('#login-submit').on('click', function(){
            var email = $('#login-email').val();
            var pass = $('#login-pass').val();
            var remember = $('#remember-me').prop('checked');
            var json = JSON.stringify({'email' : email, 'pass' : pass, 'remember' : remember });

            alert("submit to server : "+ json);

            // var logindata = {
            //     email : $('#login-email').val();
            //     pass  : $('#login-pass').val();
            // };

            // var login_data_json = JSON.stringify(logindata);

            // alert("this json data = "+login_data_json+ " will be submitted to server and if server's response is positive user will be logged in the server and in the frontend user's testimonial page will be opened.");
        });
    /**login page handler**/   
    /** the handler of encouraging page's events */

    /** the handler of encouraging page's events */


});

var sendShares = function(shareButton, share_type) {

    var shares = $(shareButton).parent().find('.active');
    var medias = [];

    $.each(shares, function(key,value){
        medias.push($(value).data('media'));
        $(value).removeClass('active');
    });

    var id =  $(shareButton).attr('data-entity');
    var jsObject = {
        'share-type' : share_type,
        'entity-id' : id,
        'medias' : medias
    };

    var jsonString = JSON.stringify(jsObject);
    
    alert(jsonString);

};

// Required for demo popover
$$('.popover a').on('click', function () {
    myApp.closeModal('.popover');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

// Generate Content Dynamically
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link">Back</a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}
$$(document).on('click', '.ks-generate-page', createContentPage);