function clearFeatureForm(){
  var purpose = document.getElementById('feature-purpose');
  var po = document.getElementById('feature-po');
  var budget = document.getElementById('feature-budget');
  var desc = document.getElementById('feature-textarea');
  var public = document.getElementById('feature-public');


  purpose.value = "select a product...";
  po.value = "";
  budget.value = "";
  desc.value = "";
  public.checked = false;

  document.getElementById('modal-wrapper-feature').style.display = 'none';
}

function submitFeatureForm(){
  var purpose = document.getElementById('feature-purpose').value;
  var po = document.getElementById('feature-po').value;
  var budget = document.getElementById('feature-budget').value;
  var desc = document.getElementById('feature-textarea').value;
  var public = document.getElementById('feature-public').checked;

  if (purpose=='' || purpose == ' ' || purpose==null){
    alert('Sorry, you must provide a product.')
    return
  }
  if (po=='' || po == ' ' || po==null){
    alert('Sorry, you must proivde your purchase order number.')
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
  console.log(purpose +" "+po +" "+budget +" "+desc +" "+public);

  //body, firstName, lastName, purpose, email, phone
  // $.post('/contactUs', {"body":message, 'purpose':purpose, 'phone':phone,'email':email, 'name':name}, res=>{
  //   alert(res)
  // })
}
