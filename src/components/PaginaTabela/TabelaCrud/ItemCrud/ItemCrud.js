import React from 'react';

const ItemCrud = () => {


  return (
    <tr className="td-registros">
      <td>Marcos Silva Campos</td>
      <td>065963852-14</td>
      <td>R$250,00</td>
      <td>25/02/2021</td>
      <td className="acoes">
        <div className="d-flex"> 
          <button className="btn btn-success m-1"><i className="fas fa-pencil-alt"></i></button> 
          <button className="btn btn-danger m-1"><i className="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  );
}

export default ItemCrud;