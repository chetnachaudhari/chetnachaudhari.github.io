---
  layout: null
---
$(document).ready(function() {
  backToTop();
});

function backToTop() {
  $("[data-toggle='tooltip']").tooltip();
  var st = $(".page-scrollTop");
  var $window = $(window);
  var topOffset;
  $window.scroll(function() {
    var currnetTopOffset = $window.scrollTop();
    if (currnetTopOffset > 0 && topOffset > currnetTopOffset) {
      st.fadeIn(500);
    } else {
      st.fadeOut(500);
    }
    topOffset = currnetTopOffset;
  });

  st.click(function() {
    $("body").animate({
      scrollTop: "0"
    }, 500);
  });
}
