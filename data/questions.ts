import { defaultQuestionOrder } from "@/lib/question-order"
import { GIFT_IDS, type AssessmentQuestion } from "@/lib/types"

// Prompts 1–75 from Called by the Spirit: Gifts Inventory, Catholic Diocese of Cleveland.
// Gift n is prompts n, n+25, and n+50, matching the published scoring rubric.
const promptTexts = [
  "I often see the bigger picture and enjoy bringing people and project pieces together.",
  "Creating something useful or beautiful is enjoyable for me and it excites me to share my creation with others.",
  "I am very comfortable with digital projects and can easily see these endeavors through to completion.",
  "Recognizing the direction of the Holy Spirit in times of choice or conflict comes pretty easily to me. I can easily identify what is of goodness and truth and what is not.",
  "I never tire of responding to those who are discouraged, offering a listening ear and hope for the future. These opportunities are incredibly nurturing and energizing for me.",
  "I am very comfortable sharing the good news of Christ in my life with others, and this comes naturally to me.",
  "I remain steadfast in confidence that God will provide at all times regardless of overwhelming obstacles or negativity from others.",
  "I often seek out opportunities to somehow give to others because it fulfills a deeper longing in my heart. Giving is where I encounter the animating presence of Christ in my day-to-day activities.",
  "I have witnessed God's miraculous work in my life, and am confident that my prayers for healing have made a difference.",
  "Others have told me that my help doing small, practical things made a big difference.",
  "I enjoy creating an environment of welcome and making others feel comfortable.",
  "I spend a lot of time in my prayer asking for intercession for those in need, and this fulfills me.",
  "I enjoy learning about my faith and frequently encounter God's presence in my life through what I study.",
  "Others often look to me to create a vision for the future.",
  "The compassion I feel for others' suffering moves me to take action to help them; when I see another person in pain, I want to accompany them in their struggle.",
  "I work hard to maintain relationships with others from different cultural and ethnic backgrounds, and they inspire my own encounter with Christ.",
  "Others say that my musical abilities enhance their experience of prayer and worship.",
  "I enjoy connecting people to one another and helping them to advance together in their spiritual journey.",
  "Others often seek me out to mediate with issues that arise.",
  "I have a strong awareness of God's presence in my life, and this animates me to speak the truth courageously.",
  "I see ways to make things easier or better for other people or for my parish/community/workplace that others may not notice, and act without being asked.",
  "Seeing others grasp a concept gives me satisfaction.",
  "I am drawn to the simplicity in the lives of the saints and wish to model my life after theirs.",
  "Others look to me to be a \"measured voice\" during times of chaos.",
  "Others have told me that I am a very gifted writer and can express thoughts or concepts using words extremely well.",
  "It is easy for me to plan and follow through on projects. Others recognize my passion for this and call on me to oversee administrative tasks.",
  "Others have commented that my crafts or art is meaningful to them.",
  "I can easily navigate technology and virtual platforms and creatively imagine ways to utilize these for enrichment.",
  "When faced with a choice, I am most comfortable stepping back and taking time in prayer to listen to the Holy Spirit.",
  "It is not uncommon for people (including complete strangers) to trust in me by sharing what is troubling their heart, and they depart comforted by my presence and words.",
  "I consider myself a storyteller of the faith. I hope to animate others by the Good News I've personally encountered.",
  "Trusting the Holy Spirit's promptings, I have taken bold action in kingdom building without concrete evidence of success or what others may have considered risky or impractical.",
  "Others have expressed that I have a very generous heart and this characterizes who I am as a person. They often reach out to me to give of my time, talents or treasures.",
  "Others often ask me to pray for those who are suffering, believing God will use my prayer to bring about a remarkable healing in someone's life.",
  "I find great fulfillment (often working behind the scenes) in supporting and enabling others to successfully accomplish what God is calling them to do.",
  "I vividly encounter Christ and the movement of the Holy Spirit in my life when I welcome others in an environment of welcome and hospitality.",
  "Others have expressed feeling peaceful after they ask me to pray for them.",
  "Others have told me that insights I gathered from my own study have helped them grow in their own faith.",
  "I am able to see the gifts that others have and put people into situations where they can best use their gifts wisely.",
  "When I am hurt by the actions of another, I do my best to understand and to forgive.",
  "I easily recognize my interconnectedness with my other brothers and sisters in faith, and work to build bridges where I can to enhance the community, especially in the peripheries of my life.",
  "I find great fulfillment in my prayer life by either singing or playing an instrument.",
  "When guiding others on their journey of faith, I prefer to have a personal relationship with each of them rather than only being acquainted with them on a superficial level.",
  "I am not reactionary with opinions or views that differ from my own; I make it a point to listen to all sides before weighing in on an opinion.",
  "I have shared messages with others that I feel God revealed to me.",
  "I find joy simply in helping; I don't look for recognition or reward.",
  "I am able to explain things in different ways to help others understand, and this fulfills me.",
  "My faith life and spirituality are directly connected to my desire to live simply and serve the poor.",
  "In times of uncertainty, I have helped others discern good decisions that reflected God's will in their lives.",
  "I find writing, as a form of prayer, to be very powerful for me and a creative way to express my faith.",
  "Others seek my guidance when there is confusion or uncertainty in the planning or implementation of a project.",
  "I believe using my hands to create something is a form of prayer and a way to glorify God in my life and in the Church.",
  "Others have recognized my adept skills with social media, virtual brand creation, and comfort within technological arenas and have asked me to assist with their efforts.",
  "Others recognize my quick inspiration in times that clarity of truth is needed.",
  "Others have said my presence and/or words were comforting and encouraging in times of struggle and strife or that they felt God was working through me as an encouraging presence.",
  "Others are captivated by my joy and are curiously drawn into a deeper encounter with Christ because of my witness.",
  "Others recognize in me an unshakable trust in God, so that in times of crisis, it serves as a source of strength for them.",
  "I feel most fulfilled in my own faith walk when I can give somehow to someone in need, and this is a form of prayer for me.",
  "Others have been restored somehow physically, mentally, emotionally, or spiritually because of my care.",
  "I enjoy serving Jesus in the background in ways that can help those in the spotlight make a difference in the lives of others.",
  "Others have said they feel comfortable being themselves around me and describe me as personable and easy-going.",
  "Praying for others is an important part of my faith and others often ask me to pray for them.",
  "I am drawn to the wisdom and experiences of the saints who have emphasized excellence in study as a form of contemplation and spiritual growth.",
  "I feel empowered when I am able to see the success of others in projects I envision.",
  "Others have told me how much my presence helped them reconnect, heal, and forgive in times of struggle.",
  "Others sense my comfort in diverse situations and look to me as a bridge-builder.",
  "God blessed me with talents playing a musical instrument or by my voice, and I enjoy it very much.",
  "People tell me that I am a role model in faith and they are challenged to be better because of my example.",
  "Others say I exhibit great patience when dealing with difficult situations.",
  "Others say I speak with conviction and authority when I am advocating for someone or something; in the face of injustice, I am quick to speak up on behalf of truth and be a voice for the voiceless.",
  "Others have reached out to me, confident I am always willing to help, and asked me to serve.",
  "Others have thanked me for helping them understand information and concepts more clearly.",
  "Others have said my simple lifestyle/example challenges them to also live more simply for the benefit of those less fortunate.",
  "I appreciate complex problems and often work to come up with appropriate solutions.",
  "Others have shared that they have been influenced and nurtured by something I wrote.",
]

const drafts = promptTexts.map((text, index) => {
  const prompt = index + 1
  const giftId = GIFT_IDS[(prompt - 1) % GIFT_IDS.length]
  const item = Math.floor((prompt - 1) / GIFT_IDS.length) + 1
  return {
    id: `${giftId}-${item}`,
    giftId,
    prompt,
    text,
  }
})

const order = defaultQuestionOrder(drafts)

export const questions: AssessmentQuestion[] = drafts.map((question) => ({
  ...question,
  displayOrder: order.indexOf(question.id),
}))

export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return questions.find((question) => question.id === id)
}
