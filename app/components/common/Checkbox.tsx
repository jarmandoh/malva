import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: React.ReactNode; // Permite texto o elementos JSX en el label
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, ...props }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input type="checkbox" id={id} className={styles.checkbox} {...props} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;