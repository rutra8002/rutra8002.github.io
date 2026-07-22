export type Skill = {
    name: string;
    since: string;
};

export type LanguageGroup = {
    title: string;
    description: string;
    skills: Skill[];
};

export const languageGroups: LanguageGroup[] = [
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
            { name: "GLSL", since: "since 2025" },
        ],
    },
    {
        title: "Game Development",
        description: "Tools used for GameDev",
        skills: [
            { name: "Godot", since: "since 2026" },
            { name: "Raylib", since: "since 2024" },
            { name: "PyGame", since: "since 2022" },
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
            { name: "Docker", since: "since 2026" },
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