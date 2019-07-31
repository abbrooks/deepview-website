$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
  });
});

function contactUs(){
  window.location='/contact';
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
