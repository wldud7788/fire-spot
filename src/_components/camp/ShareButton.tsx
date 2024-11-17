"use client";
import { useState } from "react";
import Toast from "../common/Toast";

const ShareButton = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleCopyLink}
        className="bg-main bd-color-main flex h-[60px] flex-1 items-center justify-center gap-[12px] rounded-[12px] border text-[18px] max-1280:h-[50px] max-1280:text-[16px]"
      >
        <img
          src="/assets/images/camp/btn-camp-share-white.svg"
          alt="공유하기"
        />
        <p className="text-[18px] font-bold text-white">공유하기</p>
      </button>

      <Toast
        message="링크가 복사되었습니다!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default ShareButton;
