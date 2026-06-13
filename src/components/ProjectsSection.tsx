import { useState, useEffect } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Users, User, Cpu, Trophy, Medal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';

type ProjectType = 'personal' | 'group';

type ProjectAchievement = {
	icon: LucideIcon;
	color: string;
	label: string;
};

type Project = {
	title: string;
	description: string;
	link: string;
	tags: string[];
	projectType: ProjectType;
	featured?: boolean;
	achievement?: ProjectAchievement;
};

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
	},
	{
		title: 'RutraOS',
		description:
			'Custom operating system written in C and x86 Assembly from scratch: kernel, interrupt handling, memory management, and a basic process scheduler. Boots via GRUB.',
		link: 'https://github.com/rutra8002/RutraOS',
		tags: ['C', 'x86 Assembly', 'OS'],
		projectType: 'personal',
		featured: true,
	},
	{
		title: 'Quiz App',
		description:
			'A full-stack quiz application with user authentication, SQLite backend, and AI-powered answer validation via the Gemini API. Deployed on a Raspberry Pi with Flask.',
		link: 'https://github.com/rutra8002/quizapp',
		tags: ['Python', 'Flask', 'HTML', 'Tailwind', 'SQLite', 'AI'],
		projectType: 'personal',
	},
	{
		title: 'Portfolio Website',
		description: 'This site. A modern, animated portfolio built with React, Tailwind, and Framer Motion.',
		link: 'https://github.com/rutra8002/rutra8002.github.io',
		tags: ['React', 'CSS', 'JavaScript', 'TypeScript'],
		projectType: 'personal',
	},
	{
		title: 'Jeff The Grappler',
		description:
			'Prototype of an action game about Jeff, a grappling gun enthusiast. Focused on fluid movement mechanics and combat, built with Raylib and GLSL shaders.',
		link: 'https://github.com/rutra8002/jeff_the_grappler',
		tags: ['Python', 'Raylib', 'GLSL'],
		projectType: 'personal',
	},
	{
		title: 'Pixel Racers',
		description:
			'Top-down pixel racing game with AI bots. Built as a team for Motorola Science Cup 2025 - 2nd place nationally.',
		link: 'https://github.com/rutra8002/pixel_racers',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
		achievement: { icon: Trophy, color: 'text-yellow-400', label: '2nd place · Motorola Science Cup 2025' },
	},
	{
		title: 'Optyka',
		description:
			'Physics-based optics simulator modelling reflections, refractions, and lenses. Built as a team for Motorola Science Cup 2024.',
		link: 'https://github.com/Hohenzoler/optyka',
		tags: ['Python', 'Pygame', 'NumPy'],
		projectType: 'group',
		achievement: { icon: Medal, color: 'text-orange-400', label: '7th place · Motorola Science Cup 2024' },
	},
	{
		title: 'One Hit Wonder',
		description: 'You got trapped in a dungeon because you were too good at playing the flute. Now you have to fight your way out using your musical skills. Can you escape the dungeon and become the One Hit Wonder? Built for Major Jam.',
		link: 'https://github.com/Saniccxx/One-Hit-Wonder',
		tags: ['C++', 'Raylib', 'GLSL'],
		projectType: 'group',
	},
	{
		title: 'Storm Survival',
		description:
			'Realistic real-time apocalypse survival game. Built during the Brackeys Game Jam - shipped in one week from idea to playable prototype.',
		link: 'https://github.com/V8Enthusiast/StormSurvival',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
	},
	{
		title: 'NukeTown',
		description:
			'Game about uranium and his fellas, created during a 24-hour hackathon (HackTheTopo). Delivered under extreme time pressure.',
		link: 'https://github.com/MalyszekTobias/NukeTown',
		tags: ['Python', 'Raylib', 'GLSL'],
		projectType: 'group',
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
	const [searchQuery, setSearchQuery] = useState('');
	const [filtered, setFiltered] = useState<Project[]>(projectsData);

	useEffect(() => {
		const q = searchQuery.toLowerCase();
		const nextFiltered = projectsData.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q) ||
				p.projectType.toLowerCase().includes(q) ||
				projectTypeMeta[p.projectType].label.toLowerCase().includes(q) ||
				p.tags.some((t) => t.toLowerCase().includes(q)) ||
				(p.achievement && p.achievement.label.toLowerCase().includes(q))
		);

		setFiltered(
			nextFiltered
		);
	}, [searchQuery]);

	return (
		<motion.section
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col gap-6"
		>
			<div className="flex flex-col gap-2">
				<span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
					Work
				</span>
				<h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
					Projects
				</h1>
			</div>

			<div className="flex flex-wrap gap-2">
				{(Object.keys(projectTypeMeta) as ProjectType[]).map((key) => {
					const type = projectTypeMeta[key];
					const Icon = type.icon;
					const count = projectsData.filter((p) => p.projectType === key).length;
					return (
						<div
							key={key}
							className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs text-slate-300"
						>
							<Icon size={14} className="text-slate-400" />
							<Badge variant={type.variant} className="cursor-default hover:border-inherit hover:bg-inherit">
								{type.label}
							</Badge>
							<span>{count}</span>
							<span className="text-slate-500">· {type.description}</span>
						</div>
					);
				})}
			</div>

			<div className="relative">
				<Search
					size={16}
					className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
				/>
				<Input
					type="text"
					className="pl-9"
					placeholder="Search by name, tech, description, or type…"
					value={searchQuery}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
				/>
			</div>

			<motion.div layout className="grid gap-4 sm:grid-cols-2">
				<AnimatePresence mode="popLayout">
					{filtered.map((project, i) => {
						const type = projectTypeMeta[project.projectType];
						const TypeIcon = type.icon;
						const AchievementIcon = project.achievement?.icon;

						return (
							<motion.div
								key={project.title}
								layout
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ delay: i * 0.05, duration: 0.3 }}
								className={project.featured ? 'sm:col-span-2' : ''}
							>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="block h-full"
								>
									<Card className={`h-full p-5 flex flex-col gap-3 border-white/10 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-violet-900/30 hover:shadow-xl transition-all duration-200 cursor-pointer group ${project.featured ? 'border-violet-500/25 bg-violet-950/10' : ''}`}>
										<div className="flex items-start justify-between gap-2">
											<div className="flex flex-col gap-2">
												<div className="flex items-center gap-2">
													{project.featured && (
														<Cpu size={14} className="text-violet-400" />
													)}
													<span className="text-base font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
														{project.title}
													</span>
												</div>
												<div className="flex items-center gap-2 text-xs text-slate-400">
													<TypeIcon size={14} />
													<Badge variant={type.variant} className="cursor-default hover:border-inherit hover:bg-inherit">
														{type.label}
													</Badge>
												</div>
											</div>
											<ExternalLink
												size={14}
												className="text-slate-600 group-hover:text-violet-400 transition-colors shrink-0 mt-1"
											/>
										</div>
										<p className="text-sm text-slate-400 leading-relaxed flex-1">
											{project.description}
										</p>
										{project.achievement && AchievementIcon && (
											<div className="flex items-center gap-1.5">
												<AchievementIcon size={13} className={project.achievement.color} />
												<span className={`text-xs font-medium ${project.achievement.color}`}>
													{project.achievement.label}
												</span>
											</div>
										)}
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<Badge
													key={tag}
																variant="default"
																className=""
																onClick={(e: MouseEvent<HTMLSpanElement>) => {
														e.preventDefault();
														setSearchQuery(tag);
													}}
												>
													{tag}
												</Badge>
											))}
										</div>
									</Card>
								</a>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</motion.div>

			{filtered.length === 0 && (
				<p className="text-center text-slate-500 py-12">
					No projects match your search.
				</p>
			)}
		</motion.section>
	);
}

export default ProjectsSection;
