module.exports = router=>{
  router.get('/contact', (req,res)=>{
    res.render('contact.html');
  });
  router.get('/home', (req,res)=>{
    res.redirect('/');
  });
  router.get('/corporate', (req,res)=>{
    res.render('corporate.html');
  });
  router.get('/news', (req,res)=>{
    res.render('news.html');
  });
  router.get('/products', (req,res)=>{
    res.render('products.html');
  });
  router.get('/news_pieces', (req,res)=>{
    res.render('news_pieces.html');
  });
}
