import React from 'react';

const FormInput = ({nome, titulo, tipo, classe, form, setForm}) => {

  const handleChange = (e) => {
    setForm({ ...form, [nome]: e })
  }


  return (   
      <div class={classe}>
        <label for={nome} class="form-label">{titulo}</label>
        <input type={tipo} class="form-control" id={nome} onChange={(e) => handleChange(e.target.value)}/>
      </div>
  );

}



export default FormInput;