import { CardCarouselConfig, CarouselCardItem } from '../core/interfaces/core.interface';

export const MOCK_CAROUSEL_ITEMS: CarouselCardItem[] = [
  {
    id: 'card-1',
    title: 'Angular',
    text: 'Framework de desarrollo frontend de Google.',
    image: {
      src: 'https://picsum.photos/seed/angular/400/250',
      alt: 'Angular Framework',
      aspectRatio: '16/9',
      objectFit: 'cover',
    },
    badge: { text: 'Frontend', type: 'danger', typeText: 'text-white' },
  },
  {
    id: 'card-2',
    title: 'Bootstrap 5',
    text: 'Framework CSS para interfaces responsivas.',
    image: {
      src: 'https://picsum.photos/seed/bootstrap/400/250',
      alt: 'Bootstrap 5',
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
];

export const MOCK_CAROUSEL_ITEMS_PER_VIEW = 3;

export const MOCK_CAROUSEL_CONFIG: CardCarouselConfig = {
  items: MOCK_CAROUSEL_ITEMS,
  itemsPerView: MOCK_CAROUSEL_ITEMS_PER_VIEW,
  loop: true,
  scrollMode: 'card',
};
