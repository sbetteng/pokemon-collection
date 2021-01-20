import logo from './logo.svg';
import './App.scss';
import { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class PokemonList extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      items: [],
      count: 0,
      isLoading: true
    }
  }

  // API
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
    // fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          items: res.results,
          count: res.results.length,
          isLoading: false
        });
      });
  }
  
  render() {
    const { items, isLoading, count, setCount } = this.state
    if (isLoading) { 
      return <p>Loading.....</p>
    }
    return (
      <div>
        <h1>Pokemon Collection</h1>
        <h3>All Pokemon ({count})</h3>
        <Container>
          <div className="wrap-card">
          {/* <Pagination size="lg">{items}</Pagination> <br /> */}
          <Row className="justify-content-lg-center">
            {items.map(results => (
                // <li key={results.id}> Name : {results.name}</li>
              
            <Col>
              <Card key={results.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/pokemon-ball.png"} style={{ padding: '40px' }}/>
                <Card.Body>
                  <Card.Title>{results.name}</Card.Title>
                  {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text> */}
                  <Button variant="info" size="md">Detail</Button>
                </Card.Body>
              </Card>
              </Col>
              
              ))}
          </Row>
          </div>
        </Container>
      </div>

    )
  }  
}
function DetailPokemon({ match }) { 
  return (
    <h1>ini Halaman { match.params.id }</h1>
  ) 
}

function MyPokemon() { 
  return (
    <div>
      <h1>My Pokemon Collection</h1>
      <h3>Owned Pokemon (123)</h3>
    </div>

  ) 
}

function DetailMyPokemon({ match }) { 
  return <h1>ini Halaman { match.params.name }</h1>
}

function NotFound() { 
  return (<h1>404, Halaman Tidak ditemukan</h1>)
}

class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        {/* <div>
          <ul>
            {items.map(results => (
              <li key={results.id}> Name : {results.name}</li>
            ))}
          </ul>
        </div> */}

        <div className="App">
          <header className="App-header">
            <Link to={'/pokemon-collection'}>
              <div>
                <img src={process.env.PUBLIC_URL + "/images/pokemon-logo.png"} className="logo-pokemon" alt="logo-pokemon" />
                <img src={process.env.PUBLIC_URL + "/images/pokemon-collection-images.png"} className="images-pokemon" alt="images-pokemon" />
              </div>
            </Link>
            <Container>
              <Row>
                <Col >
                  <div className="wrap-button">
                    <Link to='/pokemon-list'>
                      <Button variant="info" size="lg">Pokemon Collection</Button>{' '}
                    </Link>
                    <Link to='/my-pokemon-list'>
                      <Button variant="info" size="lg">My Pokemon Collection</Button>{' '}
                    </Link>
                  </div>
                </Col>
              </Row>
              
              <main>
                <Switch>
                  <Route path='/' exact />
                  <Route path='/pokemon-collection' exact />
                  <Route path='/pokemon-list' exact component={PokemonList} />
                  <Route path='/pokemon-list/:id' exact component={DetailPokemon} />
                  <Route path='/my-pokemon-list' exact component={MyPokemon} />
                  <Route path='/my-pokemon-list/:id' exact component={DetailMyPokemon} />
                  <Route component={NotFound} />
                </Switch>
              </main>
              
            </Container>
          </header>
        </div>
      
      </BrowserRouter>
    );
  }
}

export default App;
