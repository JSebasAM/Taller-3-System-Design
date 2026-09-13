import { Component } from '@angular/core';
import {
  ContainerAtom,
  NavbarConfig,
  NavbarOrganism,
  CardCarouselConfig,
  CardCarouselOrganism,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.html',
  imports: [NavbarOrganism, ContainerAtom, CardCarouselOrganism],
})
export class Organisms {
  navbarConfig: NavbarConfig = {
    title: 'Taller Sistema de Diseño',
    iconConfig: {
      icon: 'bootstrap',
      size: 2
    },
    navLinks: [
      { text: 'Átomos', url: '/atoms' },
      { text: 'Moléculas', url: '/molecules' },
      { text: 'Organismos', url: '/organisms' },
    ],
  };

  carouselConfig: CardCarouselConfig = {
    itemsPerView: 3,
    loop: true,
    scrollMode: 'card',
    items: [
      {
        id: 'card-1',
        title: 'Angular',
        text: 'Framework de desarrollo frontend de Google.',
        image: {
          src: 'https://picsum.photos/seed/angular/400/250',
          alt: 'Angular',
          aspectRatio: '16/9',
          objectFit: 'cover',
        },
        badge: { text: 'Frontend', type: 'danger', typeText: 'text-white' },
      },
      {
        id: 'card-2',
        title: 'Bootstrap 5',
        text: 'Framework CSS para diseño responsivo.',
        image: {
          src: 'https://picsum.photos/seed/bootstrap/400/250',
          alt: 'Bootstrap',
          aspectRatio: '16/9',
          objectFit: 'cover',
        },
        badge: { text: 'CSS', type: 'primary', typeText: 'text-white' },
      },
      {
        id: 'card-3',
        title: 'TypeScript',
        text: 'Superset de JavaScript con tipado estático.',
        image: {
          src: 'https://picsum.photos/seed/typescript/400/250',
          alt: 'TypeScript',
          aspectRatio: '16/9',
          objectFit: 'cover',
        },
        badge: { text: 'Lenguaje', type: 'info', typeText: 'text-dark' },
      },
      {
        id: 'card-4',
        title: 'Atomic Design',
        text: 'Metodología para sistemas de diseño escalables.',
        image: {
          src: 'https://picsum.photos/seed/atomic/400/250',
          alt: 'Atomic Design',
          aspectRatio: '16/9',
          objectFit: 'cover',
        },
        badge: { text: 'Metodología', type: 'success', typeText: 'text-white' },
      },
      {
        id: 'card-5',
        title: 'RxJS',
        text: 'Programación reactiva con Observables.',
        image: {
          src: 'https://picsum.photos/seed/rxjs/400/250',
          alt: 'RxJS',
          aspectRatio: '16/9',
          objectFit: 'cover',
        },
        badge: { text: 'Librería', type: 'warning', typeText: 'text-dark' },
      },
    ],
  };

  onItemSelected(itemId: string): void {
    alert(`Card seleccionada: ${itemId}`);
  }
    
}
