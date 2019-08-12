class Article{
  constructor(obj){
    this.container = document.createElement('div');
    this.container.className = 'article-container';
    this.bg = document.createElement('img');
    this.bg.src = '/assets/news/article-bg.svg';
    this.bg.className = 'article-bg';
    this.bg.alt = 'wave-bg';
    this.categories = document.createElement('ul');
    this.categories.className = 'article-categories';
    for(var x in obj.categories){
      var newLi = document.createElement('li');
      newLi.innerHTML = obj.categories[x];
      this.categories.append(newLi);
    }
    this.date = document.createElement('h2');
    var dateStr = obj.date;
    var pieces = dateStr.split(' ');
    var day = pieces[0];
    var month = pieces[1];
    var date = pieces[2];
    var year = pieces[3];
    this.date.innerHTML = date+'/'+month+'/'+year;
    this.date.className = 'article-date';
    this.title = document.createElement('h2');
    this.title.innerHTML = obj.title;
    this.title.className = 'article-title';
    this.grid = document.createElement('div');
    this.grid.className = 'article-author-grid';
    this.authorImg = document.createElement('img');
    this.authorImg.src = '/assets/logos/DeepView_logo_diver_black.png';
    this.authorImg.alt = 'author';
    this.authorImg.className = 'article-author-image';
    this.authorName = document.createElement('p');
    this.authorName.innerHTML = obj.creator;
    this.authorName.className = 'article-author-name';
    this.commentCount = document.createElement('p');
    if (obj.hasOwnProperty('comments')){
      this.commentCount.innerHTML = obj.comments.length + ' Comments' ;
    }
    else{
      this.commentCount.innerHTML = '0 Comments';
    }

    this.commentCount.className = 'article-comment-count';
    this.grid.append(this.authorImg);
    this.grid.append(this.authorName);
    this.grid.append(this.commentCount);
    this.preview = document.createElement('p');
    if(obj.body.length > 213){
      var split = obj.body.substr(0,213) + "...";
      this.preview.innerHTML = split;
    }else{
      this.preview.innerHTML = obj.body;
    }
    this.preview.className = 'article-preview';
    this.readBtn = document.createElement('button');
    this.readBtn.className = 'article-read-btn';
    this.readBtn.innerHTML = 'READ MORE';
    this.readBtn.addEventListener('click', function(){
      console.log('THIS: ' + this)
      window.location='/news_pieces?id='+obj._id;
    })

    this.container.append(this.bg);
    this.container.append(this.categories);
    this.container.append(this.date);
    this.container.append(this.title);
    this.container.append(this.grid);
    this.container.append(this.preview);
    this.container.append(this.readBtn);
  }
}

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
  var newsCon = document.getElementById('news-container');
  for(x in articles){
    var newItem = new Article(articles[x]);
    newsCon.append(newItem.container);
  }
}

//this is the skeleton for switching to an article view
function clickedArticle(art){
  window.location='/news_pieces?id='+articles[0]._id;
}
