import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-serif text-4xl text-[#17243A]">That page is not here</h1>
      <p className="mt-3 text-lg text-[#3E4A5C]">
        The link may be mistyped. You can return home or begin the reflection.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className={buttonVariants()}>
          Go home
        </Link>
        <Link href="/assessment" className={buttonVariants({ variant: "outline" })}>
          Begin Assessment
        </Link>
      </div>
    </div>
  )
}
