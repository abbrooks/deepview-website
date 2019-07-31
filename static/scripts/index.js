$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    var $navDrop = $("#navbar-dropdown");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
    $navDrop.toggleClass('scrolled-navbar-dropdown', $(this).scrollTop() > 1);

  });
});

function contactUs(){
  window.location='/contact';
}

var mobileNavOpen = false;

function toggleNavDropdown(){
  var drop = document.getElementById('navbar-dropdown');
  if(mobileNavOpen){
    drop.style.display = "none";
    mobileNavOpen = false;
  }else{
    drop.style.display = "block";
    mobileNavOpen = true;
  }
}
