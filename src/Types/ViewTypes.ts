export type ModuleType = 'VTextBox' | 'VImageWithPadding' | 'VImageCarousel';

export type TextAlignmentType = 'left' | 'right' | 'center' | 'justify';
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

export interface IView {
  moduleType: string;
}

export interface IVTextBox extends IView {
  moduleType: 'VTextBox';
  attributes: {
    padding: number;
    backgroundColor: BackgroundColorType;
    bodyText: string;
    textAlignment: TextAlignmentType;
    fontSize: number;
    capitalised: boolean;
    fontColor: FontcolorType;
  };
}

export interface IVImageWithPadding {
  modulType: 'VImageWithPadding';
  attributes: {
    padding: number;
    backgroundColor: BackgroundColorType;
    imageUrl: string;
    link: LinkType;
  };
  heightMultiplier: number;
}

export interface IVImageCarousel {
  moduleType: 'VImageCarousel';
  attributes: {
    padding: number;
    images: string[];
  };
  heightMultiplier: number;
}
