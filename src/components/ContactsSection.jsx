import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Card } from './ui/card';

const contacts = [
	{
		icon: FaEnvelope,
		label: 'Email',
		display: 'contact@rutra.me',
		href: 'mailto:contact@rutra.me',
		color: 'text-violet-400',
	},
	{
		icon: FaLinkedin,
		label: 'LinkedIn',
		display: 'linkedin.com/in/rutra8002/',
		href: 'https://www.linkedin.com/in/rutra8002/',
		color: 'text-blue-400',
	},
	{
		icon: FaGithub,
		label: 'GitHub',
		display: 'github.com/rutra8002',
		href: 'https://github.com/rutra8002',
		color: 'text-slate-300',
	},
];

function ContactsSection() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col gap-6"
		>
			<div className="flex flex-col gap-2">
				<span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
					Get in Touch
				</span>
				<h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
					Contacts
				</h1>
			</div>

			<div className="flex flex-col gap-3">
				{contacts.map(
					({ icon: Icon, label, display, href, color }, i) => (
						<motion.div
							key={label}
							initial={{ opacity: 0, x: -16 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: i * 0.1, duration: 0.4 }}
						>
							<a
								href={href}
								target={
									href.startsWith('mailto') ? undefined : '_blank'
								}
								rel="noopener noreferrer"
							>
								<Card className="px-5 py-4 flex items-center gap-4 border-white/10 hover:border-violet-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-200 group cursor-pointer">
									<span
										className={`${color} text-xl shrink-0`}
									>
										<Icon />
									</span>
									<div>
										<p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
											{label}
										</p>
										<p className="text-sm text-slate-200 group-hover:text-violet-300 transition-colors">
											{display}
										</p>
									</div>
								</Card>
							</a>
						</motion.div>
					)
				)}
			</div>
		</motion.section>
	);
}

export default ContactsSection;
