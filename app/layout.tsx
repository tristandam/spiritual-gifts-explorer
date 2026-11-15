import type { Metadata } from "next"
import { Fraunces, Source_Sans_3 } from "next/font/google"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { APP_TITLE } from "@/lib/constants"
import "./globals.css"

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: "%s · Called by the Spirit",
  },
  description:
    "A mobile-first spiritual gifts reflection for Catholic high school students, adapted from the Diocese of Cleveland Called by the Spirit inventory.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#FFFBF2] text-[#17243A]">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#17243A] focus:px-4 focus:py-2 focus:text-[#FFFBF2]"
        >
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(245,200,66,0.38),transparent_60%)]"
        />
        <Header />
        <main id="content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
