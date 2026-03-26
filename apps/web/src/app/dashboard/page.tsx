"use client";

import { useDetails } from "@/store/userDetail";

const Dashboard = () => {
  const { username, number } = useDetails();
  return (
    <div className="min-h-screen w-full flex flex-col bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500 p-2">
      <div className="h-1/2 w-1/2 border border-neutral-400 rounded-xl ">
        <div className="h-1/2 flex flex-col gap-4 p-4">
          <div>
            <div className="mx-auto text-white text-3xl font-semibold">
              <h1>Account Details</h1>
            </div>
            <div>
              <h3 className="text-lg text-white font-medium">{`Name :- ${username}`}</h3>
              <h3 className="text-lg text-white font-medium">{`Number :-${number}`}</h3>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full border rounded border-neutral-400">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magnam
            qui quaerat nobis voluptatibus eligendi in ut doloribus explicabo
            tempora! Omnis, amet eum?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
