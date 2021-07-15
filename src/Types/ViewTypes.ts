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
  moduleType: 'VTextBox';
  attributes: VTextBoxAttributes;
}

export interface IVImageWithPadding {
  moduleType: 'VImageWithPadding';
  attributes: VImageWithPaddingAttributes;
  heightMultiplier: number;
}

export interface IVImageCarousel {
  moduleType: 'VImageCarousel';
  attributes: VImageCarouselAttributes;
  heightMultiplier: number;
}
