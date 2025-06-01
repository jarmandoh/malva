// Tipos para el Menú
export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  subItems?: MenuItem[];
  items?: MenuItem[]; // Para sub-sub-menús
}

// Tipos para el Footer
export interface FooterColumn {
  id: string;
  title: string;
  items: FooterLink[];
}

export interface FooterLink {
  id: string;
  label: string;
  path: string;
}

// Tipos para Productos
export interface Product {
  id: string;
  image: string;
  brand: string;
  title: string;
  price: number;
  tags?: string[];
}

// Tipos para el Carrito
export interface CartItem extends Product {
  quantity: number;
}