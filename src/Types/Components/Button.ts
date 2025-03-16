export type ButtonProps = {
  htmlType: 'button' | 'submit' | 'reset';
  type: 'primary' | 'secondary' | 'full' | 'contact_us' | 'add';
  disabled?: boolean;
  children: string | (string | JSX.Element)[];
  onClickFn?: ({ ...props }) => void;
  width?: number;
  height?: number;
};
