console.log('Script loaded')

function reqDemo(){
  var fName = document.getElementById('demo_name_f').value
  var lName = document.getElementById('demo_name_l').value
  var email = document.getElementById('demo_email').value
  var phone = document.getElementById('demo_phone_number').value
  var purp = document.getElementById('demo_purpose').value
  var which = document.getElementById('demo_interested_in').value
  var howMany = document.getElementById('demo_how_many').value
  var lName = document.getElementById('demo_name_l').value

  if(!fName || fName==' ' || fName==''){
    alert('Sorry, you must provide your first name.')
    return
  }
  if(!howMany || howMany==' ' || howMany==''){
    alert('Sorry, you must tell us how many people you are looking to onboard.')
    return
  }
  if(!lName || lName==' ' || lName==''){
    alert('Sorry, you must provide your last name.')
    return
  }
  if(!purp || purp==' ' || purp==''){
    alert('Sorry, you must tell us your purpose for requesting this demo.')
    return
  }
  if(!which || which==' ' || which==''){
    alert('Sorry, you must tell us which product you are intereted in.')
    return
  }
  if((!phone || phone==' ' || phone=='') && (!email || email==' ' || email=='')){
    alert('Sorry, you must provide either an email or a phone number so we can respond.')
    return
  }
  //product, email, phone, lastName, firstName, body, purpose, media
  $.post('/requestADemo', {'email':email, 'phone':phone, 'product':which, 'purpose':purp, 'lastName':lName, 'firstName':fName, 'num':howMany}, res=>{
    alert(res)
  });
}
