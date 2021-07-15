import { IVImageWithPadding } from '../../Types/ViewTypes';
import Card from '../UI/Card';

export interface VImageWithPaddingProps {
  viewData: IVImageWithPadding;
  index: number;
}

// View component, rendering image Views.
const VImageWithPadding: React.FC<VImageWithPaddingProps> = ({ viewData }) => {
  const BASE_HEIGHT = 200;

  const {
    padding,
    backgroundColor: { hex: backgroundHex },
    imageUrl,
  } = viewData.attributes;

  const imageStyle: React.CSSProperties = {
    background: backgroundHex,
    padding: padding,
    height: `${BASE_HEIGHT * viewData.heightMultiplier}px`,
  };

  return (
    <Card>
      <img
        style={imageStyle}
        src={imageUrl}
        alt="I wish the API was providing this..."
      />
    </Card>
  );
};

export default VImageWithPadding;
