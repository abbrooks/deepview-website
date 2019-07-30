module.exports = router=>{

  // for naving to contact page
  router.get('/contact', (req,res)=>{
    res.render('contact.html');
  });

  // for naving to home page
  router.get('/home', (req,res)=>{
    res.redirect('/');
  });

  // for naving to corporate page
  router.get('/corporate', (req,res)=>{
    res.render('corporate.html');
  });

  // for naving to news page
  router.get('/news', (req,res)=>{
    res.render('news.html');
  });

  // for naving to products page
  router.get('/products', (req,res)=>{
    res.render('products.html');
  });

  // for naving to news_pieces page
  router.get('/news_pieces', (req,res)=>{
    res.render('news_pieces.html');
  });

  // for naving to news_pieces page
  router.get('/imageGuard', (req,res)=>{
    res.render('image_guard.html');
  });
  // for naving to coproate retention page
  router.get('/retention', (req,res)=>{
    res.render('corporate_retention.html');
  });
  // for naving to chat guard page
  router.get('/chat_guard', (req,res)=>{
    res.render('chat_guard.html');
  });
  // for naving to eLearning page
  router.get('/eLearning', (req,res)=>{
    res.render('eLearning.html');
  });
} // end of module exports
