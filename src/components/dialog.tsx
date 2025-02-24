import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black p-6 rounded-lg shadow-lg text-white flex flex-col border border-gray-700/50">
        { children }
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

