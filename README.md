This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 📊 Analytics Module

The **Analytics Dashboard** provides startup founders and developers with a quick visual overview of platform usage and key metrics.

### 🚀 Features
- **Live Stat Cards:** Displays total revenue, active users, and daily API requests — with smooth animated counters.  
- **Real-Time Updates:** Stats refresh automatically every 60 seconds to simulate live backend data.  
- **Charts Visualization:**  
  - Monthly revenue and user growth line charts.  
  - API requests bar chart for weekly traffic overview.  
- **Dark/Light Mode Optimized:** All text and charts adjust automatically for visibility.  
- **Last Updated Timestamp:** Shows when the analytics data was last refreshed.

### 🧩 Tech Stack
- **Next.js 14+ (App Router)**  
- **React Hooks** (`useState`, `useEffect`)  
- **Recharts** for data visualization  
- **Tailwind CSS** for glassmorphic styling  

### 🧠 Future Integration
When connecting to your backend or Firebase:
1. Replace the mock `stats` object and chart arrays with live API data.
2. Adjust update intervals or use WebSocket subscriptions for real-time analytics.
3. Extend charts to include metrics like MRR, churn rate, or API latency.

### 🗂️ File Path

