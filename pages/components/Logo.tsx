import Image from "next/image";
import Link from "next/link";
const Logo = ({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) => {
  return (
    <Link href={"/"} className={`w-35 ${className}`}>
      <Image
        src={light ? "/logo/Logo-light.png" : "/logo/Logo-dark.png"}
        alt={""}
        className="w-full"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
