import React from 'react'
import { useDispatch } from 'react-redux';
import { modalVisible } from '../../redux/actions/commonAction';

export const ErrorPopup = () => {
const dispatch = useDispatch();
const loginHandler = (e) => {
    e.preventDefault(); 
    dispatch(modalVisible?.modalClose())
}
  return (
    <div className='popup-ctnr-outer logout-popup'>
        <div className='popup-ctnr'>
        <div className="modalClose MuiBox-root css-0"
            onClick={() => dispatch(modalVisible?.modalClose())}
           ><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></div>
            <div className='popup-img'>
                <img src={'/images/innerPages/errorpopup.png'} alt='img' className='img-fluid' />
            </div>
            <div className='popup-ctnt'>
                <h4>Error</h4>
                <p>Your email address and password invalid.
Please try again</p>
                <div className='btn-wpr mt-3'>
                    <button onClick={loginHandler} className='btn-design'>Ok</button>
                </div>
            </div>
        </div>
    </div>
  )
}
