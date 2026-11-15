import type { SpiritualGift } from "@/lib/types"

export function GiftSources({ gift }: { gift: SpiritualGift }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <h4 className="font-serif text-xl text-[#17243A]">Possible roles</h4>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[#17243A]">
          {gift.possibleRoles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-xl text-[#17243A]">Scripture</h4>
        <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-[#17243A]">
          {gift.scriptureReferences.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-xl text-[#17243A]">Catechism of the Catholic Church</h4>
        <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-[#17243A]">
          {gift.catechismReferences.map((reference) => (
            <li key={reference}>CCC {reference}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
