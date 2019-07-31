$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
  });
});
