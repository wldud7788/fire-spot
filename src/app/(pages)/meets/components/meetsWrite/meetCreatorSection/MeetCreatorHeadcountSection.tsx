import React from "react";
import { MeetInsert } from "../../../types/meet.types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { MAX_HEADCOUNT, MIN_HEADCOUNT } from "@/_utils/common/constant";

interface Props {
  register: UseFormRegister<MeetInsert>;
  setValue: UseFormSetValue<MeetInsert>;
  watch: UseFormWatch<MeetInsert>;
}

const MeetCreatorHeadcountSection = ({ register, setValue, watch }: Props) => {
  const key = "deadline_headcount";
  const currentValue = watch(key);
  const handlePlus = () => {
    if (currentValue >= MAX_HEADCOUNT) {
      setValue(key, MAX_HEADCOUNT);
    } else {
      setValue(key, currentValue + 1);
    }
  };

  const handleMinus = () => {
    if (currentValue <= MIN_HEADCOUNT) {
      setValue(key, MIN_HEADCOUNT);
    } else {
      setValue(key, currentValue - 1);
    }
  };

  return (
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[40px]">
      <h2 className="flex items-center gap-[5px]">
        <p className="color-gray01 text-[24px] font-bold">참여인원</p>
        <span className="text-[rgba(178, 70, 0, 0.7)] text-[24px] font-bold">
          (모임장 포함)
        </span>
      </h2>
      <div className="mt-[40px] flex items-center gap-[60px]">
        <div className="flex w-full max-w-[410px] items-center gap-[20px]">
          <p className="color-gray01 text-[18px] font-medium">모집 인원</p>
          <div className="flex items-center gap-[5px]">
            <input
              className="h-[47px] rounded-[11px] border-[1px] border-[#C3C3C3] bg-white px-[16px] py-[12px] text-right"
              placeholder="최소 3명 이상 입력하세요"
              type="number"
              disabled
              {...register("deadline_headcount", {
                min: MIN_HEADCOUNT,
                max: MAX_HEADCOUNT,
                required: true
              })}
            />
            <button
              type="button"
              className="flex h-[47px] w-[47px] items-center justify-center rounded-[11px] border-[1px] border-[#C3C3C3]"
              onClick={handlePlus}
            >
              <div className="h-6 w-6 bg-plus bg-cover bg-center" />
            </button>
            <button
              type="button"
              className="flex h-[47px] w-[47px] items-center justify-center rounded-[11px] border-[1px] border-[#C3C3C3]"
              onClick={handleMinus}
            >
              <div className="h-6 w-6 bg-minus bg-cover bg-center" />
            </button>
          </div>
        </div>

        <div className="import_box">
          <p className="mb-[5px] bg-import bg-left-center-0 bg-no-repeat pl-[24px] text-[16px] text-[#a4a4a4]">
            인원 설정 시 참고하세요
          </p>
          <div className="text_box pl-[10px]">
            <p className="before-dot-left relative pl-[10px] text-[14px] text-[#a4a4a4]">
              실제 모임 진행의 필요한 최소 인원으로 설정해주세요.
            </p>
            <p className="before-dot-left relative pl-[10px] text-[14px] text-[#a4a4a4]">
              마감시간 1시간 전까지 최소 인원(모임장 포함)이 모집되지 않으면
              모임이 취소될 수 있어요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetCreatorHeadcountSection;
