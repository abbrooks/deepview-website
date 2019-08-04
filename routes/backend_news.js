module.exports = router=>{
  const users = process.env.ADMIN_USERS || {'test':'123'};
  const database = require('../database.js')
  router.post('/newsPiece', (req,res)=>{
    if (!req.body){
      console.log('No body sent to create a news piece')
      res.status(401).end();
    }
    else{
      console.log('****')
      console.log(req.body)
      var {username, password, title, body, categories, creator} = req.body;
      if (!username || !password || !title || !body || !categories){
        console.log('Missing fields.');
        res.status(401).end();
      }
      else{
        if (users.hasOwnProperty(username)){
          if (users[username]==password){
            database.connect(db=>{
              now = new Date().toString();
              db.db('news').collection('newsPieces').insertOne({'date':now, 'title':title, 'body':body, 'categories':categories, 'creator':creator}, (err, res1)=>{
                if (err){
                  console.log('THere was an error inserting news piece with title: '+ title + ' from user: ' + username + ' on: ' + now);
                  res.status(500).end();
                  db.close();
                }
                else{
                  console.log('Add news piece: ' + title + ' from user: ' + username + ' on: ' + now + ' to mongo');
                  res.status(200).send('We have added your news piece to the website!');
                  db.close();
                }
              })
            }, dbErr=>{
              console.log('THere was an error connecting to mongo: ' + dbErr);
              res.status(500).end();
            })
          }
          else{
            console.log('No user on record for sent username: ' + username + ', password: ' + password)
            res.status(200).send('Sorry, that password was incorrect.').end();
          }
        }
        else{
          console.log('No user on record for sent username: ' + username)
          res.status(200).send('Sorry you are not a registered DeepView admin user.').end();
        }
      }
    }
  });

  router.get('/newsArticles', (req,res)=>{
    database.connect(db=>{
      db.db('news').collection('newsPieces').find().toArray((err, articles)=>{
        if (err){
          console.log('There was an error finding articles. ' + err);
          res.status(500).end();
          db.close();
        }
        else{
          console.log('Got articles from mongo.')
          res.status(200).json({'success':true, 'data':articles});
          db.close();
        }
      })
    }, dbErr=>{
      console.log('THere was an error connecting to mongo: ' + dbErr);
      res.status(500).end();
    })
  })

  router.get('/anArticle', (req,res)=>{
    if (!req.query){
      console.log('No id sent.')
      res.status(401).end();
    }
    else{
      var {id} = req.query;

      database.connect(db=>{
        db.db('news').collection('newsPieces').findOne({'_id':database.objectId(id)}, (err, article)=>{
          if (err){
            console.log('There was an error finding articles. ' + err);
            res.status(500).end();
            db.close();
          }
          else{
            console.log('Got articles from mongo.')
            res.status(200).json({'success':true, 'data':article});
            db.close();
          }
        });
      }, dbErr=>{
        console.log('THere was an error connecting to mongo: ' + dbErr);
        res.status(500).end();
      });
    }
  });

  router.post('/comment', (req,res)=>{
    if (!req.body){
      cosole.log('No body sent in comment.')
      res.status(401).end();
    }
    else{
      var {comment, id} = req.body;
      if (!id || !comment){
        console.log('Missing fields')
        res.status(401).end();
      }
      else{
        var query = {$push:{'comments':comment}}
        database.connect(db=>{
          db.db('news').collection('newsPieces').updateOne({'_id':database.objectId(id)}, {$push:{'comments':comment}}, (err1,res1)=>{
            if (err1){
              console.log('there was an error updating article with id: ' + id);
              res.status(500).end();
              db.close();
            }
            else{
              res.status(200).send('We have added your comment.');
              db.close();
            }
          })
        }, dbErr=>{
          console.log('THere was an error connecting to mongo: ' + dbErr);
          res.status(500).end();
        })

      }
    }
  })
}//end of exports
