import { Carousel } from 'react-responsive-carousel';
import { IVImageCarousel } from '../../Types/ViewTypes';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface VImageCarouselProps {
  viewData: IVImageCarousel;
}

// View component, rendering a carousel.
const VImageCarousel: React.FC<VImageCarouselProps> = ({ viewData }) => {
  const BASE_HEIGHT = 500;
  const { padding, images } = viewData.attributes;

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
  };

  //Temporary divStyle before the container is built
  const divStyle: React.CSSProperties = {
    padding,
    width: '200px',
    textAlign: 'center',
    margin: '0 auto',
  };

  // TODO - figure out hights
  const imageContainerStyle: React.CSSProperties = {
    height: `${BASE_HEIGHT * viewData.heightMultiplier}px'`,
  };

  return (
    <div style={divStyle}>
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
    </div>
  );
};

export default VImageCarousel;
