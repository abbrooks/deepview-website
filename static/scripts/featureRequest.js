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
    if (res){
      if (res.success){
        console.log('Display suggestions: ' + JSON.stringify(res.data));
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

  $.post('/suggestions', {'product':purpose, 'feature':desc, 'budget':budget, 'isPub':pub, 'phone':phone, 'email':email}, res=>{
    if (res){
      alert(res)
    }
    else{
      alert('Hmmm...it seems something went wrong on this end.')
    }
  });
}
