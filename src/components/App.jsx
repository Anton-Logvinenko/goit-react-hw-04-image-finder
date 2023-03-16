import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoad } from './Button/Button';
import { Loader } from './Loader/Loader';

import { getImgApi } from '../services/imgAPI';
function App() {
  const [imgSearch, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState('');
  const [totalHits, setTotalHits] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [btnRender, setBtnRender] = useState(false);
  const per_page = 20;

  // при сабмите формы: обнулить data/ начать с page 1, записать imgName
  const handelSubmit = imgName => {
    setData([]);
    setPage(1);
    setSearch(imgName);
  };

  useEffect(() => {
    if (!imgSearch) {
      return;
    }
    // если спинер  true, то BtnRender false
    setLoading(true);
    setBtnRender(false);

    getImgApi(imgSearch, page)
      .then(dataImg => {
        if (dataImg.totalHits > 0) {
          setTotalHits(dataImg.totalHits);
          setData(prev => [...prev, ...dataImg.hits]);

          if (dataImg.totalHits > page * per_page) {
            setBtnRender(true);
          }
          return;
        } else {
          toast.error('Внесите корректную информацию в поле поиска');
          setBtnRender(false);
          return setData([]);
        }
      })
      .catch(error => setError({ error }))
      .finally(() => {
        setLoading(false);
      });
  }, [imgSearch, page]);

  // Добавка изображений по кнопке LoadMore
  const handelLoadMore = () => {
    if (totalHits <= page * per_page) {
      setBtnRender(false);
      return toast.error('Изображения данной категории закончились');
    }
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Toaster />
      <Searchbar onSearch={handelSubmit} />
      {!totalHits && <h1>Внесите название изображения </h1>}
      {error && <h2> Возникла ошибка {error.message}</h2>}
      {loading && <Loader />}

      <ImageGallery imgSearch={data} />

      {btnRender && <BtnLoad onClick={handelLoadMore} />}
    </div>
  );
}

export { App };
