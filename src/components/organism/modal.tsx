import React, { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => (
  <>
    {isOpen && (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div
            className="bg-white rounded-lg shadow-xl transform transition-all w-fit "
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="p-6  w-fit ">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div>{children}</div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
);
