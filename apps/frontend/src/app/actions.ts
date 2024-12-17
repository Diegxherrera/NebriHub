"use server";

import { redirect } from "next/navigation";

export async function checkToken(id: string) {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }

  redirect(`/post/${id}`); // Navigate to the new post page
}
