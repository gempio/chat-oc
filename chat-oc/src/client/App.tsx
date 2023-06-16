// Import necessary packages
// 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
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';


// ChatBox component for displaying messages
const ChatBox = ({ messages }) => (
  <List>
    {messages.map((message, index) => (
      <ListItem key={index} sx={{
        flexDirection: message.sender === 'John Doe' ? 'row-reverse' : 'row',
        justifyContent: message.sender === 'John Doe' ? 'flex-end' : 'flex-start',
      }}>
        <ListItemAvatar>
          <Avatar alt={message.sender}>{message.sender.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={message.text}
          secondary={formatDistanceToNow(message.timestamp, { addSuffix: true })}
          sx={{
            color: message.sender === 'John Doe' ? 'blue' : 'black',
            textAlign: message.sender === 'John Doe' ? 'right' : 'left',
          }}
        />
      </ListItem>
    ))}
  </List>
);


// ChatInput component for typing new messages
const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const submitMessage = (event) => {
    event.preventDefault();
    if (input !== '') {
      sendMessage(input, 'John Doe');
      setInput('');
    }
  };

  return (
    <form onSubmit={submitMessage}>
      <Box display="flex" gap={2}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained">Send</Button>
      </Box>
    </form>
  );
};

// Main Chat component
const Chat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message, sender) => {
    setMessages(oldMessages => [...oldMessages, { text: message, timestamp: new Date(), sender: sender }]);
    if (sender === 'John Doe') {
      // Get response from GPT-3 API
      const response = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        {
          prompt: message,
          max_tokens: 60,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

      setMessages(oldMessages => [...oldMessages, { text: response.data.choices[0].text, timestamp: new Date(), sender: 'ChatGPT' }]);
    }
  };

  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', padding: 2 }}>
      <ChatBox messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </Box>
  );
};


const App: React.FC = () => {
  return <Chat />;
};

export default App;
