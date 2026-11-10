import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { aiResponses, visitorQuestions } from '../data/content';
import { Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

export function AIFloatingChat() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    aiChatOpen,
    setAiChatOpen,
    chatMessages,
    addChatMessage,
    visitorType,
  } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const getSuggestedQuestions = () => {
    if (visitorType && visitorQuestions[visitorType]) {
      return visitorQuestions[visitorType];
    }
    return visitorQuestions.explorer;
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    addChatMessage({ role: 'user', content: message });
    setInputValue('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = aiResponses[message] || generateResponse(message);

    setIsTyping(false);
    addChatMessage({ role: 'assistant', content: response });
  };

  const generateResponse = (_message: string): string => {
    const responses = [
      "That's a great question! I'd love to tell you more about that during a conversation. Feel free to reach out!",
      "Interesting question! While I can provide some insights here, I think a real conversation would be more valuable. Let's connect!",
      "I appreciate your curiosity! This is something I'm happy to discuss in detail. Why not schedule a call?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <AnimatePresence>
      {aiChatOpen && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            height: isMinimized ? 'auto' : 600,
          }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="w-96 max-w-[calc(100vw-2rem)] glass-panel-strong rounded-2xl overflow-hidden border border-cyber-cyan/30 shadow-lg shadow-cyber-cyan/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-rajdhani font-semibold text-white">AI Bhavya</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                    <span className="font-space-mono text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-hoverable
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-gray-400" />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setAiChatOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-hoverable
                >
                  <X className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-3">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-4">
                      <p className="font-rajdhani text-gray-400 text-sm mb-3">
                        Hello! Ask me anything:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {getSuggestedQuestions().slice(0, 2).map((question) => (
                          <motion.button
                            key={question}
                            onClick={() => handleSend(question)}
                            className="px-2 py-1 text-xs glass-panel rounded-lg font-rajdhani text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-hoverable
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center shrink-0">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-3 rounded-xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-cyber-blue/20 text-white'
                            : 'glass-panel text-gray-300'
                        }`}
                      >
                        <p className="font-rajdhani leading-relaxed">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-6 h-6 rounded-lg bg-cyber-purple/20 flex items-center justify-center shrink-0">
                          <User className="w-3 h-3 text-cyber-purple" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="glass-panel p-3 rounded-xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                      placeholder="Ask anything..."
                      className="flex-1 px-3 py-2 bg-cyber-dark/50 border border-white/10 rounded-lg font-rajdhani text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                    />
                    <motion.button
                      onClick={() => handleSend(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-hoverable
                    >
                      <Send className="w-4 h-4 text-cyber-dark" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
