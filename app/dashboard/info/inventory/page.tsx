import InventoryBoxes from "./components/inventory-boxes";
import InventoryCrops from "./components/inventory-crops";
import InventoryCurrency from "./components/inventory-currency";
import InventoryFish from "./components/inventory-fish";
import InventoryProducts from "./components/inventory-products";
import InventorySeeds from "./components/inventory-seeds";

export default function InfoInventoryPage() {
  return (
    <div className="flex flex-col gap-5">
      <InventoryCurrency />
      <InventoryBoxes />
      <InventoryFish />
      <InventorySeeds />
      <InventoryCrops />
      <InventoryProducts />
    </div>
  );
}
