import { createContext, ReactNode, useContext, useState } from "react";

export const ProductsContext = createContext<string>("");

export const UpdateProductsContext = createContext<
  ((q: string) => void) | undefined
>(undefined);

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const useUpdateProductsContext = () => {
  return useContext(UpdateProductsContext);
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (q: string) => {
    setQuery(q);
  };

  return (
    <ProductsContext.Provider value={query}>
      <UpdateProductsContext.Provider value={updateQuery}>
        {children}
      </UpdateProductsContext.Provider>
    </ProductsContext.Provider>
  );
};
