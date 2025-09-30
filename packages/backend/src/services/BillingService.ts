import { PrismaClient, SubscriptionStatus } from '@prisma/client';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

class BillingService {
  public async createCheckoutSession(walletAddress: string, frontendUrl: string) {
    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: {
          walletAddress: user.walletAddress,
        },
      });
      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      client_reference_id: user.id,
      // --- MUDANÇA AQUI: Pedimos ao Stripe para já incluir os dados da assinatura ---
      expand: ['subscription'],
      success_url: `${frontendUrl}?payment_success=true`,
      cancel_url: `${frontendUrl}?payment_canceled=true`,
    });

    return session;
  }

  public async handleWebhookEvent(signature: string, body: Buffer) {
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        
        // --- MUDANÇA AQUI: Acessamos a assinatura diretamente do evento ---
        const subscription = session.subscription as Stripe.Subscription;

        if (!userId || !subscription) {
          throw new Error('Required data not found in checkout session.');
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: session.customer as string,
            subscriptionStatus: SubscriptionStatus.PRO,
            // Agora o acesso a 'current_period_end' funciona corretamente
            subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log(`✅ User ${userId} subscribed to PRO plan.`);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}

export default BillingService;