import styles from './styles/Modal.module.css';

export interface CarouselThumbnailListProps {
  imageUrls: string[];
  removeImageUrl: (index: number) => void;
}

const CarouselThumbnailList: React.FC<CarouselThumbnailListProps> = ({
  imageUrls,
  removeImageUrl,
}) => {
  return (
    <ul className={styles.imageList}>
      {imageUrls.map((imageUrl, index) => (
        <li key={index}>
          <div className={styles.imageThumbnailContainer}>
            <img
              className={styles.imageThumbnail}
              src={imageUrl}
              alt={imageUrl}
            />
            <button
              className={styles.imageThumbnailCloseButton}
              onClick={() => removeImageUrl(index)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CarouselThumbnailList;
