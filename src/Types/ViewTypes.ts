export type ModuleType = 'VTextBox' | 'VImageWithPadding' | 'VImageCarousel';

export type TextAlignmentType = 'left' | 'right' | 'center';
export type BackgroundColorType = {
  hex: string;
};

export type FontcolorType = {
  hex: string;
};

export type LinkType = {
  payload: string;
  type: string;
};
export type ViewTypes = IVTextBox | IVImageWithPadding | IVImageCarousel;

export interface IView {
  id?: string;
  moduleType: ModuleType;
  isMarked?: boolean;
  // Added field for the reducer, to be able to mark multiple fields for deletion.
}

export interface VTextBoxAttributes {
  padding: number;
  backgroundColor: BackgroundColorType;
  bodyText: string;
  textAlignment: TextAlignmentType;
  fontSize: number;
  capitalised: boolean;
  fontColor: FontcolorType;
}

export interface VImageWithPaddingAttributes {
  padding: number;
  backgroundColor: BackgroundColorType;
  imageUrl: string;
  link: LinkType;
}

export interface VImageCarouselAttributes {
  padding: number;
  images: string[];
}

export interface IVTextBox extends IView {
  id?: string;
  moduleType: 'VTextBox';
  attributes: VTextBoxAttributes;
  isMarked?: boolean;
}

export interface IVImageWithPadding {
  id?: string;
  moduleType: 'VImageWithPadding';
  attributes: VImageWithPaddingAttributes;
  heightMultiplier: number;
  isMarked?: boolean;
}

export interface IVImageCarousel {
  id?: string;
  moduleType: 'VImageCarousel';
  attributes: VImageCarouselAttributes;
  heightMultiplier: number;
  isMarked?: boolean;
}
