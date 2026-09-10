import React, { useState, useEffect, useRef } from 'react';
import { Exchange, ChatMessage, UserProfile } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';

interface MessagingScreenProps {
  exchange: Exchange;
  currentUser: UserProfile;
  onBack: () => void;
}

export const MessagingScreen: React.FC<MessagingScreenProps> = ({
  exchange,
  currentUser,
  onBack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // If it's the Ali exchange, use the mockup messages!
    if (exchange.id === 'exchange_ali_ps4') {
      return INITIAL_CHAT_MESSAGES;
    }
    return [
      {
        id: 'msg_init',
        senderId: 'other',
        text: `Hey! Thanks for connecting about ${exchange.theyOffer.title}. Let's coordinate the swap details!`,
        time: 'Just now',
        status: 'read',
      },
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate smart friendly reply from swap partner
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Sounds like a great plan! How does tomorrow around 2:30 PM work for you at the central park plaza?",
        "Awesome! I've packed the original cords and box. See you there!",
        "Thanks so much! I'm happy we can give these items a second life instead of buying new.",
        "Perfect! Just let me know when you arrive and I'll meet you right outside.",
      ];
      const replyText = responses[Math.floor(Math.random() * responses.length)];

      const replyMsg: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderId: 'other',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col max-w-md mx-auto antialiased">
      {/* Top Header */}
      <header className="px-4 py-3 bg-white sticky top-0 z-30 border-b border-[#e4e1e5] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-[#f0edf1] transition-colors text-[#1b1b1e]"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>

          <div className="relative">
            {exchange.otherUser.avatar ? (
              <img
                className="w-10 h-10 rounded-full object-cover border border-[#bfc9c1]"
                src={exchange.otherUser.avatar}
                alt={exchange.otherUser.name}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#0f5238] text-white font-bold flex items-center justify-center text-sm">
                {exchange.otherUser.name.charAt(0)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0f5238] rounded-full border-2 border-white"></span>
          </div>

          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
              {exchange.otherUser.name}
            </h2>
            <p className="text-[11px] text-[#0f5238] font-medium flex items-center gap-1">
              <span>Active now</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#404943]">
          <button
            onClick={() => alert(`Location: Downtown Community Hub (0.8 km away)`)}
            className="p-2 rounded-full hover:bg-[#f0edf1]"
            aria-label="View meetup location"
          >
            <span className="material-symbols-outlined text-[22px]">location_on</span>
          </button>
          <button
            onClick={() => alert('Exchange Details & Safety Guidelines')}
            className="p-2 rounded-full hover:bg-[#f0edf1]"
            aria-label="Options"
          >
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Item Context Banner */}
      <div className="bg-[#f6f2f7] px-4 py-2.5 border-b border-[#e4e1e5] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="material-symbols-outlined text-[#0f5238] text-[18px]">
            {exchange.type === 'barter' ? 'swap_horiz' : 'volunteer_activism'}
          </span>
          <span className="font-semibold text-[#1b1b1e] truncate">
            {exchange.youOffer.title}
          </span>
          <span className="text-[#707973]">⇄</span>
          <span className="text-[#404943] truncate">{exchange.theyOffer.title}</span>
        </div>
        <span className="bg-[#b1f0ce] text-[#0e5138] px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ml-2">
          {exchange.status}
        </span>
      </div>

      {/* Messages Thread */}
      <main className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
        {/* Date Divider */}
        <div className="flex justify-center my-2">
          <span className="text-[11px] text-[#707973] bg-[#eae7eb] px-3 py-1 rounded-full font-medium">
            Today, 10:24 AM
          </span>
        </div>

        {messages.map((msg) => {
          const isMine = msg.senderId === 'me' || msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isMine
                    ? 'bg-[#0f5238] text-white rounded-br-xs'
                    : 'bg-white text-[#1b1b1e] border border-[#e4e1e5] rounded-bl-xs'
                }`}
              >
                {/* Optional Attached Image */}
                {msg.image && (
                  <div className="mb-2 rounded-xl overflow-hidden max-h-48 border border-[#e4e1e5]">
                    <img
                      className="w-full h-full object-cover"
                      src={msg.image}
                      alt="Attachment preview"
                    />
                  </div>
                )}
                <p>{msg.text}</p>
              </div>

              {/* Timestamp & Status */}
              <div className="flex items-center gap-1 text-[10px] text-[#707973] px-1">
                <span>{msg.time || '10:30 AM'}</span>
                {isMine && (
                  <span className="material-symbols-outlined text-[13px] text-[#0f5238]">
                    done_all
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1 bg-white border border-[#e4e1e5] rounded-full px-3 py-2 w-16 text-[#707973] shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#707973] rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-[#707973] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-[#707973] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Message Input Bar */}
      <footer className="p-3 bg-white border-t border-[#e4e1e5] sticky bottom-0 z-30">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              // Simulated photo attach
              const photoMsg: ChatMessage = {
                id: `msg_photo_${Date.now()}`,
                senderId: 'me',
                text: 'Here is a photo of the item ready for handover!',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSYkDvHDonN0zWyE1LKNqkocWld_Hp0kfbMxNjVF9C-dt65zbSVlYbWX-6oOJbv9UJyudTr1_bobNtu9MiCIw8fBtVjc2F7JkmNk4qhAqE9URo2xdGpLlZGtywRKUjBlscu69kX2P5eFuZoneefK9WNO4qzazc0h-5S3c8EOsvRs0Rgc-z2oBI3K86S9N1Ya2cX7qvFRuIynU4tQMBezfE-3DykbXaGaQZnYm4NMjKypcb36oCa5Ezw',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'sent',
              };
              setMessages((prev) => [...prev, photoMsg]);
            }}
            className="w-10 h-10 rounded-full bg-[#f6f2f7] text-[#404943] hover:text-[#0f5238] flex items-center justify-center shrink-0 transition-colors"
            aria-label="Attach photo"
          >
            <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
          </button>

          <input
            type="text"
            className="flex-1 bg-[#F1F3F5] rounded-full px-4 py-2.5 text-sm text-[#1b1b1e] placeholder-[#707973] focus:outline-none focus:ring-2 focus:ring-[#0f5238] focus:bg-white transition-all"
            placeholder={`Message ${exchange.otherUser.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
              inputText.trim()
                ? 'bg-[#0f5238] text-white shadow-md active:scale-95'
                : 'bg-[#e4e1e5] text-[#707973] cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </footer>
    </div>
  );
};
