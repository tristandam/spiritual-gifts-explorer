import type { Metadata } from "next"
import { DeleteDataButton } from "@/components/privacy/DeleteDataButton"
import {
  ATTRIBUTION,
  INDEPENDENT_DISCLAIMER,
  RESULTS_DISCLAIMER,
  SOURCE_URL,
} from "@/lib/constants"

export const metadata: Metadata = {
  title: "About",
  description: "Attribution, scoring, and privacy for Called by the Spirit.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-4xl text-[#17243A] sm:text-5xl">About this reflection</h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#17243A]">
        <p>
          Called by the Spirit is a spiritual gifts discovery for Catholic high school students. It was written especially for teenagers in parish life and in the Vietnamese Eucharistic Youth Movement, and it is useful for any Catholic student.
        </p>
        <p>
          {ATTRIBUTION} The original inventory was developed by the Catholic Diocese of Cleveland, Office of Missionary Discipleship.
        </p>
        <p>
          <a className="font-semibold underline decoration-[#F5C842] underline-offset-4" href={SOURCE_URL}>
            Open the original source PDF
          </a>
        </p>
        <p>{INDEPENDENT_DISCLAIMER}</p>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-[#17243A]">How scoring works</h2>
        <div className="mt-3 space-y-3 leading-relaxed text-[#17243A]">
          <p>
            There are 25 gifts and 50 original questions, two for each gift. Each answer is worth 1 to 4 points, so each gift scores from 2 to 8. The original diocesan inventory uses 75 questions. This shorter version is a new exploratory reflection, not an equivalent scoring edition of that inventory.
          </p>
          <p>
            Your strongest responses are the highest scores. If several gifts share a score, they are shown as equally strong. The app does not invent percentiles, probabilities, or a scientific ranking.
          </p>
          <p>{RESULTS_DISCLAIMER}</p>
          <p>
            A low score is not a judgment. It does not mean God is withholding grace, and it does not mean you lack faith. Charisms are discerned over time through prayer, service, and the people who know you.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-[#17243A]">Privacy</h2>
        <div className="mt-3 space-y-3 leading-relaxed text-[#17243A]">
          <p>
            Answers are stored locally in this browser. There is no login, no database, and no server-side copy of your results. The app does not ask for your name, email, or birth date. It does not use third-party trackers, public leaderboards, or automatic sharing with youth leaders.
          </p>
          <p>
            Private answers are not placed in the page address. If you share the site, only the public link is shared. You can delete the saved assessment at any time.
          </p>
        </div>
        <div className="mt-5">
          <DeleteDataButton />
        </div>
      </section>
    </div>
  )
}
