import React from 'react';

const Contain = ({ url }) => {

  return (
    <div className=''>
      {url && ( 
        <iframe
          title="Embedded Content"
          src={url}
          width="100%"
          style={{ border: '1px solid #ccc',height:'100vh' }}
        />
      )}
    </div>
  );
};

export default Contain;
