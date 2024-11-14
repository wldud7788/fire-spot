import React, { useState } from "react";
import { SosWithCamp } from "../types/sos.types";
import { addHours, isBefore } from "date-fns";

const useSosList = (sosWithCampList: SosWithCamp[]) => {
  const [isProgress, setIsProgress] = useState(true);

  const toggleShowType = (condition: boolean) => {
    setIsProgress(condition);
  };

  const sosWithCampCardList = sosWithCampList.filter((sosWithCamp) => {
    const deadline = addHours(sosWithCamp.sos.created_at, 3);

    if (isProgress) {
      return new Date() < deadline;
    }
    return new Date() > deadline;
  });

  return { isProgress, toggleShowType, sosWithCampCardList };
};

export default useSosList;
