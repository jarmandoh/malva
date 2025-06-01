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
            <ul className={`${styles.columnList} ${activeAccordion === column.id ? styles.open : ''}`}>
              {column.items.map((item) => (
                <li key={item.id}>
                  <a href={item.path}>{item.label}</a>
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