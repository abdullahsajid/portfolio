import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Zap,Code,Briefcase,Coffee } from 'lucide-react';
import useUserStore from '../state/user';
import { chatApi,generateToken } from '../services/user-service';
import { generateUnixTimestampId } from '../utils/CommonUtils';
import MarkdownResponse from '../components/artifacts/Markdown';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [showSamples, setShowSamples] = useState(true);
  const { user, chat, setUser,updateChat, setChat,value, setValue,setIsLoading,setChatLimit,isLoading,chatLimit } = useUserStore();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const samplePrompts = [
    {
      text: "What makes Abdullah stand out as a developer?",
    },
    {
      text: "Is Abdullah a good fit for our company?",
    },
    {
      text: "Tell me about Abdullah's most impressive projects",
    },
    {
      text: "Can Abdullah handle working with tight deadlines and lots of coffee?",
    },
    {
      text: "What programming languages does Abdullah master?",
    },
    {
      text: "Does Abdullah work well in team environments?",
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = async (promptValue) => {
    try {
      let userId = localStorage.getItem("portfolio-userId");
      let requestCount = localStorage.getItem("portfolio-requestCount");
      let prompt = promptValue ?? value;
      if (prompt.trim() === "") return;
      if (!userId) {
        userId = generateUnixTimestampId();
      }
      if (Number(requestCount) >= 3) {
        setChatLimit(true);
        return;
      }
      const formData = new FormData();
      formData.append("prompt", prompt);
      let payload = {prompt: prompt}
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
      const token = await generateToken();
      console.log("tokne",token)
      const response = await chatApi(payload,token);

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
              }
            } catch (parseError) {
              setIsLoading(false);
              console.error("Error parsing JSON:", parseError);
              setValue("");
            }
          }
        }
      }
      setIsLoading(false);
      localStorage.setItem("portfolio-userId", String(userId));
      localStorage.setItem(
        "portfolio-requestCount",
        String(Number(requestCount) + 1)
      );
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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

  const handleSampleClick = (prompt) => {
    setValue(prompt);
    setShowSamples(false);
    // Auto-focus textarea after selecting a prompt
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-[#111] via-[#111] to-[#111] flex flex-col relative h-screen">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg" width="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none" fill-rule="evenodd" fill-opacity="0.03" cx="30" cy="30" r="1" ></div>
      
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-2 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">AI Assistant</h1>
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

      <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {showSamples && chat.length === 0 && (
            <div className="space-y-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">Try asking me something!</span>
                </div>
                <p className="text-gray-400 text-sm">Here are some questions to get you started:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {samplePrompts.map((prompt, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleSampleClick(prompt.text)}
                      className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-lg"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-white text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200">
                            {prompt.text}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {chat?.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.type === 'agent' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border ${
                    message.type === 'user'
                      ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-br-md'
                      : 'bg-white/10 text-white border-white/20 rounded-bl-md'
                  }`}
                >
                  {message.isThinking ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                      <span className="text-gray-300 text-sm">Thinking...</span>
                    </div>
                  ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        <MarkdownResponse content={message.text}/>
                      </p>
                  )}
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {chatLimit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chat Limit Reached</h3>
              <p className="text-gray-300 mb-6">You've reached your daily chat limit. Come back tomorrow for more conversations!</p>
              <button
                onClick={() => setChatLimit(false)}
                className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-medium transition-all duration-200"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="flex-shrink-0 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:from-gray-600 disabled:to-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 px-2">
              <div className="flex items-center gap-4 text-xs text-gray-400">
              </div>
              <div className="text-xs text-gray-400">
                Enter to send • Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;