import { IVImageWithPadding } from '../../Types/ViewTypes';
import Card from '../UI/Card/Card';

export interface VImageWithPaddingProps {
  viewData: IVImageWithPadding;
  index: number;
}

// View component, rendering image Views.
const VImageWithPadding: React.FC<VImageWithPaddingProps> = ({ viewData }) => {
  const BASE_HEIGHT = 350;

  const {
    padding,
    backgroundColor: { hex: backgroundHex },
    imageUrl,
  } = viewData.attributes;

  const imageStyle: React.CSSProperties = {
    background: backgroundHex,
    height: `${BASE_HEIGHT}px`,
    objectFit: 'scale-down',
  };

  return (
    <Card
      view={viewData}
      style={{
        background: backgroundHex,
        padding: `${padding}px`,
      }}
    >
      <img
        style={imageStyle}
        src={imageUrl}
        alt="I wish the API was providing this..."
      />
    </Card>
  );
};

export default VImageWithPadding;
