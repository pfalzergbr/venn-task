import styles from './styles/Modal.module.css';

export interface CarouselThumbnailListProps {
  imageUrls: string[];
}

const CarouselThumbnailList: React.FC<CarouselThumbnailListProps> = ({
  imageUrls,
}) => {
  return (
    <ul className={styles.imageList}>
      {imageUrls.map((imageUrl, index) => (
        <li key={index}>
          <div>
            <img
              className={styles.imageThumbnail}
              src={imageUrl}
              alt={imageUrl}
            />
            {/* <button>X</button> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CarouselThumbnailList;
