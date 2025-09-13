'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Branding from './Branding';

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [openTopic, setOpenTopic] = useState<number>(-1);
    const [openSubtitle, setOpenSubtitle] = useState<number>(-1);

    // ref for mobile menu to detect outside clicks
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleTopicClick = (idx: number) => {
        if (openTopic === idx) {
            setOpenTopic(-1);
            setOpenSubtitle(-1);
        } else {
            setOpenTopic(idx);
            setOpenSubtitle(-1);
        }
    };

    const handleSubtitleClick = (idx: number) => {
        if (openSubtitle === idx) {
            setOpenSubtitle(-1);
        } else {
            setOpenSubtitle(idx);
        }
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            setIsDarkMode(systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !menuButtonRef.current?.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <header className="flex w-full justify-between px-4 md:px-20 py-5 shadow-xl relative">
            {/* Logo y nombre */}
            <Branding />

            {/* Navegación */}
            <nav className="flex items-center gap-8">
                <ul className="flex gap-6 items-center">
                    <li className="hidden xl:flex">
                        <Link href="/">Inicio</Link>
                    </li>
                    <li className="hidden xl:flex">
                        <Link href="/help">Centro de ayuda</Link>
                    </li>

                    {/* Dropdown: La Asociación */}
                    <li className="relative hidden xl:block">
                        <button
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            onBlur={() => setTimeout(() => setMobileMenuOpen(false), 150)} // cierra al perder foco
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            La asociación
                            <svg
                                className={`w-4 h-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Menú desplegable */}
                        {mobileMenuOpen && (
                            <ul className="absolute left-0 mt-2 w-48 bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-lg shadow-lg flex flex-col z-50">
                                <li>
                                    <Link
                                        href="/about-us"
                                        className="block px-4 py-2 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] rounded-t-lg"
                                    >
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/directory"
                                        className="block px-4 py-2 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                                    >
                                        Directorio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/previous-presidents"
                                        className="block px-4 py-2 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                                    >
                                        Presidentes anteriores
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/agreements"
                                        className="block px-4 py-2 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] rounded-b-lg"
                                    >
                                        Convenios
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/documents"
                                        className="block px-4 py-2 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] rounded-b-lg"
                                    >
                                        Documentos
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Botón Proyectos */}
                    <li>
                        <Link href="/proyectos">
                            <button className="rounded-full cursor-pointer transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                                <p>Proyectos</p>
                            </button>
                        </Link>
                    </li>
                </ul>

                {/* Botón dark mode */}
                <button
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className="p-2 border-2 border-[var(--color-foreground)]/50 rounded-full cursor-pointer hidden xl:flex"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>
        </header>
    );
}
