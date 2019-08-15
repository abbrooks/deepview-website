module.exports = router=>{
  const database = require('../database.js');
  const OUR_ADDRESS = 'banda.confirmation@gmail.com';
  const DEEP_VIEW_ADDRESS = 'alexanderrossbothe@gmail.com';

  //for adding a suggestion to the db
  router.post('/suggestion', (req,res)=>{
    if (!req.body){
      console.log('There was no body sent in post to suggestions')
      res.status(401).end();
    }
    else{
      var {product, feature, poNumber, budget, isPub} = req.body;
      if (!product || !feature || !poNumber || !budget || !isPub){
        console.log('Missing fields')
        res.status(401).end();
      }
      else{
        sugg = {"product":product, "feature":feature, "phone":phone, 'email':email, "budget":budget, "isPub":isPub}
        database.connect(db=>{
          db.db('suggestions').collection('suggestions').insertOne(sugg, (err, res1)=>{
            if (err){
              console.log('There was an error inseerting suggestion.' + err)
              res.status(500).end();
              db.close();
            }
            else{
              var subject = 'New suggestion for: ' + product
              var body = 'Hello, we got a suggestion from the deepview site.\n\nFor Product: '+product+'.\n They want to add the following feature: '+feature+'\n. This person has a budget of: '+budget+'.\n\n Contact info:\nemail:'+email+'\nPhone: '+phone+'. '
              sendEmail(subject, body, cb=>{
                if (cb){
                  console.log('There was an error sendign email. For this suggestion')
                }
                else{
                  console.log('Deepview was sent an email for this suggestion.')
                }
                res.status(200).send('We have added your suggestion and will review it soon! Thank you so much for your feedback.')
                db.close();
              });
            }
          })
        }, dbErr=>{
          console.log('There was an error connecting to mongo: ' + dbErr);
          res.status(500).end();
        })
      }
    }
  });

  router.get('/suggestions', (req, res)=>{
    if (!req.query){
      console.log('No query sent in get suggestions')
      res.status(401).end();
    }
    else{
      var {product} = req.query;
      if (!product){
        console.log('No product sent.')
        res.status(401).end();
      }
      database.connect(db=>{
        db.db('suggestions').collection('suggestions').find({'product':product}, (err, suggs)=>{
          if (err){
            console.log('There was an error finding suggs for product: ' + product+ ' Error: ' + err);
            res.status(500).end();
            db.close();
          }
          else{
            if (suggs){
              if (suggs.length>0){
                var suggestions = []
                for (s in suggs){
                  var sug = suggs[s];
                  if (sug.isPub==true || sug.isPub=="true"){
                    suggestions.push(sug)
                  }
                }
                res.status(200).json({'success':true, 'data':suggestions}).end();
                db.close();
              }
              else{
                console.log('There are no suggestions for product: ' + product)
                res.status(200).json({'success':false, 'data':[]}).end();
                db.close();
              }
            }
            else{
              console.log('There are no suggestions for product: ' + product)
              res.status(200).json({'success':false, 'data':[]}).end();
              db.close();
            }
          }
        })
      }, dbErr=>{
        console.log('There was an error connecting to mongo: ' + dbErr);
        res.status(500).end();
      })
    }
  })
  // standard nodeMailer stuff
  function sendEmail(body, subject1, cb){
    let transporter = nodeMailer.createTransport({
         host: 'smtp.gmail.com', // go daddy email host port
         port: 465, // could be 993
         secure: true,
         auth: {
             user: OUR_ADDRESS,
             pass: 'N5gdakxq9!'
         }
     });
   mailOptions = {
          from: OUR_ADDRESS, // our address
          to: DEEP_VIEW_ADDRESS, // who we sending to
          subject: subject1, // Subject line
          text: body,
          html: '' // html body
      };
  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.log('There was an error sending the email: ' + error);
           cb(error);
        }
        console.log('Message sent: ' + info);
           cb();
      });
  }

} // end of module exports
