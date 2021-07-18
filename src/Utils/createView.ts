import { v4 as uuidv4 } from 'uuid';
import {
  ViewTypes,
  VImageCarouselAttributes,
  VImageWithPaddingAttributes,
  VTextBoxAttributes,
} from '../Types/ViewTypes';

export const createVTextBox = (
  data: VTextBoxAttributes,
  id?: string,
): ViewTypes => ({
  id: id || uuidv4(),
  moduleType: 'VTextBox',
  attributes: data,
});

export const createVImageWithPadding = (
  data: VImageWithPaddingAttributes,
  heightMultiplier: number,
  id?: string,
): ViewTypes => ({
  id: id || uuidv4(),
  moduleType: 'VImageWithPadding',
  attributes: data,
  heightMultiplier,
});

export const createVImageCarousel = (
  data: VImageCarouselAttributes,
  id?: string,
): ViewTypes => ({
  id: id || uuidv4(),
  moduleType: 'VImageCarousel',
  attributes: data,
  heightMultiplier: 1.25,
});
