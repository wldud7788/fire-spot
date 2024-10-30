"use client";

import Slide from "@/_components/slide/Slide";

const SlideTestPage = () => {
  const test = () => {
    console.log("test");
  };
  return <Slide slidePerview={3} spaceBetween={10} onChangeEvent={test} />;
};

export default SlideTestPage;
