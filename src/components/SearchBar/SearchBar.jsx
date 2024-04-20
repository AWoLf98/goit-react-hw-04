import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";


const SearchBar = () => {
    function handleSubmit(evt) { 
        evt.preventDefault();
        const { searchBar } = evt.target.elements;
        if(!searchBar.value.trim()){
            toast.error('You must write some text!');
            return;
        }
    }
  return (
    <header className={css['search-form']}>
      <form onSubmit={handleSubmit}>
        <input className={css["search-bar"]} name="searchBar" type="text" autoComplete="off" autoFocus placeholder="Search images and photos" />
        <button className={css["search-btn"]} name="submitBtn" type="submit"><IoSearchOutline /></button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
