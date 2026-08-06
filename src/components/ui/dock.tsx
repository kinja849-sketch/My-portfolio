import React, { createContext, useContext, useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 1.12;
const DEFAULT_DISTANCE = 140;

interface DockContextType {
  mouseX: any;
  magnification: number;
  distance: number;
  spring: SpringOptions;
}

const DockContext = createContext<DockContextType>({
  mouseX: null,
  magnification: DEFAULT_MAGNIFICATION,
  distance: DEFAULT_DISTANCE,
  spring: { mass: 0.1, stiffness: 170, damping: 12 },
});

export interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
  spring?: SpringOptions;
}

export function Dock({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  spring = { mass: 0.1, stiffness: 170, damping: 12 },
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, spring }}>
      <motion.div
        onMouseMove={(e: MouseEvent) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-12 md:h-14 items-center justify-center gap-4 md:gap-7 rounded-full bg-[#1a1918]/95 px-5 md:px-7 py-2 backdrop-blur-md border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-auto",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  href?: string;
  as?: any;
}

export function DockItem({
  children,
  className,
  onClick,
  href = "#",
  as: Component = "a",
  ...props
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance, spring } = useContext(DockContext);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, magnification, 1]
  );

  const scale = useSpring(scaleSync, spring);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative flex items-center cursor-pointer origin-center"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-2.5 py-1 rounded-full text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-serif tracking-wide select-none no-underline",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}

export function DockBullet({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "w-2 h-2 rounded-full bg-white inline-block flex-shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.7)]",
        className
      )}
    />
  );
}

export function DockLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("whitespace-nowrap font-serif tracking-wide font-normal", className)}>
      {children}
    </span>
  );
}

export function MinimalistPillDock({
  items,
  onSelect,
}: {
  items?: Array<{ label: string; href?: string; onClick?: (e: any) => void }>;
  onSelect?: (item: any) => void;
}) {
  const defaultItems = [
    { label: "About", href: "#aboutme" },
    { label: "Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#footernav" },
  ];

  const navItems = items || defaultItems;

  return (
    <Dock>
      {navItems.map((item, idx) => (
        <DockItem
          key={idx}
          href={item.href}
          onClick={(e) => {
            if (item.onClick) item.onClick(e);
            if (onSelect) onSelect(item);
          }}
        >
          <DockBullet />
          <DockLabel>{item.label}</DockLabel>
        </DockItem>
      ))}
    </Dock>
  );
}
