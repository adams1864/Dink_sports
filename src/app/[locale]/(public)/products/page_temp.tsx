import { getProducts } from "@/lib/api";
import ShopProductList from "@/components/landing/ShopProductList";

export default async function Products() {
  const productsResponse = await getProducts({
    status: "published",
    perPage: 100,
    page: 1,
  }).catch(() => null);

  const products = productsResponse?.data ?? [];

  return <ShopProductList initialProducts={products} />;
}
