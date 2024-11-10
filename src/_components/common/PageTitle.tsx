type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => {
  return <h1 className="text-[28px] font-bold">{text}</h1>;
};

export default PageTitle;
