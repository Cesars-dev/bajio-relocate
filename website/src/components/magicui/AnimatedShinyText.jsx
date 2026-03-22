import { cn } from "../../lib/utils"

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` }}
      className={cn(
        "animate-shiny-text bg-clip-text bg-no-repeat [display:inline]",
        "bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
