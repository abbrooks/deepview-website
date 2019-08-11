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
