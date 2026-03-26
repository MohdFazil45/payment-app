"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useDetails } from "@/store/userDetail";
import { LoginSchema } from "@repo/zodschema";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Signin = () => {
    const route = useRouter()
    let {username,number} = useDetails()
  const form = useForm({
    defaultValues: {
      number: "",
      password: "",
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit:async({value}) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HTTP_URL}/signin`,{
                number:value.number,
                password:value.password
            },{
                withCredentials:true
            })
            username= response.data.data.name
            number=response.data.data.number
            console.log(username)
            console.log(number)
            alert("Signin succesfully")
            route.push("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }
  });
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500">
      <div className="h-fit w-[30vw] bg-white rounded-xl border border-neutral-400 mx-auto flex items-center flex-col py-20 px-8">
        <h1 className="text-4xl font-semibold text-black tracking-tighter mb-12">
          Login your Account
        </h1>
        <div>
          <form
            className="flex flex-col gap-3 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div>
              {
                <form.Field
                  name="number"
                  children={(field) => {
                    return (
                      <Input
                        id={field.name}
                        label={"Number"}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.handleChange(e.target?.value)
                        }
                        placeholder={"Number"}
                        type="text"
                        value={field.state.value}
                      />
                    );
                  }}
                />
              }
            </div>
            <div>
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <Input
                      id={field.name}
                      label={"Password"}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target?.value)
                      }
                      placeholder={"Password"}
                      type="text"
                      value={field.state.value}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Button children="Signin" size="lg" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
