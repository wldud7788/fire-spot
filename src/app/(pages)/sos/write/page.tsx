import React from "react";
import SosCreatorForm from "../components/sosCreator/SosCreatorForm";
import { sosFormDefaultValues } from "../utils/sosFormDefaultValues";

const SosWrite = () => {
  return <SosCreatorForm sosWithCamp={sosFormDefaultValues} />;
};

export default SosWrite;
