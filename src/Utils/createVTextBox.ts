import {
  ViewTypes,
  VImageCarouselAttributes,
  VImageWithPaddingAttributes,
  VTextBoxAttributes,
} from '../Types/ViewTypes';

export const createVTextBox = (data: VTextBoxAttributes): ViewTypes => ({
  moduleType: 'VTextBox',
  attributes: data,
});

export const createVImageWithPadding = (
  data: VImageWithPaddingAttributes,
): ViewTypes => ({
  moduleType: 'VImageWithPadding',
  attributes: data,
  heightMultiplier: 1.25,
});

export const createVImageCarousel = (
  data: VImageCarouselAttributes,
): ViewTypes => ({
  moduleType: 'VImageCarousel',
  attributes: data,
  heightMultiplier: 1.25,
});
