import { Cart, CartList } from "@/interfaces/Carts";
import { getCarts } from "@/repositories/carts";
import utilityStyle from "@/styles/Utility.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cartsStyle from "./styles/Carts.module.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "Cart ID", width: 100 },
  { field: "userId", headerName: "User ID", type: "number", width: 150 },
  { field: "total", headerName: "Total", width: 150 },
  {
    field: "discountedTotal",
    headerName: "Discounted Total",
    type: "number",
    width: 150,
  },
  {
    field: "totalProducts",
    headerName: "Total Products",
    width: 150,
  },
  {
    field: "totalQuantity",
    headerName: "Total Quantity",
    width: 150,
  },
];

export default function CartsComponent() {
  const router = useRouter();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    getCarts(signal)
      .then((res: CartList) => {
        setCarts(res.carts);
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
  }, []);

  return (
    <section className={utilityStyle.container}>
      <div className={cartsStyle.tableWrapper}>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <DataGrid
            rows={carts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellClick={(e) => {
              router.push(`/carts/${e.id}`);
            }}
          />
        )}
      </div>
    </section>
  );
}
