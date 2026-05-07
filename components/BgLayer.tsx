import clsx from "clsx";
const BgLayer = ({ color = "bg-slate-950/20" }) => {
  return <div className={clsx(`w-full h-full absolute inset-0 `, color)}></div>;
};

export default BgLayer;
