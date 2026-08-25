import { Trophy, Medal } from 'lucide-react';
import type { Project } from '../components/ProjectDialog';

export const projectsData: Project[] = [
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
        title: 'Doodle Arcade',
        description: 'A game collection of 3 minigames built during GMTK Jam',
        demoLink: 'https://rutra8002.itch.io/doodle-arcade',
        demoLabel: 'Play on itch.io',
        link: 'https://github.com/Saniccxx/gmtk-jam',
        projectType: 'group',
        tags: ['Godot'],
        media: [
            { type: 'image', src: '/images/doodle/Title.png', caption: 'Doodle Arcade Cover Image' }
        ]
    },
    {
      title: 'Rchessengine',
      description: "A chess engine",
      link: 'https://github.com/rutra8002/rchessengine',
      tags: ['Rust'],
      projectType: 'personal'
    },
    {
        title: 'Quiz App',
        description:
            'A full-stack quiz application with user authentication, SQLite backend, and AI-powered answer validation via the Gemini API. Deployed on a Raspberry Pi with Flask.',
        link: 'https://github.com/rutra8002/quizapp',
        demoLink: 'https://quiz.rutra.me',
        demoLabel: 'Try it Live',
        tags: ['Python', 'Flask', 'HTML', 'Tailwind', 'SQLite', 'AI'],
        projectType: 'personal',
        media: [],
    },
    {
        title: 'Portfolio Website',
        description: 'This site. A modern, animated portfolio built with React, Tailwind, and Framer Motion.',
        link: 'https://github.com/rutra8002/rutra8002.github.io',
        tags: ['React', 'CSS', 'TypeScript'],
        projectType: 'personal',
        media: [
            { type: 'image', src: '/images/portfolio/portfolio1.png', caption: 'About me section' },
            { type: 'image', src: '/images/portfolio/portfolio2.png', caption: 'Projects section' },
        ],
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
        demoLink: 'https://rutra8002.itch.io/pixel-racers',
        demoLabel: 'Play on itch.io',
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

        demoLabel: 'Play on itch.io',
        demoLink: "https://rutra8002.itch.io/storm-survival",

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