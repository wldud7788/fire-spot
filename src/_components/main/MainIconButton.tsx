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
      className="flex w-full max-w-[115px] flex-col items-center justify-center gap-[15px] rounded-[12px] py-[12px] shadow-custom"
    >
      <img src={src} alt={alt} />
      <p className="text-[20px] font-bold">{text}</p>
    </Link>
  );
};

export default MainIconButton;
