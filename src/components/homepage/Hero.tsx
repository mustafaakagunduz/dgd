import Image from "next/image";

interface HeroProps {
    // You can add props later if needed
}

export default function Hero({}: HeroProps) {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/assets/images/heroimage.jpg"
                alt="Hero Image"
                fill
                priority
                className="object-cover"
            />
            {/* Optional overlay to improve navbar visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-32 pointer-events-none" />
        </div>
    );
}