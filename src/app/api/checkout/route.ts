import stripe from "@/lib/stripe";
import { successResponse } from "@/utils/apiResponse";
import { handleApiError } from "@/utils/errorHandler";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, quantity } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pkr", // or "usd"
            product_data: {
              name: "Bus Ticket",
              description: "Trip Fare",
            },
            unit_amount: amount * 100, // Stripe expects cents
          },
          quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/review/cancel`,
    });
    return successResponse({ id: session.id });
  } catch (err) {
    console.error(err);
    return handleApiError(err, "Checkout Failed");
  }
}
