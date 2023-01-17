export async function getCarts(signal?: AbortSignal) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/carts`, {
    signal,
  });

  return await response.json();
}

export async function getDetailCart({
  id,
  signal,
}: {
  id: number;
  signal?: AbortSignal;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/carts/${id}`
  );

  return await response.json();
}
