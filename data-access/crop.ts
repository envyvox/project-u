"use server";

import prisma from "@/lib/prisma";
import { Crop, UserCrops } from "@prisma/client";

export type UserWithCrop = {
  crop: Crop;
} & UserCrops;

/**
 * Get user crops
 * @param userId User id
 * @returns User crops model array
 */
export async function getUserCrops(userId: string): Promise<UserWithCrop[]> {
  return await prisma.userCrops.findMany({
    where: {
      userId: userId,
    },
    include: {
      crop: true,
    },
  });
}
