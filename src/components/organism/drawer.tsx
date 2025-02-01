import React, { FC, ReactNode } from 'react';
interface DrawerProps {
  position?: 'bottom' | 'top' | 'left' | 'right';
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  position = 'bottom',
  children,
  isOpen,
  onClose,
}) => {
  const getTransformStyle = () => {
    const transforms = {
      bottom: isOpen ? 'translateY(0)' : 'translateY(100%)',
      top: isOpen ? 'translateY(0)' : 'translateY(-100%)',
      left: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      right: isOpen ? 'translateX(0)' : 'translateX(100%)',
    };
    return transforms[position];
  };

  const getPositionClass = () => {
    const positions = {
      bottom: 'bottom-0 left-0 w-full',
      top: 'top-0 left-0 w-full',
      left: 'left-0 top-0 h-full w-80',
      right: 'right-0 top-0 h-full w-80',
    };
    return positions[position];
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed h-screen bg-white shadow-2xl z-50 section-padding transition-transform duration-300 ${getPositionClass()}`}
        style={{ transform: getTransformStyle() }}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-secondary font-semibold  hover:bg-primary  h-[30px] w-[30px] rounded-full"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[90vh] overflow-scroll no-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
};
