module.exports = router=>{

  router.post('/requestADemo', (req,res)=>{

  })

  router.post('/contactUs', (req,res)=>{

  })

  function sendEmail(body, subject, to, cb){
    let transporter = nodeMailer.createTransport({
         host: 'smtp.gmail.com', // go daddy email host port
         port: 465, // could be 993
         secure: true,
         auth: {
             user: 'banda.confirmation@gmail.com',
             pass: 'N5gdakxq9!'
         }
     });
     mailOptions = {
            from: OUR_ADDRESS, // our address
            to: address, // who we sending to
            subject: "Confirmation Code From Banda For "+theGig.name+"", // Subject line
            text: "Hello, "+req.session.key+". Here is your confirmation code for the event "+theGig.name+"      -----                 "+code+"                 -----               Give this code to the arist at the time of the event in person. They should submit this code on their home page. Also be sure to submit the code the artist gives you on your home page. DO NOT SEND THIS CODE TO ANYONE. You should exchange codes in person at the time of the event. We do this to ensure fair transactions between our customers. Once both codes have been sent we will securly charge you and transfer the artist "+theGig.price+ " for you. If you have any questions at all simply reply to this email. Enjoy the music and thank you for using Banda. —Your team at Banda.", // plain text body
            html: '' // html body
        };
  }
} // end of exports
