import { redirect } from "next/navigation";

/** Alias for `/signup` — Angular and old links used `/register`. */
export default function RegisterRedirectPage() {
  redirect("/signup");
}
