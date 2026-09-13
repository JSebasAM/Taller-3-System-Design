import { Component, Input } from '@angular/core';
import {
  BadgeType,
  BadgeTypeText,
  CardBadgeData,
  CardImageData,
  ImageObjectFit,
} from '../../../core/interfaces/core.interface';
import { BadgeAtom } from '../../atoms/badge/badge.atom';
import { ImageAtom } from '../../atoms/image/image.atom';

/**
 * Componente Tarjeta (App Card) del Design System.
 *
 * @description
 * Componente tipo **Molécula** según Atomic Design.
 * Integra y coordina el átomo de imagen (`ImageAtom`) y el átomo de insignia (`BadgeAtom`)
 * junto a un título y texto descriptivo para estructurar bloques de contenido visual.
 *
 * @remarks
 * Permite recibir las propiedades de la imagen mediante la propiedad `image` (URL o configuración completa)
 * o proyectar directamente un `<dsb-image-atom>` utilizando content projection.
 *
 * @example
 * ```html
 * <dsb-app-card-molecule
 *   title="Título de la tarjeta"
 *   text="Descripción de la tarjeta."
 *   image="https://picsum.photos/400/250"
 *   badgeText="Nuevo"
 *   badgeType="primary">
 * </dsb-app-card-molecule>
 * ```
 */
@Component({
  selector: 'dsb-app-card-molecule',
  imports: [ImageAtom, BadgeAtom],
  templateUrl: './app-card.molecule.html',
  styleUrl: './app-card.molecule.scss',
})
export class AppCardMolecule {
  /**
   * Título principal de la tarjeta.
   *
   * @defaultValue ''
   */
  @Input() title: string = '';

  /**
   * Texto o descripción secundaria de la tarjeta.
   *
   * @defaultValue ''
   */
  @Input() text: string = '';

  /**
   * Imagen de la tarjeta. Puede ser una URL directa (`string`) o un objeto de configuración (`CardImageData`).
   *
   * @defaultValue ''
   */
  @Input() image: string | CardImageData = '';

  /**
   * Texto alternativo de la imagen para accesibilidad.
   * Si no se provee, se usará por defecto el `title` de la tarjeta.
   *
   * @defaultValue ''
   */
  @Input() imageAlt: string = '';

  /**
   * Proporción de aspecto (`aspect-ratio`) de la imagen.
   *
   * @defaultValue '16/9'
   */
  @Input() imageAspectRatio: string = '16/9';

  /**
   * Modo de ajuste CSS (`object-fit`) de la imagen.
   *
   * @defaultValue 'cover'
   */
  @Input() imageObjectFit: ImageObjectFit = 'cover';

  /**
   * Texto que se mostrará dentro del badge.
   *
   * @defaultValue ''
   */
  @Input() badgeText: string = '';

  /**
   * Tipo de variante de color del badge.
   *
   * @defaultValue 'primary'
   */
  @Input() badgeType: BadgeType = 'primary';

  /**
   * Clase de color de texto del badge.
   *
   * @defaultValue 'text-white'
   */
  @Input() badgeTypeText: BadgeTypeText = 'text-white';

  /**
   * Objeto de configuración opcional para el badge.
   */
  @Input() badge?: CardBadgeData;

  /**
   * Retorna la URL de la imagen a renderizar.
   */
  get currentImageSrc(): string {
    if (typeof this.image === 'object' && this.image !== null) {
      return this.image.src;
    }
    return this.image;
  }

  /**
   * Retorna el texto alternativo para la imagen.
   */
  get currentImageAlt(): string {
    if (typeof this.image === 'object' && this.image !== null && this.image.alt) {
      return this.image.alt;
    }
    return this.imageAlt || this.title;
  }

  /**
   * Retorna la relación de aspecto calculada para la imagen.
   */
  get currentAspectRatio(): string {
    if (typeof this.image === 'object' && this.image !== null && this.image.aspectRatio) {
      return this.image.aspectRatio;
    }
    return this.imageAspectRatio;
  }

  /**
   * Retorna el modo de ajuste object-fit para la imagen.
   */
  get currentObjectFit(): ImageObjectFit {
    if (typeof this.image === 'object' && this.image !== null && this.image.objectFit) {
      return this.image.objectFit;
    }
    return this.imageObjectFit;
  }

  /**
   * Retorna el texto del badge a mostrar.
   */
  get currentBadgeText(): string {
    return this.badge?.text || this.badgeText;
  }

  /**
   * Retorna el tema de color del badge.
   */
  get currentBadgeType(): BadgeType {
    return this.badge?.type || this.badgeType;
  }

  /**
   * Retorna la clase de color de texto del badge.
   */
  get currentBadgeTypeText(): BadgeTypeText {
    return this.badge?.typeText || this.badgeTypeText;
  }
}

