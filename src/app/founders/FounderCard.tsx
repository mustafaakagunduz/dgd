import Image from "next/image";

interface FounderCardProps {
    imageSrc: string;
    name: string;
    title: string;
}

const FounderCard = ({ imageSrc, name, title }: FounderCardProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 w-full max-w-md">
            <div className="relative h-80 w-full">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    className="transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-md text-green-300 mb-4">{title}</p>
            </div>
        </div>
    );
};

export default FounderCard;