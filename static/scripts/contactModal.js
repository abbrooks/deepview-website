function clearContactForm(){
  var name = document.getElementById('contact-name');
  var email = document.getElementById('contact-email');
  var phone = document.getElementById('contact-phone');
  var purpose = document.getElementById('contact-purpose');
  var message = document.getElementById('contact-textarea');

  name.value = "";
  email.value = "";
  phone.value = "";
  purpose.value = "select a purpose...";
  message.value = "";

  document.getElementById('modal-wrapper-contact').style.display = 'none';
}

function prepareContactModal(){
  document.getElementById('modal-wrapper-contact').style.display = 'block';
}

function submitContactForm(){
  var name = document.getElementById('contact-name').value;
  var email = document.getElementById('contact-email').value;
  var phone = document.getElementById('contact-phone').value;
  var purpose = document.getElementById('contact-purpose').value;
  var message = document.getElementById('contact-textarea').value;

  if (name=='' || name == ' ' || name==null){
    alert('Sorry, you must provide your name.')
    return
  }
  if (email=='' || email == ' ' || email==null){
    alert('Sorry, you must proivde your email.')
    return
  }
  if (phone=='' || phone == ' ' || phone==null){
    alert('Sorry, you must provide your phone.')
    return
  }
  if (purpose=='' || purpose == ' ' || purpose==null){
    alert('Sorry, you must provide your purpose.')
    return
  }
  if (message=='' || message == ' ' || message==null){
    alert('Sorry, you must enter your message.')
    return
  }
  //body, firstName, lastName, purpose, email, phone
  $.post('/contactUs', {"body":message, 'purpose':purpose, 'phone':phone,'email':email, 'name':name}, res=>{
    alert(res)
  })
}
