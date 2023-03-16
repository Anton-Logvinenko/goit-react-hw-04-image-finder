import { toast } from 'react-hot-toast';
import css from './Searchbar.module.css';
import { VscSearch } from 'react-icons/vsc';
import { useState } from 'react';

// const { Component } = require('react');

function Searchbar({ onSearch }) {
  const [imgName, setImgName] = useState('');

  const handelChange = e => setImgName(e.currentTarget.value) ;

  const handelSubmit = e => {
    e.preventDefault();
    // проверка: если пусто, то вывести сообщение
    if (!imgName.trim()) {
      return toast.error('Внесите информацию в поле поиска');
    }
    onSearch(imgName);
    setImgName('');
  };

  return (
    <header className={css.searchFormHeader}>
      <form className={css.searchForm} onSubmit={handelSubmit}>
        <button type="submit" className={css.searchFormBtn}>
          <VscSearch size={32} />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={imgName}
          onChange={handelChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export { Searchbar };
