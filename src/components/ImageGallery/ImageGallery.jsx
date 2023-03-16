import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getImgApi } from '../services/imgAPI';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

// import { ThreeDots } from 'react-loader-spinner';
import { BtnLoad } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import css from './ImageGallery.module.css';
import { Modal } from '../Modal/Modal';

function ImageGallery({ imgSearch }) {
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [tags, setTags] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const per_page = 20;
  useEffect(() => {
    if (!imgSearch) {
      return;
    }

    setLoading(true);
    getImgApi(imgSearch, page)
      .then(dataImg => {
        console.log(dataImg.hits);
        if (dataImg.totalHits > 0) {
          setTotalHits(dataImg.totalHits);
          setData(prev => [...prev, ...dataImg.hits]);
          return;
        } else {
          toast.error('Внесите корректную информацию в поле поиска');
          return setData('');
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
      return toast.error('Изображения данной категории закончились');
    } 
      setPage(prevState => prevState + 1);
    
  };
  // Запись выбранной largeImage
  const selectImg = (imgURL, tags) => {
    setSelectedImg(imgURL);
    setTags(tags);
    setModalShow(true);
  };
  // изменение modalShow при закрытии модалки

  const onClosedModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      {!totalHits && <h1>Внесите название изображения </h1>}
      {error && <h2> Возникла ошибка {error.message}</h2>}
      {loading && <Loader />}

      <ul className={css.ImageGallery}>
        {data &&
          data.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              img={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
              selectImg={selectImg}
            />
          ))}
      </ul>

      {totalHits > page * per_page && <BtnLoad onClick={handelLoadMore} />}

      {modalShow && (
        <Modal
          largeImageURL={selectedImg}
          modalTags={tags}
          onClosedModal={onClosedModal}
        />
      )}
    </div>
  );
}

export { ImageGallery };

ImageGallery.propTypes = {
  imgSearch: PropTypes.string,
};
