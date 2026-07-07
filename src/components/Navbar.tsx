import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type NavItemKey = 'about' | 'projects' | 'achievements' | 'contacts';

type NavItem = {
    key: NavItemKey;
    label: string;
};

const NAV_ITEMS: NavItem[] = [
    { key: 'about', label: 'About Me' },
    { key: 'projects', label: 'Projects' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'contacts', label: 'Contacts' },
];

type NavbarProps = {
    activeSection: NavItemKey;
    setActiveSection: (section: NavItemKey) => void;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    handleNavClick: (section: NavItemKey) => void;
};

function Navbar({
                    activeSection,
                    setActiveSection,
                    drawerOpen,
                    setDrawerOpen,
                }: NavbarProps) {
    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md bg-[#0c0d14]/95 border-white/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => {
                            setActiveSection('about');
                            setDrawerOpen(false);
                        }}
                    >
                        <span className="font-black tracking-tighter text-base text-white group-hover:text-emerald-400 transition-colors">
                          rutra.me
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                        <div className="flex gap-0.5">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setActiveSection(item.key as NavItemKey)}
                                    className={cn(
                                        'relative px-4 py-2 text-xs font-mono font-bold tracking-wider transition-colors',
                                        activeSection === item.key ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                                    )}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {activeSection === item.key && (
                                        <motion.span
                                            layoutId="nav-active-box"
                                            className="absolute inset-0 border-t-2 border-emerald-500 bg-slate-900/60"
                                            transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className="sm:hidden p-2 text-slate-400 hover:text-white transition-colors z-50 relative"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        aria-label="Toggle Menu"
                    >
                        {drawerOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 right-0 bottom-0 w-64 bg-[#0c0d14]/98 border-l border-white/5 z-40 sm:hidden flex flex-col pt-24 px-4 gap-2 shadow-2xl"
                        >
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        setActiveSection(item.key);
                                        setDrawerOpen(false);
                                    }}
                                    className={cn(
                                        'w-full text-left px-4 py-3 text-sm font-mono font-bold tracking-wider rounded-md transition-colors',
                                        activeSection === item.key
                                            ? 'bg-slate-900/60 text-emerald-400 border-l-2 border-emerald-500'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;