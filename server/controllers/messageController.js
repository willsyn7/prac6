// In the `server/controllers/messageController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
// - [ ] Function `postMessage` should create a new item in the database
// - [ ] Function `getMessages` should retrieve all items from the database and send it back to the client as JSON
// - [ ] Function `deleteMessage` should find items in the database based on an ID number and delete the `message` if it exists. (Later, you will be asked to authenticate before deleting the message.)

// const messagechema = new Schema({
//     message:{ type: String, required : true  },
//     password : {type : String, required: true},
//     created_at: { type: Date, default: Date.now },
// })
const Message = require('../models/MessageModel')
messageController = {}

messageController.postMessage = async (req, res, next) => {
    console.log('postMessage route is called');
    try {
      console.log('inside try');
      const { message, password } = req.body;
      console.log('test1');
      const newMessage = new Message({ message, password });
      console.log('test2');
      await newMessage.save();
      console.log('before return');
      // Correct the cookie key name to 'pass'
      res.cookie('pass', password, { httpOnly: true });
      return res.status(200).json(newMessage);
    } catch (error) {
      return next({
        log: 'Error when submitting post request in /message',
        status: 500,
        message: { err: 'Post messsage error' }
      });
    }
  };
messageController.getMessage = async (req, res, next) => {
    console.log('getMessages route is called');
    try {
      const messages = await Message.find({});
      console.log('Messages fetched from the database:', messages);
  
   
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error in getMessages:', error);
      return next({
        log: 'Error when fetching messages in /messages',
        status: 500,
        message: { err: 'Get messages error' }
      });
    }
  };
  
  messageController.deleteMessage = async(req,res,next)=>{
    console.log('delte route is called')
    try{
        const {message} = req.body;
        const deletemessage = await Message.findOneAndDelete({message});
        if(!deletemessage){
            return next({
                log: "Message not found",
                status : 400,
                message: {err :"message not found"}
            })
        }return res.status(200).json({message : "message delted"});
    }catch(error){
        return next({
            log : "Middelware delete error",
            status :500,
            message: {err: "Error while deting message"}
        })
    }
  }

module.exports = messageController