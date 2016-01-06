
$(window).load(function(){
  $(window).bind( 'hashchange', bitmystic.onHashchange ).trigger('hashchange');
});

var bitmystic = (function(){
  var configMap = {
    page_headings : { home: 'Into the rabbit hole!', 
                      projects: 'Presto Manifesto!',
                      about: 'Who is the BitMystic?',
                      contact: 'How may I be of assistance?'
                    }
  };
  var onHashchange = function(event){
      var anchorMap = $.uriAnchor.makeAnchorMap();
      if( $.isEmptyObject(anchorMap) ){
        loadHTML('home', configMap.page_headings['home']);
      }
      else{
        loadHTML(anchorMap['page'], configMap.page_headings[anchorMap['page']]);
      }
  };

  var loadHTML = function(page, heading){
    $.get( page + ".html", function(data) {
      $('.page-wrapper').html(data);
    })
    .done(function() {
      $(".page-heading").typed({
        strings: [heading],
        typeSpeed: 2,
        showCursor: false,
        onStringTyped: function() {
          $('.page-description').fadeIn(1000, function(){
            $('.page-media').slideDown('slow');
          });
        }
      });
    })
    .fail(function() {
      //error
    })
    .always(function() {
      // alert( "finished" );
    });
  };
  return {onHashchange : onHashchange};
}());
