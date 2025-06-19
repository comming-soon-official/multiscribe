import { pb } from "@/lib/pocketbase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, password, passwordConfirm } = body;

  try {
    // Create a new user
    const data = await pb.collection("users").create({
      username,
      email,
      password,
      passwordConfirm,
    });

    // Log the user in after creation
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    // Set auth cookie
    const cookie = pb.authStore.exportToCookie({
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    const res = NextResponse.json({ user: authData.record });
    res.headers.set("Set-Cookie", cookie);

    return res;
  } catch (err: any) {
    // Handle specific PocketBase errors
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to create account";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
