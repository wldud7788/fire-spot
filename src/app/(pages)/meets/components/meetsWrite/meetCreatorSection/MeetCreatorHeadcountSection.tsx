import React from "react";
import { MeetForm } from "../../../types/meet.types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { MAX_HEADCOUNT, MIN_HEADCOUNT } from "@/_utils/common/constant";

interface Props {
  register: UseFormRegister<MeetForm>;
  setValue: UseFormSetValue<MeetForm>;
  watch: UseFormWatch<MeetForm>;
}

const MeetCreatorHeadcountSection = ({ register, setValue, watch }: Props) => {
  const key = "deadline_headcount";
  let currentValue = watch(key);
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
    <section className="mt-40 flex flex-col gap-5 rounded-[20px] border-[1px] border-[#B5B5B5] px-52 py-10">
      <div className="flex items-center gap-3">
        <h2 className="text-[20px]">참여 인원</h2>
        <p className="text-[15px]">(모임장 포함)</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          className="h-[45px] w-[192px] rounded-[6px] border-2 bg-white px-4"
          placeholder="최소 3명 이상 입력하세요"
          type="number"
          disabled
          {...register("deadline_headcount", {
            min: MIN_HEADCOUNT,
            max: MAX_HEADCOUNT,
            required: true
          })}
        />
        <div className="flex gap-[9px]">
          <button
            type="button"
            className="rounded-[11px] border-[1px] border-[#C3C3C3]"
            onClick={handlePlus}
          >
            <div className="h-6 w-6 bg-plus bg-cover bg-center" />
          </button>
          <button
            type="button"
            className="rounded-[11px] border-[1px] border-[#C3C3C3]"
            onClick={handleMinus}
          >
            <div className="h-6 w-6 bg-minus bg-cover bg-center" />
          </button>
        </div>
      </div>
      <div className="flex w-[479px] flex-col rounded-[6px] bg-[#EEE] px-[21px] py-[11px] text-sm text-[#A4A4A4]">
        <div className="flex items-center gap-[3px]">
          <div
            className="h-[15px] w-[15px] bg-infoRound bg-cover bg-center"
            style={{ fill: "#A4A4A4" }}
          />
          <p className="font-[500]">인원 설정 시 참고하세요</p>
        </div>
        <div>
          <p>
            ⸰ 실제 모임 진행의 필요한 최소 인원으로 설정해주세요.
            <br />⸰ 마감시간 1시간 전까지 최소 인원(모임장 포함)이 모집되지
            않으면 모임이 취소될 수 있어요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetCreatorHeadcountSection;
