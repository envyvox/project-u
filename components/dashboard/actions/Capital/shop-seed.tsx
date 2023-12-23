import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import ShopSeedItem from "./shop-seed-item";
import ShopSeedSkeleton from "./shop-seed-skeleton";
import FullscreenSheet from "@/components/fullscreen-sheet";
import { useSeedsQuery } from "@/hooks/queries/use-seeds-query";

const ActionCapitalShopSeed = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: seeds, isLoading } = useSeedsQuery();

  return (
    <DashboardActionBase
      label={dictionary.dashboard["dashboard.actions.capital.shop-seed.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.shop-seed.description"]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.capital.shop-seed.button-label"
                ]
              }
            </Button>
          }
          title={
            dictionary.dashboard["dashboard.actions.capital.shop-seed.label"]
          }
          description={
            dictionary.dashboard[
              "dashboard.actions.capital.shop-seed.description"
            ]
          }
          content={
            <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {isLoading ? (
                <ShopSeedSkeleton />
              ) : (
                seeds?.map((seed) => <ShopSeedItem key={seed.id} seed={seed} />)
              )}
            </div>
          }
        />
      }
    />
  );
};

export default ActionCapitalShopSeed;
