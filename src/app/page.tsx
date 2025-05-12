import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Newsletter from "@/components/homepage/Newsletter";

export default function Home() {
    return (
        <main
            style={{
                background: 'linear-gradient(to bottom, #4b8224, #374151, #000000, #000000)'
            }}
        >
            <div className="relative">
                <Hero />
                <div
                    className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, transparent 90%, #4b8224)'
                    }}
                />
            </div>

            {/* About ve Newsletter'ın arka plan stillerini kaldırın */}
            <About />
            <Newsletter />
        </main>
    );
}