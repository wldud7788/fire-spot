type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => {
  return <h1>{text}</h1>;
};

export default PageTitle;
