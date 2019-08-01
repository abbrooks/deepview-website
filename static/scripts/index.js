$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    var $navDrop = $("#navbar-dropdown");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
    $navDrop.toggleClass('scrolled-navbar-dropdown', $(this).scrollTop() > 1);
  });
  $(document).scroll(function () {
    if($(this).scrollTop() == 0 && mobileNavOpen){
      // var $nav = $("#navbar-container");
      // var $navDrop = $("#navbar-dropdown");
      // $nav.toggleClass('scrolled-navbar');
      // $navDrop.toggleClass('scrolled-navbar-dropdown');
    }else{

    }
  });
});

function contactUs(){
  window.location='/contact';
}

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

function goImageGuard(){
  window.location = '/imageGuard';
}

function goChatGuard(){
  window.location = '/chat_guard';
}

function goCorpGuard(){
  window.location = '/retention';
}
