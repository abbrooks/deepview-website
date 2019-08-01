module.exports = router=>{
const OUR_ADDRESS = 'banda.confirmation@gmail.com'
const DEEP_VIEW_ADDRESS = 'alexanderrossbothe@gmail.com';
  router.post('/requestADemo', (req,res)=>{

  })

  router.post('/contactUs', (req,res)=>{
    if (!req.body){
      console.log('No body sent in contact us.')
      res.status(200).send('Sorry, it seems somethign went wrong on our end.').end();
    }
    else{
      var {body, firstName, lastName, purpose, email, phone} = req.body;
      if (!body || !firstName || !lastName || !purpose){
        console.log('Missing fields in contact us');
        res.status(200).send('Hmmm...it seems you did not fill out all of the fiels. Please try again. Thank you.').end();
      }
      else{
        var message = firstName +' '+ lastName + ' has contacted us from the DeepView website.\n His/her purpose is: ' + purpose + '.\nHere is what he/she said:\n\n'+body+'\n\nContact Info:\nPhone: ' + phone + '\nEmail: ' + email;
        var subj = 'From DeepView.com: ' + firstName+' '+lastName+' wants to ' + purpose
        sendEmail(message, subj, cb=>{
          if (cb){
            console.log('There was an error sending mail: ' + cb);
            res.status(200).send('Hmmm...somethign went wrong on our end. Please refresh this page and try again.')
          }
          else{
            res.status(200).send('We have sent your mail to our customer support team! Thank you.');
          }
        })
      }
    }
  })

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
} // end of exports
