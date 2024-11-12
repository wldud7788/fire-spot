import { SosInsert } from "../../../types/sos.types";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<SosInsert>;
};

const SosCreatorContentSection = ({ register }: Props) => {
  return (
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[100px]">
      <input
        className="h-full w-full border-b-2 border-[#c3c3c3] py-[20px] text-[14px] text-[#a4a4a4]"
        placeholder="SOS 타이틀을 입력해주세요 (00글자 제한)"
        {...register("title", { required: true })}
      />

      <div className="mt-[40px] flex flex-col gap-[20px]">
        <h2 className="text-[18px] font-medium">SOS 내용</h2>
        <textarea
          className="h-[130px] w-full rounded-[6px] border-[1px] border-[#a8a8a8] p-[10px]"
          placeholder="내용이 잘 담기도록 적어주세요."
          {...register("content", { required: true })}
        />
      </div>
    </section>
  );
};

export default SosCreatorContentSection;
