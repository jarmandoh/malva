import React, { useState } from 'react';

// Definimos los tipos para las props si fuera necesario o para el estado
type Tab = 'Mujer' | 'Hombre';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Mujer'); // Estado para controlar la pestaña activa

  // Función para cambiar la pestaña activa
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  // Contenido que se mostrará para cada pestaña
  const renderContent = () => {
    switch (activeTab) {
      case 'Mujer':
        return (
          <div>
            <h3>Contenido para la sección de Mujer</h3>
            <p>Aquí puedes mostrar productos, noticias o información específica para mujeres.</p>
            <ul>
              <li>Moda femenina</li>
              <li>Accesorios para mujer</li>
              <li>Cosméticos</li>
            </ul>
          </div>
        );
      case 'Hombre':
        return (
          <div>
            <h3>Contenido para la sección de Hombre</h3>
            <p>Aquí puedes mostrar productos, noticias o información específica para hombres.</p>
            <ul>
              <li>Moda masculina</li>
              <li>Accesorios para hombre</li>
              <li>Cuidado personal masculino</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
        {/* Pestaña "Mujer" */}
        <button
          onClick={() => handleTabClick('Mujer')}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            border: 'none',
            
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
      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '5px', minHeight: '150px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;