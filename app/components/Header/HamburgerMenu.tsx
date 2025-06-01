import React, { useState, useEffect } from 'react';
import styles from './HamburgerMenu.module.css';
import { getMenuItems } from '../../services/menuService';
import { MenuItem } from '../../types';
import Tabs from '../common/Tab';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenuItems();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

  const handleSubMenuToggle = (id: string) => {
    setActiveSubMenu(activeSubMenu === id ? null : id);
    setActiveSubSubMenu(null); // Reset sub-sub-menu when main sub-menu changes
  };

  const handleSubSubMenuToggle = (id: string) => {
    setActiveSubSubMenu(activeSubSubMenu === id ? null : id);
  };

  // Cierra el menú si se hace clic fuera o se presiona Esc
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Evita scroll en el body
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <nav className={`${styles.hamburgerMenu} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <Tabs/>
      </nav>
    </div>
  );
};

export default HamburgerMenu;