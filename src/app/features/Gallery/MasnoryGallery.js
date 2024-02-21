import React, { useContext } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { popupVisible } from '../../redux/actions/commonAction';
import { POPUP_TYPE } from '../../services/Constants';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IMAGE_BASE } from '@/app/services/Url';
import UserContext from '@/app/context/userContextAPI';

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export default function MasonryImageList({ galleryList, imgNumber }) {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const handleImageClick = (img) => {
    ctx.ticketHandler(img);
    dispatch(popupVisible?.popupOpen(POPUP_TYPE?.TICKET));
  }
  return (
    <ImageList variant="masonry" cols={imgNumber} gap={8} className='masnory-list'>
      {galleryList.map((item) => (
        <ImageListItem key={item._id}>
          <LazyLoadImage onClick={() => handleImageClick(item.cover_image)}
            alt='img'
            effect="blur"
            src={`${ImageBase}coverimage/${item.cover_image}?w=248&fit=crop&auto=format`}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

