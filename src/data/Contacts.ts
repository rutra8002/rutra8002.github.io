import * as React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export type Contact = {
    icon: React.ComponentType<any>;
    label: string;
    display: string;
    href: string;
};

export const contacts: Contact[] = [
    {
        icon: FaEnvelope,
        label: 'Email',
        display: 'contact@rutra.me',
        href: 'mailto:contact@rutra.me',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        display: 'linkedin.com/in/rutra8002',
        href: 'https://www.linkedin.com/in/rutra8002',
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        display: 'github.com/rutra8002',
        href: 'https://github.com/rutra8002',
    },
];