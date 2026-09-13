import { BadgeType, BadgeTypeText, CardBadgeData, CardImageData } from '../core/interfaces/core.interface';

export const MOCK_CARD_TITLE = 'Título de Prueba';
export const MOCK_CARD_TEXT = 'Esta es una descripción de ejemplo para la molécula app-card.';
export const MOCK_CARD_IMAGE_SRC = 'https://picsum.photos/400/300';
export const MOCK_CARD_IMAGE_ALT = 'Imagen descriptiva';
export const MOCK_CARD_IMAGE_ASPECT_RATIO = '16/9';
export const MOCK_CARD_IMAGE_DATA: CardImageData = {
  src: MOCK_CARD_IMAGE_SRC,
  alt: MOCK_CARD_IMAGE_ALT,
  aspectRatio: MOCK_CARD_IMAGE_ASPECT_RATIO,
  objectFit: 'cover',
};

export const MOCK_CARD_BADGE_TEXT = 'Etiqueta';
export const MOCK_CARD_BADGE_TYPE: BadgeType = 'primary';
export const MOCK_CARD_BADGE_TYPE_TEXT: BadgeTypeText = 'text-white';
export const MOCK_CARD_BADGE_DATA: CardBadgeData = {
  text: MOCK_CARD_BADGE_TEXT,
  type: 'success',
  typeText: 'text-white',
};
