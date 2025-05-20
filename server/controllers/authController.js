const Message = require('../models/MessageModel');
const authController = {};

authController.checkAuth = async (req, res, next) => {
  const { message, password } = req.body;
  const { pass } = req.cookies;

  try {
    const foundMessage = await Message.findOne({ message });
    if (!foundMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (pass !== password) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return next();
  } catch (error) {
    return next({
      message: 'Error in auth',
      code: '500',
      log: 'Error in auth Middleware'
    });
  }
};

module.exports = authController;