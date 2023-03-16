import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClosedModal, largeImageURL, modalTags }) {
  // закрытие по ESC

  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);
    function handelKeyDown(e) {
      if (e.code === 'Escape') {
        onClosedModal();
      }
      return () => window.removeEventListener('keydown', handelKeyDown);
    }
  }, [onClosedModal]);

  // Закрытие по бекдропу
  const hendelBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClosedModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={hendelBackDropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={modalTags} />
      </div>
    </div>,
    modalRoot
  );
}

export { Modal };

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  modalTags: PropTypes.string,
};
