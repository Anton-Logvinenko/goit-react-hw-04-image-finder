import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

function App() {
  const [imgSearch, setImgSearch] = useState('');

  const handelSubmit = imgSearch => setImgSearch(imgSearch);

  return (
    <div>
      <Toaster />
      <Searchbar onSearch={handelSubmit} />
      <ImageGallery imgSearch={imgSearch} />
    </div>
  );
}

export { App };
