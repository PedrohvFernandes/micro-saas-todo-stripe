export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: process.env.STRIPE_FREE_PLAN_ID,
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: process.env.STRIPE_PRO_PLAN_ID,
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}
