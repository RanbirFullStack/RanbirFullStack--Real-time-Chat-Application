import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('general');
  const { user, logout } = useAuth();
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Connect to socket
    socketRef.current = io('http://localhost:5000');
    
    // Join room
    socketRef.current.emit('join_room', room);

    // Load existing messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/room/${room}`);
        setMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    // Listen for new messages
    socketRef.current.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/messages', {
        content: newMessage,
        room
      });

      socketRef.current.emit('send_message', {
        ...response.data,
        room
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Logo size={32} />
            <Typography variant="h6">Chat Room: {room}</Typography>
          </Box>
          <IconButton 
            color="inherit" 
            onClick={logout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
        <Divider />
        <List 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            p: 2,
            background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)'
          }}
        >
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: message.sender._id === user._id ? 'row-reverse' : 'row',
                gap: 1,
                mb: 1
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={message.sender.avatar}
                  sx={{
                    bgcolor: message.sender._id === user._id ? 'primary.main' : 'secondary.main'
                  }}
                >
                  {message.sender.username[0]}
                </Avatar>
              </ListItemAvatar>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  bgcolor: message.sender._id === user._id ? 'primary.light' : 'grey.100',
                  color: message.sender._id === user._id ? 'white' : 'inherit',
                  maxWidth: '70%',
                  borderRadius: 2,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    [message.sender._id === user._id ? 'right' : 'left']: -8,
                    transform: 'translateY(-50%)',
                    borderStyle: 'solid',
                    borderWidth: '8px 8px 8px 0',
                    borderColor: message.sender._id === user._id 
                      ? 'transparent transparent transparent #64b5f6'
                      : 'transparent #e0e0e0 transparent transparent',
                  }
                }}
              >
                <ListItemText
                  primary={message.sender.username}
                  secondary={message.content}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8rem',
                      color: message.sender._id === user._id ? 'white' : 'inherit',
                      fontWeight: 500
                    },
                    '& .MuiListItemText-secondary': {
                      color: message.sender._id === user._id ? 'white' : 'inherit',
                      wordBreak: 'break-word'
                    }
                  }}
                />
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Divider />
        <Box 
          component="form" 
          onSubmit={handleSendMessage} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            gap: 1,
            bgcolor: 'background.paper'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!newMessage.trim()}
            sx={{
              borderRadius: 2,
              px: 3,
              background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              }
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat; 