import React from 'react';

import { Title, Form } from './styles'

import logoImage from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  return (<>
    <img src={logoImage} alt="Github Explorer"/>
    <Title>Explore respoitórios no Github</Title>
    
    <Form action="">
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>
  </>)
}

export default Dashboard