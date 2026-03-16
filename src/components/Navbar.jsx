import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { key: 'about', label: 'About Me' },
  { key: 'projects', label: 'Projects' },
  { key: 'contacts', label: 'Contacts' },
];

function Navbar({ activeSection, setActiveSection, drawerOpen, setDrawerOpen, handleNavClick }) {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/5 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-violet-400 font-bold text-lg tracking-tight select-none">rutra.me</span>

          {/* Desktop nav */}
          <div className="hidden sm:flex gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  activeSection === item.key
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                )}
              >
                {item.label}
                {activeSection === item.key && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-0 rounded-md bg-violet-600/20 border border-violet-500/30 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="sm:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
          >
            {drawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 sm:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-56 z-50 bg-slate-950 border-l border-white/10 flex flex-col pt-20 px-4 gap-2 sm:hidden"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors',
                    activeSection === item.key
                      ? 'bg-violet-600/20 text-white border border-violet-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
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

