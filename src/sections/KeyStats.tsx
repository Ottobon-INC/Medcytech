import { useEffect, useRef, useState } from 'react';
import { waitForIntro, isIntroComplete } from '../utils/introSync';

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

/**
 * Single digit slot: shows digits 0..target stacked vertically.
 * Scrolls the column UPWARD so the target digit lands in view.
 */
const SlotDigit = ({
    target,
    animate,
    transitionDelay,
}: {
    target: number;
    animate: boolean;
    transitionDelay: number;
}) => {
    const digits = Array.from({ length: target + 1 }, (_, i) => i);

    return (
        <span
            style={{
                display: 'inline-block',
                overflow: 'hidden',
                height: '1em',
                lineHeight: 1,
            }}
        >
            <span
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: animate ? `translateY(-${target}em)` : 'translateY(0)',
                    transition: animate
                        ? `transform 1.6s cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}ms`
                        : 'none',
                    willChange: 'transform',
                }}
            >
                {digits.map((d) => (
                    <span key={d} style={{ display: 'block', height: '1em', lineHeight: 1 }}>
                        {d}
                    </span>
                ))}
            </span>
        </span>
    );
};

const RollingNumber = ({
    value,
    suffix,
    animate,
}: {
    value: number;
    suffix: string;
    animate: boolean;
}) => {
    const chars = value.toString().split('');

    return (
        <span style={{ display: 'inline-flex', alignItems: 'flex-end', lineHeight: 1 }}>
            {chars.map((ch, i) => {
                const n = parseInt(ch, 10);
                if (!isNaN(n)) {
                    return (
                        <SlotDigit
                            key={i}
                            target={n}
                            animate={animate}
                            transitionDelay={i * 80}
                        />
                    );
                }
                return <span key={i}>{ch}</span>;
            })}
            <span>{suffix}</span>
        </span>
    );
};

const StatCard = ({ stat, delay }: { stat: StatItem; delay: number }) => {
    const [animate, setAnimate] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        if (triggered.current) return;

        const trigger = () => {
            if (triggered.current) return;
            triggered.current = true;
            setTimeout(() => setAnimate(true), delay);
        };

        if (!isIntroComplete()) {
            // First page load: sync with navbar intro finishing
            waitForIntro().then(trigger);
        } else {
            // Intro already done (subsequent mounts): use IntersectionObserver
            const observer = new IntersectionObserver(
                (entries) => { if (entries[0].isIntersecting) trigger(); },
                { threshold: 0.3 }
            );
            if (cardRef.current) observer.observe(cardRef.current);
            return () => observer.disconnect();
        }
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className="bg-white border border-[#2f8f83]/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,61,50,0.12)] group hover:-translate-y-1"
            aria-label={stat.ariaLabel}
        >
            <span className="text-[48px] md:text-[60px] font-bold text-[#0f3d32] leading-none mb-3">
                <RollingNumber
                    value={stat.targetValue}
                    suffix={stat.suffix}
                    animate={animate}
                />
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
