import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Flag, Medal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type AchievementTier = 'gold' | 'silver' | 'bronze';

type Achievement = {
    placement: string;
    event: string;
    organizer: string;
    year: string;
    description: string;
    link: string;
    tags: string[];
    tier: AchievementTier;
};

const achievements: Achievement[] = [
    {
        placement: '2nd place',
        event: 'Motorola Science Cup',
        organizer: 'Motorola Solutions',
        year: '2025',
        description: 'National team competition. Built a pixel racing game with AI bots.',
        link: 'https://lo3.edu.gdansk.pl/pl/art/ii-m-na-finale-motorola-science-cup.91117.html',
        tags: ['National', 'Team', 'Game Dev'],
        tier: 'gold',
    },
    {
        placement: 'Finalist',
        event: 'GIGATHON',
        organizer: 'Giganci Programowania',
        year: '2025',
        description: 'Individual fast-coding competition - built a console game under time pressure.',
        link: 'https://lo3.edu.gdansk.pl/pl/art/uczniowie-topolowki-w-kolejnych-etapach-konkursow-i-olimpiad-przedmiotowych.75156.html',
        tags: ['National', 'Individual', 'Competitive Programming'],
        tier: 'silver',
    },
    {
        placement: '1st place',
        event: 'IT Fitness Test',
        organizer: 'Cyfrowa Polska',
        year: '2024',
        description: 'National digital competency assessment. 1st place in Gdańsk region.',
        link: 'https://lo3.edu.gdansk.pl/pl/art/cale-podium-testu-kompetencji-cyfrowych-dla-uczniow-topolowki.85578.html',
        tags: ['National', 'Individual'],
        tier: 'gold',
    },
    {
        placement: '2nd place',
        event: 'CyberGeniusz Uczeń',
        organizer: 'Warszawski Instytut Bankowości',
        year: '2024',
        description: 'National cybersecurity competition covering digital safety, online banking, and identity protection.',
        link: 'https://www.wib.org.pl/edu-konkurs-test-wiedzy-cyber-geniusz-uczen-2024-rozstrzygniety/',
        tags: ['National', 'Individual', 'Cybersecurity'],
        tier: 'gold',
    },
    {
        placement: '7th place',
        event: 'Motorola Science Cup',
        organizer: 'Motorola Solutions',
        year: '2024',
        description: 'National team competition. Built a physics-based optics simulator with Pygame.',
        link: 'https://lo3.edu.gdansk.pl/pl/art/zwyciestwo-na-motorola-science-cup.79187.html',
        tags: ['National', 'Team', 'Simulation'],
        tier: 'bronze',
    },
    {
        placement: 'Finalist',
        event: 'IV Ogólnopolskie Zawody Algorytmiczne',
        organizer: 'Centrum Mistrzostwa Informatycznego',
        year: '2023',
        description: 'Team of 3. National algorithmic competition requiring collaborative problem-solving under contest conditions.',
        link: 'https://www.youtube.com/watch?v=dhIu2xeddgc',
        tags: ['National', 'Team', 'Algorithms'],
        tier: 'silver',
    },
    {
        placement: 'AFM Title',
        event: 'Arena FIDE Master',
        organizer: 'FIDE Online Arena',
        year: '2026',
        description: 'International chess title awarded by FIDE for consistent tournament performance under time pressure.',
        link: 'https://worldchess.com/profile/863931',
        tags: ['International', 'Individual', 'Chess'],
        tier: 'gold',
    },
    {
        placement: 'Distinction',
        event: 'Mathematical Kangaroo',
        organizer: 'Kangourou sans Frontières',
        year: '2026',
        description: "Awarded distinction in one of the world's largest mathematics competitions, held annually across over 100 countries.",
        link: 'https://www.aksf.org/',
        tags: ['International', 'Individual', 'Maths'],
        tier: 'bronze'
    }
];

const tierConfig: Record<
    AchievementTier,
    {
        border: string;
        icon: LucideIcon;
        iconColor: string;
    }
> = {
    gold: {
        border: 'border-yellow-500/30 hover:border-yellow-400/50',
        icon: Trophy,
        iconColor: 'text-yellow-400',
    },
    silver: {
        border: 'border-slate-400/20 hover:border-slate-300/40',
        icon: Flag,
        iconColor: 'text-slate-400',
    },
    bronze: {
        border: 'border-orange-500/20 hover:border-orange-400/40',
        icon: Medal,
        iconColor: 'text-orange-400',
    },
};

function AchievementsSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
        >
            <div className="flex flex-col gap-2">
				<span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
					Recognition
				</span>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                    Achievements
                </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {achievements.map((item, i) => {
                    const tier = tierConfig[item.tier];
                    const TierIcon = tier.icon;

                    return (
                        <motion.div
                            key={item.event + item.year}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.35 }}
                        >
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full"
                            >
                                <Card
                                    className={`h-full p-5 flex flex-col gap-3 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group ${tier.border}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <TierIcon size={15} className={tier.iconColor} />
                                                <span className="text-sm font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
													{item.placement}
												</span>
                                            </div>
                                            <span className="text-base font-semibold text-slate-200">
												{item.event}
											</span>
                                            <span className="text-xs text-slate-500">
												{item.organizer} · {item.year}
											</span>
                                        </div>
                                        <ExternalLink
                                            size={14}
                                            className="text-slate-600 group-hover:text-violet-400 transition-colors shrink-0 mt-1"
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed flex-1">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <Badge key={tag} variant="default" className="">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </a>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}

export default AchievementsSection;
