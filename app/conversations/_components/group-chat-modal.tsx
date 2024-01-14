"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/inputs/input";
import { Select } from "@/components/inputs/select";
import { Modal } from "@/components/modals/modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

export const GroupChatModal = ({
  onClose,
  isOpen,
  users,
}: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const promise = axios.post("/api/conversations", {
      ...data,
      isGroup: true,
    });
    toast.promise(promise, {
      loading: "Creating group please waiting",
      error: (e) => {
        setIsLoading(false);
        return `Error: ${e}`;
      },
      success: () => {
        setIsLoading(false);
        router.refresh();
        onClose();
        return "Success";
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-10">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                errors={errors}
                label="Name"
                id="name"
                disabled={isLoading}
                required
              />
              <Select
                disabled={isLoading}
                label="Memebers"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            type="button"
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
