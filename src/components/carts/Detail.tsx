import { Cart } from "@/interfaces/Carts";
import { Product } from "@/interfaces/Products";
import { User } from "@/interfaces/Users";
import { getDetailCart } from "@/repositories/carts";
import { getUser } from "@/repositories/users";
import utilityStyle from "@/styles/Utility.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cartsStyle from "./styles/Carts.module.css";

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

export default function CartDetail() {
  const router = useRouter();
  const [cartDetail, setCartDetail] = useState<Cart | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!router.query.id) return;
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    getDetailCart({ id: parseInt(router.query.id as string), signal })
      .then((res: Cart) => {
        setCartDetail(res);
        getUser({ id: res.userId }).then((res: User) =>
          setUserName(`${res.firstName} ${res.lastName}`)
        );
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
  }, [router.query]);

  return (
    <section className={utilityStyle.container}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className={cartsStyle.details}>
            <div className={utilityStyle.label}>Details</div>
            <div className={cartsStyle.detailContainer}>
              <p>User: {userName}</p>
              <p># of items: {cartDetail?.totalProducts}</p>
              <p>
                Added On:{" "}
                {Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(
                  new Date()
                )}
              </p>
              <p>Total Amount: {cartDetail?.total}</p>
            </div>
          </div>
          <div className={cartsStyle.tableWrapper}>
            <DataGrid
              rows={cartDetail?.products ?? []}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </>
      )}
    </section>
  );
}
