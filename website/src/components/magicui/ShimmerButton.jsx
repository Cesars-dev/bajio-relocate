import React from "react"
import { cn } from "../../lib/utils"

export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "2px",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
          borderRadius: borderRadius,
          background: background,
        }}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden border border-white/10 px-6 py-3 text-white",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className={cn("-z-30 blur-[2px]", "absolute inset-0 overflow-visible")}>
          <div className="animate-shimmer-slide absolute inset-0 aspect-square h-full">
            <div
              className="animate-spin-around absolute -inset-full w-auto rotate-0"
              style={{
                background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))`,
              }}
            />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "absolute inset-0 size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        {/* backdrop */}
        <div
          className="absolute -z-20"
          style={{
            inset: shimmerSize,
            borderRadius: borderRadius,
            background: background,
          }}
        />
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
