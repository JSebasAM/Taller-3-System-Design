import { Component, Input } from '@angular/core';
import { ImageObjectFit } from '../../../core/interfaces/core.interface';

/**
 * Átomo de imagen del Design System.
 *
 * @description
 * Renderiza una imagen responsiva con soporte de proporciones (`aspect-ratio`),
 * modo de ajuste (`object-fit`) y un fallback automático cuando la URL falla.
 *
 * @remarks
 * Este componente sigue el enfoque de diseño atómico como un **átomo**.
 * Encapsula el comportamiento de la etiqueta `<img>` agregando
 * control de proporciones y manejo de errores de carga.
 *
 * @example
 * ```html
 * <dsb-image-atom
 *   src="https://example.com/photo.jpg"
 *   alt="Foto de ejemplo"
 *   aspectRatio="16/9"
 *   objectFit="cover">
 * </dsb-image-atom>
 * ```
 */
@Component({
  selector: 'dsb-image-atom',
  template: `
    <div
      class="dsb-image-wrapper"
      [style.aspectRatio]="aspectRatio">
      <img
        [src]="currentSrc"
        [alt]="alt"
        [style.objectFit]="objectFit"
        (error)="onError()"
        class="dsb-image" />
    </div>`,
  styles: [`
    .dsb-image-wrapper {
      display: block;
      width: 100%;
      overflow: hidden;
    }
    .dsb-image {
      width: 100%;
      height: 100%;
      display: block;
    }
  `],
})
export class ImageAtom {
  /**
   * URL de la imagen a mostrar.
   *
   * @remarks
   * Si la URL falla al cargar, se mostrará automáticamente
   * una imagen de reemplazo (fallback).
   *
   * @defaultValue ''
   */
  @Input() src: string = '';

  /**
   * Texto alternativo de la imagen para accesibilidad.
   *
   * @remarks
   * Es utilizado por lectores de pantalla y se muestra
   * cuando la imagen no puede cargarse.
   *
   * @defaultValue ''
   */
  @Input() alt: string = '';

  /**
   * Proporción de aspecto de la imagen.
   *
   * @remarks
   * Acepta cualquier valor válido para la propiedad CSS `aspect-ratio`.
   *
   * @example
   * - `'16/9'` — Panorámico
   * - `'1/1'` — Cuadrado
   * - `'4/3'` — Estándar
   *
   * @defaultValue '16/9'
   */
  @Input() aspectRatio: string = '16/9';

  /**
   * Modo de ajuste de la imagen dentro del contenedor.
   *
   * @remarks
   * Corresponde a la propiedad CSS `object-fit`.
   *
   * @defaultValue 'cover'
   */
  @Input() objectFit: ImageObjectFit = 'cover';

  /**
   * URL de imagen de respaldo (fallback).
   *
   * @remarks
   * Se muestra automáticamente cuando la imagen original
   * no puede cargarse. Utiliza un placeholder genérico.
   */
  readonly fallbackSrc: string =
    'https://placehold.co/400x300?text=Imagen+no+disponible';

  /**
   * URL actualmente siendo renderizada.
   *
   * @remarks
   * Inicialmente igual a `src`. Cambia al `fallbackSrc`
   * si ocurre un error de carga.
   */
  currentSrc: string = '';

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.currentSrc = this.src;
  }

  /**
   * Maneja el evento de error de carga de imagen.
   *
   * @description
   * Cuando la imagen no puede cargarse, reemplaza `currentSrc`
   * con la URL de fallback para evitar una imagen rota.
   *
   * @returns {void}
   */
  onError(): void {
    this.currentSrc = this.fallbackSrc;
  }
}
