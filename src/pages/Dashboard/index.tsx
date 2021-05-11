import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import { Title, Form, Repositories } from './styles'

import logoImage from '../../assets/logo.svg'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string

  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    )
    if(storagedRepositories){
      return JSON.parse(storagedRepositories)
    }else{
      return []
    }
  })
  
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>,
    ): Promise<void>{
    event.preventDefault()

    if(!newRepo){
      setInputError('Digite o autor/nome do repositório')
      return
    }

    try{
      const response = await api.get<Repository>(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    }
  }

  return (<>
    <img src={logoImage} alt="Github Explorer"/>
    <Title>Explore respoitórios no Github</Title>
    
    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input placeholder="Digite o nome do repositório" 
      value={newRepo}
      onChange={(e) => setNewRepo(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </Form>

    {inputError && <span style={{color:'crimson', display:'block', marginTop: '8px'}}>{inputError}</span>}

    <Repositories>
      {repositories.map(repository => {
        return(<>
          <Link 
          key={repository.full_name} 
          to={`/repositories/${repository.full_name}`}>
            <img 
            src="https://avatars.githubusercontent.com/u/55491606?v=4"
            alt="João Marcos"/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20}/>
          </Link>
        </>)
      })}
    </Repositories>
  </>)
}

export default Dashboard