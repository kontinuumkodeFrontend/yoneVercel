'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Login } from './Login';
import { Signup } from './Signup';
import { Verification } from './Verification';
import { ForgotPassword } from './ForgotPassword';
import { MODAL_TYPE } from '../../services/Constants';
import { VerificationMail } from './VerificationMail';

export const ModalContainer = () => {

  const {isDialogeOpen} = useSelector((state) => state.commonReducer);
  const {modalCategory} = useSelector((state) => state.commonReducer);
  
  const modalType = () => {
    switch (modalCategory) {
      case MODAL_TYPE?.LOGIN :
        return <Login />;
      case MODAL_TYPE.SIGN_UP:
        return <Signup />;
      case MODAL_TYPE.VERIFICATION:
        return <Verification />;
      case MODAL_TYPE.FORGOT_PASSWORD:
        return <ForgotPassword />;
      case MODAL_TYPE.VERIFICATION_OTP:
        return <VerificationMail />;
      default:
        return null;
    }
  }

    return (
          <> 
           {
                isDialogeOpen ?
                <div className='feed_mdl'>
                  {modalType()}                          
                </div>
                 : 
                ''
              }
          </>
    )
  }
