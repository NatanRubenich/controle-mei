import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const GraficoPizza  = ({dado}) => {
  console.log('dado que chega', dado)
  const [dados, setDados] = useState({
    labels: [
      'Produtos',
      'Serviços',
      'Revenda'
    ],
    datasets: [{
      label: 'Tipos de Venda',
      data: [dado.produto, dado.servico, dado.revenda],
      cutout: "80%",
      backgroundColor: [
        'rgb(255, 99, 0)',
        'rgb(54, 162, 235)',
        'rgb(100, 50, 100)'
      ],
      hoverOffset: 4
    }]
  });

  return (
    <Doughnut 
      data={dados}
      width="250"
      height="250"
      options={{
        responsive: true,
        maintainAspectRatio: false
    }} />
  );
}


export default GraficoPizza;