import { ThemeToggle } from "@/components/theme/ThemeToggle"
import BackHome from "@/components/misc/BackHome"

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[90vh] md:min-h-[80vh] w-full h-full flex flex-col items-center justify-between p-5 md:p-20">
      <BackHome />
      <ThemeToggle />
      <div className="m-auto">
        {children}
      </div>
    </div>
  )
}