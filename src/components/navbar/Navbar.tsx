"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Navigation items with translation keys and dropdown options
const navItems = [
    {
        key: "navbar.about",
        href: "#", // Removed direct link
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
            { key: "navbar.aboutDropdown.partners", href: "/solution-partners" },
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
    { key: "navbar.contact", href: "/iletisim" },
];

// Available languages
const languages = [
    { code: "tr", key: "languages.tr" },
    { code: "en", key: "languages.en" }
];

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    // Console log for debugging
    useEffect(() => {
        if (activeDropdown) {
            console.log("Active dropdown:", activeDropdown);
        }
        if (activeSubmenu) {
            console.log("Active submenu:", activeSubmenu);
        }
    }, [activeDropdown, activeSubmenu]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle mouse leave for entire navbar to close dropdowns
    useEffect(() => {
        const navbar = document.querySelector('nav');

        const handleMouseLeave = () => {
            // Only close dropdowns when not in mobile mode
            if (window.innerWidth >= 1024) { // lg breakpoint
                setActiveDropdown(null);
                setActiveSubmenu(null);
            }
        };

        navbar?.addEventListener('mouseleave', handleMouseLeave);
        return () => navbar?.removeEventListener('mouseleave', handleMouseLeave);
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close language dropdown if clicked outside
            if (
                languageMenuOpen &&
                languageDropdownRef.current &&
                !languageDropdownRef.current.contains(event.target as Node)
            ) {
                setLanguageMenuOpen(false);
            }

            // Close navigation dropdown if clicked outside
            const clickedOnDropdown = Object.keys(dropdownRefs.current).some(key =>
                dropdownRefs.current[key] && dropdownRefs.current[key]?.contains(event.target as Node)
            );

            if (!clickedOnDropdown && activeDropdown) {
                setActiveDropdown(null);
                setActiveSubmenu(null);
            }

            // Close submenu if clicked outside of submenu but inside dropdown
            const clickedOnSubmenu = Object.keys(submenuRefs.current).some(key =>
                submenuRefs.current[key] && submenuRefs.current[key]?.contains(event.target as Node)
            );

            if (!clickedOnSubmenu && activeSubmenu && clickedOnDropdown) {
                setActiveSubmenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [languageMenuOpen, activeDropdown, activeSubmenu]);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Close any open dropdowns
        setActiveDropdown(null);
        setActiveSubmenu(null);
    };

    // Toggle language dropdown
    const toggleLanguageMenu = () => {
        setLanguageMenuOpen(!languageMenuOpen);
    };

    // Toggle dropdown menu
    const toggleDropdown = (key: string) => {
        if (activeDropdown === key) {
            setActiveDropdown(null);
            setActiveSubmenu(null);
        } else {
            setActiveDropdown(key);
            setActiveSubmenu(null);
        }
    };

    // Toggle submenu
    const toggleSubmenu = (key: string, event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }
        setActiveSubmenu(activeSubmenu === key ? null : key);
    };

    // Handle language selection
    const handleLanguageChange = (langCode: "en" | "tr") => {
        console.log("Language selection clicked:", langCode); // Debug log
        setLanguage(langCode);
        setLanguageMenuOpen(false);
        setMobileMenuOpen(false);
    };

    // Find translated link text or fallback to key
    const getNavText = (key: string) => {
        const translation = t(key);
        return translation || key.split('.').pop() || key;
    };

    // Find dropdown item by key
    const findDropdownItem = (items: any[], targetKey: string): any => {
        for (const item of items) {
            if (item.key === targetKey) return item;
            if (item.dropdownItems) {
                const found = findDropdownItem(item.dropdownItems, targetKey);
                if (found) return found;
            }
        }
        return null;
    };

    const setDropdownRef = (key: string, ref: HTMLDivElement | null) => {
        dropdownRefs.current[key] = ref;
    };

    const setSubmenuRef = (key: string, ref: HTMLDivElement | null) => {
        submenuRefs.current[key] = ref;
    };

    // Translation mapping for new items (for use until they're added to your translation files)
    const tempTranslations: Record<string, Record<string, string>> = {
        'en': {
            'navbar.aboutSubmenu.founders': 'Our Founders',
            'navbar.aboutSubmenu.team': 'Our Team',
            'navbar.aboutSubmenu.advisors': 'Our Advisors',
            'navbar.aboutSubmenu.partners': 'Solution Partners',
            'navbar.activitiesDropdown.greenTech': 'Green & Bio-Circular Technologies',
            'navbar.activitiesDropdown.hvacTech': 'Heating & Ventilation Technologies',
            'navbar.activitiesDropdown.agricultureTech': 'Next-Gen Agriculture & Greenhouse Systems',
            'navbar.activitiesDropdown.airPurification': 'Next-Gen Air Purification Systems',
            'navbar.activitiesDropdown.architectureTech': 'Building & Architecture Technologies',
            'navbar.activitiesDropdown.prConsulting': 'Communication & PR Consulting'
        },
        'tr': {
            'navbar.aboutSubmenu.founders': 'Kurucularımız',
            'navbar.aboutSubmenu.team': 'Ekibimiz',
            'navbar.aboutSubmenu.advisors': 'Danışmanlarımız',
            'navbar.aboutSubmenu.partners': 'Çözüm Ortaklarımız',
            'navbar.activitiesDropdown.greenTech': 'Yeşil ve Biyo-Döngüsel Teknolojiler',
            'navbar.activitiesDropdown.hvacTech': 'Isıtma ve Havalandırma Teknolojileri',
            'navbar.activitiesDropdown.agricultureTech': 'Yeni Nesil Tarım ve Seracılık Sistemleri',
            'navbar.activitiesDropdown.airPurification': 'Yeni Nesil Hava Temizleme Sistemleri',
            'navbar.activitiesDropdown.architectureTech': 'Yapı ve Mimari Teknolojiler',
            'navbar.activitiesDropdown.prConsulting': 'İletişim ve PR Danışmanlığı'
        }
    };

    // Enhanced translation function that also checks tempTranslations
    const getTempNavText = (key: string) => {
        // First try to get the translation from the context
        const translation = t(key);

        // If a valid translation was found, use it
        if (translation && translation !== key) {
            return translation;
        }

        // Otherwise check the temporary translations
        if (tempTranslations[language] && tempTranslations[language][key]) {
            return tempTranslations[language][key];
        }

        // Fallback to key processing
        return key.split('.').pop() || key;
    };

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/70 backdrop-blur-md py-3"
                    : "bg-transparent py-4"
            )}
        >
            {/* Stylized border at the bottom */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-300",
                isScrolled ? "opacity-100" : "opacity-50"
            )} />

            <div className="container mx-auto px-4">
                {/* Centered Menu */}
                <div className="flex items-center justify-center">
                    {/* Logo - positioned to the left */}
                    <div className="absolute left-4 lg:left-8">
                        <Link href="/" className="text-white font-bold text-2xl">
                            DGD
                        </Link>
                    </div>

                    {/* Desktop Menu - centered */}
                    <div className="hidden lg:flex items-center justify-center space-x-10">
                        {navItems.map((item) => (
                            <div
                                key={item.key}
                                className="relative"
                                ref={(ref) => setDropdownRef(item.key, ref)}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.key)}
                                            onMouseEnter={() => setActiveDropdown(item.key)}
                                            className="flex items-center text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md"
                                        >
                                            {getTempNavText(item.key)}
                                            <ChevronDown size={18} className="ml-2" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === item.key && (
                                            <div
                                                className="absolute left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="py-1">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                        <div
                                                            key={dropdownItem.key}
                                                            className="relative"
                                                            ref={(ref) => {
                                                                if (dropdownItem.hasSubmenu) {
                                                                    setSubmenuRef(dropdownItem.key, ref);
                                                                }
                                                            }}
                                                        >
                                                            {dropdownItem.hasSubmenu ? (
                                                                <>
                                                                    <div
                                                                        className="flex items-center justify-between px-5 py-3 text-base text-white hover:bg-white/10 transition-colors cursor-pointer"
                                                                        onClick={(e) => toggleSubmenu(dropdownItem.key, e)}
                                                                        onMouseEnter={(e) => {
                                                                            e.stopPropagation();
                                                                            setActiveSubmenu(dropdownItem.key);
                                                                        }}
                                                                    >
                                                                        <span>{getTempNavText(dropdownItem.key)}</span>
                                                                        <ChevronRight size={16} />
                                                                    </div>

                                                                    {/* Submenu (Right-side) */}
                                                                    {activeSubmenu === dropdownItem.key && (
                                                                        <div
                                                                            className="absolute left-full top-0 w-64 bg-black/90 backdrop-blur-md rounded-md shadow-lg overflow-hidden z-50 ml-2"
                                                                        >
                                                                            <div className="py-1">
                                                                                {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                                    <Link
                                                                                        key={submenuItem.key}
                                                                                        href={submenuItem.href}
                                                                                        className="block px-5 py-3 text-base text-white hover:bg-white/10 transition-colors"
                                                                                        onClick={() => {
                                                                                            setActiveSubmenu(null);
                                                                                            setActiveDropdown(null);
                                                                                        }}
                                                                                    >
                                                                                        {getTempNavText(submenuItem.key)}
                                                                                    </Link>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <Link
                                                                    href={dropdownItem.href}
                                                                    className="block px-5 py-3 text-base text-white hover:bg-white/10 transition-colors"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    {getTempNavText(dropdownItem.key)}
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
                                        className="text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md"
                                    >
                                        {getTempNavText(item.key)}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Language Selector - positioned to the right */}
                    <div className="absolute right-4 lg:right-8">
                        <div className="relative hidden lg:block" ref={languageDropdownRef}>
                            <button
                                onClick={toggleLanguageMenu}
                                className="flex items-center text-white space-x-1 hover:bg-white/10 transition-colors px-5 py-3 rounded-md"
                            >
                                <Globe size={20} />
                                <span className="text-base font-medium ml-2">{language.toUpperCase()}</span>
                                <ChevronDown size={18} />
                            </button>

                            {/* Language Dropdown */}
                            {languageMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md rounded-md shadow-lg overflow-hidden z-50">
                                    <div className="py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code as "en" | "tr")}
                                                className={cn(
                                                    "block w-full text-left px-4 py-3 text-base text-white hover:bg-white/10 transition-colors",
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

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden text-white focus:outline-none"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-black/95 backdrop-blur-md mt-4">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <div key={item.key} className="flex flex-col">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.key)}
                                            className={cn(
                                                "flex items-center justify-center text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md",
                                                activeDropdown === item.key && "bg-white/10"
                                            )}
                                        >
                                            {getTempNavText(item.key)}
                                            <ChevronDown size={18} className={cn(
                                                "ml-2 transition-transform",
                                                activeDropdown === item.key && "transform rotate-180"
                                            )} />
                                        </button>

                                        {activeDropdown === item.key && (
                                            <div className="mt-1 bg-white/5 rounded-md">
                                                {item.dropdownItems?.map((dropdownItem) => (
                                                    <div key={dropdownItem.key} className="relative">
                                                        {dropdownItem.hasSubmenu ? (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleSubmenu(dropdownItem.key)}
                                                                    className={cn(
                                                                        "flex w-full items-center justify-between text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md",
                                                                        activeSubmenu === dropdownItem.key && "bg-white/10"
                                                                    )}
                                                                >
                                                                    <span>{getTempNavText(dropdownItem.key)}</span>
                                                                    <ChevronDown size={16} className={cn(
                                                                        "transition-transform",
                                                                        activeSubmenu === dropdownItem.key && "transform rotate-180"
                                                                    )} />
                                                                </button>

                                                                {activeSubmenu === dropdownItem.key && (
                                                                    <div className="pl-5 mt-1 bg-white/5 rounded-md">
                                                                        {dropdownItem.submenuItems?.map((submenuItem) => (
                                                                            <Link
                                                                                key={submenuItem.key}
                                                                                href={submenuItem.href}
                                                                                className="block px-5 py-3 text-base text-white hover:bg-white/10 transition-colors"
                                                                                onClick={() => {
                                                                                    setActiveSubmenu(null);
                                                                                    setActiveDropdown(null);
                                                                                    setMobileMenuOpen(false);
                                                                                }}
                                                                            >
                                                                                {getTempNavText(submenuItem.key)}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Link
                                                                href={dropdownItem.href}
                                                                className="block px-5 py-3 text-base text-white hover:bg-white/10 transition-colors"
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setMobileMenuOpen(false);
                                                                }}
                                                            >
                                                                {getTempNavText(dropdownItem.key)}
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {getTempNavText(item.key)}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="border-t border-white/20 pt-4 mt-2">
                            <div className="flex flex-col space-y-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code as "en" | "tr")}
                                        className={cn(
                                            "flex items-center justify-center text-white text-base font-medium hover:bg-white/10 transition-colors py-3 px-5 rounded-md",
                                            language === lang.code && "bg-white/20"
                                        )}
                                    >
                                        <Globe size={18} className="mr-2" />
                                        {t(lang.key) || lang.code}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}