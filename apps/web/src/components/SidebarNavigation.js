import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LayoutDashboard, Activity, GitCommit, Layers, Network, HelpCircle, AlertOctagon, GitBranch, ShieldCheck, Map, BookOpen, ChevronRight, UserCheck, Cpu, PlayCircle, CheckSquare, X, } from 'lucide-react';
export const SidebarNavigation = ({ activeTab, setActiveTab, isOpen, onCloseMobile, }) => {
    const menuGroups = [
        {
            groupTitle: 'OBSERVE',
            items: [
                { id: 'overview', label: 'Atlas Overview', icon: LayoutDashboard },
                { id: 'health', label: 'Health & Trust', icon: Activity },
                { id: 'timeline', label: 'Evolution Timeline', icon: GitCommit },
            ],
        },
        {
            groupTitle: 'EXPLORE',
            items: [
                { id: 'technical-atlas', label: 'AykenOS Technical Atlas', icon: Cpu },
                { id: 'execution-flow', label: 'Execution Flow Canvas', icon: PlayCircle },
                { id: 'architecture', label: 'Architecture Map', icon: Layers },
                { id: 'graph', label: 'Governance Graph', icon: Network },
                { id: 'phases', label: 'Phase Catalog', icon: GitBranch },
                { id: 'evidence', label: 'Evidence Boundary', icon: ShieldCheck },
            ],
        },
        {
            groupTitle: 'ANALYZE',
            items: [
                { id: 'ci-verifier', label: 'CI Verifier Gates', icon: CheckSquare },
                { id: 'query', label: 'Constitutional Query', icon: HelpCircle },
                { id: 'drift', label: 'Drift & Contradiction', icon: AlertOctagon },
                { id: 'repo-intel', label: 'Repo Intelligence', icon: GitCommit },
            ],
        },
        {
            groupTitle: 'LEARN & PLAN',
            items: [
                { id: 'learning', label: 'Learning Center', icon: BookOpen },
                { id: 'roadmaps', label: 'Roadmaps', icon: Map },
            ],
        },
    ];
    if (!isOpen)
        return null;
    const handleItemClick = (tabId) => {
        setActiveTab(tabId);
        if (onCloseMobile) {
            onCloseMobile();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { onClick: onCloseMobile, className: "lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity" }), _jsxs("aside", { className: "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-screen lg:min-h-[calc(100vh-3.5rem)] font-mono shadow-2xl lg:shadow-none transition-transform", children: [_jsxs("div", { className: "lg:hidden flex items-center justify-between p-4 border-b border-slate-800", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-bold text-sm bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent", children: "AYAtlas" }), _jsx("span", { className: "text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700", children: "v1.0" })] }), _jsx("button", { onClick: onCloseMobile, className: "p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("div", { className: "p-4 space-y-6 flex-1 overflow-y-auto", children: menuGroups.map((group) => (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-[10px] font-bold text-slate-500 tracking-wider px-2", children: group.groupTitle }), _jsx("div", { className: "space-y-1", children: group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeTab === item.id;
                                        return (_jsxs("button", { onClick: () => handleItemClick(item.id), className: `w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${isActive
                                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold shadow-sm'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`, children: [_jsxs("div", { className: "flex items-center space-x-2.5", children: [_jsx(Icon, { className: `h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}` }), _jsx("span", { children: item.label })] }), isActive && _jsx(ChevronRight, { className: "h-3.5 w-3.5 text-cyan-400" })] }, item.id));
                                    }) })] }, group.groupTitle))) }), _jsxs("div", { className: "p-4 border-t border-slate-800 text-[10px] text-slate-400 space-y-1.5 bg-slate-950/60", children: [_jsxs("div", { className: "flex items-center space-x-1.5 text-cyan-300 font-bold", children: [_jsx(UserCheck, { className: "h-3.5 w-3.5 text-cyan-400" }), _jsx("span", { children: "Geli\u015Ftiren / Mimar: Kenan AY" })] }), _jsxs("div", { children: ["Target Repository: ", _jsx("strong", { className: "text-slate-300", children: "kenanay/AykenOS" })] }), _jsxs("div", { children: ["Constitution: ", _jsx("strong", { className: "text-emerald-400", children: "Ratified Phase-24" })] })] })] })] }));
};
//# sourceMappingURL=SidebarNavigation.js.map