import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { getFooterItems } from '../../services/footerService';
import { FooterColumn } from '../../types';
import Input from '../common/Input'; // Componente de input reutilizable
import Button from '../common/Button'; // Componente de botón reutilizable
import Checkbox from '../common/Checkbox'; // Componente de checkbox reutilizable

const Footer: React.FC = () => {
  const [footerColumns, setFooterColumns] = useState<FooterColumn[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null); // Para el mobile accordion
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await getFooterItems();
      setFooterColumns(data);
    };
    fetchFooter();
  }, []);

  const handleAccordionToggle = (columnId: string) => {
    setActiveAccordion(activeAccordion === columnId ? null : columnId);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError(false);
    if (!acceptTerms) {
      setTermsError(true);
      return;
    }
    // Lógica para enviar el formulario (puedes simular un envío)
    console.log('Newsletter Suscrito:', { newsletterEmail, gender, acceptTerms });
    alert('¡Gracias por suscribirte!');
    setNewsletterEmail('');
    setGender('');
    setAcceptTerms(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Columnas de Siguenos, Servicio al cliente, Quienes somos */}
        {footerColumns.map((column) => (
          <div key={column.id} className={styles.footerColumn}>
            <button className={styles.columnTitle} onClick={() => handleAccordionToggle(column.id)}>
              {column.title}
              {/* Solo muestra el arrow en mobile y para columnas específicas */}
              {(column.id === 'servicio-cliente' || column.id === 'quienes-somos' || column.id === 'siguenos') && (
                <span className={styles.accordionArrow}>{activeAccordion === column.id ? '▲' : '▼'}</span>
              )}
            </button>
            <ul className={`${styles.columnList} ${activeAccordion === column.id ? styles.open : ''} ${column.id === 'siguenos' ? styles.siguenosList: '' } `  }>
              {column.items.map((item) => (
                <li key={item.id}>
                  <a href={item.path}>
                  {
                    item.id === 'facebook' && (
                        <svg width="31" height="30" viewBox="0 0 31 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.69 8C11.87 8 8.75 11.11 8.75 14.94C8.75 18.77 11.86 21.88 15.69 21.88C19.52 21.88 22.63 18.77 22.63 14.94C22.63 11.11 19.52 8 15.69 8ZM22 14.93C22 18.41 19.17 21.24 15.69 21.24C12.21 21.24 9.38 18.41 9.38 14.93C9.38 11.45 12.21 8.62 15.69 8.62C19.17 8.62 22 11.45 22 14.93Z" fill="#D1D1D1"></path>
                        <path d="M15.8697 14.45H18.0497V15.26H15.8897V21.54H14.9297V15.26H13.6597V14.45H14.9297V13.57C14.9297 12.3 15.6797 11.47 17.0697 11.47C17.5997 11.47 18.1297 11.62 18.4897 11.91L18.1697 12.62C17.8997 12.39 17.5197 12.27 17.1197 12.27C16.2997 12.27 15.8697 12.73 15.8697 13.6V14.45Z" fill="#D1D1D1"></path>
                      </svg>
                    )                    
                  }
                  {
                    item.id === 'pinterest' && (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.94 8C11.12 8 8 11.11 8 14.94C8 18.77 11.11 21.88 14.94 21.88C18.77 21.88 21.88 18.77 21.88 14.94C21.88 11.11 18.77 8 14.94 8ZM21.25 14.93C21.25 18.41 18.42 21.24 14.94 21.24C11.46 21.24 8.63 18.41 8.63 14.93C8.63 11.45 11.46 8.62 14.94 8.62C18.42 8.62 21.25 11.45 21.25 14.93Z" fill="#D1D1D1"></path>
                          <path d="M13.9601 20.69C14.5401 18.34 15.1601 16 15.7301 13.65C15.8401 13.2 15.1501 13.01 15.0401 13.46C14.4601 15.81 13.8401 18.15 13.2701 20.5C13.1601 20.95 13.8501 21.14 13.9601 20.69Z" fill="#D1D1D1"></path>
                          <path d="M13.7397 15.0599C12.8997 14.7299 12.8297 13.6099 13.2597 12.9499C13.7697 12.1499 14.7797 11.7999 15.6897 11.8799C16.5997 11.9599 17.4597 12.4999 17.8297 13.3499C18.1797 14.1499 18.1097 15.1799 17.4897 15.8299C16.8397 16.5099 15.7397 16.7099 14.9297 16.2199C14.5297 15.9799 14.1697 16.5999 14.5697 16.8399C15.5597 17.4299 16.8497 17.2799 17.7397 16.5699C18.6297 15.8599 18.9597 14.5199 18.6097 13.4099C17.8397 10.9199 14.2497 10.3699 12.7297 12.4699C11.9297 13.5699 12.2397 15.2399 13.5497 15.7599C13.9797 15.9299 14.1597 15.2399 13.7397 15.0699V15.0599Z" fill="#D1D1D1"></path>
                        <svg width="31" height="30" viewBox="0 0 31 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.69 8C11.87 8 8.75 11.11 8.75 14.94C8.75 18.77 11.86 21.88 15.69 21.88C19.52 21.88 22.63 18.77 22.63 14.94C22.63 11.11 19.52 8 15.69 8ZM22 14.93C22 18.41 19.17 21.24 15.69 21.24C12.21 21.24 9.38 18.41 9.38 14.93C9.38 11.45 12.21 8.62 15.69 8.62C19.17 8.62 22 11.45 22 14.93Z" fill="#D1D1D1"></path>
                          <path d="M15.8697 14.45H18.0497V15.26H15.8897V21.54H14.9297V15.26H13.6597V14.45H14.9297V13.57C14.9297 12.3 15.6797 11.47 17.0697 11.47C17.5997 11.47 18.1297 11.62 18.4897 11.91L18.1697 12.62C17.8997 12.39 17.5197 12.27 17.1197 12.27C16.2997 12.27 15.8697 12.73 15.8697 13.6V14.45Z" fill="#D1D1D1"></path>
                        </svg></svg>
                    )
                  }
                  {
                    item.id === 'instagram' && (
                      <svg width="31" height="30" viewBox="0 0 31 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3699 8H11.2599C9.94988 8 8.87988 9.07 8.87988 10.38V19.49C8.87988 20.8 9.94988 21.87 11.2599 21.87H20.3699C21.6799 21.87 22.7499 20.8 22.7499 19.49V10.38C22.7499 9.07 21.6799 8 20.3699 8ZM22.1199 10.38V19.49C22.1199 20.46 21.3299 21.24 20.3699 21.24H11.2599C10.2899 21.24 9.50988 20.45 9.50988 19.49V10.38C9.50988 9.41 10.2999 8.63 11.2599 8.63H20.3699C21.3399 8.63 22.1199 9.42 22.1199 10.38Z" fill="#D1D1D1"></path>
                        <path d="M19.0898 10.3199C18.6598 10.3199 18.2998 10.6699 18.2998 11.1099C18.2998 11.5499 18.6498 11.8999 19.0898 11.8999C19.5298 11.8999 19.8798 11.5499 19.8798 11.1099C19.8798 10.6699 19.5298 10.3199 19.0898 10.3199Z" fill="#D1D1D1"></path>
                        <path d="M15.81 18.26C13.97 18.26 12.48 16.77 12.48 14.93C12.48 13.09 13.97 11.6 15.81 11.6C17.65 11.6 19.14 13.09 19.14 14.93C19.14 16.77 17.65 18.26 15.81 18.26ZM15.81 12.08C14.24 12.08 12.96 13.36 12.96 14.93C12.96 16.5 14.24 17.78 15.81 17.78C17.38 17.78 18.66 16.5 18.66 14.93C18.66 13.36 17.38 12.08 15.81 12.08Z" fill="#D1D1D1"></path>
                        <path d="M15.8102 18.3399C13.9302 18.3399 12.4102 16.8099 12.4102 14.9399C12.4102 13.0699 13.9402 11.5399 15.8102 11.5399C17.6802 11.5399 19.2102 13.0699 19.2102 14.9399C19.2102 16.8099 17.6802 18.3399 15.8102 18.3399ZM15.8102 11.6799C14.0202 11.6799 12.5602 13.1399 12.5602 14.9299C12.5602 16.7199 14.0202 18.1799 15.8102 18.1799C17.6002 18.1799 19.0602 16.7199 19.0602 14.9299C19.0602 13.1399 17.6002 11.6799 15.8102 11.6799ZM15.8102 17.8599C14.2002 17.8599 12.8802 16.5499 12.8802 14.9299C12.8802 13.3099 14.1902 11.9999 15.8102 11.9999C17.4302 11.9999 18.7402 13.3099 18.7402 14.9299C18.7402 16.5499 17.4302 17.8599 15.8102 17.8599ZM15.8102 12.1599C14.2802 12.1599 13.0302 13.4099 13.0302 14.9399C13.0302 16.4699 14.2802 17.7199 15.8102 17.7199C17.3402 17.7199 18.5902 16.4699 18.5902 14.9399C18.5902 13.4099 17.3402 12.1599 15.8102 12.1599Z" fill="#D1D1D1"></path>
                      </svg>
                    )
                  }
                  {
                    item.id === 'youtube' && (
                      <svg width="33" height="30" viewBox="0 0 33 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1999 8H11.0099C9.69989 8 8.62988 9.07 8.62988 10.38V19.49C8.62988 20.8 9.69989 21.87 11.0099 21.87H22.1999C23.5099 21.87 24.5799 20.8 24.5799 19.49V10.38C24.5799 9.07 23.5099 8 22.1999 8ZM23.9499 10.38V19.49C23.9499 20.46 23.1599 21.24 22.1999 21.24H11.0099C10.0399 21.24 9.25989 20.45 9.25989 19.49V10.38C9.25989 9.41 10.0499 8.63 11.0099 8.63H22.1999C23.1699 8.63 23.9499 9.42 23.9499 10.38Z" fill="#D1D1D1"></path>
                        <path d="M18.4996 14.75L14.8696 12.56C14.7496 12.49 14.5996 12.57 14.5996 12.71V17.15C14.5996 17.29 14.7496 17.38 14.8696 17.3L18.4996 15.11C18.6396 15.03 18.6396 14.83 18.4996 14.74V14.75Z" fill="#D1D1D1"></path>
                      </svg>
                    )
                  }
                  {
                    item.id === 'tiktok' && (
                      <svg width="31" height="30" viewBox="0 0 31 30" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0701 8H10.9601C9.65008 8 8.58008 9.07 8.58008 10.38V19.49C8.58008 20.8 9.65008 21.87 10.9601 21.87H20.0701C21.3801 21.87 22.4501 20.8 22.4501 19.49V10.38C22.4501 9.07 21.3801 8 20.0701 8ZM21.8301 10.38V19.49C21.8301 20.46 21.0401 21.24 20.0801 21.24H10.9701C10.0001 21.24 9.22008 20.45 9.22008 19.49V10.38C9.22008 9.41 10.0101 8.63 10.9701 8.63H20.0801C21.0501 8.63 21.8301 9.42 21.8301 10.38Z" fill="#D1D1D1"></path>
                        <path d="M14.7299 18.36C13.5899 18.36 12.6699 17.43 12.6699 16.3C12.6699 15.17 13.5999 14.24 14.7299 14.24C14.7299 14.24 14.8199 14.24 14.8299 14.24C15.0299 14.25 15.1899 14.42 15.1799 14.62C15.1699 14.82 15.0199 14.97 14.8199 14.96C13.9999 14.96 13.3999 15.56 13.3999 16.3C13.3999 17.04 13.9999 17.65 14.7499 17.65C15.4999 17.65 16.0999 17.05 16.0999 16.3V11.11C16.0999 10.95 16.1999 10.81 16.3599 10.77C16.5199 10.72 16.6799 10.78 16.7599 10.92C16.9899 11.27 17.3599 11.47 17.8199 11.43C18.0099 11.41 18.1899 11.56 18.2099 11.75C18.2299 11.95 18.0799 12.12 17.8899 12.14C17.5099 12.18 17.1399 12.09 16.8199 11.92V16.3C16.8199 17.44 15.8899 18.36 14.7599 18.36H14.7299Z" fill="#D1D1D1"></path>
                      </svg>
                    )
                  }
                  
                  </a>
                  {
                    (item.id !== 'facebook' && item.id !== 'pinterest' && item.id !== 'instagram' && item.id !== 'youtube' && item.id !== 'tiktok') && (
                      <a href={item.path}>{item.label}</a>
                    )
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Columna de Formulario de Newsletter */}
        <div className={`${styles.footerColumn} ${styles.newsletterColumn}`}>
          <h3>Suscríbete a nuestro Newsletter</h3>
          <p>Regístrate para sección 10% de descuento en tu primera orden y ofertas exclusivas a lo largo del año.</p>
          <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
            <div className={styles.genderOptions}>
              <Checkbox
                id="mujer-newsletter"
                label="Mujer"
                name="gender"
                value="mujer"
                checked={gender === 'mujer'}
                onChange={(e) => setGender(e.target.value)}
              />
              <Checkbox
                id="hombre-newsletter"
                label="Hombre"
                name="gender"
                value="hombre"
                checked={gender === 'hombre'}
                onChange={(e) => setGender(e.target.value)}
              />
              <Checkbox
                id="ninos-newsletter"
                label="Niños"
                name="gender"
                value="niños"
                checked={gender === 'niños'}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <div className={styles.termsCheckboxContainer}>
              <Checkbox
                id="accept-terms"
                label={
                  <>
                    Al enviar Autorizo el tratamiento de datos personales. Nuestra Política
                    de tratamiento de datos cambio disponible <a href="https://co.malvaonline.com/pages/politicas-de-privacidad" target="_blank" rel="noopener noreferrer" className={styles.link}>AQUÍ</a>.
                  </>
                }
                checked={acceptTerms}
                onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (e.target.checked) setTermsError(false); // Quita el error si se marca
                }}
                required // Aunque el HTML required no funciona bien en checkboxes complejos, lo mantenemos por semántica.
              />
              {termsError && <span className={styles.errorMessage}>Debes aceptar los términos y condiciones.</span>}
            </div>
            <Button type="submit" label="Suscribirme" />
          </form>
        </div>
      </div>

      {/* Fila de Copyright e información legal */}
      <div className={styles.footerBottom}>
        <p>&copy; 2024 MALVA ONLINE</p>
        <div className={styles.legalLinks}>
          <a href="https://co.malvaonline.com/pages/politicas-de-privacidad">Política de tratamiento de datos</a>
          <a href="https://co.malvaonline.com/pages/terminos-y-condiciones">Términos y condiciones</a>
          <a href="https://sedeelectronica.sic.gov.co/">SIC</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;