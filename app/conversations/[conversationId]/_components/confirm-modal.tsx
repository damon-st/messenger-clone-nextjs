"use client";

import { Button } from "@/components/button";
import { Modal } from "@/components/modals/modal";
import { useConversation } from "@/hooks/use-conversations";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ onClose, isOpen }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = useCallback(() => {
    setIsLoading(true);
    const promise = axios.delete(`/api/conversations/${conversationId}`);
    toast.promise(promise, {
      loading: "Delete conversation please waiting",
      error: (e) => {
        setIsLoading(false);
        return `Error:${e}`;
      },
      success: () => {
        onClose();
        router.push("/conversations");
        router.refresh();
        return "Remove success";
      },
    });
  }, [conversationId, onClose, router]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
          <FiAlertTriangle className=" size-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure yout wat to delete this Conversation
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-x-4">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
