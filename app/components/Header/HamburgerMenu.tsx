import React, { useState, useEffect } from 'react';
import styles from './HamburgerMenu.module.css';
import { getMenuItems } from '../../services/menuService';
import { MenuItem } from '../../types';

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
        <ul>
          <li className={styles.mainMenuItem}>
            <span className={styles.categoryTitle}>Mujer</span>
            <ul className={styles.subMenu}>
              {menuItems.find(item => item.id === 'mujer')?.subItems?.map(subItem => (
                <li key={subItem.id} className={styles.subMenuItem}>
                  <div className={styles.subMenuHeader} onClick={() => handleSubMenuToggle(subItem.id)}>
                    <span>{subItem.label}</span>
                    {subItem.items && <span className={styles.arrow}>{activeSubMenu === subItem.id ? '▲' : '▼'}</span>}
                  </div>
                  {subItem.items && activeSubMenu === subItem.id && (
                    <ul className={styles.subSubMenu}>
                      {subItem.items.map(subSubItem => (
                        <li key={subSubItem.id} className={styles.subSubMenuItem}>
                          <div className={styles.subSubMenuHeader} onClick={() => handleSubSubMenuToggle(subSubItem.id)}>
                             <span>{subSubItem.label}</span>
                             {subSubItem.items && <span className={styles.arrow}>{activeSubSubMenu === subSubItem.id ? '▲' : '▼'}</span>}
                          </div>
                          {subSubItem.items && activeSubSubMenu === subSubItem.id && (
                            <ul className={styles.finalLevelMenu}>
                                {subSubItem.items.map(finalItem => (
                                    <li key={finalItem.id}>
                                        <a href={finalItem.path || '#'}>{finalItem.label}</a>
                                    </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className={styles.mainMenuItem}>
            <span className={styles.categoryTitle}>Hombre</span>
            <ul className={styles.subMenu}>
              {menuItems.find(item => item.id === 'hombre')?.subItems?.map(subItem => (
                <li key={subItem.id} className={styles.subMenuItem}>
                  <div className={styles.subMenuHeader} onClick={() => handleSubMenuToggle(subItem.id)}>
                    <span>{subItem.label}</span>
                    {subItem.items && <span className={styles.arrow}>{activeSubMenu === subItem.id ? '▲' : '▼'}</span>}
                  </div>
                  {subItem.items && activeSubMenu === subItem.id && (
                    <ul className={styles.subSubMenu}>
                      {subItem.items.map(subSubItem => (
                        <li key={subSubItem.id} className={styles.subSubMenuItem}>
                          <div className={styles.subSubMenuHeader} onClick={() => handleSubSubMenuToggle(subSubItem.id)}>
                             <span>{subSubItem.label}</span>
                             {subSubItem.items && <span className={styles.arrow}>{activeSubSubMenu === subSubItem.id ? '▲' : '▼'}</span>}
                          </div>
                          {subSubItem.items && activeSubSubMenu === subSubItem.id && (
                            <ul className={styles.finalLevelMenu}>
                                {subSubItem.items.map(finalItem => (
                                    <li key={finalItem.id}>
                                        <a href={finalItem.path || '#'}>{finalItem.label}</a>
                                    </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
          {/* Otros ítems de menú si los hubiera */}
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;