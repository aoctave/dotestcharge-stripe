const { Hono } = require("hono");
const Stripe = require("stripe");
const app = new Hono();

function createStripeClient(apiKey) {
  return new Stripe(apiKey);
}


app.get("/", async (context) => {
  return context.html('💳 TestChargeButton for Stripe <hr />Click this button to charge<br /><br /><form action="/" method="post"><input type="submit" /></form>');
});

app.post("/", async (context) => {
  const stripe = createStripeClient(context.env.STRIPE_API_KEY);
  
  const paymentIntent = await stripe.paymentIntents.create({
  amount: 101,
  currency: 'usd',
  confirm: true,
  off_session: true,
  payment_method: 'pm_card_visa'
  });
  
  return context.html('✅ Test charge sent <hr />💳 Click again to create another payment<br /><br /><form action="/" method="post"><input type="submit" /></form>');
});

export default app;