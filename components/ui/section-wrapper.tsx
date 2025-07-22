import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  as?: "section" | "div" | "article"
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
  id,
  as: Component = "section"
}: SectionWrapperProps) {
  return (
    <Component id={id} className={cn("py-16 md:py-24", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </Component>
  )
}