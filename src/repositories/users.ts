export async function getUser({
  id,
  signal,
}: {
  id: number;
  signal?: AbortSignal;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`
  );

  return await response.json();
}
