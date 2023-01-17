import { ProductsParams } from "@/interfaces/Products";

export async function getProducts(
  params: ProductsParams,
  signal?: AbortSignal
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/products?limit=${params.limit}&skip=${params.skip}`,
    {
      signal,
    }
  );

  return await response.json();
}

export async function searchProducts({
  q,
  signal,
}: {
  q: string;
  signal?: AbortSignal;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/products/search?q=${q}`,
    {
      signal,
    }
  );

  return await response.json();
}
