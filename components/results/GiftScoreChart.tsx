"use client"

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { scoreColor, type ScoredGift } from "@/lib/scoring"

export function GiftScoreChart({ gifts }: { gifts: ScoredGift[] }) {
  const data = gifts.map((gift) => ({
    name: gift.name,
    score: gift.score,
    fill: scoreColor(gift.score),
  }))

  return (
    <div className="rounded-3xl bg-white p-4 ring-1 ring-[#17243A]/10 sm:p-6">
      <h3 className="font-serif text-2xl text-[#17243A]">Strongest scores</h3>
      <p className="mt-1 text-sm text-[#667085]">
        Bars of the same length and color share a score. The scale runs from 0 to 8.
      </p>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 28, top: 8, bottom: 0 }}>
            <XAxis type="number" domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} stroke="#667085" />
            <YAxis
              type="category"
              dataKey="name"
              width={118}
              tick={{ fill: "#17243A", fontSize: 12 }}
              interval={0}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={18} isAnimationActive={false}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList dataKey="score" position="right" fill="#17243A" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Scores for the strongest gifts</caption>
        <thead>
          <tr>
            <th>Gift</th>
            <th>Score out of 8</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift.giftId}>
              <td>{gift.name}</td>
              <td>{gift.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
