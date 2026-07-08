import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionBank } from '../data';
import { SingleChoice, MultipleChoice, FillBlank, Match, TrueFalseChoice } from './QuestionTypes';
import { Question } from '../types';
import { BookOpen, CheckCircle, RefreshCcw, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function QuizApp() {
  const [appState, setAppState] = useState<'auth' | 'intro' | 'exam' | 'summary'>('auth');
  const [apiKey, setApiKey] = useState('');
  const [studentName, setStudentName] = useState('');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number, total: number }>>({});
  
  const EXAM_MINUTES = 50;
  const [timeRemaining, setTimeRemaining] = useState(EXAM_MINUTES * 60);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Anti-cheat state
  const [cheatWarnings, setCheatWarnings] = useState(0);
  const [showCheatModal, setShowCheatModal] = useState(false);

  // Timer & Auto Submit
  useEffect(() => {
    if (appState === 'exam' && !isSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !isSubmitted && appState === 'exam') {
      calculateScore();
    }
  }, [appState, isSubmitted, timeRemaining]);

  // Anti-Cheat tracking (Alt+Tab, Window switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (appState === 'exam' && !isSubmitted && document.visibilityState === 'hidden') {
        setCheatWarnings(prev => {
          const next = prev + 1;
          if (next >= 3) {
            // Auto submit on 3rd strike
            calculateScore();
            alert("Bài thi của bạn bị thu lại do vi phạm quy chế (chuyển đổi cửa sổ/tab quá 3 lần).");
          } else {
            setShowCheatModal(true);
          }
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [appState, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    if (!studentName.trim()) {
      alert("Vui lòng nhập Họ và Tên trước khi bắt đầu.");
      return;
    }
    const maxQuestions = Math.min(questionBank.length, 45);
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5).slice(0, maxQuestions);
    setExamQuestions(shuffled);
    setAnswers({});
    setIsSubmitted(false);
    setTimeRemaining(EXAM_MINUTES * 60);
    setCurrentIdx(0);
    setScore({ correct: 0, total: 0 });
    setCategoryScores({});
    setCheatWarnings(0);
    setShowCheatModal(false);
    setAppState('exam');
  };

  const calculateScore = () => {
    let currentScore = 0;
    const catScores: Record<string, { correct: number, total: number }> = {};
    
    examQuestions.forEach(q => {
      if (!catScores[q.category]) {
        catScores[q.category] = { correct: 0, total: 0 };
      }
      catScores[q.category].total++;

      const userAns = answers[q.id];
      let isCorrect = false;

      if (userAns) {
        if (q.type === 'single') {
          isCorrect = userAns === q.correctAnswer;
        } else if (q.type === 'multiple') {
          const sortedUser = [...userAns].sort();
          const sortedCorrect = [...q.correctAnswers].sort();
          isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
        } else if (q.type === 'fill') {
          isCorrect = q.blanks.every((b, i) => userAns[i] === b.correctAnswer);
        } else if (q.type === 'match') {
          isCorrect = q.pairs.every(p => userAns[p.left] === p.right);
        } else if (q.type === 'true_false') {
          isCorrect = userAns === q.correctAnswer;
        }
      }

      if (isCorrect) {
        currentScore++;
        catScores[q.category].correct++;
      }
    });

    setScore({ correct: currentScore, total: examQuestions.length });
    setCategoryScores(catScores);
    setIsSubmitted(true);
    setAppState('summary');
  };

  const setAnswer = (id: string, value: any) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const checkIsAnswered = (q: Question) => {
    const ans = answers[q.id];
    if (q.type === 'single') return !!ans;
    if (q.type === 'multiple') return ans?.length > 0;
    if (q.type === 'fill') return ans?.length === q.blanks.length && !ans.includes(undefined) && !ans.includes('');
    if (q.type === 'match') return ans && Object.keys(ans).length === q.pairs.length;
    if (q.type === 'true_false') return ans !== undefined;
    return false;
  };

  const getCompletionRate = () => {
    if (examQuestions.length === 0) return 0;
    const answeredCount = examQuestions.filter(q => checkIsAnswered(q)).length;
    return Math.round((answeredCount / examQuestions.length) * 100);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'methodology': return 'Phương pháp và Phương pháp luận';
      case 'prompting_basics': return 'Kiến thức kỹ thuật Prompting';
      case 'accuracy': return 'Tính Chính xác của Câu lệnh';
      case 'ethics': return 'Đạo đức, Xã hội & Pháp lý';
      default: return cat;
    }
  };

  if (appState === 'summary') {
    const unanswered = examQuestions.filter(q => !checkIsAnswered(q)).length;
    const incorrect = examQuestions.length - score.correct - unanswered;
    const percentage = Math.round((score.correct / examQuestions.length) * 100);

    const weakCategories = Object.keys(categoryScores).filter(cat => {
      const stat = categoryScores[cat];
      return stat.total > 0 && (stat.correct / stat.total) <= 0.6;
    });

    return (
      <div className="w-full h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col items-center overflow-y-auto w-full relative z-10 custom-scrollbar">
        <div className="max-w-4xl w-full p-4 md:p-8 flex flex-col gap-8 min-h-full">
          
          <div className="text-center mt-8">
            <h1 className="text-3xl font-bold text-white mb-2">Báo cáo Kết quả Bài thi</h1>
            <p className="text-slate-400">Học viên: <span className="text-sky-400 font-semibold">{studentName}</span></p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Điểm số</span>
              <span className="text-4xl font-mono font-bold text-sky-400">{percentage}%</span>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
              <span className="text-sm font-bold text-emerald-500/70 uppercase tracking-widest mb-2">Đúng</span>
              <span className="text-4xl font-mono font-bold text-emerald-400">{score.correct} <span className="text-xl text-emerald-600">/ {examQuestions.length}</span></span>
            </div>
            <div className="bg-rose-900/20 border border-rose-500/30 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
              <span className="text-sm font-bold text-rose-500/70 uppercase tracking-widest mb-2">Sai</span>
              <span className="text-4xl font-mono font-bold text-rose-400">{incorrect}</span>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Chưa làm</span>
              <span className="text-4xl font-mono font-bold text-slate-400">{unanswered}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Đánh giá & Khuyến nghị</h2>
            
            {weakCategories.length === 0 ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-400 font-medium">Chúc mừng! Bạn có một nền tảng kiến thức tuyệt vời và trả lời rất tốt trên tất cả các miền kiến thức về AI tạo sinh. Tiếp tục phát huy nhé!</p>
              </div>
            ) : (
              <div className="mb-6 pb-6 border-b border-slate-800">
                <p className="text-slate-300 mb-4">Để cải thiện kỹ năng, bạn nên hệ thống và ôn tập lại các lĩnh vực sau:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weakCategories.map(cat => (
                    <div key={cat} className="flex flex-col bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <span className="text-sky-400 font-bold mb-1 uppercase text-sm tracking-wider">{getCategoryLabel(cat)}</span>
                      <span className="text-slate-400 text-sm">Đúng {categoryScores[cat].correct}/{categoryScores[cat].total} câu hỏi (Tỷ lệ: {Math.round((categoryScores[cat].correct / categoryScores[cat].total) * 100)}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center">
              <button 
                onClick={() => setAppState('exam')}
                className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
              >
                Xem chi tiết câu hỏi
              </button>
              <button 
                onClick={() => setAppState('intro')}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all border border-slate-700"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'auth') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen bg-[#0f172a]">
        <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-10 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Xác thực người dùng</h2>
          <p className="text-slate-400 mb-8 text-sm">
            Vui lòng nhập API Key của bạn để truy cập vào hệ thống bài thi.
          </p>
          <div className="mb-6 text-left">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Nhập API Key..."
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors placeholder:text-slate-600"
            />
          </div>
          <button 
            onClick={() => {
              if (apiKey.trim().length > 5) {
                setAppState('intro');
              } else {
                alert('API Key không hợp lệ. Vui lòng kiểm tra lại.');
              }
            }}
            className="w-full px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
          >
            Xác nhận & Bắt đầu
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'intro') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen">
        <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 p-10 rounded-2xl shadow-2xl text-center">
          <div className="inline-flex items-center justify-center p-4 bg-sky-500/20 border border-sky-500/30 rounded-xl mb-6 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <BookOpen className="w-10 h-10 text-sky-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Chứng chỉ AI Tạo sinh</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Hệ thống bài thi đánh giá toàn diện 4 nhóm kiến thức trọng tâm về AI tạo sinh:
            <br />1. Phương pháp luận
            <br />2. Kiến thức kỹ thuật Prompting
            <br />3. Tính chính xác của Prompt
            <br />4. Tác động đạo đức & pháp lý
          </p>

          <div className="max-w-sm mx-auto mb-8 text-left">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Họ và Tên học viên</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10 text-left cursor-default max-w-sm mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center border-t-2 border-t-sky-500">
              <div className="text-sky-400 font-mono text-xl font-bold mb-1">{EXAM_MINUTES} phút</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Thời gian</div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center border-t-2 border-t-indigo-500">
              <div className="text-indigo-400 font-mono text-xl font-bold mb-1">Max 45 câu</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Số lượng</div>
            </div>
          </div>
          <button 
            onClick={startExam}
            className="px-10 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all transform hover:scale-105"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentIdx];
  const completionRate = getCompletionRate();
  const allAnswered = completionRate === 100;

  // Resolve component mappings here purely for rendering convenience
  let Component: React.FC<any> = () => null;
  if (currentQ?.type === 'single') Component = SingleChoice;
  if (currentQ?.type === 'multiple') Component = MultipleChoice;
  if (currentQ?.type === 'fill') Component = FillBlank;
  if (currentQ?.type === 'match') Component = Match;
  if (currentQ?.type === 'true_false') Component = TrueFalseChoice;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'single': return 'Dạng 1: Chọn một';
      case 'multiple': return 'Dạng 2: Chọn nhiều';
      case 'fill': return 'Dạng 3: Điền từ';
      case 'match': return 'Dạng 4: Ghép cặp';
      case 'true_false': return 'Dạng 5: Đúng / Sai';
      default: return '';
    }
  };

  let checkIsOk = false;
  if (isSubmitted && currentQ) {
      const userAns = answers[currentQ.id];
      if (currentQ.type === 'single') checkIsOk = userAns === currentQ.correctAnswer;
      if (currentQ.type === 'multiple') checkIsOk = JSON.stringify([...(userAns||[])].sort()) === JSON.stringify([...currentQ.correctAnswers].sort());
      if (currentQ.type === 'fill') checkIsOk = currentQ.blanks.every((b, i) => userAns?.[i] === b.correctAnswer);
      if (currentQ.type === 'match') checkIsOk = currentQ.pairs.every(p => userAns?.[p.left] === p.right);
      if (currentQ.type === 'true_false') checkIsOk = userAns === currentQ.correctAnswer;
  }

  return (
    <div className="w-full h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col overflow-hidden relative">
      
      {showCheatModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-rose-500/50 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Cảnh báo gian lận ({cheatWarnings}/3)</h2>
            <p className="text-slate-300 text-sm mb-6">
              Hệ thống phát hiện bạn vừa chuyển cửa sổ hoặc tab khác. Vui lòng tập trung làm bài. Nếu vi phạm quá 3 lần, bài thi sẽ tự động kết thúc.
            </p>
            <button 
              onClick={() => setShowCheatModal(false)}
              className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white rounded-lg font-bold transition-all w-full"
            >
              Tôi đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 lg:px-8 bg-slate-900/50 flex-shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-500 rounded-lg hidden md:flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => setAppState('intro')}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm md:text-lg font-semibold text-white truncate max-w-xs md:max-w-md">Gen AI: Tổng hợp 4 miền</h1>
            <p className="text-[10px] md:text-xs text-sky-400 uppercase tracking-widest truncate">{studentName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {!isSubmitted && (
             <div className="text-right">
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">Thời gian còn lại</p>
              <p className={`text-lg md:text-xl font-mono font-bold ${timeRemaining < 300 ? 'text-rose-400' : 'text-sky-400'}`}>
                {formatTime(timeRemaining)}
              </p>
            </div>
          )}
         
          <button 
            onClick={isSubmitted ? () => setAppState('summary') : calculateScore}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-colors shadow-lg text-sm md:text-base ${
              isSubmitted 
                ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600' 
                : allAnswered
                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/20'
                  : 'bg-slate-800 text-sky-500 border border-sky-900/50 hover:bg-slate-700'
            }`}
          >
            {isSubmitted ? 'Quay lại Tổng kết' : 'Nộp bài'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Sidebar: Question Navigator */}
        <aside className="hidden lg:flex w-72 border-r border-slate-800 bg-slate-900/30 p-6 flex-col gap-6 overflow-y-auto z-10 custom-scrollbar">
          {!isSubmitted ? (
            <>
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Tiến độ</h3>
                <div className="grid grid-cols-5 gap-2">
                  {examQuestions.map((q, idx) => {
                    const isAnswered = checkIsAnswered(q);
                    const isCurrent = idx === currentIdx;
                    return (
                      <div 
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 w-10 rounded text-sm flex items-center justify-center font-bold cursor-pointer transition-colors ${
                          isCurrent 
                            ? 'border border-sky-500 bg-sky-500 text-white' 
                            : isAnswered
                              ? 'border border-sky-500/50 bg-sky-500/10 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.05)]'
                              : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-800/40 rounded-xl border border-slate-700 sticky bottom-0">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Tỷ lệ hoàn thành</span>
                  <span className="text-sky-400 font-bold">{completionRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${completionRate}%` }}></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-6 w-full items-center justify-start py-2">
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 w-full text-center">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Kết quả của {studentName}</h3>
                 <div className="text-4xl font-mono font-bold text-sky-400 mb-2">
                    {score.correct} <span className="text-lg text-slate-500">/ {examQuestions.length}</span>
                 </div>
                 <div className="text-sm font-medium text-slate-400">
                    ({Math.round((score.correct / examQuestions.length) * 100)}%)
                 </div>
              </div>

               <div className="w-full">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Chi tiết</h3>
                <div className="grid grid-cols-5 gap-2">
                  {examQuestions.map((q, idx) => {
                     let ok = false;
                     const userAns = answers[q.id];
                     if (q.type === 'single') ok = userAns === q.correctAnswer;
                     if (q.type === 'multiple') ok = JSON.stringify([...(userAns||[])].sort()) === JSON.stringify([...q.correctAnswers].sort());
                     if (q.type === 'fill') ok = q.blanks.every((b, i) => userAns?.[i] === b.correctAnswer);
                     if (q.type === 'match') ok = q.pairs.every(p => userAns?.[p.left] === p.right);
                     if (q.type === 'true_false') ok = userAns === q.correctAnswer;

                     const isCurrent = idx === currentIdx;

                    return (
                      <div 
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 w-10 rounded text-sm flex items-center justify-center font-bold cursor-pointer transition-colors ${
                          ok
                             ? isCurrent ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 ring-offset-2 ring-offset-slate-900 border border-transparent' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                             : isCurrent ? 'bg-rose-500 text-white ring-2 ring-rose-300 ring-offset-2 ring-offset-slate-900 border border-transparent' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 flex flex-col gap-6 custom-scrollbar relative z-10 w-full min-w-0">
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="px-2 md:px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded text-[10px] md:text-xs font-bold uppercase tracking-tighter shadow-[0_0_10px_rgba(56,189,248,0.05)]">
              {getTypeLabel(currentQ.type)}
            </span>
             <span className="px-2 md:px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded text-[10px] md:text-xs font-bold uppercase tracking-tighter">
              {getCategoryLabel(currentQ.category)}
            </span>
            <h2 className="text-lg md:text-xl font-medium text-white w-full sm:w-auto mt-2 sm:mt-0">Câu hỏi {currentIdx + 1}</h2>
          </div>

          <div className={`bg-slate-800/30 border rounded-2xl p-5 md:p-8 flex flex-col gap-6 flex-1 shadow-sm transition-colors duration-300 ${isSubmitted ? (checkIsOk ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.05)]') : 'border-slate-700'}`}>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-normal">
              {currentQ.text}
            </p>
            
            <div className="mt-2">
               <Component
                  question={currentQ}
                  value={answers[currentQ.id]}
                  onChange={(val: any) => setAnswer(currentQ.id, val)}
                  disabled={isSubmitted}
                  showResult={isSubmitted}
                />
            </div>

             <AnimatePresence>
                {isSubmitted && currentQ.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-900/50 py-4 px-6 rounded-xl border border-dashed border-slate-700 text-slate-300">
                      <p className="font-semibold text-sky-400 mb-2 flex items-center gap-2 text-xs uppercase tracking-widest">
                         Giải thích chi tiết
                      </p>
                      <p className="leading-relaxed text-sm md:text-base">{currentQ.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

          </div>

          {/* Navigation Buttons within Content Area */}
          <div className="flex justify-between items-center mt-auto pt-4 pb-10 md:pb-0">
            <button 
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-4 md:px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Câu trước</span>
            </button>
             
            {/* Mobile Question Indicator */}
            <div className="lg:hidden text-slate-500 font-mono text-sm">
                {currentIdx + 1} / {examQuestions.length}
            </div>

            <button 
              onClick={() => setCurrentIdx(Math.min(examQuestions.length - 1, currentIdx + 1))}
              disabled={currentIdx === examQuestions.length - 1}
               className="px-4 md:px-10 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
            >
             <span className="hidden sm:inline">Câu tiếp</span> <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="h-8 bg-slate-950 border-t border-slate-800 flex items-center px-4 md:px-8 justify-between text-[10px] text-slate-500 flex-shrink-0 relative z-20">
        <span>Exam ID: GENAI-CERT-2024</span>
        <div className="hidden sm:flex gap-4">
          <span>Student: {studentName || 'Not identified'}</span>
          <span>Warnings: {cheatWarnings}/3</span>
        </div>
      </footer>
    </div>
  );
}

