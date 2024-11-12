import { SosInsert } from "../../../types/sos.types";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<SosInsert>;
};

const SosCreatorContentSection = ({ register }: Props) => {
  return (
    <section className="flex w-full flex-col gap-24 rounded-[20px] border-[1px] border-[##B5B5B5] px-[53px] py-24">
      <input
        className="h-full w-full border-b-[3px] border-black p-[10px]"
        placeholder="모임 이름을 입력해주세요 (00글자 제한)"
        {...register("title", { required: true })}
      />
      <div className="flex flex-col">
        <h2 className="text-[20px]">SOS 내용</h2>
        <textarea
          className="h-[129px] w-full rounded-[6px] border-[1px] border-[#C3C3C3] p-[10px]"
          placeholder="내용이 잘 담기도록 적어주세요."
          {...register("content", { required: true })}
        />
      </div>
    </section>
  );
};

export default SosCreatorContentSection;
