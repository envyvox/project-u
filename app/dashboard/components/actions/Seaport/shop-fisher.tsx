import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserFishStore } from "@/store/user-fish-store";
import UseUserFish from "@/hooks/use-user-fish";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { Currency, Fish } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import UseUserCurrency from "@/hooks/use-user-currency";
import { Skeleton } from "@/components/ui/skeleton";
import { formatString } from "@/util/format-string";
import Image from "next/image";
import IenIcon from "@/public/currency/Ien.png";
import ShopFisherUserFish from "./shop-fisher-user-fish";

export default function ActionSeaportShopFisher() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const addCurrencyToUser = useUserCurrencyStore(
    (state) => state.addCurrencyToUser,
  );
  const removeFishFromUser = useUserFishStore(
    (state) => state.removeFishFromUser,
  );
  const removeAllFishFromUser = useUserFishStore(
    (state) => state.removeAllFishFromUser,
  );
  const loading = useUserFishStore((state) => state.loading);
  const userFish = useUserFishStore((state) => state.userFish);
  const { toast } = useToast();

  UseUserCurrency();
  UseUserFish();

  function sellFish(fish: Fish, amount: number) {
    removeFishFromUser(fish.id, amount);
    addCurrencyToUser(Currency.Ien, fish.price * amount);

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-one"
        ],
        <Image
          className="mx-1 h-6 w-6 object-contain"
          src={`/fish/${fish.name}.png`}
          alt={fish.name}
          width={27}
          height={27}
        />,
        amount,
        fish.name,
        <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
        fish.price * amount,
      ),
    });
  }

  function sellAllFish() {
    const currencyAmount = userFish.reduce((total, userFish) => {
      return total + userFish.amount * userFish.fish.price;
    }, 0);

    addCurrencyToUser(Currency.Ien, currencyAmount);
    removeAllFishFromUser();

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-all"
        ],
        <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
        currencyAmount,
      ),
    });
  }

  return (
    <ActionBase
      label={
        dictionary.dashboard["dashboard.actions.seaport.shop-fisher.label"]
      }
      description={
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.description"
        ]
      }
      actionComponent={
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="mt-2 w-fit self-end"
              variant="secondary"
              onClick={() => {}}
            >
              {
                dictionary.dashboard[
                  "dashboard.actions.seaport.shop-fisher.button-label"
                ]
              }
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-full">
            <div className="container flex flex-col gap-5">
              <SheetHeader>
                <SheetTitle>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.seaport.shop-fisher.label"
                    ]
                  }
                </SheetTitle>
                <SheetDescription>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.seaport.shop-fisher.description"
                    ]
                  }
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[70vh] sm:h-[80vh]">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {loading ? (
                    <>
                      <Skeleton className="h-36 w-full" />
                      <Skeleton className="h-36 w-full" />
                      <Skeleton className="h-36 w-full" />
                      <Skeleton className="h-36 w-full" />
                      <Skeleton className="h-36 w-full" />
                    </>
                  ) : (
                    <ShopFisherUserFish
                      userFish={userFish}
                      dictionary={dictionary}
                      sellFish={sellFish}
                    />
                  )}
                </div>
              </ScrollArea>
              <SheetFooter className="flex flex-wrap gap-5">
                <Button
                  variant="destructive"
                  disabled={userFish.length < 1}
                  onClick={() => sellAllFish()}
                >
                  {
                    dictionary.dashboard[
                      "dashboard.actions.seaport.shop-fisher.sheet.sell-all-fish"
                    ]
                  }
                </Button>
                <SheetClose asChild>
                  <Button type="submit">
                    {
                      dictionary.dashboard[
                        "dashboard.actions.seaport.shop-fisher.sheet.close"
                      ]
                    }
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      }
    />
  );
}