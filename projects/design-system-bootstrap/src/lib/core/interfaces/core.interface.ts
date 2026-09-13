/**
 * Temas visuales disponibles.
 */
export type Themes = 
    | 'primary'
    | 'secondary' 
    | 'success' 
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

/**
 * Modos de ajuste de imagen CSS para el ImageAtom.
 *
 * @remarks
 * Corresponde a la propiedad CSS `object-fit`.
 */
export type ImageObjectFit = 'cover' | 'contain' | 'fill';

/** Tipo de tema para badges */
export type BadgeType = Themes;

/** Clases de texto disponibles para badges */
export type BadgeTypeText = 'text-white' | 'text-dark';

/** Tipo de tema para botones */
export type ButtonType = Themes;

/**
 * Configuración de un botón dentro de un grupo de botones.
 */
export interface ButtonGroupData {
  /** Identificador único del botón */
  idButton: string;

  /** Tipo visual del botón */
  type: ButtonType;

  /** Texto visible del botón */
  text: string;
}

/**
 * Representa un enlace de navegación.
 */
export interface NavLink {
    /** Texto visible del enlace */
    text: string;
    /** Url asociada al enlace */
    url: string;
}

/**
 * Configuración de la barra de navegación.
 */
export interface NavbarConfig {
  /** Título principal del Navbar */
  title: string;

  /** Configuración del icono del Navbar */
  iconConfig: NavbarIconConfig;

  /** Lista de enlaces de navegación */
  navLinks: NavLink[];
}

/**
 * Configuración del icono de la barra de navegación.
 */
export interface NavbarIconConfig {
    /** Nombre del icono (sin el prefijo `bi-`) */
    icon: string;

    /** Tamaño del icono en unidades `rem` */
    size: number;
}

/**
 * Configuración de la imagen para AppCardMolecule.
 */
export interface CardImageData {
  /** URL de la imagen */
  src: string;

  /** Texto alternativo para accesibilidad */
  alt?: string;

  /** Relación de aspecto CSS (ej: '16/9', '1/1') */
  aspectRatio?: string;

  /** Modo de ajuste object-fit */
  objectFit?: ImageObjectFit;
}

/**
 * Configuración del Badge para AppCardMolecule.
 */
export interface CardBadgeData {
  /** Texto a mostrar dentro del badge */
  text: string;

  /** Tipo de variante de color para el badge */
  type?: BadgeType;

  /** Color del texto del badge ('text-white' | 'text-dark') */
  typeText?: BadgeTypeText;
}

/**
 * Configuración para el componente CarouselControlMolecule.
 */
export interface CarouselControlConfig {
  /** Número total de diapositivas o elementos en el carrusel */
  total: number;

  /** Índice de la diapositiva actualmente activa (0-indexado) */
  current: number;

  /** Determina si la navegación es cíclica (wrap-around) */
  loop?: boolean;
}

export interface CarouselCardItem {
  id: string;
  title: string;
  text: string;
  image: string | CardImageData;
  badge?: CardBadgeData;
}

/** Modo de desplazamiento del carrusel */
export type CarouselScrollMode = 'page' | 'card';

export interface CardCarouselConfig {
  items: CarouselCardItem[];
  itemsPerView?: number;
  loop?: boolean;
  maxCardWidth?: string;
  scrollMode?: CarouselScrollMode;
}