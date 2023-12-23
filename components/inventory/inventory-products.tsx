import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserProductsQuery } from "@/hooks/queries/use-user-products-query";

const InventoryProducts = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userProducts, isLoading } = useUserProductsQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userProducts?.length ? (
        userProducts.map((userProduct) => (
          <InventoryItem
            key={userProduct.productId}
            src={`/product/${userProduct.product.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.product[userProduct.product.name]}
            amount={userProduct.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.product.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryProducts;
