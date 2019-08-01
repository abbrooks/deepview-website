console.log('News script loaded')
articles = []
$.get('/newsArticles', {}, res=>{
  if (res){
    if (res.success){
      articles = res.data;
      displayArticles();
    }
    else{
      alert('Hmmm...something went wrong getting our news articles. Please refresh and try again.')
    }
  }
  else{
    alert('Hmmm...something went wrong getting our news articles. Please refresh and try again.')
  }
});

function displayArticles(){
  console.log('We must display articles: ' + JSON.stringify(articles));
}

//this is the skeleton for switching to an article view
function clickedArticle(art){
  window.location='/news_pieces?id='+articles[0]._id;
}
