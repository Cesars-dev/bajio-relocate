import { cn } from "../../lib/utils"

export function ShineBorder({
  borderRadius = 14,
  borderWidth = 1,
  duration = 14,
  color = ["#C9A84C", "#FAF8F5", "#C9A84C"],
  className,
  children,
  ...props
}) {
  return (
    <div
      style={{
        "--border-radius": `${borderRadius}px`,
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        "--background-radial-gradient": `radial-gradient(transparent,transparent, ${Array.isArray(color) ? color.join(",") : color}, transparent, transparent)`,
      }}
      className={cn(
        "relative rounded-[--border-radius]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[--border-radius]",
        "before:p-[--border-width] before:[mask:var(--mask-linear-gradient)] before:[mask-composite:exclude]",
        "before:bg-[image:var(--background-radial-gradient)] before:bg-[length:300%_300%]",
        "before:animate-shine-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
