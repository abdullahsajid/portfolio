import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Zap } from 'lucide-react';
import useUserStore from '../state/user';
import { chatApi } from '../services/user-service';

// Mock store for demonstration - replace with your actual useUserStore
const useMockStore = () => {
  const [chat, setChat] = useState([
    { id: 1, type: 'agent', text: 'Hello! I\'m your AI assistant. How can I help you today?', isThinking: false },
    { id: 2, type: 'user', text: 'Can you help me with my project?' },
    { id: 3, type: 'agent', text: 'Absolutely! I\'d be happy to help you with your project. Could you tell me more about what you\'re working on?', isThinking: false }
  ]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLimit, setChatLimit] = useState(false);

  const updateChat = (id, text, isThinking) => {
    setChat(prev => prev.map(msg => 
      msg.id === id ? { ...msg, text: msg.text + text, isThinking } : msg
    ));
  };

  const addChat = (message) => {
    setChat(prev => [...prev, message]);
  };

  return {
    chat,
    value,
    setValue,
    isLoading,
    setIsLoading,
    chatLimit,
    setChatLimit,
    updateChat,
    setChat: addChat
  };
};

const Chat = () => {
//   const { chat, value, setValue, isLoading, setIsLoading, chatLimit, setChatLimit, updateChat, setChat } = useMockStore();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const { user, chat, setUser,updateChat, setChat,value, setValue,setIsLoading,setChatLimit,isLoading,chatLimit } = useUserStore();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = async (promptValue) => {
    // Your existing handleSubmit logic would go here
    let prompt = promptValue ?? value;
    if (prompt.trim() === "") return;
      const formData = new FormData();
      formData.append("prompt", prompt);
    // Mock implementation for demo
    setChat({
      id: chat.length + 1,
      type: "user",
      text: prompt,
    });
    
    let getId = chat.length + 2;
    setChat({
      id: getId,
      type: "agent",
      text: "",
      isThinking: true,
    });
    setValue("");
    
    const response = await chatApi(formData);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let accumulatedResponse = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const jsonData = JSON.parse(line.substring(6));

              if (jsonData?.content) {
                const textValue = jsonData.content;
                accumulatedResponse += textValue;
                updateChat(getId, textValue, false);
                // setInputImagePreview(null);
              }
            } catch (parseError) {
              setIsLoading(false);
              console.error("Error parsing JSON:", parseError);
              setValue("");
            //   setInputImagePreview(null);
            //   setUploadedImage(null);
            }
          }
        }
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#111] to-slate-900 flex flex-col relative h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg" width="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none" fill-rule="evenodd" fill-opacity="0.03" cx="30" cy="30" r="1" ></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-2 left-20 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Assistant</h1>
              <p className="text-purple-300 text-sm">Powered by advanced AI</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {chat.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.type === 'agent' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-purple-500/30 rounded-br-md'
                      : 'bg-white/10 text-white border-white/20 rounded-bl-md'
                  }`}
                >
                  {message.isThinking ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                      <span className="text-purple-300 text-sm">Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  )}
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Limit Modal */}
      {chatLimit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chat Limit Reached</h3>
              <p className="text-gray-300 mb-6">You've reached your daily chat limit. Come back tomorrow for more conversations!</p>
              <button
                onClick={() => setChatLimit(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-200"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-end gap-3 p-4">
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm leading-relaxed min-h-[20px] max-h-[120px]"
                    rows={1}
                    disabled={isLoading}
                    style={{ height: 'auto' }}
                  />
                </div>
                
                <button
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !value.trim()}
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Input hints */}
            <div className="flex items-center justify-between mt-2 px-2">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {2 - (chat.filter(m => m.type === 'user').length)} messages left today
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Enter to send • Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          /* Custom scrollbar */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(167, 139, 250, 0.5);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(167, 139, 250, 0.7);
          }
        `
      }} />
    </div>
  );
};

export default Chat;