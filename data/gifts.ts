import type { GiftId, SpiritualGift } from "@/lib/types"
import { giftSources } from "@/data/gift-sources"

const giftDrafts: Array<
  Omit<SpiritualGift, "scriptureReferences" | "catechismReferences" | "possibleRoles">
> = [
  {
    id: "administration",
    slug: "administration",
    name: "Administration",
    icon: "clipboard-list",
    shortDescription:
      "You bring people, time, and resources together so a good work can actually get finished.",
    detailedDescription:
      "Administration is a charism for organizing people and practical details in service of a larger purpose. It is more than liking a neat binder. People who recognize this gift often see how the pieces of a project fit, and they can meet Christ in the patient work of turning a vision into a plan. The Diocese of Cleveland inventory describes this gift as a passion for organizing so the Church's mission can move forward.",
    patronSaint: "St. Teresa of Avila",
    everydayExamples: [
      "Map out a group project so every person knows the next step.",
      "Build a schedule, sign-up, or supply list that keeps an event calm.",
      "Notice a missing detail and follow it through before it becomes a problem.",
    ],
    veymExamples: [
      "Help leaders turn a retreat or team day into a clear timeline.",
      "Track who is bringing food, music, props, or materials.",
      "Coordinate a service project so the work is shared fairly.",
    ],
    tryThis: "Offer to organize one upcoming youth activity from the first plan to the last thank-you.",
    reflectionQuestion:
      "When has a plan you made helped other people serve with less stress?",
  },
  {
    id: "craftsmanship",
    slug: "craftsmanship",
    name: "Craftsmanship",
    icon: "hammer",
    shortDescription:
      "You make useful and beautiful things that can serve people and give glory to God.",
    detailedDescription:
      "Craftsmanship is a charism for shaping matter with skill and care. It shows up in art, repairs, cooking, sewing, building, and the hands-on work of making a space ready. The Diocese of Cleveland inventory connects this gift with reflecting God's beauty through what we create, and with meeting Christ in the joy of making. The point is not perfection. It is offering honest work for the good of others.",
    patronSaint: "St. Joseph",
    everydayExamples: [
      "Repair, build, or decorate something that makes a home or classroom more welcoming.",
      "Design a poster, banner, or prayer corner with real care.",
      "Cook or craft for a celebration so other people can gather.",
    ],
    veymExamples: [
      "Prepare a prayer space, backdrop, or props for a celebration.",
      "Help repair equipment, costumes, or camp setups.",
      "Make something by hand that younger members can use in an activity.",
    ],
    tryThis: "Make one useful or beautiful thing this month for your parish, family, or youth group.",
    reflectionQuestion:
      "Where do your hands already serve someone, even in ordinary tasks?",
  },
  {
    id: "digital-media",
    slug: "digital-media",
    name: "Digital Media",
    icon: "smartphone",
    shortDescription:
      "You use phones, cameras, and design tools to connect people with one another and with the Gospel.",
    detailedDescription:
      "Digital media, in this inventory, is not simply being online a lot. It is a charism for using virtual tools to inspire hearts and help people find Christ. The Diocese of Cleveland describes people with this gift as comfortable in digital spaces and creative about connecting others to the Gospel. For a teenager, that might mean photography, graphics, captions, livestreams, or a group chat used with care and kindness.",
    patronSaint: "Bl. Carlo Acutis",
    everydayExamples: [
      "Design a clear graphic that helps people know when and where to show up.",
      "Photograph an event so people who could not attend still feel included.",
      "Choose words online that are truthful and kind, especially in a group chat.",
    ],
    veymExamples: [
      "Create graphics for a meeting, retreat, or day of service.",
      "Help with photos, video, or a livestream of a celebration.",
      "Support youth-group messages so families receive clear, respectful updates.",
    ],
    tryThis: "Create one post, photo set, or graphic that helps your community pray, serve, or welcome someone.",
    reflectionQuestion:
      "How could your screen become a tool for communion instead of only for scrolling?",
  },
  {
    id: "discernment",
    slug: "discernment",
    name: "Discernment",
    icon: "compass",
    shortDescription:
      "You pause to notice what is of God when a choice or conflict is unclear.",
    detailedDescription:
      "Discernment is a charism for recognizing Christ's presence and seeking the Holy Spirit's guidance in real decisions. The Diocese of Cleveland inventory describes it as a keen sense of what is good and true, along with enough trust to help others pray about a choice. It is not a license to judge people. It is a habit of listening before you act, especially when pressure, fear, or popularity is loud.",
    patronSaint: "St. Ignatius of Loyola",
    everydayExamples: [
      "Take a day to pray before a big decision about friends, time, or a commitment.",
      "Name, without attacking anyone, when a plan does not feel honest or kind.",
      "Help a friend sort a choice by asking what seems true, good, and possible.",
    ],
    veymExamples: [
      "Pray with your team before choosing a project or a leader role.",
      "Help a small group slow down when everyone is rushing a decision.",
      "Ask a chaplain or leader to help you test a strong feeling in prayer.",
    ],
    tryThis: "Before your next hard choice, write two options and pray with each one for a day.",
    reflectionQuestion:
      "When have you sensed a difference between what is popular and what is good?",
  },
  {
    id: "encouragement",
    slug: "encouragement",
    name: "Encouragement",
    icon: "message-heart",
    shortDescription:
      "You notice when people need hope, and your listening helps them feel seen.",
    detailedDescription:
      "Encouragement is a charism of listening so well that another person can breathe again. The Diocese of Cleveland inventory describes it as helping people feel heard, seen, and cared for, often leading them toward renewed hope. It is fueled by compassion, and it leaves the encourager more alive, not drained by gossip or fixing everyone. You do not have to have the perfect speech. Staying present is already a gift.",
    patronSaint: "St. Dymphna",
    everydayExamples: [
      "Sit with a friend after a hard grade, a family worry, or a lonely week.",
      "Send a specific message that names what you appreciate about someone.",
      "Remind a discouraged teammate of a strength you have actually seen.",
    ],
    veymExamples: [
      "Check on a member who has been quiet at meetings.",
      "Encourage a younger student who is nervous about praying out loud.",
      "Stay after an activity to listen when someone needs to talk.",
    ],
    tryThis: "Reach out to one person who seems discouraged this week and listen before you advise.",
    reflectionQuestion:
      "When has someone's hope grown because you stayed and listened?",
  },
  {
    id: "evangelism",
    slug: "evangelism",
    name: "Evangelism",
    icon: "megaphone",
    shortDescription:
      "You want other people to meet Jesus, and you can talk about your faith in ordinary life.",
    detailedDescription:
      "Evangelism is a charism for sharing the good news of Jesus in word and action so others can draw closer to him and his Church. The Diocese of Cleveland inventory describes people with this gift as ready to bring faith into daily conversations, not only into church programs. For a teenager, that usually looks like a honest story, a kind invitation, or a life that makes someone curious. It does not require a loud personality or a perfect argument.",
    patronSaint: "Bl. Miguel Pro",
    everydayExamples: [
      "Tell a friend, simply, how prayer or Mass has helped you.",
      "Invite someone to a youth night, Mass, or service day without pressure.",
      "Answer a question about Catholic faith with patience and honesty.",
    ],
    veymExamples: [
      "Share a short witness during prayer or a team meeting.",
      "Invite a classmate to a VEYM gathering and stay with them when they arrive.",
      "Help plan an outreach that introduces younger members to Jesus.",
    ],
    tryThis: "Invite one person to come with you to Mass, a service project, or youth prayer.",
    reflectionQuestion:
      "Who first helped you want to know Jesus, and how did they do it?",
  },
  {
    id: "faith",
    slug: "faith",
    name: "Faith",
    icon: "anchor",
    shortDescription:
      "You trust God's care enough to keep going, and that trust can steady other people.",
    detailedDescription:
      "The charism of faith in this inventory is an unusual freedom to trust God's providence and to act on that trust. The Diocese of Cleveland describes it as confidence that God will provide, even when the path looks risky or unclear, and as a witness that draws other people toward Christ. Every baptized person is called to believe. A lower score here does not mean your faith is weak or that God is distant. It means these particular questions did not describe you as strongly today.",
    patronSaint: "St. Therese of Lisieux",
    everydayExamples: [
      "Keep praying and showing up when a situation has no quick fix.",
      "Take a faithful step, such as telling the truth or serving, before you feel certain of the result.",
      "Remind your family or friends, calmly, that God has not left them.",
    ],
    veymExamples: [
      "Pray with your team when plans fall apart.",
      "Encourage members to trust God with exams, family stress, or a hard service day.",
      "Say yes to a role that stretches you because you believe God can work through the group.",
    ],
    tryThis: "Name one worry and pray a short act of trust about it every day this week.",
    reflectionQuestion:
      "Where have you trusted God before you could see how things would turn out?",
  },
  {
    id: "giving",
    slug: "giving",
    name: "Giving",
    icon: "hand-coins",
    shortDescription:
      "Sharing your time, money, or things with people in need is one of the ways you pray.",
    detailedDescription:
      "All Christians are called to be generous. The charism of giving is a particular joy in providing for other people's needs with time, talent, or treasure. The Diocese of Cleveland inventory says people with this gift encounter Christ through generosity and feel especially alive when they give. It is not about having a lot. The Gospel's widow gave two small coins. What matters is a free and cheerful gift.",
    patronSaint: "St. Katherine Drexel",
    everydayExamples: [
      "Set aside part of your money or time for someone who has less.",
      "Give a ride, a meal, a book, or a quiet hour without keeping score.",
      "Join a food drive or fundraiser because the need itself moves you.",
    ],
    veymExamples: [
      "Help collect supplies for a service project or a family in need.",
      "Contribute to a retreat scholarship or snack fund if you are able.",
      "Offer your skills freely when the group cannot afford to hire help.",
    ],
    tryThis: "Give away one thing, or one hour, this week to a person or project that will not pay you back.",
    reflectionQuestion:
      "When has giving something away made you feel closer to God?",
  },
  {
    id: "healing",
    slug: "healing",
    name: "Healing",
    icon: "heart-pulse",
    shortDescription:
      "You are drawn to pray that God would restore people who are hurting in body, mind, or spirit.",
    detailedDescription:
      "Healing is a charism through which the Holy Spirit restores people who suffer physically, mentally, emotionally, or spiritually. The Diocese of Cleveland inventory describes a comforting, restorative presence that reveals God's care in the middle of brokenness. It is not the same thing as being a kind friend, though kindness matters. The Church also asks for prudence: prayer for healing belongs with the sacraments, medical care, and trusted adults. This questionnaire can only notice a desire to pray. It cannot declare that God heals through you.",
    patronSaint: "St. Kateri Tekakwitha",
    discernmentNote:
      "A short self-check cannot confirm the charism of healing. Never promise a cure. If you pray with someone who is sick or in crisis, do it with a parent, youth leader, or priest nearby, and encourage professional and medical help when it is needed.",
    everydayExamples: [
      "Pray by name for a sick relative, classmate, or neighbor.",
      "Visit or message someone who is ill and ask how you can pray.",
      "Stay with a hurting friend in prayer instead of rushing to fix them.",
    ],
    veymExamples: [
      "Join the prayer team for members who are sick or grieving.",
      "Help lead a simple prayer for healing at the end of a meeting, with a leader present.",
      "Offer to pray a decade of the rosary for a family in the community.",
    ],
    tryThis: "Ask one person who is hurting how you may pray for them, then pray that same day.",
    reflectionQuestion:
      "How do you want to stay near people who suffer without pretending you can rescue them?",
  },
  {
    id: "helping",
    slug: "helping",
    name: "Helping",
    icon: "hand-helping",
    shortDescription:
      "You love the quiet work that lets someone else do what God is asking of them.",
    detailedDescription:
      "Helping is a charism of background support. The Diocese of Cleveland inventory describes it as a desire to assist others so they can respond to their own call. It is personal, often unnoticed, and aimed at building up the Church through someone else's visible work. Helping is close to service, but its focus is enabling a person: the speaker, the musician, the teacher, the leader. Faithfulness here looks like loyalty, not the spotlight.",
    patronSaint: "St. Vincent de Paul",
    everydayExamples: [
      "Prep materials so a teacher, parent, or teammate can focus.",
      "Take notes, run a slide, or hold a detail for someone who is leading.",
      "Ask, 'What would help you finish this?' and then do that thing.",
    ],
    veymExamples: [
      "Support a prayer leader by preparing the space and the readings.",
      "Help a catechist or team leader with setup before younger members arrive.",
      "Be the reliable person a small-group leader can count on.",
    ],
    tryThis: "Ask one leader or classmate what small task would free them to do their part, and do it.",
    reflectionQuestion:
      "Whose work becomes lighter when you are willing to stay in the background?",
  },
  {
    id: "hospitality",
    slug: "hospitality",
    name: "Hospitality",
    icon: "door-open",
    shortDescription:
      "You help people feel that there is a place for them, especially when they are new or unsure.",
    detailedDescription:
      "Hospitality is a charism for creating welcome, especially for people who feel disconnected. The Diocese of Cleveland inventory describes a culture of belonging, respect, and home, and a way of meeting Christ in the stranger. It can be as simple as learning a name, saving a seat, or noticing who is standing alone. Hospitality is not a performance. It is making room.",
    patronSaint: "St. Andre Bessette",
    everydayExamples: [
      "Invite a new student to sit with you at lunch.",
      "Introduce two people who do not know anyone in the room.",
      "Help a guest family find the right door, seat, or person.",
    ],
    veymExamples: [
      "Welcome new members and stay with them for the first meeting.",
      "Help shy students join a game, song, or small group.",
      "Greet new families at a celebration and explain what is happening.",
    ],
    tryThis: "This week, learn the name of someone who usually stands at the edge of the group and include them.",
    reflectionQuestion:
      "Who in your daily life still needs a clear sign that they belong?",
  },
  {
    id: "intercession",
    slug: "intercession",
    name: "Intercession",
    icon: "flame",
    shortDescription:
      "You keep praying for other people, and you trust that God hears even when the answer is slow.",
    detailedDescription:
      "Intercession is a charism of praying for others with patience and real trust. The Diocese of Cleveland inventory describes a strong call to stand before God on behalf of people in need, confident that God hears. It is different from worrying about someone. Intercession turns concern into prayer and stays with that prayer. You do not have to feel holy. You have to be willing to ask.",
    patronSaint: "St. Padre Pio",
    everydayExamples: [
      "Keep a short list of people to pray for by name.",
      "Pray for a friend before you text them advice.",
      "Remember the dead, the sick, and people you find difficult.",
    ],
    veymExamples: [
      "Pray for members who are struggling with school, family, or faith.",
      "Join a rosary, adoration hour, or prayer group.",
      "Offer to pray for intentions people place in a basket or group chat.",
    ],
    tryThis: "Choose three people and pray for them by name every day this week.",
    reflectionQuestion:
      "Who has God placed on your heart, and have you actually prayed for them?",
  },
  {
    id: "knowledge",
    slug: "knowledge",
    name: "Knowledge",
    icon: "book-open",
    shortDescription:
      "Studying Scripture and the Church's teaching helps you know God and help others understand.",
    detailedDescription:
      "In this inventory, knowledge is a charism for seeking God through study, especially Scripture, the saints, and the teaching of the Church. The Diocese of Cleveland describes people who meet Christ in that intellectual tradition and who can share what they learn. This is related to, but not the same as, the gift of knowledge among the seven gifts of the Holy Spirit named in Catholic teaching. A love of learning can become a charism when it builds up other people's faith rather than only collecting facts.",
    patronSaint: "St. Edith Stein",
    everydayExamples: [
      "Read a Gospel passage or a saint's story and sit with one line.",
      "Look up a Catholic question instead of forwarding a rumor.",
      "Share something you learned in a way a friend can actually use.",
    ],
    veymExamples: [
      "Help prepare a Bible study or a lesson for younger students.",
      "Research a saint or a feast day and explain it simply.",
      "Support a team leader by finding a reliable source for a hard question.",
    ],
    tryThis: "Learn one teaching of the Church well enough to explain it in a few honest sentences.",
    reflectionQuestion:
      "What have you studied that made you love God or your neighbor more?",
  },
  {
    id: "leadership",
    slug: "leadership",
    name: "Leadership",
    icon: "users",
    shortDescription:
      "You can see other people's gifts and help a group move toward a goal together.",
    detailedDescription:
      "Leadership in this inventory is the charism of seeing what God has given other people and inviting those gifts into a shared work. The Diocese of Cleveland describes leaders who hold a vision, help a group finish it, and model service rather than control. Jesus' picture of leadership is the one who serves. A strong score here is an invitation to responsibility, not to being the loudest voice in the room.",
    patronSaint: "St. Thomas More",
    everydayExamples: [
      "Ask teammates what they do well before you assign the work.",
      "Keep a group pointed at the goal when energy drops.",
      "Share credit and make sure quiet members are heard.",
    ],
    veymExamples: [
      "Guide a small group or help organize a youth activity.",
      "Mentor a younger member who is taking a role for the first time.",
      "Help a team finish a project without doing every task yourself.",
    ],
    tryThis: "On your next group project, name one strength you see in each person and invite them to use it.",
    reflectionQuestion:
      "How do people around you become braver or more useful when you lead?",
  },
  {
    id: "mercy",
    slug: "mercy",
    name: "Mercy",
    icon: "heart",
    shortDescription:
      "Suffering moves you to act, and you want to relieve it without making people earn your care.",
    detailedDescription:
      "Mercy is a charism of compassion that becomes action. The Diocese of Cleveland inventory describes a sensitivity to suffering and a free gift of self that eases physical, spiritual, or emotional pain. Mercy also shows up as forgiveness. It is close to encouragement, but it goes further: it moves toward the wound and tries to relieve it. You cannot carry every hurt. You can refuse to look away from the one in front of you.",
    patronSaint: "St. Maximilian Kolbe",
    everydayExamples: [
      "Help a classmate who is struggling get a meal, a ride, or a listening ear.",
      "Forgive a real hurt and say so, without pretending it did not matter.",
      "Volunteer where people are lonely, hungry, or overlooked.",
    ],
    veymExamples: [
      "Visit or write to someone who is sick, grieving, or homebound, with your group.",
      "Support a service day at a pantry, shelter, or nursing home.",
      "Be the person who checks on a member after a conflict and helps repair it.",
    ],
    tryThis: "Do one concrete kindness for someone who is hurting, and do not announce it.",
    reflectionQuestion:
      "Whose pain have you been given the courage to move toward?",
  },
  {
    id: "global-cultural-engagement",
    slug: "global-cultural-engagement",
    name: "Global and Cultural Engagement",
    icon: "globe",
    shortDescription:
      "You build friendships across cultures and help a community become wider than one circle.",
    detailedDescription:
      "Global and cultural engagement is a charism for connecting with people of different cultures, languages, and backgrounds, and for letting those relationships strengthen the Church. The Diocese of Cleveland inventory describes both a zeal to share Christ and a willingness to be taught by other people's gifts. It is not about collecting cultures as a hobby. It is about communion: learning names, stories, and ways of praying, and making sure no group is treated as an outsider in the Body of Christ.",
    patronSaint: "St. Damian of Molokai",
    everydayExamples: [
      "Learn from a classmate whose language, food, or parish customs differ from yours.",
      "Stand with a student who is being left out because they are new or different.",
      "Read about the Catholic Church in another country and pray for that community.",
    ],
    veymExamples: [
      "Welcome members from different schools, languages, or family stories.",
      "Help a new family understand a celebration without rushing them to fit in.",
      "Share a song, prayer, or saint from another culture with your team.",
    ],
    tryThis: "Have one real conversation with someone whose background is different from yours, and listen more than you speak.",
    reflectionQuestion:
      "Who has widened your picture of the Church, and how can you pass that welcome on?",
  },
  {
    id: "musicianship",
    slug: "musicianship",
    name: "Musicianship",
    icon: "music",
    shortDescription:
      "You help people pray through singing or playing, and music draws you toward God.",
    detailedDescription:
      "Musicianship here is a charism of praise. The Diocese of Cleveland inventory describes people who meet Christ in song and help others enter that prayer, whether by writing music, singing, or playing. Enjoying playlists is not the same gift. The sign is that music becomes a way the community worships. If you do not sing or play, a low score is simply honest. God is not asking every person to lead the choir.",
    patronSaint: "St. Cecilia",
    everydayExamples: [
      "Sing at Mass instead of only listening.",
      "Practice an instrument so you can support prayer, not only performance.",
      "Choose music for a prayer night that helps people be still.",
    ],
    veymExamples: [
      "Lead or support songs during prayer.",
      "Help the choir or a worship group prepare music for a retreat.",
      "Teach a simple refrain to younger members.",
    ],
    tryThis: "Offer your voice or instrument once this month for prayer, even in a small group.",
    reflectionQuestion:
      "When has music helped you, or someone near you, actually pray?",
  },
  {
    id: "shepherding",
    slug: "shepherding",
    name: "Shepherding",
    icon: "footprints",
    shortDescription:
      "You walk with people over time and care about their friendship with Jesus.",
    detailedDescription:
      "Shepherding is a charism for guiding people on a shared journey of faith through real relationships. The Diocese of Cleveland inventory describes prayer, personal encounter with Christ, and the patience to form people so they can share the Gospel themselves. It is different from running an event. A shepherd knows names, notices who is drifting, and stays. Teenagers can live this gift by caring for younger students or friends without acting like a parent or a boss.",
    patronSaint: "St. John Vianney",
    everydayExamples: [
      "Check in with a friend over several weeks, not only once.",
      "Pray for someone you are responsible for and ask how their faith is going.",
      "Help a younger sibling or student take one next step in prayer.",
    ],
    veymExamples: [
      "Mentor a younger member through a season of meetings.",
      "Lead a small group and learn each person's story.",
      "Notice who has stopped coming and reach out with a leader's help.",
    ],
    tryThis: "Choose one younger student or friend and ask how you can walk with them this month.",
    reflectionQuestion:
      "Who has shepherded you, and what did their faithfulness make possible?",
  },
  {
    id: "peacemaking",
    slug: "peacemaking",
    name: "Peacemaking",
    icon: "scale",
    shortDescription:
      "You can help people in conflict listen to each other and take a next step together.",
    detailedDescription:
      "Peacemaking is a charism for bringing people together across a disagreement. The Diocese of Cleveland inventory describes patience, careful listening, and the ability to gather different views into a way forward. It is not avoiding hard topics or pretending everyone is right. A peacemaker tells the truth without humiliating people, and stays in the room long enough for repair to begin.",
    patronSaint: "St. Catherine of Siena",
    everydayExamples: [
      "Help two friends hear each other before the argument hardens.",
      "Lower the temperature in a group chat by asking for the whole story.",
      "Suggest a fair next step when a team is stuck in blame.",
    ],
    veymExamples: [
      "Help members work through a disagreement about roles or plans.",
      "Listen to both sides of a conflict before a leader decides.",
      "Protect younger students from being pulled into drama.",
    ],
    tryThis: "The next time you see a conflict, ask each person what they need before you offer a solution.",
    reflectionQuestion:
      "Where is God inviting you to make peace without forcing a fake calm?",
  },
  {
    id: "prophecy",
    slug: "prophecy",
    name: "Prophecy",
    icon: "sunrise",
    shortDescription:
      "You feel urged to speak God's truth with courage, especially when something needs to change.",
    detailedDescription:
      "In Catholic tradition, prophecy is not fortune-telling and not a personality trait of being outspoken. The Diocese of Cleveland inventory describes a grace for recognizing God's presence and speaking a message of truth and conversion that can stir hearts. St. Paul says the one who prophesies speaks to people for their building up, encouragement, and consolation. A questionnaire cannot confirm this charism. Strong impressions should be tested with Scripture, prayer, and a trusted adult. Never use 'God told me' to pressure, frighten, or control someone.",
    patronSaint: "St. Juan Diego",
    discernmentNote:
      "Prophecy in the Church is a charism of building people up in truth, not predicting fortunes or winning arguments. This assessment cannot tell you that you have it. Test any strong sense that you should speak for God with prayer, Scripture, and a parent, youth leader, or priest.",
    everydayExamples: [
      "Speak up when a joke or a plan treats someone as less than human.",
      "Tell the truth kindly when a friend is heading toward a harmful choice.",
      "Name an injustice you can actually do something about, then do one small thing.",
    ],
    veymExamples: [
      "Help the group face a hard truth about exclusion, gossip, or a neglected task.",
      "Offer a carefully prayed encouragement or challenge in a sharing circle.",
      "Ask a chaplain to help you discern a message before you share it as God's word.",
    ],
    tryThis: "If you see one injustice this week, say something honest and specific, then listen.",
    reflectionQuestion:
      "How can you speak truth in a way that builds people up instead of making you look bold?",
  },
  {
    id: "service",
    slug: "service",
    name: "Service",
    icon: "sparkles",
    shortDescription:
      "You notice the practical work other people pass by, and you do it without needing applause.",
    detailedDescription:
      "Service is a charism for giving time and effort freely, with little concern for status, so that another person or the whole community is better off. The Diocese of Cleveland inventory describes humble acts of love in which people meet Christ. It is close to helping, but service looks especially at the task itself: the chairs, the trash, the setup, the person who needs a hand. Joy in hidden work is a sign. Resentment at not being thanked is a signal to pray, not a verdict on your worth.",
    patronSaint: "St. Teresa of Calcutta",
    everydayExamples: [
      "Clean up after a meeting, meal, or practice without being assigned.",
      "Carry something, hold a door, or stay for the last boring job.",
      "Help at home in a way that eases someone else's load.",
    ],
    veymExamples: [
      "Set up chairs, sound, or supplies before an activity.",
      "Stay to clean after a celebration or camp day.",
      "Volunteer for the task other members hope someone else will take.",
    ],
    tryThis: "Do one unnoticed job this week for your family, school, or youth group.",
    reflectionQuestion:
      "When has hidden work brought you joy instead of only tiredness?",
  },
  {
    id: "teaching",
    slug: "teaching",
    name: "Teaching",
    icon: "graduation-cap",
    shortDescription:
      "You can explain an idea so that another person truly understands and grows.",
    detailedDescription:
      "Teaching is a charism for communicating truth clearly so people can grow. The Diocese of Cleveland inventory describes a focused desire to lead others to greater understanding, in faith and in ordinary learning. It is not the same as getting good grades. The sign is that someone else can now see what they could not see before. Patience, a second example, and respect for questions all belong to this gift.",
    patronSaint: "St. Jean-Baptist de La Salle",
    everydayExamples: [
      "Explain a homework concept until a classmate can try it alone.",
      "Teach a prayer, a song, or a Bible story in plain language.",
      "Ask questions that help someone discover the answer.",
    ],
    veymExamples: [
      "Explain a lesson or activity to younger students.",
      "Help lead a Bible study and keep it understandable.",
      "Prepare a faith activity and adjust it when the group looks lost.",
    ],
    tryThis: "Teach one thing you understand to someone younger, and ask them to explain it back.",
    reflectionQuestion:
      "When has another person's understanding felt like a gift God gave through you?",
  },
  {
    id: "voluntary-poverty",
    slug: "voluntary-poverty",
    name: "Voluntary Poverty",
    icon: "leaf",
    shortDescription:
      "You want a simpler life so you can stay close to Jesus and to people who have less.",
    detailedDescription:
      "Voluntary poverty is a charism of joyful simplicity and solidarity with people who are poor. The Diocese of Cleveland inventory roots it in Jesus' love for the poor and in a lifestyle shaped by that love. For a high school student, this does not mean leaving home or rejecting your family. It means telling the truth about extra stuff, status, and waste, and choosing generosity. A low score is not a failure of holiness. It may simply mean God is drawing you through a different gift right now.",
    patronSaint: "St. Francis of Assisi",
    everydayExamples: [
      "Skip a purchase and give the money or the time to someone in need.",
      "Wear, eat, and travel more simply when showing off is the real goal.",
      "Spend time with people your social circle usually ignores.",
    ],
    veymExamples: [
      "Choose a service project that puts you alongside people who have less.",
      "Help the group spend less on decorations and more on the people you serve.",
      "Talk with members about gratitude and enough, without shaming anyone.",
    ],
    tryThis: "Give up one comfort this week and use what you save, in money or time, for someone else.",
    reflectionQuestion:
      "What would become simpler in your life if you trusted that you already have enough?",
  },
  {
    id: "wisdom",
    slug: "wisdom",
    name: "Wisdom",
    icon: "lightbulb",
    shortDescription:
      "People look to you for a calm, faithful next step when a situation is complicated.",
    detailedDescription:
      "Wisdom, as a charism in this inventory, is practical insight about God's direction and the courage to recommend a fitting next step. The Diocese of Cleveland describes people who can see a way through a tangle of circumstances and help others choose well. Catholic teaching also speaks of wisdom as one of the seven gifts of the Holy Spirit poured out for every Christian. This questionnaire is not measuring that gift in full. It notices whether you often help a community find a sound path. Age does not disqualify you. Listening does.",
    patronSaint: "St. Thomas Aquinas",
    everydayExamples: [
      "Help a stressed group name the real problem before solving a fake one.",
      "Offer one calm option when friends are panicking or arguing.",
      "Ask God for wisdom before you give advice you cannot take back.",
    ],
    veymExamples: [
      "Help leaders weigh a plan when time, safety, and kindness are in tension.",
      "Be a measured voice when the group is excited or upset.",
      "Pray with someone who is discerning a role, a conflict, or a next step.",
    ],
    tryThis: "The next time someone asks for advice, pray first, then offer one concrete next step.",
    reflectionQuestion:
      "When have you helped people choose a path that still looked right later?",
  },
  {
    id: "writing",
    slug: "writing",
    name: "Writing",
    icon: "pen-line",
    shortDescription:
      "Words on a page help you pray, tell the truth, and draw other people toward what is good.",
    detailedDescription:
      "Writing is a charism for composing words that reveal truth, goodness, and beauty. The Diocese of Cleveland inventory describes people for whom writing comes with a kind of ease, and whose words help others notice God. Journaling, letters, poems, testimony, captions, and articles can all be part of it. The gift is not a grade in English class. It is writing placed at the service of faith and of other people.",
    patronSaint: "St. Francis de Sales",
    everydayExamples: [
      "Journal a prayer you could not say out loud.",
      "Write a note that encourages a friend or thanks a teacher.",
      "Shape a reflection, poem, or story that tells the truth with care.",
    ],
    veymExamples: [
      "Write a prayer, skit, or testimony for a gathering.",
      "Help with captions, a newsletter, or a retreat reflection booklet.",
      "Draft an invitation that makes a new family feel expected.",
    ],
    tryThis: "Write one short prayer, letter, or reflection this week and share it with someone if it would help them.",
    reflectionQuestion:
      "What truth becomes clearer when you take time to write it down?",
  },
]

export const gifts: SpiritualGift[] = giftDrafts.map((gift) => ({
  ...gift,
  ...giftSources[gift.id],
}))

const giftById = new Map(gifts.map((gift) => [gift.id, gift]))
const giftBySlug = new Map(gifts.map((gift) => [gift.slug, gift]))

export function getGift(id: GiftId): SpiritualGift {
  const gift = giftById.get(id)
  if (!gift) {
    throw new Error(`Unknown spiritual gift: ${id}`)
  }
  return gift
}

export function getGiftBySlug(slug: string): SpiritualGift | undefined {
  return giftBySlug.get(slug)
}
