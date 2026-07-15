import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Users, User, Cpu, Github, Code2 } from 'lucide-react';

type ProjectType = 'personal' | 'group';

type ProjectAchievement = {
    icon: any;
    color: string;
    label: string;
};

type ProjectMedia = {
    type: 'image' | 'video';
    src: string;
    caption?: string;
};

export type Project = {
    title: string;
    description: string;
    link: string;
    demoLink?: string;
    demoLabel?: string;
    tags: string[];
    projectType: ProjectType;
    featured?: boolean;
    achievement?: ProjectAchievement;
    detail?: string;
    media?: ProjectMedia[];
};

type Props = {
    project: Project | null;
    mediaIndex: number;
    onClose: () => void;
    onMediaPrev: () => void;
    onMediaNext: () => void;
};

export default function ProjectDialog({
                                          project,
                                          mediaIndex,
                                          onClose,
                                          onMediaPrev,
                                          onMediaNext,
                                      }: Props) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (project) {
            setTimeout(() => closeRef.current?.focus(), 50);
        }
    }, [project?.title]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!project) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
                return;
            }

            const media = project.media ?? [];
            if (media.length > 1) {
                if (e.key === 'ArrowRight') { e.preventDefault(); onMediaNext(); return; }
                if (e.key === 'ArrowLeft')  { e.preventDefault(); onMediaPrev(); return; }
            }

            if (e.key === 'Tab' && dialogRef.current) {
                const focusable = Array.from(
                    dialogRef.current.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    )
                );
                if (!focusable.length) return;
                const first = focusable[0];
                const last  = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault(); last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault(); first.focus();
                }
            }
        },
        [project, onClose, onMediaNext, onMediaPrev]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        document.body.style.overflow = project ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [!!project]);

    const media      = project?.media ?? [];
    const hasMedia   = media.length > 0;
    const currentMedia = media[mediaIndex];

    return (
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    <motion.div
                        key="dialog"
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-dialog-title"
                        initial={{ opacity: 0, scale: 0.99, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none font-mono"
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] rounded-none border border-slate-800 bg-[#0d0e15] shadow-2xl overflow-hidden pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 h-9 bg-slate-950 border-b border-white/5 select-none">
                                <span className="text-[10px] text-slate-500 font-bold tracking-wider">
                                    Project Info
                                </span>
                                <button
                                    ref={closeRef}
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="w-5 h-5 flex items-center justify-center border border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all text-xs rounded-none bg-transparent"
                                >
                                    <X size={12} />
                                </button>
                            </div>

                            <div className={`grid h-full ${hasMedia ? 'md:grid-cols-[1.2fr_1fr]' : 'grid-cols-1'} max-h-[calc(90vh-2.25rem)]`}>

                                {hasMedia && (
                                    <div className="flex flex-col border-r border-slate-800 min-h-0 bg-black/40">
                                        <div className="relative flex-1 grid place-items-center min-h-60 max-h-105 md:max-h-none overflow-hidden">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={mediaIndex}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="w-full h-full flex items-center justify-center"
                                                >
                                                    {currentMedia?.type === 'video' ? (
                                                        <iframe
                                                            src={currentMedia.src}
                                                            title={`${project.title} video`}
                                                            className="w-full h-full min-h-75 border-0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <img
                                                            src={currentMedia?.src}
                                                            alt={currentMedia?.caption || `${project.title} screenshot`}
                                                            className="w-full h-full object-contain bg-slate-950/40"
                                                        />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Step Control Switches */}
                                            {media.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={onMediaPrev}
                                                        aria-label="Previous Frame"
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all rounded-none"
                                                    >
                                                        <ChevronLeft size={12} />
                                                    </button>
                                                    <button
                                                        onClick={onMediaNext}
                                                        aria-label="Next Frame"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all rounded-none"
                                                    >
                                                        <ChevronRight size={12} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Frame Telemetry Status Line */}
                                        <div className="px-4 py-2 border-t border-slate-800 flex items-center justify-between gap-4 text-[10px]">
                                            {currentMedia?.caption ? (
                                                <span className="text-slate-500 font-mono tracking-wide truncate">
                                                    {currentMedia.caption}
                                                </span>
                                            ) : (
                                                <span className="text-slate-600 font-mono tracking-wide">
                                                    // NO_CAPTION_DATA
                                                </span>
                                            )}
                                            {media.length > 1 && (
                                                <span className="text-emerald-500 font-bold shrink-0">
                                                    Frame {mediaIndex + 1}/{media.length}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 p-5 overflow-y-auto bg-[#0a0b10]">
                                    <div className="flex items-center gap-3 text-[10px] text-slate-500 border-b border-white/5 pb-2">
                                        <div className="flex items-center gap-1 font-bold">
                                            {project.projectType === 'personal' ? <User size={11} /> : <Users size={11} />}
                                            <span>Type: {project.projectType}</span>
                                        </div>
                                    </div>

                                    <h2 id="project-dialog-title" className="text-xl font-black text-slate-100 tracking-tight">
                                        {project.title}
                                    </h2>

                                    <div className="text-xs text-slate-400 leading-relaxed space-y-3 font-mono">
                                        <p>{project.description}</p>
                                        {project.detail && (
                                            <p className="border-l border-slate-800 pl-3 text-slate-500">
                                                {project.detail}
                                            </p>
                                        )}
                                    </div>

                                    {project.achievement && (() => {
                                        const AchIcon = project.achievement.icon;
                                        return (
                                            <div className="text-[11px] font-bold border border-emerald-500/10 bg-emerald-950/10 p-2 text-slate-300 flex items-center gap-2">
                                                {AchIcon && <AchIcon size={12} className={project.achievement.color} />}
                                                <span>{project.achievement.label}</span>
                                            </div>
                                        );
                                    })()}

                                    <div className="flex flex-wrap gap-1 py-1">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-none"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-emerald-500/30 bg-emerald-950/10 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 hover:border-emerald-400 transition-all rounded-none"
                                        >
                                            <Code2 size={11} />
                                            Source Code
                                        </a>

                                        {project.demoLink && (
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-slate-700 bg-slate-900/40 text-slate-200 text-xs font-bold hover:bg-slate-800/60 hover:border-slate-500 transition-all rounded-none"
                                            >
                                                {project.demoLabel ?? 'Live Demo'}
                                                <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}