import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Users, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';

const projectsData = [
	{
		title: 'Optyka',
		description:
			'A Python-based simulator of optic phenomenons. It uses the Pygame library for app development.',
		link: 'https://github.com/Hohenzoler/optyka',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
	},
	{
		title: 'Pixel Racers',
		description: 'Simple game where you race against bots.',
		link: 'https://github.com/rutra8002/pixel_racers',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
	},
	{
		title: 'Storm Survival',
		description:
			'Realistic real-time apocalypse survival game. Built during Brackeys game jam.',
		link: 'https://github.com/V8Enthusiast/StormSurvival',
		tags: ['Python', 'Pygame'],
		projectType: 'group',
	},
	{
		title: 'NukeTown',
		description:
			'Game about uranium and his fellas created during 24 hour hackathon.',
		link: 'https://github.com/MalyszekTobias/NukeTown',
		tags: ['Python', 'Raylib', 'GLSL'],
		projectType: 'group',
	},
	{
		title: 'Portfolio Website',
		description: 'A modern, animated portfolio built with React and CSS.',
		link: 'https://github.com/rutra8002/rutra8002.github.io',
		tags: ['React', 'CSS', 'JavaScript'],
		projectType: 'personal',
	},
	{
		title: 'RutraOS',
		description: 'A buggy operating system written in C.',
		link: 'https://github.com/rutra8002/RutraOS',
		tags: ['C', 'Operating System'],
		projectType: 'personal',
	},
	{
		title: 'Quiz app',
		description:
			'A simple quiz application built with HTML, Tailwind, Flask, SQLite and Gemini AI for answer checking.',
		link: 'https://github.com/rutra8002/quizapp',
		tags: ['Python', 'Flask', 'HTML', 'Tailwind', 'SQLite', 'AI'],
		projectType: 'personal',
	},
	{
		title: 'RutraCPU',
		description:
			'A fully custom CPU & GPU designed from scratch in Verilog. Includes a high-level language, compiler and assembler.',
		link: 'https://github.com/rutra8002/rutracpu',
		tags: ['Verilog', 'CPU', 'GPU', 'Rutra Programming Language', 'Rutra Assembly', 'Python', 'Compiler'],
		projectType: 'personal',
	},
];

const projectTypeMeta = {
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
	const [filtered, setFiltered] = useState(projectsData);

	useEffect(() => {
		const q = searchQuery.toLowerCase();
		setFiltered(
			projectsData.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q) ||
					p.projectType.toLowerCase().includes(q) ||
					projectTypeMeta[p.projectType].label.toLowerCase().includes(q) ||
					p.tags.some((t) => t.toLowerCase().includes(q))
			)
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
				<h1 className="text-4xl font-bold bg-linear-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
					Projects
				</h1>
			</div>

			<div className="flex flex-wrap gap-2">
				{Object.entries(projectTypeMeta).map(([key, type]) => {
					const Icon = type.icon;
					const count = projectsData.filter((project) => project.projectType === key).length;

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
					className="pl-9"
					placeholder="Search by name, tech, description, or type…"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<motion.div layout className="grid gap-4 sm:grid-cols-2">
				<AnimatePresence mode="popLayout">
					{filtered.map((project, i) => {
						const type = projectTypeMeta[project.projectType];
						const TypeIcon = type.icon;

						return (
							<motion.div
								key={project.title}
								layout
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ delay: i * 0.05, duration: 0.3 }}
							>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="block h-full"
								>
									<Card className="h-full p-5 flex flex-col gap-3 border-white/10 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-violet-900/30 hover:shadow-xl transition-all duration-200 cursor-pointer group">
										<div className="flex items-start justify-between gap-2">
											<div className="flex flex-col gap-2">
												<span className="text-base font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
													{project.title}
												</span>
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
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<Badge
													key={tag}
													onClick={(e) => {
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
