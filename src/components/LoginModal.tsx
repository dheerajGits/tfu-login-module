import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, PhoneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import OtpInput from "./OtpInput";

export type LoginModalProps = {
  color: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccessOtp: () => void;
  logoImg: string;
  apiBaseUrl: string;
  redirectionURL: string;
};

export function LoginModal({
  color,
  logoImg,
  isOpen,
  onClose,
  onSuccessOtp,
  redirectionURL,
  apiBaseUrl,
}: LoginModalProps) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data: any) => {
    if (step == 0) setPhone(data.phone);
    if (step >= 2) {
      return axios
        .post(
          `${apiBaseUrl}auth/otpless-login`,
          {
            phone: phone,
          },
          { withCredentials: true }
        )
        .then((data) => {
          if (data?.data?.data?.token) {
            // signIn("fireAuth", {
            //   ...data.data.data,
            //   redirect: false,
            // });
            // localStorage.setItem("token", data.data.token);
            // router.replace("/");
            onSuccessOtp(); // this function will contain all the logic related to login via next/auth
          }
          return Promise.resolve(data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else setStep((step: number) => step + 1);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl min-h-[300px] border-[#285177] transform overflow-hidden rounded-2xl bg-main-website-gradient p-6 text-center align-middle shadow-xl transition-all border border-white/5">
                {step == 0 && (
                  <div className="flex flex-col justify-center items-center gap-16 text-white px-5 py-5">
                    <p className="text-[38px] font-playfair font-semibold">
                      Login to Your Account
                    </p>
                    <form
                      className="relative flex flex-col items-center gap-10 justify-center text-black text-xl w-[80%]"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        className="!pl-16 !h-[60px] !text-[20px]"
                        outerclassName="!w-full"
                        register={register}
                        errors={errors}
                      ></Input>
                      <PhoneIcon className="absolute w-8 top-3.5 left-5 text-gray-400" />
                      <button
                        type="submit"
                        className="text-[20px] font-lato h-16 text-black w-72 rounded-full bg-[#FFD700] border-none"
                      >
                        Send OTP
                      </button>
                    </form>
                  </div>
                )}
                {step == 1 && (
                  <div className="flex flex-col justify-center items-center gap-7">
                    <p className="text-[38px] font-playfair font-semibold text-white">
                      Verify your Phone Number{" "}
                    </p>{" "}
                    <OtpInput phone={phone} onOtpSubmit={onSubmit} />
                  </div>
                )}
                {step == 2 && (
                  <div className="flex flex-col justify-center items-center gap-7 text-white w-full">
                    <p className="text-[38px] font-playfair font-semibold">
                      Fill in your Details{" "}
                    </p>{" "}
                    <form
                      className="flex flex-col items-center justify-center gap-10 w-full text-black"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="flex flex-col items-center justify-center gap-[2px]">
                        <p className="text-white text-start w-full">Name</p>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          className=" !h-12 !text-[20px]"
                          outerclassName="!w-[500px]"
                          register={register}
                          errors={errors}
                        ></Input>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-[2px]">
                        <p className="text-white text-start w-full ">Email</p>
                        <Input
                          type="text"
                          placeholder="Enter your email address"
                          name="email"
                          className=" !h-12 !text-[20px]"
                          outerclassName="!w-[500px]"
                          register={register}
                          errors={errors}
                        ></Input>
                      </div>
                      <button
                        type="submit"
                        className="text-[20px] font-lato h-12 text-black w-72 rounded-full border-none hover:text-black bg-[#FFD700]"
                      >
                        Continue
                      </button>
                    </form>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
