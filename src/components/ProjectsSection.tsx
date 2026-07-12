import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Users, User, Cpu, Trophy, Medal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import ProjectDialog from './ProjectDialog';
import type { Project } from './ProjectDialog';

type ProjectType = 'personal' | 'group';

type ProjectTypeInfo = {
	label: string;
	variant: 'personal' | 'group';
	icon: LucideIcon;
	description: string;
};

const projectsData: Project[] = [
	{
		title: 'RutraCPU',
		description:
			'A complete 8-bit computing stack built from scratch: hardware simulation in Icarus Verilog, custom 12-bit ISA with 11 instructions, Python assembler, and a high-level compiled language (.rpl) with AST and code generation. Includes a GPU peripheral with ASCII framebuffer. Full pipeline: .rpl → .rasm → .mem → GPU viewer.',
		link: 'https://github.com/rutra8002/rutracpu',
		tags: ['Verilog', 'Python', 'ASM', 'Compiler', 'HDL'],
		projectType: 'personal',
		featured: true,
		media: [
			{ type: 'image', src: '/images/rutracpu/CPU.png', caption: 'RutraCPU Screenshot' }
		],
	},
	{
		title: 'RutraOS',
		description:
			'Custom operating system written in C and x86 Assembly from scratch: kernel, interrupt handling, memory management, and a basic process scheduler. Boots via GRUB.',
		link: 'https://github.com/rutra8002/RutraOS',
		tags: ['C', 'x86 Assembly', 'OS'],
		projectType: 'personal',
		featured: true,
		media: [
			{ type: 'image', src: '/images/rutraos/1.png', caption: 'RutraOS Memtest Screenshot' },
			{ type: 'image', src: '/images/rutraos/2.png', caption: 'Platformer Screenshot' },
			{ type: 'image', src: '/images/rutraos/3.png', caption: 'Doom Screenshot' }
		],
	},
	{
		title: 'Quiz App',
		description:
			'A full-stack quiz application with user authentication, SQLite backend, and AI-powered answer validation via the Gemini API. Deployed on a Raspberry Pi with Flask.',
		link: 'https://github.com/rutra8002/quizapp',
		tags: ['Python', 'Flask', 'HTML', 'Tailwind', 'SQLite', 'AI'],
		projectType: 'personal',
		media: [],
	},
	{
		title: 'Portfolio Website',
		description: 'This site. A modern, animated portfolio built with React, Tailwind, and Framer Motion.',
		link: 'https://github.com/rutra8002/rutra8002.github.io',
		tags: ['React', 'CSS', 'JavaScript', 'TypeScript'],
		projectType: 'personal',
		media: [],
	},
	{
		title: 'Jeff The Grappler',
		description:
			'Prototype of an action game about Jeff, a grappling gun enthusiast. Focused on fluid movement mechanics and combat, built with Raylib and GLSL shaders.',
		link: 'https://github.com/rutra8002/jeff_the_grappler',
		tags: ['Python', 'Raylib', 'GLSL'],
		projectType: 'personal',
		media: [
			{ type: 'image', src: '/images/jeff/4.png', caption: 'Jeff in the tunnel' },
			{ type: 'image', src: '/images/jeff/5.png', caption: 'Jeff fights' },
			{ type: 'image', src: '/images/jeff/6.png', caption: 'Jeff shows domination' },
			{ type: 'image', src: '/images/jeff/7.png', caption: 'Jeff uses his grappling gun' },
		],
	},
	{
		title: 'Pixel Racers',
		description:
			'Top-down pixel racing game with AI bots. Built as a team for Motorola Science Cup 2025 - 2nd place nationally.',
		link: 'https://github.com/rutra8002/pixel_racers',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
		achievement: { icon: Trophy, color: 'text-yellow-400', label: '2nd place · Motorola Science Cup 2025' },
		media: [
			{ type: 'video', src: 'https://www.youtube.com/embed/9RUm_Z_BEGM', caption: 'Gameplay demo (YouTube)' },
			{ type: 'image', src: '/images/pixelracers/24.png', caption: 'Main Menu' },
			{ type: 'image', src: '/images/pixelracers/25.png', caption: 'Select a vehicle menu + terminal' },
			{ type: "image", src: '/images/pixelracers/26.png', caption: 'Gameplay screenshot' },
			{ type: "image", src: '/images/pixelracers/27.png', caption: 'Victory screen' },
			{ type: "image", src: '/images/pixelracers/28.png', caption: 'Leaderboard' },
			{ type: "image", src: '/images/pixelracers/29.png', caption: 'Map editor' },
		],
	},
	{
		title: 'Optyka',
		description:
			'Physics-based optics simulator modelling reflections, refractions, and lenses. Built as a team for Motorola Science Cup 2024.',
		link: 'https://github.com/Hohenzoler/optyka',
		tags: ['Python', 'Pygame', 'NumPy'],
		projectType: 'group',
		achievement: { icon: Medal, color: 'text-orange-400', label: '7th place · Motorola Science Cup 2024' },
		media: [
			{ type: 'video', src: 'https://www.youtube.com/embed/oRm5Wtt9y7Y', caption: 'Demo video (YouTube)' },
			{ type: "image", src: '/images/optyka/20.png', caption: 'Main Menu' },
			{ type: 'image', src: '/images/optyka/21.png', caption: 'Showcase of lenses' },
			{ type: 'image', src: '/images/optyka/22.png', caption: 'Showcase of Prism and achievement' },
			{ type: 'image', src: '/images/optyka/23.png', caption: 'Showcase of mirrors' },
		],
	},
	{
		title: 'One Hit Wonder',
		description: 'You got trapped in a dungeon because you were too good at playing the flute. Now you have to fight your way out using your musical skills. Can you escape the dungeon and become the One Hit Wonder? Built for Major Jam.',
		link: 'https://github.com/Saniccxx/One-Hit-Wonder',
		tags: ['C++', 'Raylib', 'GLSL'],
		projectType: 'group',
		media: [],
	},
	{
		title: 'Storm Survival',
		description:
			'A game built during the Brackeys Game Jam - shipped in one week from idea to playable prototype.',
		detail:
			'Storm Survival is a realistic real-time apocalypse survival game. Gather resources, fight enemies and loot for weapons. Get stronger every day and with every wave of enemies. Explore the open world and enjoy the cutting edge pixel art graphics our graphic design team prepared.',
		link: 'https://github.com/V8Enthusiast/StormSurvival',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
		media: [
			{ type: 'image', src: 'https://github.com/V8Enthusiast/StormSurvival/raw/main/Screenshot/1.png', caption: 'Storm Survival screenshot' }
		],
	},
	{
		title: 'NukeTown',
		description:
			'Game about uranium and his fellas, created during a 24-hour hackathon (HackTheTopo). Delivered under extreme time pressure.',
		link: 'https://github.com/MalyszekTobias/NukeTown',
		tags: ['Python', 'Raylib', 'GLSL'],
		projectType: 'group',
		media: [
			{ type: 'image', src: '/images/nuketown/16.png', caption: 'Start Screen' },
			{ type: 'image', src: '/images/nuketown/17.png', caption: 'Uranium in empty room' },
			{ type: 'image', src: '/images/nuketown/18.png', caption: 'Inventory system' },
			{ type: 'image', src: '/images/nuketown/19.png', caption: 'One of many books explaining the lore' },
		],
	},
];

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
					<span className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Work</span>
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