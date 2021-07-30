import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, Card, Icon, Image } from 'semantic-ui-react';

function App() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [repos, setRepos] = useState('');


  useEffect(() => {

    fetch('https://api.github.com/users/example')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  const setData = ({ name, avatar_url, login, public_repos }) => {
    setName(name);
    setAvatar(avatar_url);
    setUserName(login);
    setRepos(public_repos);
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data)
          setError(null)

        }
      })
  }



  return (
    <>
      <div className="navbar">
        GithubSearch
      </div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github user"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="search" />
          </Form.Group>
        </Form>
      </div>
      {error ?
        (<h1>{error}</h1>) : (
          <div className="card">
            <Card>
              <Image src={avatar} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Header>{userName}</Card.Header>

              </Card.Content>
              <Card.Content extra>
                <Icon name='user' />
                {repos} Repos
              </Card.Content>
            </Card>

          </div>
        )}

    </>
  );
}

export default App;
