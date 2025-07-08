import React, { useState } from 'react';
import MessageBox from './MessageBox';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

interface ServerResponse {
  reply: string;
  timestamp: string;
}

export default function App() {
  const [message, setMessage] = useState<string>('');
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Frontend Logic ---

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerResponse(null);
    setError(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong on the server.');
      }
      
      const data = await response.json();
      setServerResponse(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>

      <Box sx={{ my: 4 }}>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="message"
            label="Your Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 2 }}
            fullWidth
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
          </Button>
        </form>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Server Response:
          </Typography>
          {isLoading && <MessageBox message="Waiting for response..." type="info" />}
          {error && <MessageBox message={`Error: ${error}`} type="error" />}
          {serverResponse && (
            <MessageBox 
              message={`Reply: ${serverResponse.reply}\nTimestamp: ${serverResponse.timestamp}`} 
              type="success" 
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
