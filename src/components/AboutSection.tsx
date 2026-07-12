import { Card, CardContent } from './ui/card';
import { languageGroups } from '@/data/Skills';

function AboutSection() {
	return (
		<section className="flex flex-col gap-8 font-mono">
			<div className="flex flex-col gap-3">
				<h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
					About Me
				</h1>
				<div className="py-1 text-sm leading-relaxed text-slate-400">
					I'm a self-taught developer with 6 years of Python experience and a tendency to take on projects that go deeper than planned. I enjoy everything from kernel development and hardware simulation to web apps and game jams - as long as there's something genuinely difficult to solve.
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{languageGroups.map((group) => (
					<Card key={group.title} className="rounded-none border border-slate-800 bg-[#0d0e15]">
						<CardContent className="p-4 flex flex-col gap-4">
							<div>
								<h3 className="text-xs font-bold text-slate-200">{group.title}</h3>
								<p className="text-[11px] text-slate-500 mt-0.5">{group.description}</p>
							</div>

							<div className="grid gap-2 sm:grid-cols-2">
								{group.skills.map((skill) => (
									<div
										key={skill.name}
										className="flex items-center justify-between p-2 border border-white/5 bg-black/30 text-xs font-mono"
									>
										<span className="text-slate-300 font-bold">{skill.name}</span>
										<span className="text-[10px] text-slate-600 font-medium">{skill.since}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}

export default AboutSection;