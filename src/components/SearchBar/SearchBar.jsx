import { toast } from 'react-toastify';
import Input from '../ui/Input';

import IconSearch from '../ui/IconSearch/IconSearch';
import s from './SearchBar.module.scss';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.currentTarget.elements.search.value;

    if (query.trim() === '') {
      toast.error('Enter search value', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    onSubmit(query.trim());

    e.currentTarget.reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="search"
        placeholder="Search photos & videos"
        // autoComplete="off"
        autoFocus
      />
      <button type="submit">
        <IconSearch className={s.icon} />
      </button>
    </form>
  );
};

export default SearchBar;
