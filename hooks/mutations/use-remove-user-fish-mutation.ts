import { removeFishFromUser } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userId?: string;
  fishId: string;
  amount: number;
};

export const useRemoveUserFishMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, fishId, amount }: Props) =>
      removeFishFromUser(userId ?? user.id, fishId, amount),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["user-fish", variables.userId ?? user.id],
      });
    },
  });
};