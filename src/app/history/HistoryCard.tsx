interface HistoryCardProps {
    content: string;
}

const HistoryCard = ({ content }: HistoryCardProps) => {
    return (
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 max-w-6xl mx-auto">
            {/* Arkaplan gradient overlay - hover efekti için */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

            {/* Dekoratif köşe elementleri */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl" />

            <div className="relative p-8 md:p-12 lg:p-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                        {content}
                    </div>
                </div>

                {/* Dekoratif alt çizgi */}
                <div className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent transform -translate-x-1/2" />
            </div>
        </div>
    );
};

export default HistoryCard;