type MainSectionProps = {
  background?: string;
  children: React.ReactNode;
};

const MainSection = ({ background, children }: MainSectionProps) => {
  return (
    <div
      className="main_section py-[40px]"
      style={{ background: `${background}` }}
    >
      <div className="m-auto w-full max-w-[1360px] px-[30px] max-767:px-[15px]">
        {children}
      </div>
    </div>
  );
};

export default MainSection;
