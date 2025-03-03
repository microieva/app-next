import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className=" glass-effect p-6 rounded-lg shadow-lg text-white flex flex-col border border-gray-700/50">
        <div className="flex flex-row w-auto ">
        { children }
        </div>
        <button
          className="dialog-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

