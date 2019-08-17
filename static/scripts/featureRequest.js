class FeatureComment{
  constructor(feature){
    this.grid = document.createElement('div');
    this.grid.className = 'feature-content-grid';
    this.colDiv = document.createElement('div');
    this.newUp = document.createElement('i');
    this.newUp.className = 'fas fa-arrow-up';
    this.upCount = document.createElement('p');
    this.upCount.innerHTML = '0';
    this.newP = document.createElement('p');
    this.newP.className = 'feature-content-p';
    this.newP.innerHTML = feature.feature;
    this.colDiv.append(this.newUp);
    this.colDiv.append(this.upCount);
    this.grid.append(this.colDiv);
    this.grid.append(this.newP);
  }
}

function clearFeatureForm(){
  var purpose = document.getElementById('feature-purpose');
  var email = document.getElementById('feature-email');
  var phone = document.getElementById('feature-phone');
  var budget = document.getElementById('feature-budget');
  var desc = document.getElementById('feature-textarea');
  var public = document.getElementById('feature-public');

  purpose.value = "select a product...";
  email.value = "";
  phone.value = "";
  budget.value = "";
  desc.value = "";
  public.checked = false;

  document.getElementById('modal-wrapper-feature').style.display = 'none';
}

function viewFeatureRequests(product){
  $.get('/suggestions', {'product':product}, res=>{
    console.log(res)
    if (res){
      if (res.success){
        console.log('Display suggestions: ' + JSON.stringify(res.data));
        var featureDiv = document.getElementById('feature-req-content');
        for(var x in res.data){
          var newGrid = new FeatureComment(res.data[x]).grid;
          featureDiv.append(newGrid);
        }
        var viewBtn = document.getElementById('feature-viewBtn');
        viewBtn.style.filter = 'grayscale(100%)';

        viewBtn.disabled = 'true';

      }
      else{
        console.log('No suggestions')
      }
    }
    else{
      console.log('Something went wrong')
    }
  });
}

function submitFeatureForm(){
  var purpose = document.getElementById('feature-purpose').value;
  var email = document.getElementById('feature-email').value;
  var phone = document.getElementById('feature-phone').value;
  var budget = document.getElementById('feature-budget').value;
  var desc = document.getElementById('feature-textarea').value;
  var pub = document.getElementById('feature-public').checked;

  switch(purpose){
    case 'ImageGuard':
      purpose = 'imageGuard';
      break;
    case 'CorpGuard':
      purpose = 'corpGuard';
      break;
    case 'eLearning':
      purpose = 'eLearning';
      break;
    case 'ChatGuard':
      purpose = 'chatGuard';
      break;
    default:
      purpose = '';
      break;
  }

  if (purpose=='' || purpose == ' ' || purpose==null){
    alert('Sorry, you must provide a product.')
    return
  }
  if (budget=='' || budget == ' ' || budget==null){
    alert('Sorry, you must provide your budget.')
    return
  }
  if (desc=='' || desc == ' ' || desc==null){
    alert('Sorry, you must provide a feature description.')
    return
  }

  console.log(purpose +" "+phone +" "+budget +" "+desc +" "+pub);

  $.post('/suggestion', {'product':purpose, 'feature':desc, 'budget':budget, 'isPub':pub, 'phone':phone, 'email':email}, res=>{
    if (res){
      alert(res);
      document.getElementById('modal-wrapper-feature').style.display = 'none';
    }
    else{
      alert('Hmmm...it seems something went wrong on this end.')
    }
  });
}
