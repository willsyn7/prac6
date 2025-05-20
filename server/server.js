const express = require('express');
const app = express();
const path =  require('path');
const port = 3434;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const messageController = require('./controllers/messageController')
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');



app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://saw:Azurewater123!@assessment.wlup7kb.mongodb.net/mydatabase', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });
  mongoose.connection.once('open', () => {
    console.log('Mongoose connection to db');
  });


app.use(express.json());


app.post('/message',messageController.postMessage)
app.get('/message',messageController.getMessage )
 app.delete('/message', authController.checkAuth, messageController.deleteMessage);
// app.delete('/message',messageController.deleteMessage)


app.get('/',(req,res)=>{
    return res.sendFile((path.resolve(__dirname, '../views/index.html')));
});
app.get('/style.css',(req,res)=>{
    return res.sendFile((path.resolve(__dirname, '../assets/css/style.css')));
})
app.get('/script.js',(req,res)=>{
    return res.sendFile((path.resolve(__dirname, '../assets/js/index.js')));
})



app.use((req, res, next) => {
    return res.status(400).send('error 404 not found :( ');
  
  });
  
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Global Error handler',
      status: 500,
      message: {
        err: ' Went to global handle error oh noes :('
      },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



