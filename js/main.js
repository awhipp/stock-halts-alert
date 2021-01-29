(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }


  let lastHalted = ""
  let update = false;
  const feedURL = "http://www.nasdaqtrader.com/rss.aspx?feed=tradehalts";

  const checkHalts = () => {
    $.ajax({
      type: 'GET',
      url: "https://api.rss2json.com/v1/api.json?rss_url=" + feedURL,
      dataType: 'jsonp',
      success: function(result) {
        for(var i = 0; i < result.items.length; i++) {
          let haltedTitle = result.items[i].title + " Halted"
  
          if (lastHalted == "") {
            lastHalted = result.items[i].title + " Halted";
          } 
  
          if(i == 0 && haltedTitle != lastHalted) {
            window.alert(haltedTitle);
            lastHalted = result.items[i].title + " Halted";
          }

          $("#halt-" + i + " .post-title").text(haltedTitle);
          $("#halt-" + i + " .post-meta").html(result.items[i].content);

        }

        $("th:nth-child(1)").text("Date");
        $("th:nth-child(2)").text("Time");
        $("th:nth-child(4)").text("Company");
      }
    });
  }

  checkHalts();

  window.setInterval(checkHalts, 30000);

})(jQuery); // End of use strict
