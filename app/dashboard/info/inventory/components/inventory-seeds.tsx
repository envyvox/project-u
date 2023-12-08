"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { TypographySmall } from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UseUserSeed from "@/hooks/use-user-seed";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserSeedStore } from "@/store/user-seed-store";
import Image from "next/image";

export default function InventorySeeds() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserSeedStore((state) => state.loading);
  const userSeeds = useUserSeedStore((state) => state.userSeeds);

  UseUserSeed();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["info.inventory.seed"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userSeeds.length > 0 ? (
          userSeeds.map((userSeed) => (
            <TooltipProvider key={userSeed.seedId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2">
                    <Image
                      src={`/seed/${userSeed.seed.name}.png`}
                      alt={userSeed.seed.name}
                      width={36}
                      height={36}
                    />
                    {Number(userSeed.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userSeed.seed.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["info.inventory.seed.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
