"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DoveMark } from "@/components/brand/DoveMark"
import { cn } from "@/lib/utils"

const links = [
  { href: "/assessment", label: "Assessment" },
  { href: "/gifts", label: "Gifts" },
  { href: "/about", label: "About" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-[#17243A]/10 bg-[#FFFBF2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-2 gap-y-1 px-4 py-2">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-2 rounded-full pr-1 font-serif text-base text-[#17243A] sm:text-lg"
        >
          <DoveMark className="size-10 shrink-0" />
          <span className="truncate">Called by the Spirit</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-2.5 text-sm font-semibold text-[#17243A] hover:bg-[#FFF3D6] sm:px-3",
                  active && "bg-[#FFF3D6]",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
