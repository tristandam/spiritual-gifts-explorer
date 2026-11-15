import { defaultQuestionOrder } from "@/lib/question-order"
import type { AssessmentQuestion, GiftId } from "@/lib/types"

interface QuestionDraft {
  id: string
  text: string
  giftId: GiftId
}

const drafts: QuestionDraft[] = [
  {
    id: "administration-1",
    giftId: "administration",
    text: "When a school project, family plan, or VEYM activity is coming up, I like building a plan so people and tasks fit together.",
  },
  {
    id: "administration-2",
    giftId: "administration",
    text: "People trust me to track schedules, supplies, or details because I follow through until the work is done.",
  },
  {
    id: "craftsmanship-1",
    giftId: "craftsmanship",
    text: "I enjoy making things with my hands, such as crafts, posters, repairs, or room setups, and I care about how they turn out.",
  },
  {
    id: "craftsmanship-2",
    giftId: "craftsmanship",
    text: "Creating something useful or beautiful for my family, parish, or youth group feels like a way I can offer my best to God.",
  },
  {
    id: "digital-media-1",
    giftId: "digital-media",
    text: "I feel comfortable using a phone, camera, or design app to help a group share what it is doing.",
  },
  {
    id: "digital-media-2",
    giftId: "digital-media",
    text: "I can picture how a post, photo, video, or livestream could help people at school, church, or VEYM feel connected.",
  },
  {
    id: "discernment-1",
    giftId: "discernment",
    text: "When I face a real choice, I try to pause and pray about what is true and good, not only what is easiest.",
  },
  {
    id: "discernment-2",
    giftId: "discernment",
    text: "In a confusing situation, I often notice whether a choice fits with God's goodness, and I can say that calmly.",
  },
  {
    id: "encouragement-1",
    giftId: "encouragement",
    text: "When someone is struggling, I naturally want to listen and help them feel hopeful.",
  },
  {
    id: "encouragement-2",
    giftId: "encouragement",
    text: "People have told me that a conversation with me left them feeling more confident or less alone.",
  },
  {
    id: "evangelism-1",
    giftId: "evangelism",
    text: "I feel comfortable sharing how my Catholic faith has made a difference in my life.",
  },
  {
    id: "evangelism-2",
    giftId: "evangelism",
    text: "I look for simple moments at school, online, or in VEYM to invite someone a step closer to Jesus and the Church.",
  },
  {
    id: "faith-1",
    giftId: "faith",
    text: "Even when things seem uncertain, I find it natural to trust that God is with me and to keep going.",
  },
  {
    id: "faith-2",
    giftId: "faith",
    text: "During a hard time, my trust in God has helped someone else feel steadier.",
  },
  {
    id: "giving-1",
    giftId: "giving",
    text: "I look for ways to share my time, money, or belongings with people who need them.",
  },
  {
    id: "giving-2",
    giftId: "giving",
    text: "Giving to someone in need feels like part of my prayer, not only an extra chore.",
  },
  {
    id: "healing-1",
    giftId: "healing",
    text: "When someone is sick or deeply hurting, I feel drawn to pray that God would heal them, and I stay with them while I pray.",
  },
  {
    id: "healing-2",
    giftId: "healing",
    text: "I believe God can bring real healing of body, mind, or spirit, and I am willing to pray for that even when I cannot see the outcome.",
  },
  {
    id: "helping-1",
    giftId: "helping",
    text: "I like quietly handling a small task so someone else can do the part they are called to do.",
  },
  {
    id: "helping-2",
    giftId: "helping",
    text: "I feel fulfilled supporting a leader, teacher, or teammate from behind the scenes.",
  },
  {
    id: "hospitality-1",
    giftId: "hospitality",
    text: "I notice when someone feels left out and try to make them feel welcome.",
  },
  {
    id: "hospitality-2",
    giftId: "hospitality",
    text: "I enjoy welcoming a new student, guest, or VEYM member so they feel they belong.",
  },
  {
    id: "intercession-1",
    giftId: "intercession",
    text: "I pray for specific people who are struggling, and I keep praying even when nothing changes quickly.",
  },
  {
    id: "intercession-2",
    giftId: "intercession",
    text: "When someone asks me to pray for them, I take that request seriously and actually pray.",
  },
  {
    id: "knowledge-1",
    giftId: "knowledge",
    text: "I enjoy studying Scripture, the saints, or what the Church teaches because it helps me know God better.",
  },
  {
    id: "knowledge-2",
    giftId: "knowledge",
    text: "Something I learned about the faith has helped me answer a friend's question or clear up a confusion.",
  },
  {
    id: "leadership-1",
    giftId: "leadership",
    text: "I notice what other people are good at, and I like inviting them into roles where those strengths help the group.",
  },
  {
    id: "leadership-2",
    giftId: "leadership",
    text: "When a project needs direction, others look to me to hold the goal and help the team finish it together.",
  },
  {
    id: "mercy-1",
    giftId: "mercy",
    text: "When I see someone suffering, I want to do something practical to ease that pain, without making them earn my help.",
  },
  {
    id: "mercy-2",
    giftId: "mercy",
    text: "When someone hurts me, I try to understand their situation and forgive rather than stay angry.",
  },
  {
    id: "global-cultural-engagement-1",
    giftId: "global-cultural-engagement",
    text: "I enjoy getting to know people whose culture, language, or background differs from mine, and I learn from them.",
  },
  {
    id: "global-cultural-engagement-2",
    giftId: "global-cultural-engagement",
    text: "I try to include people who are on the edge of my school, parish, or VEYM group so the community is wider than one friend circle.",
  },
  {
    id: "musicianship-1",
    giftId: "musicianship",
    text: "Singing or playing music during prayer helps me meet God, and I want that music to help others pray too.",
  },
  {
    id: "musicianship-2",
    giftId: "musicianship",
    text: "I am glad to lead or support music for Mass, a youth prayer, or a retreat, because worship feels fuller to me with song.",
  },
  {
    id: "shepherding-1",
    giftId: "shepherding",
    text: "I care about walking with particular people in their faith, not only speaking to a big group from a distance.",
  },
  {
    id: "shepherding-2",
    giftId: "shepherding",
    text: "Younger students or friends come to me with questions about God, and I try to help them grow closer to Jesus.",
  },
  {
    id: "peacemaking-1",
    giftId: "peacemaking",
    text: "When friends disagree, I listen to each side before I speak and try to help them move forward together.",
  },
  {
    id: "peacemaking-2",
    giftId: "peacemaking",
    text: "People ask me to help calm a conflict because I stay patient when opinions clash.",
  },
  {
    id: "prophecy-1",
    giftId: "prophecy",
    text: "When I see something unjust, I feel urged to speak the truth clearly, even if it is uncomfortable, because I believe God cares about that truth.",
  },
  {
    id: "prophecy-2",
    giftId: "prophecy",
    text: "I sometimes sense a word of challenge or encouragement that I believe God wants someone to hear, and I share it humbly rather than to impress people.",
  },
  {
    id: "service-1",
    giftId: "service",
    text: "I notice practical jobs others walk past, like setting up chairs or cleaning up, and I do them without waiting to be asked.",
  },
  {
    id: "service-2",
    giftId: "service",
    text: "Helping in small, unnoticed ways gives me real joy, even when nobody thanks me.",
  },
  {
    id: "teaching-1",
    giftId: "teaching",
    text: "I enjoy explaining a lesson, a prayer, or an idea in a way that helps another person understand.",
  },
  {
    id: "teaching-2",
    giftId: "teaching",
    text: "I feel satisfied when a classmate or younger student finally understands something because of how I explained it.",
  },
  {
    id: "voluntary-poverty-1",
    giftId: "voluntary-poverty",
    text: "I feel drawn to live more simply, with fewer extras and less showing off, so I can stay close to people who have less.",
  },
  {
    id: "voluntary-poverty-2",
    giftId: "voluntary-poverty",
    text: "Stories of people who lived simply and served the poor make me want to change my own habits, not only admire theirs.",
  },
  {
    id: "wisdom-1",
    giftId: "wisdom",
    text: "When a group is stressed or stuck, people look to me for a calm suggestion about what to do next.",
  },
  {
    id: "wisdom-2",
    giftId: "wisdom",
    text: "I like thinking through a complicated problem and offering a next step that is both faithful and practical.",
  },
  {
    id: "writing-1",
    giftId: "writing",
    text: "Writing, whether a journal, a reflection, a message, or a story, helps me pray and say what I believe.",
  },
  {
    id: "writing-2",
    giftId: "writing",
    text: "Someone has told me that something I wrote helped them think about God or their own life more clearly.",
  },
]

const order = defaultQuestionOrder(drafts)

export const questions: AssessmentQuestion[] = drafts.map((question) => ({
  ...question,
  displayOrder: order.indexOf(question.id),
}))

export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return questions.find((question) => question.id === id)
}
