import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const languageGroups = [
	{
		title: "Languages",
		description: "Programming languages",
		skills: [
			{ name: "Python", since: "since 2020" },
			{ name: "JavaScript", since: "since 2023" },
			{ name: "HTML / CSS", since: "since 2022" },
			{ name: "C", since: "since 2024" },
			{ name: "TypeScript", since: "since 2026" },
			{ name: "x86 Assembly", since: "since 2024" },
			{ name: "Verilog", since: "since 2025" },
			{ name: "C++", since: "since 2026" },
		],
	},
	{
		title: "Frameworks & Libraries",
		description: "Tools and runtimes",
		skills: [
			{ name: "React", since: "since 2025" },
			{ name: "Flask", since: "since 2023" },
			{ name: "Tailwind", since: "since 2024" },
			{ name: "Pygame", since: "since 2022" },
			{ name: "Raylib", since: "since 2024" },
			{ name: "GLSL", since: "since 2025" },
		],
	},
	{
		title: "Infrastructure",
		description: "Servers & deployment",
		skills: [
			{ name: "Linux", since: "since 2023" },
			{ name: "GitHub", since: "since 2022" },
			{ name: "Raspberry Pi", since: "since 2024" },
			{ name: "Oracle Cloud", since: "since 2023" },
		],
	},
	{
		title: "AI & APIs",
		description: "AI-assisted development",
		skills: [
			{ name: "Gemini API", since: "since 2024" },
			{ name: "OpenAI API", since: "since 2023" },
			{ name: "Prompt Engineering", since: "since 2024" },
		],
	},
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
					I'm a self-taught developer with 6 years of Python experience and a tendency to take on projects that go deeper than planned. I enjoy everything from kernel development and hardware simulation to web apps and game jams - as long as there's something genuinely difficult to solve.
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