# Called by the Spirit

A mobile-first spiritual gifts discovery for Catholic high school students. Students can open a link, pray if they wish, answer 50 questions, and see a private summary of 25 charisms with ideas for everyday life and VEYM.

This is an exploratory reflection adapted from the Catholic Diocese of Cleveland's *Called by the Spirit: Gifts Inventory*. It is not an official assessment or publication of the Diocese, and it is not a shorter scoring edition of the original 75-question inventory.

Answers stay in the browser. There is no account, database, or server-side copy of results.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Next.js. The dev script uses port 3847.

Other checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub or another Git host Vercel can read.
2. In Vercel, create a project from that repository. The framework preset is Next.js.
3. Leave the build command as `npm run build` and the output as the Next.js default. No environment variables are required.
4. Deploy. The assessment, scoring, and PDF download all run in the browser.

## Source and adaptation

Original inventory: [Called by the Spirit: Gifts Inventory (PDF)](https://www.dioceseofcleveland.org/files/assets/update-gifts-inventory-print-version-4.26.pdf), Catholic Diocese of Cleveland, Office of Missionary Discipleship.

This app keeps the 25 charism names, the four-point response scale, and the source's patron saints and scripture associations. The questions, explanations, and VEYM examples are original and written for teenagers. Each gift has two questions instead of three. Scores run from 2 to 8. Tied scores are shown as equally strong responses.
