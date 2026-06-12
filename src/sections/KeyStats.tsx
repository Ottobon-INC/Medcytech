import { useEffect, useRef, useState } from 'react';

interface StatItem {
    id: string;
    label: string;
    targetValue: number;
    suffix: string;
    ariaLabel: string;
}

const stats: StatItem[] = [
    {
        id: 'clinics',
        label: 'Clinics Operating',
        targetValue: 20,
        suffix: '+',
        ariaLabel: '20 clinics operating on the Medcy platform',
    },
    {
        id: 'doctors',
        label: 'Doctors in the System',
        targetValue: 40,
        suffix: '+',
        ariaLabel: '40 doctors in the Medcy system',
    },
    {
        id: 'patients',
        label: 'Patients Served',
        targetValue: 500,
        suffix: '+',
        ariaLabel: '500 patients served through Medcy',
    },
];

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const StatCard = ({ stat, delay }: { stat: StatItem; delay: number }) => {
    const [displayValue, setDisplayValue] = useState('0');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number | null>(null);
    const duration = 2200; // 2.2 seconds (within 2.0-2.5s range)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isAnimating && !isCompleted) {
                    setTimeout(() => {
                        setIsAnimating(true);
                        requestAnimationFrame(animate);
                    }, delay);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.floor(easedProgress * stat.targetValue);

            setDisplayValue(currentValue.toLocaleString());

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
                setIsCompleted(true);
                setDisplayValue(`${stat.targetValue.toLocaleString()}${stat.suffix}`);
            }
        };

        return () => observer.disconnect();
    }, [stat, delay, isAnimating, isCompleted]);

    return (
        <div
            ref={cardRef}
            className="bg-white border border-[#2f8f83]/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,61,50,0.12)] group hover:-translate-y-1"
            aria-label={stat.ariaLabel}
        >
            <span className="text-[48px] md:text-[60px] font-bold text-[#0f3d32] leading-none mb-3 tabular-nums tracking-tight">
                {displayValue}
            </span>
            <span className="text-[13px] text-[#5b6e68] uppercase tracking-[0.2em] font-semibold">
                {stat.label}
            </span>
        </div>
    );
};

export const KeyStats = () => {
    return (
        <div className="w-full mt-10 md:mt-14 mb-14">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-[13px] md:text-[14px] text-[#5b6e68] mb-10 font-semibold uppercase tracking-[0.25em] opacity-80">
                    Trusted across India's healthcare network
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.id} stat={stat} delay={index * 150} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KeyStats;
