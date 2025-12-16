"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export default function ScrollAnimation({ children, className = "", delay = 0 }: ScrollAnimationProps) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setTimeout(() => setIsVisible(true), delay);
				}
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
		);

		const node = ref.current;
		if (node) observer.observe(node);

		return () => {
			if (node) observer.unobserve(node);
		};
	}, [delay]);

	return (
		<div
			ref={ref}
			className={`transition-all duration-700 ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			} ${className}`}
		>
			{children}
		</div>
	);
}

