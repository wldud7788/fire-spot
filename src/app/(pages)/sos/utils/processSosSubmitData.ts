import { patchSos, postSos } from "../service/sosSerivce";
import { SosInsert, SosUpdate } from "../types/sos.types";

const processSosSubmitData = async (formData: SosInsert, sosId?: number) => {
  const sos = {
    ...formData
  };

  if (sosId) {
    const sosUpdate: SosUpdate = {
      ...sos
    };
    await patchSos(sosId, sosUpdate);
  } else {
    await postSos(sos);
  }
};

export default processSosSubmitData;
