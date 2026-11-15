import Link from "next/link"
import { Clock, HeartHandshake, Sparkles, UserRound } from "lucide-react"
import { DoveMark } from "@/components/brand/DoveMark"
import { buttonVariants } from "@/components/ui/button"
import { ATTRIBUTION, INDEPENDENT_DISCLAIMER } from "@/lib/constants"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Reflect",
    text: "Answer questions about your strengths and experiences.",
  },
  {
    title: "Discover",
    text: "Explore your strongest potential spiritual gifts.",
  },
  {
    title: "Respond",
    text: "Learn how to use your gifts to serve God and others.",
  },
]

const facts = [
  { icon: Clock, label: "About 10 minutes" },
  { icon: Sparkles, label: "50 questions" },
  { icon: HeartHandshake, label: "25 spiritual gifts" },
  { icon: UserRound, label: "No account required" },
]

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-8 pt-10 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#8A6A12]">
            A spiritual gifts discovery for Catholic teens
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-4xl leading-[1.1] text-[#17243A] sm:text-6xl">
            Discover the Gifts God Has Given You
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3E4A5C]">
            The Holy Spirit works through each of us in unique ways. Discover your strengths, explore how God might be calling you, and learn how your gifts can serve others.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/assessment" className={cn(buttonVariants({ size: "lg" }), "bg-[#F5C842] text-[#17243A] hover:bg-[#e7b62a]")}>
              Discover My Gifts
            </Link>
            <a href="#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
              How Does It Work?
            </a>
          </div>
          <p className="mt-4 text-sm text-[#667085]">No account. Your answers stay in this browser.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(23,36,58,0.08)] ring-1 ring-[#17243A]/10">
          <DoveMark className="size-20" />
          <p className="mt-4 font-serif text-2xl text-[#17243A]">Come, Holy Spirit.</p>
          <p className="mt-2 leading-relaxed text-[#3E4A5C]">
            This reflection is a starting point for prayer, conversation, and service. It is especially written for high school students in parish life and in VEYM.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 pb-12 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl bg-white px-4 py-4 ring-1 ring-[#17243A]/10">
            <fact.icon aria-hidden="true" className="size-5 text-[#8A6A12]" />
            <p className="mt-2 font-semibold text-[#17243A]">{fact.label}</p>
          </div>
        ))}
      </section>

      <section id="how-it-works" className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="font-serif text-3xl text-[#17243A] sm:text-4xl">How does it work?</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-[#FFF3D6] p-5">
              <p className="font-serif text-3xl text-[#8A6A12]">{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl text-[#17243A]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-[#17243A]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="rounded-[2rem] bg-[#17243A] px-6 py-8 text-[#FFFBF2] sm:px-10">
          <h2 className="font-serif text-3xl sm:text-4xl">What is a charism?</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#FFF3D6]">
            A charism is a gift of grace given by the Holy Spirit for building up the Church and serving others. It is meant to be given away.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <p className="rounded-2xl bg-white/10 p-4 leading-relaxed">
              Charisms are not simply personality traits or natural talents, even though God can work through both.
            </p>
            <p className="rounded-2xl bg-white/10 p-4 leading-relaxed">
              They are also different from the seven gifts of the Holy Spirit in Catholic teaching: wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord. Those gifts and these charisms can be related.
            </p>
            <p className="rounded-2xl bg-white/10 p-4 leading-relaxed">
              This questionnaire is a starting point for discernment. It is not a definitive declaration of your spiritual gifts.
            </p>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#FFFBF2]/80">
            {ATTRIBUTION} {INDEPENDENT_DISCLAIMER}
          </p>
        </div>
      </section>
    </div>
  )
}
