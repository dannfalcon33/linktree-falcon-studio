import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, ChatSession } from "@google/genai";
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from '../constants';

export const StyleAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Lumi. ¿Buscas inspiración para un evento o algo casual? ✨' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<ChatSession | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: GEMINI_MODEL,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        chatSessionRef.current = chat;
      } catch (error) {
        console.error("Error initializing Gemini:", error);
      }
    }
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    try {
      const response = await chatSessionRef.current.sendMessage({
        message: userMsg.text
      });
      
      const text = response.text || "Lo siento, tuve un momento de confusión. ¿Podrías repetirlo?";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
      setLoadingState(LoadingState.IDLE);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, estoy teniendo problemas de conexión. Intenta de nuevo más tarde." }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-fashion-black dark:bg-fashion-gold text-white p-4 rounded-full shadow-2xl hover:bg-fashion-gold dark:hover:bg-white dark:hover:text-fashion-black transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Style Assistant"
      >
        <Sparkles size={20} className="animate-pulse" />
        <span className="font-semibold text-sm hidden md:inline">Style Assistant</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full sm:w-96 h-[80vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-gray-100 dark:border-zinc-800">
            
            {/* Header */}
            <div className="bg-fashion-black dark:bg-zinc-950 text-white p-4 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-fashion-gold flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm brand-font tracking-wider">LUMI AI</h3>
                  <p className="text-xs text-gray-300">Style Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-black/20 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 text-sm rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-fashion-black dark:bg-fashion-gold text-white rounded-tr-none' 
                        : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-zinc-700 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loadingState === LoadingState.LOADING && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-zinc-700 flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ej: ¿Qué me pongo para una boda?"
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-fashion-gold/50 focus:border-fashion-gold transition-all text-sm placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loadingState === LoadingState.LOADING || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fashion-black dark:bg-fashion-gold text-white rounded-full hover:bg-fashion-gold dark:hover:bg-white dark:hover:text-fashion-black disabled:bg-gray-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};