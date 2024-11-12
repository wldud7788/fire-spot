import { useRouter } from "next/navigation";
import { SosInsert, SosSelect } from "../types/sos.types";
import { SubmitHandler, useForm } from "react-hook-form";
import processSosSubmitData from "../utils/processSosSubmitData";

type Props = {
  sosId?: number;
  sos: SosSelect;
};
const useSosCreatorForm = ({ sosId, sos }: Props) => {
  const router = useRouter();
  const { title, content, tag, type } = sos;
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<SosInsert>({
    defaultValues: {
      title,
      content,
      tag,
      type
      // id
      // contentId
      // created_at
    }
  });

  const onSubmit: SubmitHandler<SosInsert> = async (data) => {
    // TODO 사카모토
    await processSosSubmitData(data, sosId);
    router.replace("/sos");
  };

  return {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    watch,
    onSubmit
  };
};

export default useSosCreatorForm;
