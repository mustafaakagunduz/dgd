"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

interface SubmenuItem {
    key: string;
    href: string;
    hasSubmenu?: boolean;
    submenuItems?: SubmenuItem[];
}

interface DropdownItem {
    key: string;
    href: string;
    hasSubmenu?: boolean;
    submenuItems?: SubmenuItem[];
}

interface NavItem {
    key: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
}

// Navigation config
const navItems: NavItem[] = [
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
                    { key: "navbar.aboutSubmenu.team", href: "/product-development" },
                    // { key: "navbar.aboutSubmenu.advisors", href: "/advisors" },

                ]
            },
            { key: "navbar.aboutDropdown.history", href: "/history" },
            { key: "navbar.aboutDropdown.commercialPartnerships", href: "/commercial-partnerships"},

        ]
    },
    {
        key: "navbar.activities",
        href: "/faaliyet-alanlarimiz",
        hasDropdown: true,
        dropdownItems: [
            {
                key: "navbar.activitiesDropdown.greenTech",
                href: "#",
                hasSubmenu: true,
                submenuItems: [
                    { key: "navbar.activitiesSubmenu.bioCyrcularProcess", href: "/bio-circular-process" },
                    { key: "navbar.activitiesSubmenu.nanoProducts", href: "/nano-products" }
                ]
            },
            {
                key: "navbar.activitiesDropdown.hvacTech",
                href: "#",
                hasSubmenu: true,
                submenuItems: [
                    { key: "navbar.activitiesSubmenu.radiatorSystems", href: "/radiator-systems" },
                    { key: "navbar.activitiesSubmenu.agricultureGreenhouse", href: "/agriculture-greenhouse" },
                    { key: "navbar.activitiesSubmenu.airPurification", href: "/air-purification" }
                ]
            },

            {
                key: "navbar.activitiesDropdown.architectureTech",
                href: "#",
                hasSubmenu: true,
                submenuItems: [
                    { key: "navbar.activitiesSubmenu.construction", href: "/construction" },
                    { key: "navbar.activitiesSubmenu.architecture", href: "/architecture" }
                ]
            },
            {
                key: "navbar.activitiesDropdown.prConsulting",
                href: "#",
                hasSubmenu: true,
                submenuItems: [
                    { key: "navbar.activitiesSubmenu.consultingServices", href: "/consulting-services" },
                    // { key: "navbar.activitiesSubmenu.socialMedia", href: "/social-media" },
                    // { key: "navbar.activitiesSubmenu.adPR", href: "/advertising-pr" },
                    // { key: "navbar.activitiesSubmenu.production", href: "/production-services" }
                ]
            }
        ]
    },
    // {
    //     key: "navbar.commercial-partnerships",
    //     href: "/commercial-partnerships",
    //     hasDropdown: false,

    // },
    {
        key: "navbar.our-brands",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            {
                key: "navbar.ourBrandsDropdown.decor-center",
                href: "/decor-center",
                hasSubmenu: false
            },
            {
                key: "navbar.ourBrandsDropdown.core-services",
                href: "/core-services",
                hasSubmenu: false
            },
            {
                key: "navbar.ourBrandsDropdown.inno-core",
                href: "/inno-core",
                hasSubmenu: false
            },
            {
                key: "navbar.ourBrandsDropdown.nexus",
                href: "/nexus",
                hasSubmenu: false
            },
            {
                key: "navbar.ourBrandsDropdown.re-gen-agro",
                href: "/re-gen-agro",
                hasSubmenu: false
            },
            {
                key: "navbar.ourBrandsDropdown.re-gen-stay",
                href: "/re-gen-stay",
                hasSubmenu: false
            }
        ]
    },

    { key: "navbar.techClub", href: "/tech-club" },
    { key: "navbar.contact", href: "/contact" }
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
    const [activeSecondSubmenu, setActiveSecondSubmenu] = useState<string | null>(null);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
    const [activeMobileSecondSubmenu, setActiveMobileSecondSubmenu] = useState<string | null>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
                setActiveSecondSubmenu(null);
            }
            if (
                mobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target as Node) &&
                // Mobil menü açma butonuna tıklamamak için kontrol
                !(e.target as HTMLElement).closest('[data-mobile-toggle]')
            ) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [languageMenuOpen, activeDropdown, mobileMenuOpen]);

    // Mobil menü açıkken body scroll'u engellemek için
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const getNavText = (key: string) => t(key) || key.split('.').pop() || key;

    const closeDropdowns = () => {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        setActiveSecondSubmenu(null);
        setMobileMenuOpen(false);
        setActiveMobileDropdown(null);
        setActiveMobileSubmenu(null);
        setActiveMobileSecondSubmenu(null);
    };

    const isNodeInstance = (target: any): target is Node => {
        return target && typeof target === 'object' && 'nodeType' in target;
    };

    const checkIfStillInMenu = (e: MouseEvent | React.MouseEvent) => {
        const relatedTarget = isNodeInstance(e.relatedTarget) ? e.relatedTarget : null;

        if (!relatedTarget) return false;

        // Check if mouse is still in the parent dropdown
        if (dropdownRef.current?.contains(relatedTarget)) {
            return true;
        }

        // Check if mouse is still in any submenu
        for (const key in submenuRefs.current) {
            if (submenuRefs.current[key]?.contains(relatedTarget)) {
                return true;
            }
        }

        return false;
    };

    const toggleMobileDropdown = (key: string) => {
        setActiveMobileDropdown(activeMobileDropdown === key ? null : key);
        // Alt menüleri sıfırla
        if (activeMobileDropdown !== key) {
            setActiveMobileSubmenu(null);
            setActiveMobileSecondSubmenu(null);
        }
    };

    const toggleMobileSubmenu = (key: string) => {
        setActiveMobileSubmenu(activeMobileSubmenu === key ? null : key);
        // Alt-alt menüyü sıfırla
        if (activeMobileSubmenu !== key) {
            setActiveMobileSecondSubmenu(null);
        }
    };

    const toggleMobileSecondSubmenu = (key: string) => {
        setActiveMobileSecondSubmenu(activeMobileSecondSubmenu === key ? null : key);
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
                    <div className="flex items-center">
                        <div className="relative h-15 w-15 bg-white/80 rounded">
                            <Link href="/" className="block relative h-full w-full">
                                <Image
                                    src="/assets/images/logo.jpeg"
                                    alt="DGD-GLOBAL"
                                    fill
                                    className="object-contain object-left"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation items - Ortada (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
                        {navItems.map((item) => (
                            <div
                                key={item.key}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(item.key)}
                                onMouseLeave={(e) => {
                                    setTimeout(() => {
                                        if (!checkIfStillInMenu(e)) {
                                            setActiveDropdown(null);
                                            setActiveSubmenu(null);
                                            setActiveSecondSubmenu(null);
                                        }
                                    }, 100);
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
                                                setTimeout(() => {
                                                    if (!checkIfStillInMenu(e)) {
                                                        setActiveDropdown(null);
                                                        setActiveSubmenu(null);
                                                        setActiveSecondSubmenu(null);
                                                    }
                                                }, 100);
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
                                                                setTimeout(() => {
                                                                    if (!checkIfStillInMenu(e)) {
                                                                        setActiveSubmenu(null);
                                                                        setActiveSecondSubmenu(null);
                                                                    }
                                                                }, 100);
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
                                                                    ref={(el) => {
                                                                        submenuRefs.current[dropdownItem.key] = el;
                                                                    }}
                                                                    className={cn(
                                                                        "absolute left-full top-0 ml-0 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg transition-all duration-200",
                                                                        activeSubmenu === dropdownItem.key ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                                    )}
                                                                    onMouseEnter={() => setActiveSubmenu(dropdownItem.key)}
                                                                    onMouseLeave={(e) => {
                                                                        setTimeout(() => {
                                                                            if (!checkIfStillInMenu(e)) {
                                                                                setActiveSubmenu(null);
                                                                                setActiveSecondSubmenu(null);
                                                                            }
                                                                        }, 100);
                                                                    }}
                                                                >
                                                                    <div className="py-2">
                                                                        {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                            <div
                                                                                key={submenuItem.key}
                                                                                className="relative"
                                                                                onMouseEnter={() =>
                                                                                    submenuItem.hasSubmenu && setActiveSecondSubmenu(submenuItem.key)
                                                                                }
                                                                                onMouseLeave={(e) => {
                                                                                    if (submenuItem.hasSubmenu) {
                                                                                        setTimeout(() => {
                                                                                            if (!checkIfStillInMenu(e)) {
                                                                                                setActiveSecondSubmenu(null);
                                                                                            }
                                                                                        }, 100);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {submenuItem.hasSubmenu ? (
                                                                                    <>
                                                                                        <div className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer">
                                                                                            <span>{getNavText(submenuItem.key)}</span>
                                                                                            <ChevronRight size={14} />
                                                                                        </div>

                                                                                        {/* Second level submenu */}
                                                                                        <div
                                                                                            ref={(el) => {
                                                                                                submenuRefs.current[submenuItem.key] = el;
                                                                                            }}
                                                                                            className={cn(
                                                                                                "absolute left-full top-0 ml-0 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg transition-all duration-200",
                                                                                                activeSecondSubmenu === submenuItem.key ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                                                            )}
                                                                                            onMouseEnter={() => setActiveSecondSubmenu(submenuItem.key)}
                                                                                            onMouseLeave={(e) => {
                                                                                                setTimeout(() => {
                                                                                                    if (!checkIfStillInMenu(e)) {
                                                                                                        setActiveSecondSubmenu(null);
                                                                                                    }
                                                                                                }, 100);
                                                                                            }}
                                                                                        >
                                                                                            <div className="py-2">
                                                                                                {submenuItem.submenuItems?.map((secondSubmenuItem) => (
                                                                                                    <Link
                                                                                                        key={secondSubmenuItem.key}
                                                                                                        href={secondSubmenuItem.href}
                                                                                                        className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                                                                                                        onClick={closeDropdowns}
                                                                                                    >
                                                                                                        {getNavText(secondSubmenuItem.key)}
                                                                                                    </Link>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                ) : (
                                                                                    <Link
                                                                                        href={submenuItem.href}
                                                                                        className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                                                                                        onClick={closeDropdowns}
                                                                                    >
                                                                                        {getNavText(submenuItem.key)}
                                                                                    </Link>
                                                                                )}
                                                                            </div>
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

                    {/* Language & Mobile Menu Button */}
                    <div className="flex items-center space-x-2">
                        {/* Language selector - Sağ taraf (Desktop) */}
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

                        {/* Mobile Menu Toggle Button */}
                        <button
                            data-mobile-toggle
                            className="lg:hidden flex items-center justify-center text-white hover:bg-white/10 p-2 rounded-md"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className={cn(
                    "fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 lg:hidden overflow-auto pt-20",
                    mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
            >
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <div key={item.key} className="border-b border-white/10 pb-4">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className="flex items-center justify-between w-full text-white font-medium py-2"
                                            onClick={() => toggleMobileDropdown(item.key)}
                                        >
                                            <span>{getNavText(item.key)}</span>
                                            <ChevronDown
                                                size={18}
                                                className="transition-transform duration-200"
                                                style={{
                                                    transform: activeMobileDropdown === item.key ? 'rotate(180deg)' : 'rotate(0)'
                                                }}
                                            />
                                        </button>

                                        {/* Mobile Dropdown */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-200",
                                            activeMobileDropdown === item.key ? "max-h-screen opacity-100 visible mt-2" : "max-h-0 opacity-0"
                                        )}>
                                            <div className="pl-4 border-l border-white/10 space-y-2">
                                                {item.dropdownItems?.map((dropdownItem) => (
                                                    <div key={dropdownItem.key} className="py-1">
                                                        {dropdownItem.hasSubmenu ? (
                                                            <>
                                                                <button
                                                                    className="flex items-center justify-between w-full text-white py-2"
                                                                    onClick={() => toggleMobileSubmenu(dropdownItem.key)}
                                                                >
                                                                    <span>{getNavText(dropdownItem.key)}</span>
                                                                    <ChevronDown
                                                                        size={16}
                                                                        className="transition-transform duration-200"
                                                                        style={{
                                                                            transform: activeMobileSubmenu === dropdownItem.key ? 'rotate(180deg)' : 'rotate(0)'
                                                                        }}
                                                                    />
                                                                </button>

                                                                {/* Mobile Submenu */}
                                                                <div className={cn(
                                                                    "overflow-hidden transition-all duration-200",
                                                                    activeMobileSubmenu === dropdownItem.key ? "max-h-screen opacity-100 visible mt-2" : "max-h-0 opacity-0"
                                                                )}>
                                                                    <div className="pl-4 border-l border-white/10 space-y-2">
                                                                        {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                            <div key={submenuItem.key} className="py-1">
                                                                                {submenuItem.hasSubmenu ? (
                                                                                    <>
                                                                                        <button
                                                                                            className="flex items-center justify-between w-full text-white py-2"
                                                                                            onClick={() => toggleMobileSecondSubmenu(submenuItem.key)}
                                                                                        >
                                                                                            <span>{getNavText(submenuItem.key)}</span>
                                                                                            <ChevronDown
                                                                                                size={16}
                                                                                                className="transition-transform duration-200"
                                                                                                style={{
                                                                                                    transform: activeMobileSecondSubmenu === submenuItem.key ? 'rotate(180deg)' : 'rotate(0)'
                                                                                                }}
                                                                                            />
                                                                                        </button>

                                                                                        {/* Mobile Second Submenu */}
                                                                                        <div className={cn(
                                                                                            "overflow-hidden transition-all duration-200",
                                                                                            activeMobileSecondSubmenu === submenuItem.key ? "max-h-screen opacity-100 visible mt-2" : "max-h-0 opacity-0"
                                                                                        )}>
                                                                                            <div className="pl-4 border-l border-white/10 space-y-2">
                                                                                                {submenuItem.submenuItems?.map((secondSubmenuItem) => (
                                                                                                    <div key={secondSubmenuItem.key} className="py-1">
                                                                                                        <Link
                                                                                                            href={secondSubmenuItem.href}
                                                                                                            className="block text-white py-2"
                                                                                                            onClick={closeDropdowns}
                                                                                                        >
                                                                                                            {getNavText(secondSubmenuItem.key)}
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                ) : (
                                                                                    <Link
                                                                                        href={submenuItem.href}
                                                                                        className="block text-white py-2"
                                                                                        onClick={closeDropdowns}
                                                                                    >
                                                                                        {getNavText(submenuItem.key)}
                                                                                    </Link>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Link
                                                                href={dropdownItem.href}
                                                                className="block text-white py-2"
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
                                        className="block text-white font-medium py-2"
                                        onClick={closeDropdowns}
                                    >
                                        {getNavText(item.key)}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile Language Selector */}
                        <div className="pt-4">
                            <div className="flex flex-col">
                                <div className="text-white font-medium mb-2 flex items-center">
                                    <Globe size={18} className="mr-2" />
                                    <span>{t("languages.selectLanguage") || "Select Language"}</span>
                                </div>
                                <div className="flex flex-col space-y-2 pl-7">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code as "tr" | "en");
                                                setMobileMenuOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center text-white py-2",
                                                language === lang.code && "font-medium"
                                            )}
                                        >
                                            <span className="w-6 h-6 flex items-center justify-center mr-2 rounded-full border border-white/20">
                                                {language === lang.code && "✓"}
                                            </span>
                                            {t(lang.key) || lang.code}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}