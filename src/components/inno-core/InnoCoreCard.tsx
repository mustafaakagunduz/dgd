"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface InnoCoreCardProps {
    id: number;
    name: string;
    description: string;
    image: string;
    status: "proven" | "development";
    category: string;
}

const InnoCoreCard = ({ id, name, description, image, status, category }: InnoCoreCardProps) => {
    const { t } = useLanguage();

    const getStatusBadge = () => {
        if (status === "proven") {
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {t("innocore.status.proven")}
                </Badge>
            );
        } else {
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {t("innocore.status.development")}
                </Badge>
            );
        }
    };

    return (
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border border-gray-200">
            <CardHeader className="p-0">
                <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                        {getStatusBadge()}
                    </div>
                    <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90 text-gray-700 text-xs">
                            #{id}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-4">
                <div className="mb-3">
                    <Badge variant="secondary" className="text-xs break-words whitespace-normal leading-relaxed">
                        {category}
                    </Badge>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight">
                    {name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {description}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Link href={`/inno-core/product/${id}`} className="w-full">
                    <Button 
                        variant="outline" 
                        className="w-full hover:bg-gray-900 hover:text-white transition-colors"
                    >
                        {t("innocore.detailButton")}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default InnoCoreCard;