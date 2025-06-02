import React, { useEffect, useState } from 'react';
import { getMenuItems } from '../../services/menuService';
import { MenuItem } from '../../types';
import styles from './Tab.module.css'; // Importa tus estilos CSS si los tienes

// Definimos los tipos para las props si fuera necesario o para el estado
type Tab = 'Mujer' | 'Hombre';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Mujer'); // Estado para controlar la pestaña activa
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);

  // Función para cambiar la pestaña activa
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };
   useEffect(() => {
      const fetchMenu = async () => {
        const data = await getMenuItems();
        console.log('Menu Items:', data); // Verifica que los datos se reciban correctamente
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

  // Contenido que se mostrará para cada pestaña
  const renderContent = () => {
    switch (activeTab) {
      case 'Mujer': {
        // Aquí puedes mapear los items del menú para la sección de Mujer
        const mujerItems = menuItems.filter(item => item.id === 'mujer')[0]?.subItems || [];
        return (
          <div>
            <ul>
              {mujerItems.map((item) => (
                <li key={item.id} className={`${styles.menuItem}`} >
                  <a href={item.path}>
                    {item.label}
                  </a>
                  {item.items && (
                    <button
                      className={styles.subMenuToggle}
                      onClick={() => {
                        const submujerItems = mujerItems.filter(el => el.id === item.id)[0]?.items || [];
                        console.log('mujerItems:', submujerItems);
                        renderSubmenu(submujerItems);
                      }}
                    >
                      {activeSubMenu === item.id ? '' : 
                      <svg viewBox="0 0 24 31" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.77 14.745L8.47 8.075C8.36 7.975 8.19 7.975 8.08 8.075C8.03 8.125 8 8.195 8 8.265C8 8.335 8.03 8.405 8.08 8.455L15.18 14.945L8.22 21.565C8.17 21.615 8.14 21.685 8.14 21.755C8.14 21.825 8.17 21.895 8.22 21.945C8.27 21.995 8.34 22.015 8.41 22.015C8.48 22.015 8.56 21.985 8.61 21.935L15.77 15.125C15.82 15.075 15.85 15.005 15.85 14.935C15.85 14.865 15.82 14.795 15.77 14.745Z"></path>
                      </svg>
                      }
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      case 'Hombre':{
       // Aquí puedes mapear los items del menú para la sección de Hombre
        const hombreItems = menuItems.filter(item => item.id === 'hombre')[0]?.subItems || [];
        return (
          <div>
            <ul>
              {hombreItems.map((item) => (
                <li key={item.id} className={`${styles.menuItem}`} >
                  <a href={item.path}>
                    {item.label}
                  </a>
                  {item.items && (
                    <button
                      className={styles.subMenuToggle}
                      onClick={() => {
                        const subhombreItems = hombreItems.filter(el => el.id === item.id)[0]?.items || [];
                        console.log('hombreItems:', subhombreItems);
                        renderSubmenu(subhombreItems);
                      }}
                    >
                     {activeSubMenu === item.id ? '' : 
                      <svg viewBox="0 0 24 31" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.77 14.745L8.47 8.075C8.36 7.975 8.19 7.975 8.08 8.075C8.03 8.125 8 8.195 8 8.265C8 8.335 8.03 8.405 8.08 8.455L15.18 14.945L8.22 21.565C8.17 21.615 8.14 21.685 8.14 21.755C8.14 21.825 8.17 21.895 8.22 21.945C8.27 21.995 8.34 22.015 8.41 22.015C8.48 22.015 8.56 21.985 8.61 21.935L15.77 15.125C15.82 15.075 15.85 15.005 15.85 14.935C15.85 14.865 15.82 14.795 15.77 14.745Z"></path>
                      </svg>
                      }
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      default:
        return null;
    }
  };

  // Renderizamos el componente
  const renderSubmenu = (items: MenuItem[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id} className={`${styles.menuItem}`} >
            <a href={item.path}>
              {item.label}
            </a>
            {item.items && (
              <button
                className={styles.subMenuToggle}
                onClick={() => {
                  const subhombreItems = items.filter(el => el.id === item.id)[0]?.items || [];
                  console.log('hombreItems:', subhombreItems);
                  renderSubmenu(subhombreItems);
                }}
              >
                {activeSubMenu === item.id ? '' : 
                <svg viewBox="0 0 24 31" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.77 14.745L8.47 8.075C8.36 7.975 8.19 7.975 8.08 8.075C8.03 8.125 8 8.195 8 8.265C8 8.335 8.03 8.405 8.08 8.455L15.18 14.945L8.22 21.565C8.17 21.615 8.14 21.685 8.14 21.755C8.14 21.825 8.17 21.895 8.22 21.945C8.27 21.995 8.34 22.015 8.41 22.015C8.48 22.015 8.56 21.985 8.61 21.935L15.77 15.125C15.82 15.075 15.85 15.005 15.85 14.935C15.85 14.865 15.82 14.795 15.77 14.745Z"></path>
                </svg>
                }
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }
  // Puedes agregar estilos en línea o usar un archivo CSS para estilizar el componente

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {/* Pestaña "Mujer" */}
        <button
          onClick={() => handleTabClick('Mujer')}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeTab === 'Mujer' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'Mujer' ? 'white' : 'black',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            marginRight: '5px',
            fontWeight: activeTab === 'Mujer' ? 'bold' : 'normal',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}
        >
          Mujer
        </button>

        {/* Pestaña "Hombre" */}
        <button
          onClick={() => handleTabClick('Hombre')}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeTab === 'Hombre' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'Hombre' ? 'white' : 'black',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            fontWeight: activeTab === 'Hombre' ? 'bold' : 'normal',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}
        >
          Hombre
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;