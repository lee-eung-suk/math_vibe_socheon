import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ExternalLink, GraduationCap, MousePointer2, MessageSquare, Send, User, Lock } from "lucide-react";

interface Student {
  name: string;
  grade: number;
  link: string;
}

interface GuestbookEntry {
  id: number;
  author: string;
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

const initialGuestbook: GuestbookEntry[] = [
  { id: 1, author: "학부모님", content: "아이들의 창의력이 정말 대단하네요! 멋진 전시회 감사합니다.", date: "2026-04-08" },
  { id: 2, author: "김선생님", content: "수학을 게임으로 풀어내는 과정이 인상적입니다. 모두 고생 많았어요!", date: "2026-04-07" },
  { id: 3, author: "익명", content: "이지훈 학생 게임 너무 재밌어요! 최고!", date: "2026-04-07" },
];

export default function App() {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(initialGuestbook);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;

    const newEntry: GuestbookEntry = {
      id: Date.now(),
      author: name,
      content: content,
      date: new Date().toISOString().split('T')[0],
    };

    setGuestbook([newEntry, ...guestbook]);
    setName("");
    setPassword("");
    setContent("");
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background Overlay for Readability */}
      <div className="fixed inset-0 bg-black/40 z-0" />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-32">
        {/* Header Section */}
        <header className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold tracking-widest glass rounded-full text-white/90">
              소천초등학교
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 keep-all px-4">
              바이브코딩 전시회
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed keep-all px-4">
              수학, 게임이 되다. <br className="hidden sm:block" />
              소천초등학교 학생들의 창의적인 수학 코딩 결과물을 만나보세요.
            </p>
          </motion.div>
        </header>

        {/* Student Grid - Responsive Layout Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-32">
          {students.map((student, index) => (
            <motion.a
              key={`${student.name}-${index}`}
              href={student.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative block"
            >
              <div className="glass-dark h-full p-8 rounded-[2rem] transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-2xl group-hover:shadow-white/5">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 glass rounded-2xl text-white/70 group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/50">
                    <ExternalLink size={20} />
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-white/40 mb-2 block tracking-wider uppercase">
                    {student.grade}학년
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-white group-hover:text-white transition-colors">
                    {student.name}
                  </h3>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-medium text-white/30 group-hover:text-white/60 transition-colors">
                  <MousePointer2 size={14} />
                  <span>결과물 보기</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Guestbook Section */}
        <section className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 glass rounded-lg text-white/80">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">방명록</h2>
          </div>

          {/* Guestbook Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark p-8 rounded-[2rem] mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="작성자 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="password" 
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>
              <textarea 
                placeholder="응원의 한마디를 남겨주세요."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 glass rounded-xl text-white font-semibold hover:bg-white/20 transition-all active:scale-95"
                >
                  <Send size={18} />
                  등록하기
                </button>
              </div>
            </form>
          </motion.div>

          {/* Guestbook List */}
          <div className="space-y-4">
            {guestbook.map((entry) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-dark p-6 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-semibold text-white/90">{entry.author}</span>
                  <span className="text-xs text-white/30">{entry.date}</span>
                </div>
                <p className="text-white/70 leading-relaxed keep-all">{entry.content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 text-center border-t border-white/10 pt-12">
          <p className="text-white/30 text-sm tracking-widest uppercase">
            &copy; 2026 소천초등학교 바이브코딩 전시회
          </p>
        </footer>
      </main>
    </div>
  );
}
