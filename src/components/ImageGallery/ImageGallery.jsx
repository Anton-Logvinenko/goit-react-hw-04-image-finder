import PropTypes from 'prop-types';
import { useState } from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';

import css from './ImageGallery.module.css';

function ImageGallery({ imgSearch }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [tags, setTags] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
      <ul className={css.ImageGallery}>
        {imgSearch &&
          imgSearch.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              img={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
              selectImg={selectImg}
            />
          ))}
      </ul>

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
  imgSearch: PropTypes.array,
};
