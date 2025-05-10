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
    const dropdownRef = useRef<HTMLDivElement>(null);

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
            if (
                activeDropdown &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setActiveDropdown(null);
                setActiveSubmenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [languageMenuOpen, activeDropdown]);

    const getNavText = (key: string) => t(key) || key.split('.').pop() || key;

    const closeDropdowns = () => {
        setActiveDropdown(null);
        setActiveSubmenu(null);
    };

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                isScrolled ? "bg-black/70 backdrop-blur-md py-3" : "bg-transparent py-4"
            )}
        >
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo - Sol taraf */}
                    <div>
                        <Link href="/" className="text-white font-bold text-2xl">
                            DGD-GLOBAL
                        </Link>
                    </div>

                    {/* Navigation items - Ortada */}
                    <div className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
                        {navItems.map((item) => (
                            <div
                                key={item.key}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(item.key)}
                                onMouseLeave={(e) => {
                                    // Mouse'un dropdown'a mı yoksa submenu'ya mı hareket ettiğini kontrol et
                                    setTimeout(() => {
                                        // Eğer mouse hala dropdown veya submenu üzerindeyse menüyü açık tut
                                        const dropdownContainsTarget = dropdownRef.current?.contains(e.relatedTarget as Node);
                                        if (!dropdownContainsTarget) {
                                            setActiveDropdown(null);
                                            setActiveSubmenu(null);
                                        }
                                    }, 300);
                                }}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button className="flex items-center text-white font-medium hover:bg-white/10 px-4 py-2 rounded-md transition-colors">
                                            {getNavText(item.key)}
                                            <ChevronDown size={16} className="ml-1 transition-transform" style={{
                                                transform: activeDropdown === item.key ? 'rotate(180deg)' : 'rotate(0)'
                                            }} />
                                        </button>

                                        {/* Dropdown menü */}
                                        <div
                                            className={cn(
                                                "absolute left-0 mt-0 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg transition-all duration-200",
                                                activeDropdown === item.key ? 'opacity-100 visible' : 'opacity-0 invisible'
                                            )}
                                            onMouseEnter={() => setActiveDropdown(item.key)}
                                            onMouseLeave={(e) => {
                                                // Mouse'un hala dropdown alanında mı olduğunu kontrol et
                                                setTimeout(() => {
                                                    const dropdownContainsTarget = dropdownRef.current?.contains(e.relatedTarget as Node);
                                                    if (!dropdownContainsTarget) {
                                                        setActiveDropdown(null);
                                                        setActiveSubmenu(null);
                                                    }
                                                }, 300);
                                            }}
                                        >
                                            <div className="py-2">
                                                {item.dropdownItems?.map((dropdownItem) => (
                                                    <div
                                                        key={dropdownItem.key}
                                                        className="relative"
                                                        onMouseEnter={() =>
                                                            dropdownItem.hasSubmenu && setActiveSubmenu(dropdownItem.key)
                                                        }
                                                        onMouseLeave={(e) => {
                                                            if (dropdownItem.hasSubmenu) {
                                                                // Mouse'un submenu alanında mı olduğunu kontrol et
                                                                setTimeout(() => {
                                                                    const rect = dropdownRef.current?.getBoundingClientRect();
                                                                    const mouseX = e.clientX;
                                                                    const mouseY = e.clientY;

                                                                    // Eğer mouse submenu alanında değilse submenu'yu kapat
                                                                    if (rect && (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom)) {
                                                                        setActiveSubmenu(null);
                                                                    }
                                                                }, 250);
                                                            }
                                                        }}
                                                    >
                                                        {dropdownItem.hasSubmenu ? (
                                                            <>
                                                                <div className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer">
                                                                    <span>{getNavText(dropdownItem.key)}</span>
                                                                    <ChevronRight size={14} />
                                                                </div>

                                                                {/* Submenu */}
                                                                <div
                                                                    className={cn(
                                                                        "absolute left-full top-0 ml-0 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg transition-all duration-200",
                                                                        activeSubmenu === dropdownItem.key ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                                    )}
                                                                    onMouseEnter={() => setActiveSubmenu(dropdownItem.key)}
                                                                    onMouseLeave={(e) => {
                                                                        setTimeout(() => {
                                                                            const dropdownContainsTarget = dropdownRef.current?.contains(e.relatedTarget as Node);
                                                                            if (!dropdownContainsTarget) {
                                                                                setActiveSubmenu(null);
                                                                            }
                                                                        }, 250);
                                                                    }}
                                                                >
                                                                    <div className="py-2">
                                                                        {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                            <Link
                                                                                key={submenuItem.key}
                                                                                href={submenuItem.href}
                                                                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                                                                                onClick={closeDropdowns}
                                                                            >
                                                                                {getNavText(submenuItem.key)}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Link
                                                                href={dropdownItem.href}
                                                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                                                                onClick={closeDropdowns}
                                                            >
                                                                {getNavText(dropdownItem.key)}
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-white font-medium hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
                                    >
                                        {getNavText(item.key)}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Language selector - Sağ taraf */}
                    <div>
                        <div className="relative hidden lg:block" ref={languageDropdownRef}>
                            <button
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                className="flex items-center text-white space-x-1 hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
                            >
                                <Globe size={18} />
                                <span className="text-sm font-medium ml-1">{language.toUpperCase()}</span>
                                <ChevronDown size={14} />
                            </button>

                            {languageMenuOpen && (
                                <div className="absolute right-0 mt-1 w-36 bg-black/90 backdrop-blur-md rounded-md shadow-lg z-50">
                                    <div className="py-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as "tr" | "en");
                                                    setLanguageMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors",
                                                    language === lang.code && "bg-white/15 font-medium"
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