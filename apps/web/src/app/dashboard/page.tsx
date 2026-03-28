"use client";
import { Button } from "@/components/button";
import { Navbar } from "@/components/navbar";
import TransactionList from "@/components/transaction";
import { useDetails } from "@/hooks/useDetails";
import axios from "axios";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [transaction, setTransactions] = useState([]);
  const checkBalance = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/balance`, {
      withCredentials: true,
    });

    setBalance(res.data.balance);
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
          {
            withCredentials: true,
          },
        );

        setTransactions(response.data.transactions);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.error || "Something went wrong");
        } else {
          alert("Something went wrong");
        }
      }
    };

    getTransactions();
  }, []);

  const { name, number } = useDetails();

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500 p-4">
      <div>
        <Navbar />
      </div>
      <div className="h-full w-full border border-neutral-400 rounded-lg -mt-6">
        <div className="h-fit w-full border-b p-4">
          <AccountCard number={number} username={name} />
        </div>
        <div className="h-fit w-full border-b p-4">
          <ActionCard
            balance={Number(balance).toFixed(2)}
            checkBalance={checkBalance}
          />
          <div className="flex items-center justify-center text-3xl font-bold text-white border-b p-2 mb-4">
            Transactions
          </div>
          <div>
            <TransactionList transactions={transaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function ActionCard({
  balance,
  checkBalance,
}: {
  balance: string;
  checkBalance: () => void;
}) {
  const [isHide, setIsHide] = useState(true);

  const hide = () => {
    setIsHide((prev) => !prev);
  };
  return (
    <div className="rounded-3xl border dark:border-white/20 border-neutral-600 bg-white/10 backdrop-blur-md p-6 shadow-xl">
      <h2 className="text-2xl xl:text-4xl font-semibold dark:text-white text-neutral-700 border-b border-neutral-600 dark:border-white/20 pb-3 mb-5">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center  justify-center w-full gap-2 lg:hidden xl:hidden">
              <div >
                <Link href="/transfer">
                  <Button children="Transfer Money" size="sm" />
                </Link>
              </div>
              <div>
                <Button
                  children="Check Balance"
                  size="sm"
                  onClick={checkBalance}
                />
              </div>
            </div>
            <div className="lg:flex xl:flex w-full gap-4 items-center justify-center hidden">
              <div >
                <Link href="/transfer">
                  <Button children="Transfer Money" size="lg" />
                </Link>
              </div>
              <div>
                <Button
                  children="Check Balance"
                  size="lg"
                  onClick={checkBalance}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl dark:bg-white/10 bg-neutral-300 border dark:border-white/10 text-neutral-500 p-4">
            <p className="text-sm xl:text-2xl dark:text-white/70 text-neutral-600">
              Available Balance
            </p>
            <div className="flex items-center justify-between">
              {isHide ? (
                <p className="text-2xl xl:text-3xl font-bold dark:text-white text-neutral-600">
                  {"₹--:--"}
                </p>
              ) : (
                <p className="text-2xl font-bold dark:text-white text-neutral-600">
                  {balance ? `₹${balance}` : "₹ --"}
                </p>
              )}
              <Eye className="cursor-pointer xl:h-8 xl:w-8" onClick={hide} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountCard({
  username,
  number,
}: {
  username: string;
  number: string;
}) {
  return (
    <div className="rounded-3xl border dark:border-white/20 border-neutral-600 dark:bg-white/10 bg-neutral-200/60 backdrop-blur-md p-6 shadow-xl">
      <h2 className="text-2xl xl:text-4xl font-bold xl:font-semibold dark:text-white text-neutral-700 border-b dark:border-white/20 border-neutral-600 pb-3 mb-5">
        Account Details
      </h2>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full dark:bg-white/20 bg-neutral-300 text-neutral-600 dark:text-white flex items-center justify-center text-2xl  font-bold dark:border-white/20 border">
          {username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="space-y-1">
          <p className="dark:text-white text-neutral-600 text-xl xl:text-3xl font-semibold">
            {username || "No username found"}
          </p>
          <p className="dark:text-white/80 text-neutral-700 text-base xl:text-xl">
            {number ? `+91 ${number}` : "No number found"}
          </p>
        </div>
      </div>
    </div>
  );
}
