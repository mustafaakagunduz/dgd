import Image from "next/image";

interface AdvisorCardProps {
    imageSrc: string;
    name: string;
    title: string;
    bio: string;
}

const AdvisorCard = ({ imageSrc, name, title, bio }: AdvisorCardProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative h-80 w-full">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                <p className="text-sm text-green-300 mb-3">{title}</p>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {bio}
                </div>
            </div>
        </div>
    );
};

export default AdvisorCard;