"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
const Head = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login"); // use replace so "back" doesn’t reload dashboard
    router.refresh(); // ensure fresh render
  };

  return (
    <header className="bg-slate-100 ">
      <div className="flex container py-4  justify-between items-center">
        <h1 className="text-2xl text-black font-semibold capitalize">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="pr-3 cursor-default pl-1 py-1 border border-slate-100 bg-slate-50 text-sm flex gap-2 items-center text-Bizgrowth consultancy-black rounded-full ">
              <div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
              </div>
              <span>Admin</span>
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm border hover:bg-Bizgrowth consultancy-tealDark hover:border-Bizgrowth consultancy-tealDark hover:text-Bizgrowth consultancy-white py-2 px-4 rounded-full flex items-center gap-2"
          >
            <span>
              <LogOut className="w-5 h-5" />
            </span>
            <span className=""> Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Head;
