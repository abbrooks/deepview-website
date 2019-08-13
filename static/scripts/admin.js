class CategoryCell{
  constructor(cat){
    this.container = document.createElement('div');
    this.catP = document.createElement('p');
    this.catP.innerHTML = cat;
    this.catX = document.createElement('i');
    this.catX.className = "far fa-times-circle";
    this.catX.cat = cat;
    this.catX.container = this.container;
    this.container.append(this.catP);
    this.container.append(this.catX);
    this.AddEventListeners(this.catX);
  }
  AddEventListeners(obj){
    obj.addEventListener('click',function(){
      var grid = document.getElementById('category-grid');
      var valueToRemove = obj.cat;
      var filteredItems = cats.filter(function(item) {
        return item !== valueToRemove
      });
      cats = filteredItems;
      grid.removeChild(obj.container);
      console.log('cats: '+cats);
    });
  }
}

console.log('Loaded admin script');
cats=[]
function addCat(){
  console.log('in add cat')
  cat = document.getElementById('category').value;
  if (cat==null || cat=='' || cat==' '){
    alert('Sorry, you must put a no empty value in to add a category.')
    return
  }
  cats.push(cat);
  var catGrid = document.getElementById('category-grid');
  var newCat = new CategoryCell(cat);
  catGrid.append(newCat.container);
  document.getElementById('category').value=null;
  document.getElementById('category').innerHTML='';
  return
}


function postArticle(){
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;
  var creator = document.getElementById('creator').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (title=='' || title==' ' || title==null){
    alert('Sorry, you must give your article a title.');
    return
  }
  if (body=='' || body==' ' || body==null){
    alert('Sorry, you must give your article a body.');
    return
  }
  if (creator=='' || creator==' ' || creator==null){
    alert('Sorry, you must give your article a creator.');
    return
  }
  if (cats.length<=0){
    alert('Sorry, you must give your article at least one category.');
    return
  }
  if (username=='' || username==' ' || username==null){
    alert('Sorry, to post an article you must proivde a valid admin username.');
    return
  }
  if (password=='' || password==' ' || password==null){
    alert('Sorry, to post an article you must proivde a valid admin password.');
    return
  }

  $.post('/newsPiece', {'title':title, 'password':password, 'username':username, 'creator':creator, 'body':body, 'categories':cats}, res=>{
    if (res){
      alert(res)
    }
    else{
      alert('Hmmm...something went wrong please refresh and try again.')
    }
  });
}

function openArticle(){
  window.location.href="#create_article_section";
}
