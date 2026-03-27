"use client";
import { Navbar } from "@/components/navbar";
import { PaymentSchema } from "@repo/zodschema";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  number: string;
};

const Transfer = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedUserNumber, setSelectedUserNumber] = useState("");

  const form = useForm({
    defaultValues: {
      amountSend: "",
      note: "",
    },

    onSubmit: async ({ value }) => {
      if (!selectedUser) return alert("Please select a recipient");
      if (!value.amountSend || Number(value.amountSend) <= 0)
        return alert("Enter a valid amount");
      try {
        console.log("Here");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_URL}/transfer`,
          {
            receiverNumber: selectedUserNumber,
            amountSend: value.amountSend,
            note: value.note,
          },
          {
            withCredentials: true,
          },
        );

        alert("Transfer Successful");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.error || "Something went wrong");
        } else {
          alert("Something went wrong");
        }
      }
    },
  });

  const handleSelectUser = async (user: User) => {
    setSelectedUser(true);
    setSelectedUserName(user.name);
    setSelectedUserNumber(user.number);
  };

  const removeUser = async () => {
    setSelectedUser(false);
    setSelectedUserName("");
    setSelectedUserNumber("");
  };

  const onNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setSearchNumber(val);

    if (val.length === 0) {
      setFilteredUsers([]);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/bulk?filter=${val}`,
        { withCredentials: true },
      );
      setFilteredUsers(response.data.data);
    } catch {
      setFilteredUsers([]);
    }
  };

  return (
    <div className="min-h-screen w-full flex gap-4 bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500 p-4">
      <div className="w-full ">
        <div className="w-full -mt-12">
          <Navbar />
        </div>
        <div className="flex border dark:border-neutral-500 border-neutral-800 rounded-2xl h-fit w-full">
          <div className="w-1/2 h-full border-r p-4">
            <div className="mx-auto w-full h-full">
              <h1 className="text-2xl mb-4 font-semibold">Search Recipient</h1>
              <div>
                <div className="flex flex-col  justify-center gap-1">
                  <label htmlFor="Number" className="text-md font-semibold">
                    Enter Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter Number"
                    className="p-1 border border-neutral-700 rounded bg-white   text-black focus:outline-none"
                    onChange={onNumberChange}
                  />
                </div>
              </div>
              <div>
                <div className="mt-6 flex flex-col gap-3 max-h-105 overflow-y-auto pr-1">
                  {searchNumber.trim() === "" ? (
                    <p className="dark:text-white/80 text-gray-800 text-sm">
                      Start typing a number to search users
                    </p>
                  ) : filteredUsers?.length === 0 ? (
                    <p className="dark:text-white text-black text-lg font-semibold">
                      Users not found
                    </p>
                  ) : (
                    filteredUsers?.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="flex items-center justify-between cursor-pointer gap-4 rounded-2xl border dark:border-white/10 border-neutral-500 dark:bg-white/10 bg-neutral-300 p-4 text-left hover:bg-white/20 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-500 font-semibold h-10 w-10 flex items-center justify-center text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <p className="text-lg font-medium dark:text-white text-neutral-800">
                              {user.name}
                            </p>
                            <p className="text-sm dark:text-white/70 text-neutral-800">
                              +91 {user.number}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm dark:text-white/70 text-neutral-800">Select</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full  border-l p-4">
            <div className="text-2xl font-semibold mb-4">Transfer Money</div>
            <div>
              <div>
                <div>
                  <label htmlFor="text" className="text-md font-semibold ">
                    Recipient Number
                  </label>
                  <div className="py-2 w-full bg-neutral-100 rounded px-2 border border-neutral-500">
                    {selectedUser ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-3">
                          <div className="h-8 w-8 flex items-center justify-center font-bold rounded-full bg-blue-500">
                            {selectedUserName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="text-lg text-neutral-600 font-semibold">
                              {selectedUserName}
                            </p>
                            <p className="text-sm text-neutral-600 font-semibold">
                              +91 {selectedUserNumber}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={removeUser}
                          className="text-red-600 cursor-pointer"
                        >
                          {" "}
                          <Trash2 />
                        </div>
                      </div>
                    ) : (
                      <p className="text-neutral-600 text-lg font-medium">
                        First select User
                      </p>
                    )}
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  <div>
                    <form.Field
                      name="amountSend"
                      children={(field) => {
                        return (
                          <div className="flex flex-col mb-4 ">
                            <label
                              htmlFor="Number"
                              className="text-md font-semibold"
                            >
                              Enter Amount
                            </label>
                            <input
                              onBlur={field.handleBlur}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => field.handleChange(e.target.value)}
                              value={field.state.value}
                              type="tel"
                              maxLength={10}
                              placeholder="Enter Number"
                              className="p-1 border border-neutral-500  rounded bg-white text-black focus:outline-none"
                            />
                          </div>
                        );
                      }}
                    />
                    <form.Field
                      name="note"
                      children={(field) => {
                        return (
                          <div className="flex flex-col">
                            <label
                              htmlFor="text"
                              className="text-md font-semibold"
                            >
                              Note(Optional)
                            </label>
                            <textarea
                              onBlur={field.handleBlur}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                              ) => field.handleChange(e.target.value)}
                              value={field.state.value}
                              className="bg-white border border-neutral-500 min-h-36 rounded-lg text-black placeholder:text-black p-2"
                            ></textarea>
                          </div>
                        );
                      }}
                    />
                    <div className="flex items-center justify-center mt-4 w-full">
                      <button
                        type="submit"
                        className="w-full bg-green-600 cursor-pointer py-2 rounded-lg text-xl font-bold"
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
