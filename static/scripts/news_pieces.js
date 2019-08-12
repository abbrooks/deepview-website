
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
      //display res.data

      // what follows is a parser to take text and make it html

      //body
      var pieces = res.data.body.split('\n');
      console.log('pieces')
      console.log('pieces: ' + JSON.stringify(pieces));
      var bodyText = ''
      for (p in pieces){
        var piece = pieces[p];
        if (piece==' ' || piece=='' || piece==null){
          continue
        }
        if (piece.includes('http') || piece.includes('https') || piece.includes('.com')){
          piece = '<a src='+piece+'>'+piece+'</a>'
        }
        else{
          piece = '<p>'+piece+'</p>';
        }

        bodyText+=piece;
      }
      console.log('text: ' + bodyText)

      //comments
      var allComments = []
      for (var c in res.data.comments){
        var comment = res.data.comments[c]
        console.log('Comment is: ' + comment)
        allComments.push('<li>'+comment+'</li>')
      }
      console.log('All comments: ' + JSON.stringify(allComments));
      //ab make this accept an array of html comments as well (allComments)
      buildPage(res.data, bodyText);
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

function buildPage(article, bodyText){
  var header = document.getElementById('header-h1');
  header.innerHTML = article.title;
  header.classList.toggle('header-enabled');
  header.classList.toggle('header-disabled');
  var body = document.getElementById('body-container');
  // BOTHE see below.
  body.innerHTML = bodyText;
  body.classList.toggle('body-enabled');
  body.classList.toggle('body-disabled');
  var grid = document.getElementById('header-grid');
  var authorImage = document.getElementById('header-author-image');
  // BOTHE see below
  // authorImage.src = article.authorPic;
  var author = document.getElementById('header-author');
  author.innerHTML = article.creator;
  var comment = document.getElementById('header-comment');
  var botComment = document.getElementById('article-comments-count');
  if (article.hasOwnProperty('comments')){
    if(article.comments.length == 1){
      comment.innerHTML = '1 Comment';
      botComment.innerHTML = '1 Comment';
    }else{
      comment.innerHTML = article.comments.length + ' Comments' ;
      botComment.innerHTML = article.comments.length + ' Comments' ;
    }
    var comDiv = document.getElementById('article-comments');
    for(var x in article.comments){
      var newP = document.createElement('p');
      newP.innerHTML = article.comments[x];
      comDiv.append(newP);
    }
  }
  else{
    comment.innerHTML = '0 Comments';
    botComment.innerHTML = '0 Comments';
  }
  grid.classList.toggle('header-enabled');
  grid.classList.toggle('header-disabled');

}
