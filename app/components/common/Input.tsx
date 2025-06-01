import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Puedes añadir props personalizadas si las necesitas
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input className={styles.input} {...props} />
  );
};

export default Input;