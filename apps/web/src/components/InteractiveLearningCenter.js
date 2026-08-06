import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BookOpen, HelpCircle, Award, RefreshCw } from 'lucide-react';
import { CONCEPT_GLOSSARY } from '../context/SnapshotContext';
export const InteractiveLearningCenter = () => {
    const [activeLessonId, setActiveLessonId] = useState('lesson-1');
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResult, setShowQuizResult] = useState(false);
    const lessons = [
        {
            id: 'lesson-1',
            titleTr: '1. Politika vs Mekanizma Ayrımı (Ring0 vs Ring3)',
            titleEn: '1. Mechanism vs Policy Separation',
            descTr: 'AykenOS çekirdeği (Ring0) yalnızca donanım yürütmesi sağlar. Tüm iş mantığı ve politikalar kullanıcı alanındadır (Ring3).',
            descEn: 'Kernel mechanisms provide hardware isolation. Business policy rules reside strictly outside the kernel.',
            glossaryKey: 'ring0',
        },
        {
            id: 'lesson-2',
            titleTr: '2. Yeni Kod Varlığı ≠ Yetki Devri',
            titleEn: '2. Code Existence != Authority Grant',
            descTr: 'Bir kaynak dosyasının repoya eklenmiş olması, o kodun sistemde hemen yetkili çalışacağı anlamına gelmez (grantsNewAuthority = false).',
            descEn: 'Code presence in Git tree does NOT infer or grant runtime authority until ratified by Phase decisions.',
            glossaryKey: 'authority',
        },
        {
            id: 'lesson-3',
            titleTr: '3. Kabul Edilmiş Kanıt Sınırı (Accepted Evidence)',
            titleEn: '3. Accepted Evidence Boundary',
            descTr: 'Bir testin başarılı olması (Validator PASS) yetmez; doğrulama çıktısı exact-subject commit SHA ile bağlanmalıdır.',
            descEn: 'Validator PASS != Accepted Evidence. Accepted evidence requires exact-subject SHA binding.',
            glossaryKey: 'evidence',
        },
        {
            id: 'lesson-4',
            titleTr: '4. Dondurulmuş Sistem Çağrısı Arayüzü (Frozen ABI)',
            titleEn: '4. Frozen Syscall ABI',
            descTr: 'Ring3 ile Ring0 arasındaki shared/abi arayüzü anayasal olarak dondurulmuştur. Yetkisiz değişiklik CRITICAL_ABI_FREEZE_VIOLATION üretir.',
            descEn: 'Syscall ABI under shared/abi is frozen. Unauthorized modifications trigger critical ABI violations.',
            glossaryKey: 'abi',
        },
    ];
    const quizQuestions = [
        {
            id: 1,
            questionTr: 'AykenOS deposuna yeni bir C/Rust dosyası eklendiğinde bu kod hemen çalışabilme yetkisi kazanır mı?',
            questionEn: 'Does adding a new C/Rust file to the repository grant active execution authority?',
            options: [
                'Evet, derlendiği an otomatik yetki kazanır.',
                'Hayır! Yeni kod varlığı otomatik yetki devretmez (grantsNewAuthority = false).',
                'Yalnızca Ring0 kodları yetki kazanır.',
            ],
            correctAnswer: 1,
            explanationTr: 'Doğru! AykenOS Anayasası uyarınca "Newly detected code != Authority grant" kuralı geçerlidir.',
        },
        {
            id: 2,
            questionTr: 'Bir birim testinin (vitest / proofd) PASS olarak tamamlanması doğrudan "Kabul Edilmiş Kanıt" mıdır?',
            questionEn: 'Is a test PASS output automatically an Accepted Evidence claim?',
            options: [
                'Evet, PASS testi kanıt için yeterlidir.',
                'Hayır! Doğrulayıcı çıktısı exact-subject commit SHA ile bağlanmalı ve Faz-24 kararlarıyla onaylanmalıdır.',
                'Yalnızca CI ortamında PASS olması yeterlidir.',
            ],
            correctAnswer: 1,
            explanationTr: 'Doğru! Validator PASS != Accepted Evidence. Exact-subject SHA bağlama zorunludur.',
        },
        {
            id: 3,
            questionTr: 'Ring0 çekirdeği içerisinde iş mantığı (business policy) kodlanabilir mi?',
            questionEn: 'Can domain policy rules be embedded directly inside the Ring0 kernel?',
            options: [
                'Evet, performans için çekirdekte tutulmalıdır.',
                'Hayır! Policy ve Mechanism tamamen ayrıdır; politika kuralları Ring3 alanındadır.',
                'Yalnızca güvenlik kuralları çekirdekte tutulur.',
            ],
            correctAnswer: 1,
            explanationTr: 'Doğru! Policy != Mechanism. Çekirdek yalnızca saf yürütme mekanizması sağlar.',
        },
    ];
    const selectedLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
    const glossaryItem = CONCEPT_GLOSSARY[selectedLesson.glossaryKey];
    const calculateScore = () => {
        let score = 0;
        quizQuestions.forEach((q) => {
            if (quizAnswers[q.id] === q.correctAnswer) {
                score += 1;
            }
        });
        return score;
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(BookOpen, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "AykenOS Deep Learning Center & Interactive Quizzes" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Guided educational paths, bilingual concept explanations (T\u00FCrk\u00E7e/English), and constitutional understanding quizzes." })] }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs", children: [_jsx(Award, { className: "h-4 w-4 text-amber-400" }), _jsxs("span", { children: ["Quiz Score: ", _jsxs("strong", { className: "text-amber-400", children: [calculateScore(), " / ", quizQuestions.length] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-xs font-bold text-slate-400 tracking-wider", children: "GUIDED LESSON PATHS" }), lessons.map((lesson) => {
                                const isActive = activeLessonId === lesson.id;
                                return (_jsxs("div", { onClick: () => setActiveLessonId(lesson.id), className: `p-4 rounded-xl border cursor-pointer transition-all ${isActive
                                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md'
                                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'}`, children: [_jsx("div", { className: "font-bold text-xs", children: lesson.titleTr }), _jsx("div", { className: "text-[11px] text-slate-400 mt-1", children: lesson.titleEn })] }, lesson.id));
                            })] }), _jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4", children: [_jsx("h3", { className: "text-base font-bold text-slate-100 border-b border-slate-800 pb-2", children: selectedLesson.titleTr }), _jsxs("div", { className: "space-y-3 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "T\u00FCrk\u00E7e A\u00E7\u0131klama:" }), _jsx("p", { className: "mt-1 text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800", children: selectedLesson.descTr })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "Technical Detail (English):" }), _jsx("p", { className: "mt-1 text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800", children: selectedLesson.descEn })] }), glossaryItem && (_jsxs("div", { className: "p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg space-y-1", children: [_jsxs("div", { className: "font-bold text-cyan-300", children: ["Code Reference: ", glossaryItem.codePath] }), _jsx("p", { className: "text-[11px] text-cyan-200", children: glossaryItem.techDef })] }))] })] }), _jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-2", children: [_jsx(HelpCircle, { className: "h-4 w-4 text-amber-400" }), _jsx("h3", { className: "font-bold text-sm text-slate-100", children: "Interactive Constitutional Quiz" })] }), _jsx("div", { className: "mt-4 space-y-5", children: quizQuestions.map((q) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-xs font-bold text-slate-200", children: [q.id, ". ", q.questionTr] }), _jsx("div", { className: "space-y-1", children: q.options.map((opt, optIdx) => {
                                                        const isSelected = quizAnswers[q.id] === optIdx;
                                                        return (_jsx("button", { onClick: () => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx }), className: `w-full text-left p-2.5 rounded text-xs transition-colors ${isSelected
                                                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                                                                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'}`, children: opt }, optIdx));
                                                    }) }), quizAnswers[q.id] !== undefined && (_jsx("div", { className: `p-2 rounded text-[11px] ${quizAnswers[q.id] === q.correctAnswer
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/30'}`, children: quizAnswers[q.id] === q.correctAnswer
                                                        ? q.explanationTr
                                                        : `Yanlış! Doğru cevap: ${q.options[q.correctAnswer]}` }))] }, q.id))) })] }), _jsxs("div", { className: "pt-4 border-t border-slate-800 flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-slate-400", children: "Answer all questions to complete path" }), _jsxs("button", { onClick: () => setQuizAnswers({}), className: "flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Reset Quiz" })] })] })] })] })] }));
};
//# sourceMappingURL=InteractiveLearningCenter.js.map