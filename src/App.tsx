import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, GraduationCap, Menu, X, Play, Send, User, MessageSquare } from "lucide-react";

interface Student {
  name: string;
  grade: number;
  link: string;
}

interface GuestbookEntry {
  id: number;
  name: string;
  content: string;
  date: string;
}

const students: Student[] = [
  { name: "이한솔", grade: 6, link: "#" },
  { name: "주은혜", grade: 6, link: "#" },
  { name: "주사랑", grade: 4, link: "#" },
  { name: "송설", grade: 4, link: "#" },
  { name: "정하온", grade: 3, link: "#" },
  { name: "이승하", grade: 3, link: "#" },
  { name: "이지훈", grade: 3, link: "#" },
  { name: "이지호", grade: 3, link: "#" },
  { name: "남하늘", grade: 2, link: "#" },
  { name: "정라온", grade: 2, link: "#" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestContent, setGuestContent] = useState("");
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('socheon_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Initial sample messages
      const initial = [
        { id: 1, name: "선생님", content: "모두들 정말 고생 많았어요! 수학이 이렇게 즐거울 수 있다니 놀랍네요.", date: "2026.04.12" },
        { id: 2, name: "학부모", content: "우리 아이들의 창의력에 박수를 보냅니다. 최고예요!", date: "2026.04.12" }
      ];
      setMessages(initial);
      localStorage.setItem('socheon_messages', JSON.stringify(initial));
    }
  }, []);

  const addMessage = () => {
    if (!guestName.trim() || !guestContent.trim()) {
      alert('이름과 내용을 모두 입력해주세요!');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    const newMessage: GuestbookEntry = {
      id: Date.now(),
      name: guestName,
      content: guestContent,
      date: dateStr
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('socheon_messages', JSON.stringify(updated));
    
    setGuestName("");
    setGuestContent("");
  };

  return (
    <div className="min-h-screen w-full relative font-sans">
      {/* Premium Glass Overlay */}
      <div className="glass-overlay" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">S</div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tighter text-slate-900 uppercase">소천초등학교</span>
              <span className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase">바이브코딩 전시회</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {["작품 보기", "방명록"].map((item) => (
              <a 
                key={item} 
                href={item === "작품 보기" ? "#갤러리" : "#방명록"} 
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 tracking-widest transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-white/20 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {["작품 보기", "방명록"].map((item) => (
                  <a 
                    key={item} 
                    href={item === "작품 보기" ? "#갤러리" : "#방명록"} 
                    className="text-xl font-black text-slate-900 tracking-tighter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-6 pt-40 pb-32">
        {/* Hero Section */}
        <header className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 mb-12 keep-all leading-[0.9] font-korean drop-shadow-sm">
              수학이 팡팡!<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">소천 코딩 놀이터</span>
            </h1>
            
            {/* Description Panel */}
            <div className="max-w-3xl mx-auto p-8 glass-panel">
              <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed keep-all font-korean">
                소천초 꼬마 개발자들의 수학 게임 갤러리.<br />
                직접 만든 게임으로 수학의 즐거움을 느껴보세요.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Gallery Section */}
        <section id="갤러리" className="mb-40">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">학생 작품 갤러리</h2>
            <div className="h-[1px] flex-grow mx-8 bg-slate-200 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {students.map((student, index) => (
              <motion.div
                key={`${student.name}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <div className="apple-card group h-full flex flex-col overflow-hidden">
                  <div className="p-8 flex-grow">
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-14 h-14 bg-slate-900/5 rounded-2xl flex items-center justify-center text-slate-900">
                        <GraduationCap size={28} />
                      </div>
                      <div className="text-slate-300 group-hover:text-slate-900 transition-colors">
                        <ExternalLink size={20} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-indigo-600 tracking-[0.2em] uppercase">
                        {student.grade}학년
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
                        {student.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <a
                      href={student.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-indigo-600 text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 font-bold text-sm transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95 shadow-md shadow-indigo-200"
                    >
                      <Play size={16} fill="currentColor" />
                      게임 즐기기
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Guestbook Section */}
        <section id="방명록" className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">응원의 한마디 (방명록)</h2>
            <p className="text-slate-500 font-medium">학생들의 멋진 도전을 응원해주세요!</p>
          </div>

          {/* Form */}
          <div className="glass-panel p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1 relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="이름"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl py-3 pl-11 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="md:col-span-2 relative">
                <MessageSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="응원 메시지를 남겨주세요"
                  value={guestContent}
                  onChange={(e) => setGuestContent(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl py-3 pl-11 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <button 
                onClick={addMessage}
                className="md:col-span-1 bg-indigo-600 text-white rounded-full py-3 px-6 font-bold text-sm transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
              >
                <Send size={16} />
                남기기
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900">{msg.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{msg.date}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed keep-all">{msg.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-48 text-center border-t border-slate-200 pt-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-[12px] font-black text-slate-500">S</div>
            <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase">소천초등학교 바이브코딩</span>
          </div>
          <p className="text-slate-300 text-[10px] font-bold tracking-[0.4em] uppercase">
            &copy; 2026 수학 바이브코딩 전시회. 모든 권리 보유.
          </p>
        </footer>
      </main>
    </div>
  );
}
