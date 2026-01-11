import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);

  // Scroll chatbox to bottom when new message is added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const displayMessage = (text, isUser) => {
    const newMessage = { text, isUser };
    setMessages(prev => [...prev, newMessage]);
  };

  const callApi = async (apiUrl, prompt) => {
    setInput('Typing...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setInput('');
    return data;
  };

  const handleSend = async () => {
    if (!input.trim() || input === 'Typing...') return;
    const message = input.trim();
    displayMessage(message, true);
    setInput('');

    const apiUrl = message.startsWith('/image')
      ? 'https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=YOUR_KEY'
      : 'https://backend.buildpicoapps.com/aero/run/llm-api?pk=YOUR_KEY';

    try {
      const data = await callApi(apiUrl, message);
      if (data.status === 'success') {
        displayMessage(data.text, false);
      } else {
        displayMessage('An error occurred. Please try again.', false);
      }
    } catch (error) {
      console.error('API Error:', error);
      displayMessage('An error occurred. Please try again.', false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-lime-800 text-white p-4 text-2xl">
        <a href="/" className="text-3xl font-bold hover:text-lime-300">⬅</a>
        <span>AgriMitra - आरोग्य साथी</span>
        <a href="/chat" className="text-3xl font-bold hover:text-lime-300">↺</a>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col max-w-md h-[49rem] bg-white mx-auto my-4 rounded-lg shadow-lg border border-gray-300">
        {/* Chat Messages */}
        <div ref={chatboxRef} className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-[80%] rounded-2xl animate-fade-in break-words ${
                msg.isUser
                  ? 'bg-lime-800 text-white self-end rounded-tl-none'
                  : 'bg-gray-200 text-gray-800 self-start rounded-tr-none'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex items-center p-3 border-t bg-gray-100">
          <input
            type="text"
            className="flex-1 p-2 border rounded-full outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={input === 'Typing...'}
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-lime-900 text-white px-4 py-2 rounded-full hover:bg-lime-700 flex items-center"
          >
            <span className="material-icons mr-1">send</span> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;