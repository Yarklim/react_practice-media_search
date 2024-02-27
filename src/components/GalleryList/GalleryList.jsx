import { useEffect, useRef, useState } from 'react';
import { fetchMedia } from '../../services/pixabayApi';
import GalleryItem from '../GalleryItem/GalleryItem';

import s from './GalleryList.module.scss';
import Button from '../ui/Button/Button';
import Spinner from '../Spinner/Spinner';

const GalleryList = (props) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    setQuery(props.query);
    setPage(1);
    setPerPage(12);
  }, [props.query]);

  useEffect(() => {
    if (query) {
      async function getData() {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchMedia(query, page);

          if (data.totalHits === 0) {
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

  return (
    <>
      {error ? (
        <h1>No images</h1>
      ) : (
        <>
          {!query ? (
            <p>Enter search value</p>
          ) : (
            <ul className={s.imageGallery}>
              <GalleryItem
                images={images}
                perPage={perPage}
                itemRef={itemRef}
              />
            </ul>
          )}
          {isLoading && <Spinner />}
          {totalHits > perPage && totalPage > page && (
            <Button type={'button'} method={onChangePage}>
              Load More
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default GalleryList;
