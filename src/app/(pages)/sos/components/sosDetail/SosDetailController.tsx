"use client";
import { ChatRoomSelect } from "@/_components/chat/types/chat.types";
import { SosWithCamp } from "../../types/sos.types";
import SosRemainingTimeSection from "./section/SosRemainingTimeSection";
import SosTagSection from "./section/SosTagSection";
import SosTitleSection from "./section/SosTitleSection";
import SosUserSection from "./section/SosUserSection";
import useUser from "@/_hooks/useUser";
import { useChatSubscriptionMessageList } from "@/_components/chat/hooks/useChatSubscriptionMessageList";
import SosContentSection from "./section/SosContentSection";
import { useChatSosMessage } from "@/_components/chat/hooks/useChatSosMessage";
import ChatRoomMessageSection from "@/_components/chat/ChatRoomMessageSection";
import Link from "next/link";

type Props = {
  sosWithCamp: SosWithCamp;
  chatRoom: ChatRoomSelect;
};
const SosDetailController = ({ sosWithCamp, chatRoom }: Props) => {
  const { sos } = sosWithCamp;
  const roomId = chatRoom.id;

  const user = useUser();
  const loginUserId = user?.id || "";

  const { messagesByDate, lastMessage } = useChatSosMessage(roomId);
  const { messageListRef, lastMessageRef } = useChatSubscriptionMessageList({
    roomId,
    userId: loginUserId
  });
  if (!user) return <></>;

  // TODO 민규님: SOS 상세 섹션별 분리
  return (
    <div className="mx-auto mb-[60px] mt-[40px] w-full max-w-[1360px] pl-[30px] pr-[30px] max-989:px-[15px]">
      <SosTitleSection sos={sos} />
      <SosUserSection sosWithCamp={sosWithCamp} />
      <SosContentSection sos={sos} />
      <SosTagSection sos={sos} />
      <SosRemainingTimeSection sos={sos} />
      <ChatRoomMessageSection
        loginUserId={user.id}
        roomId={roomId}
        messagesByDate={messagesByDate}
        messageListRef={messageListRef}
        lastMessage={lastMessage}
        lastMessageRef={lastMessageRef}
      />
      {/* <SosChatSection
        messagesByDate={messagesByDate}
        loginUserId={loginUserId}
        roomId={roomId}
        messageListRef={messageListRef}
      /> */}
      {/* <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection /> */}
      {/* 목록으로 가기 */}
      <div className="detail_section my-[100px] flex justify-center max-767:mb-[60px] max-767:mt-[40px]">
        <Link
          href="/sos"
          className="color-main bg-sub block w-full max-w-[300px] rounded-[12px] border border-[#ff924c] bg-[#fff] py-[20px] text-center font-bold max-767:max-w-[100%] max-767:py-[15px]"
        >
          목록으로 이동
        </Link>
      </div>
      {/*// 목록으로 가기 */}
    </div>
  );
};

export default SosDetailController;
