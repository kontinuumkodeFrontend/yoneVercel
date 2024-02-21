'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { UnSubscribe } from '../../services/Url';
import { sendData } from '../../services/Service';

export default function Unsubscribe({params}) {
    const router = useRouter()
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const id = params.id;

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const body = JSON.stringify({
            id: id,
            isSubscription: 0,
        })
        sendData(UnSubscribe, body).then((res) => {
            if (res) {
                setConfirmationVisible(res);
                setTimeout(() => {
                    router.push('/');
                }, 5000);
            }
        });

    };

    const handleCancel = (event) => {
        event.preventDefault();
        router.push("/");
    };

    return (
        <div className='un-subs'>
            <div className="subscription-form">
                <h1>Unsubscribe</h1>
                <p className='mt-5'>We are sorry to see you go!</p>
                <form onSubmit={handleFormSubmit}>
                    <img alt='img' src={'/images/unsubscribe.png'} />
                    <p>Are you sure you want to unsubscribe our emails?</p>
                    <div className='subs-btn'><button type='button' onClick={handleCancel}>No</button>
                        <button type='submit' onClick={handleFormSubmit}>Yes</button></div>
                    {confirmationVisible && (
                        <div className="confirmation-message">
                            {confirmationVisible}
                        </div>
                    )}
                </form>

            </div>
        </div>
    );
}

