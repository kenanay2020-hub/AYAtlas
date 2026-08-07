import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layers, Compass, GitCommit, ShieldCheck, BookOpen, Calendar, Flag, Network, Server, HelpCircle, AlertOctagon, Lock, Activity, History } from 'lucide-react';
export const Navbar = ({ activeTab, setActiveTab, headSha, currentPhase, }) => {
    const tabs = [
        { id: 'overview', label: 'Atlas Overview', icon: Compass },
        { id: 'health', label: 'Health & Trust', icon: Activity },
        { id: 'timeline', label: 'Timeline', icon: History },
        { id: 'graph', label: 'Governance Graph', icon: Network },
        { id: 'query', label: 'Query Console', icon: HelpCircle },
        { id: 'drift', label: 'Drift Inspector', icon: AlertOctagon },
        { id: 'repo-intel', label: 'Repo Intelligence', icon: Server },
        { id: 'architecture', label: 'Architecture Map', icon: Layers },
        { id: 'phases', label: 'Phases', icon: Flag },
        { id: 'evidence', label: 'Evidence Boundary', icon: ShieldCheck },
        { id: 'roadmaps', label: 'Roadmaps', icon: Calendar },
        { id: 'learning', label: 'Learning Center', icon: BookOpen },
    ];
    return (_jsx("header", { className: "sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80 px-6 py-3", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20", children: _jsx(Compass, { className: "h-5 w-5 text-white" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-bold text-lg text-slate-100 tracking-tight", children: "AYAtlas" }), _jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono", children: "v1.0 Platform" })] }), _jsx("p", { className: "text-xs text-slate-400", children: "Architecture Intelligence Platform for AykenOS" })] })] }), _jsx("nav", { className: "flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800", children: tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`, children: [_jsx(Icon, { className: "h-3.5 w-3.5" }), _jsx("span", { children: tab.label })] }, tab.id));
                    }) }), _jsxs("div", { className: "flex items-center space-x-3 text-xs font-mono", children: [_jsxs("div", { className: "flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800", children: [_jsx("span", { className: "text-slate-400", children: "Target:" }), _jsx("span", { className: "text-cyan-400 font-semibold", children: "kenanay/AykenOS" }), _jsx("span", { className: "text-slate-600", children: "|" }), _jsx(GitCommit, { className: "h-3.5 w-3.5 text-indigo-400" }), _jsx("span", { className: "text-indigo-300", children: headSha.slice(0, 8) }), _jsx("span", { className: "text-slate-600", children: "|" }), _jsxs("span", { className: "text-emerald-400 font-bold", children: ["Phase-", currentPhase] })] }), _jsxs("div", { className: "flex items-center space-x-1.5 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400", children: [_jsx(Lock, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "font-semibold text-[11px]", children: "READ-ONLY ISOLATED" })] })] })] }) }));
};
//# sourceMappingURL=Navbar.js.map