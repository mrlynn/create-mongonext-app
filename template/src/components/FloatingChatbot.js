'use client';

import React, { useState } from 'react';
import { Box, IconButton, Avatar, Paper, Typography, TextField, Button, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ReactMarkdown from 'react-markdown';

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your MongoNext assistant. How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Step 1: Vector search for relevant context
      const res = await fetch('/api/rag-chunks/vector-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();
      let context = '';
      if (data.results && data.results.length > 0) {
        context = data.results.map(r => r.text).join('\n\n');
      }

      // Step 2: LLM synthesis (if context found)
      let answer = '';
      if (context) {
        const llmRes = await fetch('/api/rag-chunks/llm-synth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: input, context }),
        });
        const llmData = await llmRes.json();
        answer = llmData.answer || 'Sorry, I could not generate an answer.';
      } else {
        answer = 'Sorry, I could not find an answer to your question.';
      }
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: answer }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'There was an error processing your question.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
      <Fade in={!open} unmountOnExit>
        <IconButton
          color="primary"
          size="large"
          sx={{ bgcolor: 'background.paper', boxShadow: 3 }}
          onClick={() => setOpen(true)}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>
            <Image src="/images/logo-circle-white-on-black.png" alt="MongoNext Logo" width={32} height={32} />
          </Avatar>
        </IconButton>
      </Fade>
      <Fade in={open} unmountOnExit>
        <Paper elevation={8} sx={{ width: expanded ? 600 : 340, height: expanded ? 700 : 420, display: 'flex', flexDirection: 'column', position: 'relative', transition: 'width 0.2s, height 0.2s' }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 1, width: 36, height: 36 }}>
              <Image src="/images/logo-circle-white-on-black.png" alt="MongoNext Logo" width={28} height={28} />
            </Avatar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>MongoNext Chatbot</Typography>
            <IconButton color="inherit" size="small" onClick={() => setExpanded((v) => !v)} sx={{ mr: 1 }}>
              {expanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </IconButton>
            <IconButton color="inherit" size="small" onClick={() => setOpen(false)}>
              ×
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: 'background.default' }}>
            {messages.map((msg, idx) => (
              <Box key={idx} sx={{ display: 'flex', mb: 1, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main', ml: msg.sender === 'user' ? 1 : 0, mr: msg.sender === 'bot' ? 1 : 0, width: 32, height: 32 }}>
                  {msg.sender === 'user' ? <PersonIcon /> : <Image src="/images/logo-circle-white-on-black.png" alt="MongoNext Logo" width={24} height={24} />}
                </Avatar>
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: expanded ? '80%' : 220,
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                    ml: msg.sender === 'user' ? 0 : 1,
                    mr: msg.sender === 'user' ? 1 : 0,
                    wordBreak: 'break-word',
                    overflowX: 'auto',
                  }}
                >
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown
                      components={{
                        a: ({node, ...props}) => <a style={{color: '#1976d2', wordBreak: 'break-all'}} {...props} />,
                        pre: ({node, ...props}) => <pre style={{background: '#f5f5f5', padding: 8, borderRadius: 4, overflowX: 'auto'}} {...props} />,
                        code: ({node, ...props}) => <code style={{fontSize: 13, background: '#f5f5f5', padding: '2px 4px', borderRadius: 3}} {...props} />,
                        li: ({node, ...props}) => <li style={{marginLeft: 16}} {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <Typography variant="body2">{msg.text}</Typography>
                  )}
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 1, width: 32, height: 32 }}>
                  <Image src="/images/logo-circle-white-on-black.png" alt="MongoNext Logo" width={24} height={24} />
                </Avatar>
                <Typography variant="body2" color="text.secondary">Thinking…</Typography>
              </Box>
            )}
          </Box>
          <Box component="form" onSubmit={handleSend} sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Type your question…"
              value={input}
              onChange={e => setInput(e.target.value)}
              fullWidth
              disabled={loading}
              autoFocus
            />
            <Button type="submit" variant="contained" disabled={loading || !input.trim()}>Send</Button>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
} 