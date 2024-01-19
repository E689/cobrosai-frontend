import { ThemeToggle } from "@/components/ThemeToggle"

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[80vh] w-full h-full flex flex-col items-center justify-between p-20">
      <ThemeToggle />
      <div className="m-auto">
        {children}
      </div>
    </div>
  )
}