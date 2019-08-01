$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    var $navDrop = $("#navbar-dropdown");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
    $navDrop.toggleClass('scrolled-navbar-dropdown', $(this).scrollTop() > 1);
  });
});

var mobileNavOpen = false;

function toggleNavDropdown(){
  var drop = document.getElementById('navbar-dropdown');
  var nav = document.getElementById('navbar-container');

  if(mobileNavOpen){
    drop.style.display = "none";
    mobileNavOpen = false;
  }else{
    if(!(drop.classList.contains('scrolled-navbar-dropdown'))){
      drop.classList.toggle('scrolled-navbar-dropdown');
    }
    if(!(nav.classList.contains('scrolled-navbar'))){
      nav.classList.toggle('scrolled-navbar');
    }
    drop.style.display = "block";
    mobileNavOpen = true;
  }
}
