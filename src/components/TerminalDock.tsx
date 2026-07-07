import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Terminal, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';

type TerminalDockProps = {
    onNavigate: (section: 'about' | 'projects' | 'contacts' | 'achievements') => void;
};

export default function TerminalDock({ onNavigate }: TerminalDockProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'RutraConsole - Type "help" for a list of commands.',
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isOpen]);

    const handleCommand = (e: FormEvent) => {
        e.preventDefault();
        const cleanCmd = input.trim().toLowerCase();
        if (!cleanCmd) return;

        let reply = `Command not recognized: "${cleanCmd}". Type "help" for a list of valid modules.`;
        const logs = [...history, `> ${input}`];

        switch (cleanCmd) {
            case 'help':
                reply = 'Available diagnostics: help | about | projects | awards | contact | clear';
                break;
            case 'about':
                onNavigate('about');
                reply = 'Navigating to about_me';
                break;
            case 'projects':
                onNavigate('projects');
                reply = 'Navigating to projects';
                break;
            case 'achievements':
                onNavigate('achievements');
                reply = 'Navigating to achievements';
                break;
            case 'contact':
                onNavigate('contacts');
                reply = 'Navigating to contacts';
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
        }

        setHistory([...logs, reply]);
        setInput('');
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 px-4 md:px-12 pb-4 pointer-events-none">
            <div className={`max-w-4xl mx-auto border transition-all duration-300 pointer-events-auto shadow-2xl ${
                isOpen ? 'h-56 bg-slate-950/95 border-emerald-500/40' : 'h-10 bg-slate-900/90 border-slate-700/50'
            }`}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between px-4 h-9 border-b border-white/5 cursor-pointer hover:bg-white/5 select-none text-xs"
                >
                    <div className="flex items-center gap-2 text-slate-400 font-mono">
                        <Terminal size={12} className={isOpen ? "text-emerald-400 animate-pulse" : ""} />
                        <span>rutra@rutrash:~{isOpen ? '/console' : ''}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                        <span>[Click to {isOpen ? 'Collapse' : 'Expand'}]</span>
                        {isOpen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                    </div>
                </div>

                {isOpen && (
                    <div className="p-3 text-xs font-mono flex flex-col h-[calc(100%-2.25rem)] justify-between overflow-hidden">
                        <div className="overflow-y-auto pr-1 flex flex-col gap-1 text-slate-300 scrollbar-thin max-h-[125px]">
                            {history.map((line, idx) => (
                                <div key={idx} className={line.startsWith('>') ? "text-emerald-400" : "text-slate-400"}>
                                    {line}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        <form onSubmit={handleCommand} className="flex items-center gap-1 border-t border-white/5 pt-2 mt-1">
                            <ChevronRight size={14} className="text-emerald-400 shrink-0" />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-emerald-400 font-mono focus:ring-0 placeholder-slate-700"
                                placeholder="enter command"
                                autoFocus
                            />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}