import {
  useProductsContext,
  useUpdateProductsContext,
} from "@/contexts/ProductsContext";
import { Product, Products } from "@/interfaces/Products";
import { getProducts, searchProducts } from "@/repositories/products";
import utilityStyle from "@/styles/Utility.module.css";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import productsStyle from "./styles/Products.module.css";

const columns: GridColDef[] = [
  { field: "title", headerName: "Product Name", width: 300 },
  { field: "brand", headerName: "Brand", width: 150 },
  { field: "price", headerName: "Price", type: "number", width: 150 },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
];

export default function ProductsComponent() {
  const productQuery = useProductsContext();
  const updateQuery = useUpdateProductsContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const searchRef = useRef<AbortController | undefined>();

  const onSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      const controller = new AbortController();
      const signal = controller.signal;
      searchRef.current?.abort();
      searchRef.current = controller;
      setLoading(true);
      const promise =
        value === ""
          ? getProducts({ limit: 100, skip: 0 }, signal)
          : searchProducts({ q: value, signal });
      promise
        .then((res) => {
          setProducts(res.products);
          updateQuery?.(value);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setLoading(false);
          alert(err);
        });
    },
    [updateQuery]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    const promise = !productQuery
      ? getProducts({ limit: 100, skip: 0 }, signal)
      : searchProducts({ q: productQuery, signal });
    promise
      .then((res: Products) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setLoading(false);
        alert(err);
      });

    return () => {
      controller.abort();
    };
  }, [productQuery]);

  return (
    <section className={utilityStyle.container}>
      <div className={productsStyle.tableWrapper}>
        <TextField
          className={productsStyle.searchBox}
          id="search-box"
          label="Search by name"
          variant="standard"
          defaultValue={productQuery}
          onChange={onSearch}
        />
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        )}
      </div>
    </section>
  );
}
