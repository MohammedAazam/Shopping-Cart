
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >

      <Button
        variant="link"
        className="px-2"
      >
        Home
      </Button>
      <Button
        variant="link"
         className="px-2"
      >
        Products
      </Button>
    </nav>
  )
}