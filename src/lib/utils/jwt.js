export async function issueJWT(email) {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jwt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
}

export async function clearJWT() {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jwt/logout`, {
    method: "POST",
    credentials: "include",
  });
}
