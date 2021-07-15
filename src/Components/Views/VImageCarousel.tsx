import { Carousel } from 'react-responsive-carousel';
import { IVImageCarousel } from '../../Types/ViewTypes';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '../UI/Card';

export interface VImageCarouselProps {
  viewData: IVImageCarousel;
}

// View component, rendering a carousel.
const VImageCarousel: React.FC<VImageCarouselProps> = ({ viewData }) => {
  const BASE_HEIGHT = 200;
  const { padding, images } = viewData.attributes;

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
  };

  //Temporary divStyle before the container is built
  const divStyle: React.CSSProperties = {
    padding,
    textAlign: 'center',
    margin: '0 auto',
  };

  // TODO - figure out heights
  const imageContainerStyle: React.CSSProperties = {
    height: `${BASE_HEIGHT * viewData.heightMultiplier}px'`,
  };

  return (
    <Card style={divStyle}>
      <Carousel showThumbs={false}>
        {images.map(image => (
          <div style={imageContainerStyle}>
            <img
              style={imageStyle}
              src={image}
              alt="Would be even cooler. :)"
            />
          </div>
        ))}
      </Carousel>
    </Card>
  );
};

export default VImageCarousel;
