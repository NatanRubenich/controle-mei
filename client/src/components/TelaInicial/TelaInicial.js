import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react'
import business from '../../img/business.jpg'

const TelaInicial = () => {

  return (

    <Grid 
      className="hero-grid"
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Column>
        <Header 
            as="h1"
            textAlign="center"
            className="hero-header"
            
          >
          MEI Controle
          </Header>
      </Grid.Column>
    </Grid>


  
  );
}



export default TelaInicial;