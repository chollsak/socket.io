'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io();

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Real-Time Chat</h1>
      <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flexGrow: 1, marginRight: '1rem', padding: '0.5rem', color: 'red' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
        
      </form>
      <ul id="messages" style={{ listStyleType: 'none', padding: 10,  }}>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
