import { useEffect, useRef, useState } from 'react';
import { fetchMedia } from '../../services/pixabayApi';
import GalleryItem from '../GalleryItem/GalleryItem';
import Button from '../ui/Button/Button';
import Spinner from '../Spinner/Spinner';

import s from './GalleryList.module.scss';

const GalleryList = (props) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemRef = useRef(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setPerPage(12);
    setQuery(props.query);
  }, [props.query]);

  useEffect(() => {
    if (query) {
      async function getData() {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchMedia(query, page);

          if (data.hits.length === 0) {
            setPage(1);
            window.scrollTo(0, 0);
            throw new Error(`Sorry, no images for ${query}`);
          }

          setImages((prev) =>
            page === 1 ? data.hits : [...prev, ...data.hits]
          );
          setTotalHits(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      getData();
    }
  }, [query, page]);

  const onChangePage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(itemRef.current);
    itemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [images]);

  const totalPage = Math.ceil(totalHits / perPage);

  if (!query) {
    return null;
  }

  return (
    <>
      {error ? (
        <h1>No images founded</h1>
      ) : (
        <div className={s.galleryList}>
          <ul className={s.imageGallery}>
            <GalleryItem images={images} perPage={perPage} itemRef={itemRef} />
          </ul>

          {isLoading && <Spinner />}

          {totalHits > perPage && totalPage > page ? (
            <Button
              className={s.loadMoreBtn}
              type={'button'}
              method={onChangePage}
            >
              <span>Load More</span>
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default GalleryList;
