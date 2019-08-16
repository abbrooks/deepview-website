console.log('Script loaded')

$.get('/suggestions', {'product':'eLearning'}, res=>{
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
})
