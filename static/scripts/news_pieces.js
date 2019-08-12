
function parseURL(url){
  var parser = document.createElement('a'),
       searchObject = {},
       queries, split, i;
   // Let the browser do the work
   parser.href = url;
   // Convert query string to object
   queries = parser.search.replace(/^\?/, '').split('&');
   // Collect search entry and add to search input
   // textForSearchInput = textForSearchInput.substring(1,textForSearchInput.length);
   for( i = 0; i < queries.length; i++ ) {
       split = queries[i].split('=');
       searchObject[split[0]] = split[1];
   }
   return {
       protocol: parser.protocol,
       host: parser.host,
       hostname: parser.hostname,
       port: parser.port,
       pathname: parser.pathname,
       search: parser.search,
       searchObject: searchObject,
       hash: parser.hash
   };

}

var searchObject = parseURL(window.location).searchObject;
console.log('SO: ' + JSON.stringify(searchObject));

var articleID = searchObject.id

$.get('/anArticle', {'id':articleID}, res=>{
  if (res){
    if (res.success){
      console.log('We must dipslay this article: ' + JSON.stringify(res.data));
      buildPage(res.data);
      //display res.data
    }
    else{
      alert('Hmmm...somethign went wrong getting this article. Please refresh this page.')
    }
  }
  else{
    alert('Hmmm...somethign went wrong getting this article. Please refresh this page.')
  }
})

function addComment(){
  var comment = document.getElementById('comment_input').value
  if (comment=='' || comment == " " || comment == null){
    return
  }
  else{
    $.post('/comment', {'id':searchObject.id, 'comment':comment}, res=>{
      if (res){
        if (res=='' || res==' ' || res==null){
          alert('Hmmmm....something went wrong on our end. Please refresh and try again.')
        }
        else{
          alert(res);
        }
      }
      else{
        alert('Hmmmm....something went wrong on our end. Please refresh and try again.')
      }

    })
  }
}

function buildPage(article){
  var header = document.getElementById('header-h1');
  // header.innerHTML = article.title;
  header.classList.toggle('header-enabled');
  header.classList.toggle('header-disabled');
  var body = document.getElementById('body-container');
  // BOTHE see below.
  // body.innerHTML = article.body;
  body.classList.toggle('body-enabled');
  body.classList.toggle('body-disabled');
  var grid = document.getElementById('header-grid');
  var authorImage = document.getElementById('header-author-image');
  // BOTHE see below
  // authorImage.src = article.authorPic;
  var author = document.getElementById('header-author');
  author.innerHTMl = article.creator;
  var comment = document.getElementById('header-comment');
  if (article.hasOwnProperty('comments')){
    comment.innerHTML = article.comments.length + ' Comments' ;
  }
  else{
    comment.innerHTML = '0 Comments';
  }
  grid.classList.toggle('header-enabled');
  grid.classList.toggle('header-disabled');

}
