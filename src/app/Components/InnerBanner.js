import React from 'react';

export const InnerBanner = ({content}) => {
  return (
    <section className='bnr-sec bg innr-bnr-sec' style={{backgroundImage: `url(${content?.image})`  }}>
      <div className='container'>
        <div className='bnr-ctnt'  data-aos="fade-left">
            <h3 className='bnr-heading'>{content?.heading}</h3>
            <p>{content?.description}</p>
        </div>
      </div>
    </section>
  )
}

