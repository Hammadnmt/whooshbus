// app/success/page.tsx
import stripe from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/"); // No session → send user home
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
        <p className="text-gray-700 mb-2">Thanks, {session.customer_details?.email}</p>
        <p className="text-gray-600 text-sm mb-4">
          Paid: {session.currency?.toUpperCase()} {session.amount_total! / 100}
        </p>

        <div className="text-left bg-gray-100 p-4 rounded-lg text-sm">
          <h2 className="font-semibold mb-2">Order</h2>
          <ul className="list-disc pl-4">
            {session.line_items?.data.map((item) => (
              <li key={item.id}>
                {item.quantity} × {item.description} → {session.currency?.toUpperCase()}{" "}
                {item.amount_total / 100}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
