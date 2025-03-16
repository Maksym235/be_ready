import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from '../../Types/Components/Button';
export const CButton: FC<ButtonProps> = ({
  htmlType,
  type,
  onClickFn,
  disabled,
  children,
  width,
  height,
}) => {
  const customStyle =
    width || height
      ? {
          width: width,
          height: height,
        }
      : {};
  return (
    <button
      style={customStyle}
      className={`${styles.btn} ${styles[type]}`}
      type={htmlType}
      onClick={onClickFn}
      disabled={disabled}
    >
      <span className={`${styles.btn_text} ${styles[type + '_text']}`}>
        {children}
      </span>
    </button>
  );
  // switch (type) {
  //   case 'primary':
  //     return (
  //       <button
  //         disabled={disabled}
  //         className={styles.primary}
  //         type={htmlType}
  //         onClick={onClickFn}
  //       >
  //         <span className={styles.primary_text}>{children}</span>
  //       </button>
  //     );
  //   case 'secondary':
  //     return (
  //       <button
  //         disabled={disabled}
  //         className={styles.secondary}
  //         type={htmlType}
  //         onClick={onClickFn}
  //       >
  //         <span className={styles.secondary_text}>{children}</span>
  //       </button>
  //     );
  //   case 'full':
  //     return (
  //       <button
  //         disabled={disabled}
  //         className={styles.full}
  //         type={htmlType}
  //         onClick={onClickFn}
  //       >
  //         <span className={styles.full_text}>{children}</span>
  //       </button>
  //     );
  // }
};
