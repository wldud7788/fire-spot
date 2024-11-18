"use client";

import Slide from "@/_components/slide/Slide";

const SlideTestPage = () => {
  const test = () => {};
  return (
    <Slide slidePerview={3} spaceBetween={10} onChangeEvent={test}>
      <div>슬라이드1</div>
      <div>슬라이드2</div>
    </Slide>
  );
};

export default SlideTestPage;
