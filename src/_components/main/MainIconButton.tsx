import Link from "next/link";

type MainIconButtonProps = {
  href: string;
  src: string;
  alt: string;
  text: string;
};

const MainIconButton = ({ href, src, alt, text }: MainIconButtonProps) => {
  return (
    <Link
      href={href}
      className="flex w-full max-w-[115px] flex-col items-center justify-center gap-[15px] rounded-[12px] py-[12px] shadow-custom max-989:max-w-[100%]"
    >
      <img src={src} alt={alt} className="max-1280:w-[40px]" />
      <p className="text-[20px] font-bold max-1460:text-[16px] max-1160:text-[14px]">
        {text}
      </p>
    </Link>
  );
};

export default MainIconButton;
