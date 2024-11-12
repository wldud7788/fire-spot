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
import SosContentSection from "./section/SosContentSection";

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

  // TODO 민규님: SOS 상세 섹션별 분리
  return (
    <div className="mx-auto mb-[100px] mt-[75px] w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <SosTitleSection sos={sos} />
      <SosUserSection sosWithCamp={sosWithCamp} />

      <SosContentSection sos={sos} />

      <SosChatSection
        messagesByDate={messagesByDate}
        loginUserId={loginUserId}
        roomId={roomId}
      />

      <SosTagSection sos={sos} />
      <SosRemainingTimeSection sos={sos} />
      {/* <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection /> */}
    </div>
  );
};

export default SosDetailController;
