type PageTitleProps = {
  text: string | undefined;
};

const PageTitle = ({ text }: PageTitleProps) => {
  return <h1 className="text-[28px] font-bold max-1280:text-[24px]">{text}</h1>;
};

export default PageTitle;
