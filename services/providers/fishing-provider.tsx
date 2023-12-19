"use client";

import { useJobStore } from "@/store/job-store";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";
import { useEventDetails } from "@trigger.dev/react";
import React, { useEffect } from "react";
import formatString from "@/util/format-string";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  children: React.ReactNode;
};

const FishingProvider = ({ children }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const fishingJobData = useJobStore((state) => state.fishingJobData);
  const { isSuccess, isError } = useEventDetails(fishingJobData.jobId);
  const resetFishingJobData = useJobStore((state) => state.resetFishingJobData);
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);

      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.seaport.fishing.toast.complete"
          ],
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/fish/${fishingJobData.fishName}.png`}
            alt={fishingJobData.fishName}
          />,
          // @ts-ignore Implicit any
          dictionary.item.fish[fishingJobData.fishName],
        ),
      });
    }
    if (isError) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);
      toast({
        description: "Fishing failed...",
        variant: "destructive",
      });
    }
  }, [
    isSuccess,
    isError,
    fishingJobData,
    resetFishingJobData,
    setUserLocation,
    toast,
  ]);

  return children;
};

export default FishingProvider;
