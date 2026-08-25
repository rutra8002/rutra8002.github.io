import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Users, User, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import ProjectDialog from './ProjectDialog';
import type { Project } from './ProjectDialog';
import { projectsData } from '@/data/Projects';

type ProjectType = 'personal' | 'group';

type ProjectTypeInfo = {
	label: string;
	variant: 'personal' | 'group';
	icon: LucideIcon;
	description: string;
};

const projectTypeMeta: Record<ProjectType, ProjectTypeInfo> = {
	personal: {
		label: 'Personal',
		variant: 'personal',
		icon: User,
		description: 'Built independently',
	},
	group: {
		label: 'Group',
		variant: 'group',
		icon: Users,
		description: 'Built with a team',
	},
};

function ProjectsSection() {
	const [searchQuery, setSearchQuery]       = useState('');
	const [filtered, setFiltered]             = useState<Project[]>(projectsData);
	const [activeProject, setActiveProject]   = useState<Project | null>(null);
	const [mediaIndex, setMediaIndex]         = useState(0);
	const lastFocusRef                        = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const q = searchQuery.toLowerCase();
		setFiltered(
			projectsData.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q) ||
					p.projectType.toLowerCase().includes(q) ||
					projectTypeMeta[p.projectType as ProjectType].label.toLowerCase().includes(q) ||
					p.tags.some((t) => t.toLowerCase().includes(q)) ||
					(p.achievement && p.achievement.label.toLowerCase().includes(q))
			)
		);
	}, [searchQuery]);

	function openDialog(project: Project, trigger: HTMLDivElement) {
		lastFocusRef.current = trigger;
		setActiveProject(project);
		setMediaIndex(0);
	}

	function closeDialog() {
		setActiveProject(null);
		setMediaIndex(0);
		setTimeout(() => lastFocusRef.current?.focus(), 50);
	}

	function handleMediaNext() {
		if (!activeProject?.media?.length) return;
		setMediaIndex((i) => (i + 1) % activeProject.media!.length);
	}

	function handleMediaPrev() {
		if (!activeProject?.media?.length) return;
		setMediaIndex((i) => (i - 1 + activeProject.media!.length) % activeProject.media!.length);
	}

	return (
		<>
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex flex-col gap-6 font-mono"
			>
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-black tracking-tight text-white">Projects</h1>
				</div>

				<div className="flex flex-col gap-2 border border-slate-800 bg-slate-950/40 p-3 text-[11px]">
					{(Object.keys(projectTypeMeta) as ProjectType[]).map((key) => {
						const type = projectTypeMeta[key];
						const Icon = type.icon;
						const count = projectsData.filter((p) => p.projectType === key).length;
						return (
							<div key={key} className="flex items-center justify-between text-slate-400">
								<div className="flex items-center gap-2">
									<Icon size={14} className="text-slate-400" />
									<span className="text-emerald-500 font-bold">{type.label}</span>
									<span className="text-slate-600">│ {type.description}</span>
								</div>
								<span className="text-slate-500 font-bold">Number of projects: {count}</span>
							</div>
						);
					})}
				</div>

				<div className="relative">
					<Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
					<Input
						type="text"
						className="pl-9"
						placeholder="filter queries"
						value={searchQuery}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
					/>
				</div>

				<motion.div layout className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] grid-flow-dense">
					<AnimatePresence mode="popLayout">
						{filtered.map((project, i) => {
							const type = projectTypeMeta[project.projectType];
							const TypeIcon = type.icon;
							const AchievementIcon = project.achievement?.icon;

							return (
								<motion.div
									key={project.title}
									layout
									initial={{ opacity: 0, scale: 0.98 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ delay: i * 0.02, duration: 0.2 }}
									className={project.featured ? 'sm:col-span-2' : ''}
								>
									<Card
										tabIndex={0}
										role="button"
										aria-label={`Open ${project.title} details`}
										onClick={(e: MouseEvent<HTMLDivElement>) => openDialog(project, e.currentTarget)}
										onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												openDialog(project, e.currentTarget);
											}
										}}
										className={`h-full p-4 rounded-none border flex flex-col gap-3 transition-all duration-150 cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 ${
											project.featured
												? 'border-emerald-500/20 bg-emerald-950/5 hover:border-emerald-500/40'
												: 'border-slate-800 bg-[#0d0e15] hover:border-slate-600'
										}`}>
										<div className="flex items-start justify-between gap-2">
											<div className="flex flex-col gap-1.5">
												<div className="flex items-center gap-2">
													{project.featured && <Cpu size={12} className="text-emerald-400 shrink-0" />}
													<span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
														{project.title}
													</span>
												</div>
												<Badge variant={type.variant} className="w-fit pointer-events-none">
													<TypeIcon size={12} />
													{type.label}
												</Badge>
											</div>
											<ExternalLink size={12} className="text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-0.5" aria-hidden="true" />
										</div>
										<p className="text-xs text-slate-400 leading-relaxed flex-1 line-clamp-3 font-mono">
											{project.description}
										</p>

										{project.achievement && AchievementIcon && (
											<div className="flex items-center gap-1.5 text-[11px] border border-emerald-500/10 bg-emerald-950/20 px-2 py-1">
												<AchievementIcon size={12} className={project.achievement.color} />
												<span className={`font-semibold ${project.achievement.color}`}>{project.achievement.label}</span>
											</div>
										)}

										<div className="flex flex-wrap gap-1 pt-1 border-t border-white/5">
											{project.tags.map((tag) => (
												<Badge
													key={tag}
													variant="default"
													onClick={(e: MouseEvent<HTMLSpanElement>) => {
														e.stopPropagation();
														setSearchQuery(tag);
													}}
												>
													{tag}
												</Badge>
											))}
										</div>
									</Card>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</motion.div>

				{filtered.length === 0 && (
					<p className="text-center text-xs text-slate-600 border border-dashed border-slate-800 py-12">
						No projects match your search.
					</p>
				)}
			</motion.section>

			<ProjectDialog
				project={activeProject}
				mediaIndex={mediaIndex}
				onClose={closeDialog}
				onMediaPrev={handleMediaPrev}
				onMediaNext={handleMediaNext}
			/>
		</>
	);
}

export default ProjectsSection;