"use server";
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}
export async function registerAction(formData: FormData) {
  const firstname = formData.get("fname") as string;
  const lastname = formData.get("lname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password, phone }),
  });

  const data = await res.json();
  return data;
}
