import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessages = () => {
    const messages = [
        "Powering up...",
        "Gathering chakra...",
        "Charging kamehameha...",
        "Using the Dragon Balls...",
        "Summoning Shenron...",
        "Activating Sharingan...",
        "Going Super Saiyan...",
        "Performing hand signs...",
        "Unleashing Bankai...",
        "Spirit bomb charging...",
        "One For All: Full Cowling...",
        "Gear Second activated...",
        "Opening the Eight Gates...",
        "Rasengan in progress...",
        "Mastering Sun Breathing...",
        "Stand power manifesting...",
        "Drawing Transmutation Circles...",
        "Performing Human Transmutation...",
        "Wiping out the Uchiha Clan...",
        "Titan transformation...",
        "Almost Over 9000...",
    ];

    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-base text-muted-foreground animate-pulse">
                {messages[currentMessage]}
            </span>
        </div>
    );
};

export default ShimmerMessages;

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image 
                 src="/logo.svg"
                 alt="Vibe"
                 width={18}
                 height={18}
                 className="shrink-0"
                />
                <span className="text-sm font-medium">Vibe</span>
            </div>
            <div className="pl-8.5 flex flex-col gap-y-4">
                <ShimmerMessages />
            </div>
        </div>
    );
};
