import React from 'react';

const PagPadrao = ({titulo, background, children}) => {

  return (
    <div className={`row bg-secondary min-vh-100 m-0 ${background} position-relative py-5`}>
      <div className="blind"></div>
      <div className="col-11 col-md-8 m-auto bg-light rounded justify-content-center align-items-center z-index2 shadow-lg">
        <div className="container p-0 p-md-2">
          <h4 className="text-center mt-4 mb-3">{titulo}</h4>
          <div className="container p-2 p-md-2 px-lg-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

}





export default PagPadrao;