import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Grid,
  Divider
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Logo from './Logo';

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnterChat = () => {
    navigate('/chat');
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Logo size={80} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mt: 2,
              color: 'primary.main',
              fontWeight: 600
            }}
          >
            Welcome to Chat App!
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: '100%',
                background: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem'
                  }}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Your account was created successfully. You can now join the chat room and start connecting with others!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: '100%',
                background: 'linear-gradient(145deg, #e3f2fd 0%, #ffffff 100%)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Features Available:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>Real-time messaging</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>Group chat room</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>User presence indicators</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>Message history</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleEnterChat}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              }
            }}
          >
            Enter Chat Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Welcome; 