'use client';
import Toast from '@/components/molecule/tost';
import { useToastStore } from '@/store/tost';
import React from 'react';

const ToastTemplate = () => {
  const { isVisible } = useToastStore();

  return isVisible ? <Toast /> : null;
};

export default ToastTemplate;
