"use client";

import { useDetails } from "@/store/userDetail";

const Dashboard = () => {
  const { username, number } = useDetails();
  return (
    <div className="min-h-screen w-full flex gap-4 bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500 p-4">
      <div className="h-1/2 w-1/2 flex flex-col gap-4 ">
        <div className="h-1/2 flex flex-col gap-4 p-4 border border-neutral-400 rounded-xl">
          <div>Account Detail</div>
          <div>
            <div>Name</div>
            <div>Number</div>
          </div>
        </div>
        <div className="h-1/2 flex flex-col gap-4 p-4 border border-neutral-400 rounded-xl">
          <div>Transactions</div>
          <div>
            <div></div>
            <div>Number</div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 border border-neutral-400 rounded-xl ">
        <div className="flex flex-col gap-4 p-4"></div>
      </div>
    </div>
  );
};

export default Dashboard;
