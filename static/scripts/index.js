$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar-container");
    var $navDrop = $("#navbar-dropdown");
    $nav.toggleClass('scrolled-navbar', $(this).scrollTop() > 1);
    $navDrop.toggleClass('scrolled-navbar-dropdown', $(this).scrollTop() > 1);

  });
});
/*  router.get('/imageGuard', (req,res)=>{
    res.render('image_guard.html');
  });
  // for naving to coproate retention page
  router.get('/retention', (req,res)=>{
    res.render('corporate_retention.html');
  });
  // for naving to chat guard page
  router.get('/chat_guard', (req,res)=>{
    res.render('chat_guard.html');
  });
  // for naving to eLearning page
  router.get('/eLearning', (req,res)=>{
    res.render('eLearning.html');
  });
} // end of m*/
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

function goImageGuard(){
  window.location = '/imageGuard';
}

function goChatGuard(){
  window.location = '/chat_guard';
}

function goCorpGuard(){
  window.location = '/retention';
}
