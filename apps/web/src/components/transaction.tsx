"use client "
import TransactionCard from "./transactionsCard";

type Transaction = {
  _id: string;
  amount: number;
  type: "sent" | "received";
  message: string;
  addedAt: string;
  displayName: string;
  displayNumber: string;
  note: string;
};

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;