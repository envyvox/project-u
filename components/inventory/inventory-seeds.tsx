import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserSeedsQuery } from "@/hooks/queries/use-user-seeds-query";

const InventorySeeds = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userSeeds, isLoading } = useUserSeedsQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userSeeds?.length ? (
        userSeeds.map((userSeed) => (
          <InventoryItem
            key={userSeed.seedId}
            src={`/seed/${userSeed.seed.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.seed[userSeed.seed.name]}
            amount={userSeed.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.seed.empty"]}
        />
      )}
    </div>
  );
};

export default InventorySeeds;
