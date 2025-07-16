import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GalleryVerticalEndIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GalleryVerticalEndIconProps
	extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		translateY: 0,
		opacity: 1,
		transition: {
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	},
	animate: (i: number) => ({
		translateY: [2 * i, 0],
		opacity: [0, 1],
		transition: {
			delay: 0.25 * (2 - i),
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	}),
};

const GalleryVerticalEndIcon = forwardRef<
	GalleryVerticalEndIconHandle,
	GalleryVerticalEndIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (isControlledRef.current) {
				onMouseEnter?.(e);
			} else {
				controls.start("animate");
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (isControlledRef.current) {
				onMouseLeave?.(e);
			} else {
				controls.start("normal");
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<button
			aria-label="Gallery Vertical End Icon"
			className={cn(className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			type="button"
			{...props}
		>
			<svg
				fill="none"
				height={size}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Gallery vertical end icon</title>
				<motion.path
					animate={controls}
					custom={1}
					d="M7 2h10"
					variants={pathVariants}
				/>
				<motion.path
					animate={controls}
					custom={2}
					d="M5 6h14"
					variants={pathVariants}
				/>
				<rect height="12" rx="2" width="18" x="3" y="10" />
			</svg>
		</button>
	);
});

GalleryVerticalEndIcon.displayName = "GalleryVerticalEndIcon";

export { GalleryVerticalEndIcon };
