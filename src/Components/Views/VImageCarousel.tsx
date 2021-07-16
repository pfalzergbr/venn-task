import { Carousel } from 'react-responsive-carousel';
import { IVImageCarousel } from '../../Types/ViewTypes';
import { v4 as uuidv4 } from 'uuid';
import Card from '../UI/Card/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface VImageCarouselProps {
  viewData: IVImageCarousel;
  index: number;
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
    <Card id={viewData.id!} isMarked={viewData.isMarked} style={divStyle}>
      <Carousel showThumbs={false}>
        {images.map(image => (
          <div key={uuidv4()} style={imageContainerStyle}>
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
