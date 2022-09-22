This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Intro

the app is a blog platform and alternative to [Mirror](https://mirror.xyz/), but has some differences:

- better editor improving user experience for writers.
- support favourite writers in seconds stream for readers by integrated with [Superfluid](https://superfluid.finance/) instead of one-time payment.

## Getting Started

First, setup the environment variable:
```bash
cp .env.local .env
```

Go to your [Infura](https://infura.io) dashboard, get the api key:
```bash
# add your own NEXT_PUBLIC_INFURA_API_KEY to .env file.
```

Then run the development server:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Fleek
