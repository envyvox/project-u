import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import UsersSelect from "@/components/users-select";
import { GameUser } from "@/services/data-access/user";
import LotteryTicket from "@/public/etc/LotteryTicket.png";
import formatString from "@/util/format-string";
import Image from "next/image";
import { useState } from "react";
import IenIcon from "@/public/currency/Ien.png";
import { useDictionaryStore } from "@/store/dictionary-store";

const deliveryPrice = 100;

const CasinoLotteryGift = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [selectedUser, setSelectedUser] = useState<GameUser>();

  return (
    <div>
      <TypographyLarge>
        {
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.label"
          ]
        }
      </TypographyLarge>
      <TypographyMuted>
        {formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.description"
          ],
          <Image
            className="mx-1 inline h-6 w-6"
            src={LotteryTicket}
            alt="LotteryTicket"
          />,
          deliveryPrice,
          <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
        )}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-2">
        <UsersSelect
          className="w-[250px] justify-between"
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Button
          variant="secondary"
          className="w-[250px]"
          disabled={!selectedUser}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.capital.casino.lottery.gift.button-label"
            ]
          }
        </Button>
      </div>
    </div>
  );
};

export default CasinoLotteryGift;