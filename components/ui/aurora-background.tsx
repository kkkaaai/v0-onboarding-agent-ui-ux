"use client"

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col bg-[#f4f6f5] text-slate-950 transition-[background-color]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--aurora:repeating-linear-gradient(100deg,#97f8e3_5%,rgba(19,84,78,0.45)_15%,rgba(19,84,78,0.35)_25%,#97f8e3_35%,rgba(19,84,78,0.55)_45%)]
              [background-image:var(--white-gradient),var(--aurora)]
              dark:[background-image:var(--dark-gradient),var(--aurora)]
              [background-size:280%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[14px] invert dark:invert-0
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
              after:dark:[background-image:var(--dark-gradient),var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
              absolute -inset-[12px] opacity-60 will-change-transform
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_120%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        />
      </div>
      <div className="relative flex-1 w-full">
        {children}
      </div>
    </div>
  )
}

