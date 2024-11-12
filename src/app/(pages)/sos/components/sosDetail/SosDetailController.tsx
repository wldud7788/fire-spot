"use client";
import { ChatRoomSelect } from "@/_components/chat/types/chat.types";
import useSosRemainingTime from "../../hooks/useSosRemainingTime";
import { SosWithCamp } from "../../types/sos.types";
import SosRemainingTimeSection from "./section/SosRemainingTimeSection";
import SosTagSection from "./section/SosTagSection";
import SosTitleSection from "./section/SosTitleSection";
import SosUserSection from "./section/SosUserSection";
import SosChatSection from "./section/SosChatSection";
import { useChatRoomMessage } from "@/_components/chat/hooks/useChatRoom";
import useUser from "@/_hooks/useUser";
import { useChatSubscriptionMessageList } from "@/_components/chat/hooks/useChatSubscriptionMessageList";

type Props = {
  sosWithCamp: SosWithCamp;
  chatRoom: ChatRoomSelect;
};
const SosDetailController = ({ sosWithCamp, chatRoom }: Props) => {
  const { sos } = sosWithCamp;
  const roomId = chatRoom.id;

  const user = useUser();
  const loginUserId = user?.id || "";

  const { messagesByDate } = useChatRoomMessage(roomId);
  useChatSubscriptionMessageList({ roomId });
  if (!user) return <></>;

  return (
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <SosTitleSection sos={sos} />
      <SosUserSection sosWithCamp={sosWithCamp} />
      <SosTagSection sos={sos} />
      <SosRemainingTimeSection sos={sos} />
      <SosChatSection
        messagesByDate={messagesByDate}
        loginUserId={loginUserId}
        roomId={roomId}
      />
      {/* <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection /> */}
    </div>
  );
};

export default SosDetailController;
