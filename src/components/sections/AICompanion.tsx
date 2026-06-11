import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { aiResponses, visitorQuestions } from '../../data/content';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

export function AICompanion() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { aiChatOpen, setAiChatOpen, chatMessages, addChatMessage, visitorType } = useAppStore();

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

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get response from predefined answers or default
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
    <section id="ai" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-space-mono text-cyber-cyan text-sm mb-2">CHAPTER 05</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            AI Companion
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Chat with the digital twin of Bhavya. Ask anything about his work, skills, or projects.
          </p>
        </motion.div>
      </div>

      {/* Chat Interface */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="glass-panel-strong rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-green rounded-full border-2 border-cyber-dark" />
              </motion.div>
              <div>
                <h3 className="font-rajdhani text-lg font-semibold text-white">AI Bhavya</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="font-space-mono text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>

            {/* Open Chat Button */}
            <motion.button
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className="px-4 py-2 glass-panel rounded-lg text-cyber-cyan font-space-mono text-sm hover:bg-cyber-cyan/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hoverable
            >
              {aiChatOpen ? 'Close' : 'Open Chat'}
            </motion.button>
          </div>

          {/* Chat Container */}
          <AnimatePresence>
            {aiChatOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 500, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-6 space-y-4">
                  {chatMessages.length === 0 && (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyber-cyan/20 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-cyber-cyan" />
                      </div>
                      <h4 className="font-rajdhani text-lg text-white mb-2">
                        Hello! I'm AI Bhavya
                      </h4>
                      <p className="font-rajdhani text-gray-400 text-sm mb-6">
                        Ask me anything about Bhavya's work, skills, or experience.
                      </p>

                      {/* Suggested Questions */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {getSuggestedQuestions().map((question) => (
                          <motion.button
                            key={question}
                            onClick={() => handleSend(question)}
                            className="px-4 py-2 glass-panel rounded-xl text-sm font-rajdhani text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-hoverable
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-cyber-blue/20 text-white'
                            : 'glass-panel text-gray-300'
                        }`}
                      >
                        <p className="font-rajdhani text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-cyber-purple/20 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-cyber-purple" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="glass-panel p-4 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-cyber-cyan"
                              animate={{ y: [0, -5, 0] }}
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
                <div className="p-6 border-t border-white/10">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                        placeholder="Ask anything about Bhavya..."
                        className="w-full px-4 py-3 bg-cyber-dark/50 border border-white/10 rounded-xl font-rajdhani text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                      />
                    </div>
                    <motion.button
                      onClick={() => handleSend(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-blue rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-hoverable
                    >
                      <Send className="w-5 h-5 text-cyber-dark" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed State */}
          {!aiChatOpen && (
            <div className="p-6 text-center">
              <p className="font-rajdhani text-gray-400">
                Click "Open Chat" to start a conversation with AI Bhavya
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Digital Twin Visualization */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
          {/* Hologram effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-48 h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Avatar silhouette */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-cyber-cyan/30 to-cyber-blue/30 border border-cyber-cyan/30 flex items-center justify-center mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-24 h-24 rounded-full bg-cyber-dark flex items-center justify-center">
                <Bot className="w-12 h-12 text-cyber-cyan" />
              </div>
            </motion.div>

            <h3 className="font-orbitron text-xl font-bold text-white mb-2">Digital Twin</h3>
            <p className="font-rajdhani text-gray-400 text-center text-sm">
              Powered by advanced AI to represent Bhavya's knowledge and experience
            </p>
          </div>

          {/* Scan lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-cyber-cyan/10"
                style={{ top: `${i * 10}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
