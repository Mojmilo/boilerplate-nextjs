import Stripe from "stripe";

export const stripe = new Stripe('sk_test_51OidmyIoZQNUASocPBdPD8OLhFy46JuVyfQ9ytH4NKFQmBbSYMGy8VkGf4rSqz93nr1T3YY38PNQjJRSUiu6LfLl00S6YyCNwJ', {
  apiVersion: "2024-06-20",
  typescript: true,
});