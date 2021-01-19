import logo from './logo.svg';
import './App.scss';
import { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() { 
  return (
    <h1></h1>
  )
}

function PokemonList() { 
  return (
    <div>
      <h1>Pokemon Collection</h1>

      <h1>All Pokemon (123)</h1>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary" size="lg">Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       </Container>
    </div>

  ) 
}
function DetailPokemon({ match }) { 
  return <h1>ini Halaman { match.params.name }</h1>
}

function MyPokemon() { 
  return (
    <div>
      <h1>My Pokemon Collection</h1>
      
    </div>

  ) 
}

function DetailMyPokemon({ match }) { 
  return <h1>ini Halaman { match.params.name }</h1>
}

// function NotFound() { 
//   return <h1>404, Halaman Tidak ditemukan</h1>
// }

class App extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      items: [],
      isLoading: true
    }
  }

  // API
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          items: res.results,
          isLoading: false
        });
      });
  }


  render() {
    const { items, isLoading } = this.state
    // var { items = [] } = this.props;
    // var { isLoading } = this.state;
    
    if (isLoading) { 
      return <p>Loading.....</p>
    }
    return (
      <BrowserRouter>
        {/* <div>
          <ul>
            {items.map( results => (
              <li key={results.id}> Name : {results.name}</li>
            ))}
          </ul>
        </div> */}

        <div className="App">
          <header className="App-header">
            <Link to={'/pokemon-collection'}>
              <img src={process.env.PUBLIC_URL + "/images/pokemon-collection-logo.png"} className="logo-pokemon" alt="logo-pokemon" />
            </Link>
            
            <img src={process.env.PUBLIC_URL + "/images/pokemon-collection-images.png"} className="images-pokemon" alt="images-pokemon" />
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
                  <Route path='/pokemon-collection' exact component={Home} />
                  <Route path='/pokemon-list' exact component={PokemonList} />
                  <Route path='/pokemon-list/:id' exact component={DetailPokemon} />
                  <Route path='/my-pokemon-list' exact component={MyPokemon} />
                  <Route path='/my-pokemon-list/:id' exact component={DetailMyPokemon} />
                  {/* <Route component={NotFound} /> */}
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
