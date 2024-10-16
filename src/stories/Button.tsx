import React from 'react';

import styles from './button.module.css';
export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary: boolean;
  dot: boolean;
  disabled: boolean;
  /** What background color to use */
  /** How large should the button be? */
  // size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  dot,
  disabled,
  // size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? styles['btn_save'] : styles['btn_cancel'];
  const isDot = dot
    ? primary
      ? styles['btn_save_dot']
      : styles['btn_cancel_dot']
    : '';
  return (
    <button
      disabled={disabled}
      type='button'
      className={`${mode} ${isDot}`}
      {...props}
    >
      {label}
    </button>
  );
};
