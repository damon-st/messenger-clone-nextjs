"use client";

import { useConversation } from "@/hooks/use-conversations";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { MessageInput } from "./message-input";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

export const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    const promise = axios.post("/api/messages", {
      ...data,
      conversationId,
    });
    toast.promise(promise, {
      loading: "Sending a message",
      error: (error) => `Error: ${error}`,
      success: () => {
        return "Success send message";
      },
    });
  };

  const handleUpload = (result: any) => {
    const promise = axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });

    toast.promise(promise, {
      loading: "Sending a image",
      error: (error) => `Error: ${error}`,
      success: () => {
        return "Success send image";
      },
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset="reul10vn"
        onUpload={handleUpload}
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          type="text"
          placeHolder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};
