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

const tierConfig: Record<AchievementTier, { border: string; icon: LucideIcon; color: string }> = {
    gold: {
        border: 'border-amber-500/30 bg-amber-950/5 hover:border-amber-400/50',
        icon: Trophy,
        color: 'text-amber-400',
    },
    silver: {
        border: 'border-slate-700 bg-slate-900/20 hover:border-slate-500',
        icon: Flag,
        color: 'text-slate-400',
    },
    bronze: {
        border: 'border-orange-900/40 bg-orange-950/5 hover:border-orange-800',
        icon: Medal,
        color: 'text-orange-500',
    },
};

function AchievementsSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 font-mono"
        >
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-emerald-500">Recognition</span>
                <h1 className="text-3xl font-black text-white tracking-tight">Achievements</h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {achievements.map((item, i) => {
                    const tier = tierConfig[item.tier];
                    const TierIcon = tier.icon;

                    return (
                        <motion.div
                            key={item.event + item.year}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                <Card className={`h-full p-4 rounded-none border flex flex-col gap-3 transition-all duration-150 cursor-pointer group ${tier.border}`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <TierIcon size={12} className={tier.color} />
                                                <span className={`font-black ${tier.color}`}>{item.placement}</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-200 mt-1">{item.event}</span>
                                            <span className="text-[10px] text-slate-500 font-bold">{item.organizer} {item.year}</span>
                                        </div>
                                        <ExternalLink size={12} className="text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-0.5" />
                                    </div>

                                    <p className="text-xs text-slate-400 leading-relaxed flex-1 font-mono">{item.description}</p>

                                    {/* UI SYSTEM BADGES USED HERE */}
                                    <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                                        {item.tags.map((tag) => (
                                            <Badge key={tag} variant="default" className="cursor-default border-white/5 bg-black/20 text-slate-500 hover:border-white/10 hover:text-slate-400">
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
