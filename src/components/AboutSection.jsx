import { motion } from "framer-motion";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const languageGroups = [
	{
		title: "Main",
		description: "Most active",
		skills: [{ name: "Python", since: "since 2020" }],
	},
	{
		title: "Secondary",
		description: "Less active",
		skills: [
			{ name: "HTML", since: "since 2022" },
			{ name: "CSS", since: "since 2022" },
		],
	},
	{
		title: "Minor",
		description: "Used occasionally",
		skills: [{ name: "JavaScript", since: "hands-on experience" }],
	},
	// {
	// 	title: "Tools",
	// 	description: "Microsoft Office",
	// 	skills: [
	// 		{ name: "PowerPoint", since: "since 2018" },
	// 		{ name: "Word", since: "since 2020" },
	// 		{ name: "Excel", since: "since 2022" },
	// 		{ name: "Access", since: "since 2024" },
	// 	],
	// },
];

function AboutSection() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col gap-6"
		>
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col gap-2"
			>
				<span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
					Profile
				</span>
				<h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
					About Me
				</h1>
				<p className="text-slate-300 text-base leading-relaxed max-w-lg">
					I focus mostly on Python and have been actively using it since 2020. I have
					also used HTML and CSS since 2022, and have some additional hands-on
					experience with JavaScript.
					{/*My Microsoft Office experience includes*/}
					{/*PowerPoint since 2018, Word since 2020, Excel since 2022, and Access*/}
					{/*since 2024.*/}
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<Card className="border-violet-500/20">
					<CardContent className="pt-6">
						<p className="text-xs font-semibold uppercase tracking-widest text-violet-300 mb-4">
							Skills & Tools
						</p>
						<div className="flex flex-col gap-4">
							{languageGroups.map((group, groupIndex) => (
								<motion.div
									key={group.title}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.15 + groupIndex * 0.08,
										duration: 0.3,
									}}
									className="space-y-2"
								>
									<div>
										<p className="text-sm font-semibold text-slate-100">
											{group.title}
										</p>
										<p className="text-xs text-slate-400">
											{group.description}
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{group.skills.map((skill, i) => (
											<motion.div
												key={skill.name}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{
													delay:
														0.2 + groupIndex * 0.08 + i * 0.05,
													duration: 0.25,
												}}
												className="inline-flex items-center gap-2"
											>
												<Badge>{skill.name}</Badge>
												<span className="text-xs text-slate-400">
													{skill.since}
												</span>
											</motion.div>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.section>
	);
}

export default AboutSection;
