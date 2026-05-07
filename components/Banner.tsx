import React from "react";

import Link from "next/link";
const Banner = ({
  title,
  desc,
}: {
  title: string | undefined | null;
  desc: string | undefined | null;
  className?: string;
}) => {
  return (
    <div className="w-full container max-w-5xl  mb-24 ">
      <div className="bg-[url('/media/gggrain.svg')] bg-center bg-no-repeat bg-cover border border-slate-200 rounded-xl p-7 ">
        <p className="font-Synonym mb-3 font-[600] text-lime-950 text-2xl tracking-tight">
          {title}
        </p>
        <p className="text-lg font-Satoshi">{desc}</p>
        <div className="mt-5">
          <Link href={"/contact"}>
            <button>Contact Us</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
