import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from '../SearchBar/SearchBar';

import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import GalleryList from '../GalleryList/GalleryList';

const App = () => {
  const [query, setQuery] = useState('');

  const changeQuery = (query) => {
    setQuery(query);
  };
  return (
    <div className={s.appWrapper}>
      <SearchBar onSubmit={changeQuery} />
      <GalleryList query={query} />
      <ToastContainer />
    </div>
  );
};

export default App;
