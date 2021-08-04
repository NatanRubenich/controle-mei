import React from 'react';

const Card = ({titulo, icone, dado}) => {


  return (
    <div className="col-0 col-md-6 p-2">
      <div className="card bg-light rounded shadow">
        <div className="d-flex flex-row g-0">
          <div className="col d-flex flex-row">
            <div className="card-body">
              <span className="fs-5 text-primary">{titulo}</span>
              <h3>{dado && dado}</h3>
            </div>

            <div className="col-3 d-flex justify-content-center align-items-center fs-1 text-primary m-2">
              <i class={`fas fa-${icone}`}></i>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Card;