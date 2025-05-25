const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get messages for a specific room
router.get('/room/:roomId', auth, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const { content, room } = req.body;
    const message = new Message({
      content,
      room,
      sender: req.user._id,
      readBy: [req.user._id]
    });
    await message.save();
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username avatar');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark message as read
router.patch('/:messageId/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (!message.readBy.includes(req.user._id)) {
      message.readBy.push(req.user._id);
      await message.save();
    }

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 