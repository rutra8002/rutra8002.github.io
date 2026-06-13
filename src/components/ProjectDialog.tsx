import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Users, User, Trophy, Medal, Cpu } from 'lucide-react';
import { Badge } from './ui/badge';

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
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    <motion.div
                        key="dialog"
                        ref={dialogRef}
                        role="dialog"
                        aria-Dialog="true"
                        aria-labelledby="project-dialog-title"
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/60 overflow-hidden pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                ref={closeRef}
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-slate-400 hover:text-white hover:border-violet-500/50 transition-all"
                            >
                                <X size={16} />
                            </button>

                            <div className={`grid h-full ${hasMedia ? 'md:grid-cols-[1.3fr_1fr]' : 'grid-cols-1'} max-h-[90vh]`}>

                                {hasMedia && (
                                    <div className="flex flex-col border-r border-white/10 min-h-0">
                                        <div className="relative flex-1 bg-slate-900/80 grid place-items-center min-h-60 max-h-105 md:max-h-none overflow-hidden">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={mediaIndex}
                                                    initial={{ opacity: 0, x: 18 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -18 }}
                                                    transition={{ duration: 0.22 }}
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
                                                            className="w-full h-full object-contain"
                                                            style={{ background: 'linear-gradient(135deg, #0d2530, #071820)' }}
                                                        />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>

                                            {media.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={onMediaPrev}
                                                        aria-label="Previous image"
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50 transition-all"
                                                    >
                                                        <ChevronLeft size={16} />
                                                    </button>
                                                    <button
                                                        onClick={onMediaNext}
                                                        aria-label="Next image"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50 transition-all"
                                                    >
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="px-4 py-3 border-t border-white/10 flex flex-col gap-1.5">
                                            {media.length > 1 && (
                                                <div className="flex items-center gap-1.5">
                                                    {media.map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                const diff = i - mediaIndex;
                                                                if (diff > 0) for (let j = 0; j < diff; j++) onMediaNext();
                                                                else for (let j = 0; j < -diff; j++) onMediaPrev();
                                                            }}
                                                            aria-label={`Go to media ${i + 1}`}
                                                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                                                                i === mediaIndex
                                                                    ? 'bg-violet-400 w-4'
                                                                    : 'bg-slate-600 hover:bg-slate-400'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            {currentMedia?.caption && (
                                                <p className="text-xs text-slate-500 font-mono tracking-wide truncate">
                                                    {currentMedia.caption}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-5 p-6 overflow-y-auto">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        {project.projectType === 'personal'
                                            ? <User size={13} />
                                            : <Users size={13} />}
                                        <span className="capitalize">{project.projectType}</span>
                                        {project.featured && (
                                            <>
                                                <span className="text-slate-600">·</span>
                                                <Cpu size={13} className="text-violet-400" />
                                                <span className="text-violet-400">Featured</span>
                                            </>
                                        )}
                                    </div>

                                    <h2
                                        id="project-dialog-title"
                                        className="text-2xl font-bold text-slate-100 leading-tight"
                                    >
                                        {project.title}
                                    </h2>

                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {project.detail && (
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {project.detail}
                                        </p>
                                    )}

                                    {project.achievement && (() => {
                                        const AchIcon = project.achievement.icon;
                                        return (
                                            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                                                <AchIcon size={14} className={project.achievement.color} />
                                                <span className={`text-xs font-medium ${project.achievement.color}`}>
                                                  {project.achievement.label}
                                                </span>
                                            </div>
                                        );
                                    })()}

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="default">{tag}</Badge>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full border border-violet-500/40 text-violet-300 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-400/70 transition-all"
                                    >
                                        View source
                                        <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}