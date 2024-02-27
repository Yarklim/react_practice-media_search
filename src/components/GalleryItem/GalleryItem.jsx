import s from './GalleryItem.module.scss';

const GalleryItem = ({ images, perPage, itemRef }) => {
  return (
    <>
      {images.map(({ webformatURL, tags }, idx, arr) => {
        return (
          <li
            className={s.itemWrapper}
            key={idx}
            ref={arr.length - perPage === idx ? itemRef : null}
          >
            <img className={s.itemImg} src={webformatURL} alt={tags} />
          </li>
        );
      })}
    </>
  );
};

export default GalleryItem;
