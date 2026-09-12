import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeAtom,
  BadgeType,
  BadgeTypeText,
  ButtonAtom,
  ButtonType,
  ContainerAtom,
  DotIndicatorAtom,
  IconAtom,
  ImageAtom,
  ImageObjectFit,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './atoms.html',
  imports: [
    BadgeAtom,
    ButtonAtom,
    IconAtom,
    ContainerAtom,
    ImageAtom,
    DotIndicatorAtom,
    CommonModule,
  ],
})
export class Atoms {
  badges: { type: BadgeType, typeText: BadgeTypeText}[] = [
    { type: 'primary', typeText: 'text-white' },
    { type: 'secondary', typeText: 'text-white' },
    { type: 'success', typeText: 'text-white' },
    { type: 'danger', typeText: 'text-white' },
    { type: 'warning', typeText: 'text-dark' },
    { type: 'info', typeText: 'text-dark' },
    { type: 'light', typeText: 'text-dark' },
    { type: 'dark', typeText: 'text-white' },
  ];

  buttons: { type: ButtonType, idButton: string}[] = [
    { type: 'primary', idButton: 'idButttonPrimary' },
    { type: 'secondary', idButton: 'idButttonSecondary' },
    { type: 'success', idButton: 'idButttonSuccess' },
    { type: 'danger', idButton: 'idButttonDanger' },
    { type: 'warning', idButton: 'idButttonWarning' },
    { type: 'info', idButton: 'idButttonInfo' },
    { type: 'light', idButton: 'idButttonLight' },
    { type: 'dark', idButton: 'idButttonDark' },
  ];

  icons: { name: string, size: number }[] = [
    { name: 'bootstrap', size: 1 },
    { name: 'apple', size: 2 },
    { name: 'bell', size: 3 },
    { name: 'android', size: 4 },
    { name: 'ban', size: 5 },
  ];

  images: { src: string; alt: string; aspectRatio: string; objectFit: ImageObjectFit }[] = [
    {
      src: 'https://picsum.photos/seed/angular/400/300',
      alt: 'Imagen de Angular',
      aspectRatio: '4/3',
      objectFit: 'cover',
    },
    {
      src: 'https://picsum.photos/seed/design/400/300',
      alt: 'Imagen de Diseño',
      aspectRatio: '1/1',
      objectFit: 'contain',
    },
    {
      src: 'https://picsum.photos/seed/atomic/600/300',
      alt: 'Imagen Atomic Design',
      aspectRatio: '16/9',
      objectFit: 'cover',
    },
    {
      src: 'https://url-invalida.xyz/imagen-rota.png',
      alt: 'Imagen con fallback',
      aspectRatio: '4/3',
      objectFit: 'fill',
    },
  ];

  dots: { index: number; active: boolean }[] = [
    { index: 0, active: false },
    { index: 1, active: true },
    { index: 2, active: false },
    { index: 3, active: false },
  ];

  activeDotIndex: number = 1;

  onClick(idButton: string): void {
    alert(`Click en el Boton ${idButton}`);
  }

  onDotClick(index: number): void {
    this.activeDotIndex = index;
    this.dots = this.dots.map(d => ({ ...d, active: d.index === index }));
  }

}