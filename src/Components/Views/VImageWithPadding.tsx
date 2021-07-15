import { IVImageWithPadding } from '../../Types/ViewTypes';

export interface VImageWithPaddingProps {
  viewData: IVImageWithPadding;
}

const VImageWithPadding: React.FC<VImageWithPaddingProps> = ({ viewData }) => {
  const {
    padding,
    backgroundColor: { hex: backgroundHex },
    imageUrl,
  } = viewData.attributes;

  const baseHeight = 300;

  const imageStyle: React.CSSProperties = {
    background: backgroundHex,
    padding: padding,
    height: `${baseHeight * viewData.heightMultiplier}px`,
  };

  return (
    <div>
      <img
        style={imageStyle}
        src={imageUrl}
        alt="I wish the API was providing this..."
      />
    </div>
  );
};

export default VImageWithPadding;
