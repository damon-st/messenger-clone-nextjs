"use client";

import { Modal } from "@/components/modals/modal";
import Image from "next/image";

interface ImageModalProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="size-80">
        <Image alt="image" className="object-contain" fill src={src} />
      </div>
    </Modal>
  );
};
