export type AchievementTier = 'gold' | 'silver' | 'bronze';

export type Achievement = {
    placement: string;
    event: string;
    organizer: string;
    year: string;
    description: string;
    link: string;
    tags: string[];
    tier: AchievementTier;
};

export const achievements: Achievement[] = [
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