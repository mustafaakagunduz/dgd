"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Navigation config
const navItems = [
    {
        key: "navbar.about",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { key: "navbar.aboutDropdown.visionMission", href: "/vision-mission" },
            {
                key: "navbar.aboutDropdown.whoWeAre",
                href: "/who-we-are",
                hasSubmenu: true,
                submenuItems: [
                    { key: "navbar.aboutSubmenu.founders", href: "/founders" },
                    { key: "navbar.aboutSubmenu.team", href: "/team" },
                    { key: "navbar.aboutSubmenu.advisors", href: "/advisors" },
                    { key: "navbar.aboutSubmenu.partners", href: "/solution-partners" }
                ]
            },
            { key: "navbar.aboutDropdown.history", href: "/history" },
            { key: "navbar.aboutDropdown.partners", href: "/solution-partners" }
        ]
    },
    {
        key: "navbar.activities",
        href: "/faaliyet-alanlarimiz",
        hasDropdown: true,
        dropdownItems: [
            { key: "navbar.activitiesDropdown.greenTech", href: "/green-tech" },
            { key: "navbar.activitiesDropdown.hvacTech", href: "/hvac-tech" },
            { key: "navbar.activitiesDropdown.agricultureTech", href: "/agriculture-tech" },
            { key: "navbar.activitiesDropdown.airPurification", href: "/air-purification" },
            { key: "navbar.activitiesDropdown.architectureTech", href: "/architecture-tech" },
            { key: "navbar.activitiesDropdown.prConsulting", href: "/pr-consulting" }
        ]
    },
    { key: "navbar.partnerships", href: "/is-birliklerimiz" },
    { key: "navbar.news", href: "/sektorel-haberler" },
    { key: "navbar.techClub", href: "/tech-club" },
    { key: "navbar.contact", href: "/iletisim" }
];

const languages = [
    { code: "tr", key: "languages.tr" },
    { code: "en", key: "languages.en" }
];

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                languageMenuOpen &&
                languageDropdownRef.current &&
                !languageDropdownRef.current.contains(e.target as Node)
            ) {
                setLanguageMenuOpen(false);
            }
            if (activeDropdown) {
                setActiveDropdown(null);
                setActiveSubmenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [languageMenuOpen, activeDropdown]);

    const getNavText = (key: string) => t(key) || key.split('.').pop() || key;

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                isScrolled ? "bg-black/70 backdrop-blur-md py-3" : "bg-transparent py-4"
            )}
        >
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center relative">
                    <div className="absolute left-4 lg:left-8">
                        <Link href="/" className="text-white font-bold text-2xl">DGD</Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10">
                        {navItems.map((item) => (
                            <div
                                key={item.key}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(item.key)}
                                onMouseLeave={() => {
                                    setActiveDropdown(null);
                                    setActiveSubmenu(null);
                                }}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button className="flex items-center text-white font-medium hover:bg-white/10 px-5 py-3 rounded-md">
                                            {getNavText(item.key)}
                                            <ChevronDown size={18} className="ml-2" />
                                        </button>

                                        {activeDropdown === item.key && (
                                            <div className="absolute left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg z-50">
                                                <div className="py-1">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                        <div
                                                            key={dropdownItem.key}
                                                            className="relative group"
                                                            onMouseEnter={() =>
                                                                dropdownItem.hasSubmenu && setActiveSubmenu(dropdownItem.key)
                                                            }
                                                            onMouseLeave={() =>
                                                                dropdownItem.hasSubmenu && setActiveSubmenu(null)
                                                            }
                                                        >
                                                            {dropdownItem.hasSubmenu ? (
                                                                <>
                                                                    <div className="flex items-center justify-between px-5 py-3 text-white hover:bg-white/10 cursor-pointer">
                                                                        <span>{getNavText(dropdownItem.key)}</span>
                                                                        <ChevronRight size={16} />
                                                                    </div>
                                                                    {activeSubmenu === dropdownItem.key && (
                                                                        <div className="absolute left-full top-0 ml-2 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg z-50">
                                                                            <div className="py-1">
                                                                                {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                                    <Link
                                                                                        key={submenuItem.key}
                                                                                        href={submenuItem.href}
                                                                                        className="block px-5 py-3 text-white hover:bg-white/10"
                                                                                        onClick={() => {
                                                                                            setActiveDropdown(null);
                                                                                            setActiveSubmenu(null);
                                                                                        }}
                                                                                    >
                                                                                        {getNavText(submenuItem.key)}
                                                                                    </Link>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <Link
                                                                    href={dropdownItem.href}
                                                                    className="block px-5 py-3 text-white hover:bg-white/10"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    {getNavText(dropdownItem.key)}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-white font-medium hover:bg-white/10 px-5 py-3 rounded-md"
                                    >
                                        {getNavText(item.key)}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="absolute right-4 lg:right-8">
                        <div className="relative hidden lg:block" ref={languageDropdownRef}>
                            <button
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                className="flex items-center text-white space-x-1 hover:bg-white/10 px-5 py-3 rounded-md"
                            >
                                <Globe size={20} />
                                <span className="text-base font-medium ml-2">{language.toUpperCase()}</span>
                                <ChevronDown size={18} />
                            </button>

                            {languageMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as "tr" | "en");
                                                    setLanguageMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "block w-full text-left px-4 py-3 text-white hover:bg-white/10",
                                                    language === lang.code && "bg-white/20 font-medium"
                                                )}
                                            >
                                                {t(lang.key) || lang.code}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
