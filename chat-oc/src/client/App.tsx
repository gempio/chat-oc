// Import necessary packages
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

const App: React.FC<any> = ({ openai }) => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([
    { role: "system", content: 'assume the role of hotel receptionist' }
  ]);

  const sendMessage = async (message, sender) => {
    setMessages(oldMessages => [...oldMessages, { text: message, timestamp: new Date(), sender: sender }]);
    setHistory(oldHistory => [...oldHistory, { role: "user", content: message }])
    if (sender === 'John Doe') {
      // Get response from GPT-3 API
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
      });
      setMessages(
        oldMessages => [...oldMessages, { text: data.choices[0].message.content, timestamp: new Date(), sender: 'ChatGPT' }]
      );
      setHistory(oldHistory => [...oldHistory, data.choices[0].message]);
    }
  };

  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', padding: 2 }}>
      <ChatBox messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </Box>
  );
};

export default App;
