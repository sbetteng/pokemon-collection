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

  // API Pokemon
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
    // fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          items: res.results,
          countAll: res.count,
          count: res.results.length,
          next: res.next,
          previous: res.previous,
          pokemonURL: res.url,
          isLoading: false
        });
      });
  }
  
  render() {
    const { items, isLoading, count, countAll } = this.state
    if (isLoading) { 
      return <p>Loading.....</p>
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1>Pokemon Collection</h1>
            <h3>All Pokemon ({countAll})</h3>
          </Col>
          
        </Row>
        <div className="wrap-card">
        <Row>
          {items.map(results => (
          <Col lg="3">
            <Card key={results.id} style={{ width: '15rem', margin: '20px auto'}}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/pokemon-ball.png"} style={{ padding: '40px' }}/>
              <Card.Body>
                <Card.Title>{results.name}</Card.Title>
                  <Link to={`/pokemon-list/${results.name}`}>
                    <Button variant="info" size="md">Detail</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
        </div>
      </Container>
    )
  }  
}
function DetailPokemon({ match }) {
  return (
    <Container>
      <div className="wrap-card-detail">
        <Row><Col className="text-left pb-2"><h1>Pokemon Detail</h1></Col></Row>
        <Row>
          <Col lg="4">
          <Card style={{ width: '18rem', margin: '0 auto'}}>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/pokemon-ball.png"} style={{ padding: '40px' }}/>
              <Button variant="danger" size="md">Catch</Button>
            </Card>
          </Col>
          <Col lg="8" className="text-left pt-2 pb-2">
            <label>Name: {match.params.name}</label><br />
            <label>Abilities: {match.params.name}</label><br />
            <label>Types: {match.params.name}</label><br />
            <label>Moves: {match.params.name}</label><br />
            <label>Stats: {match.params.name}</label><br />
            <label>Game Indices: {match.params.name}</label><br />
          </Col>
        </Row>
      </div>
    </Container>
  ) 
}

// class DetailPokemon extends Component { 
//   constructor(props) { 
//     super(props);
//     let match = props.match;
//     let { name } = useParams();
//     this.state = {
//       items: [],
//       count: 0,
//       isLoading: true,
//       pakemonName: match.params.pakemonName,
//       random: 0
//     }
//   }

//   handleCatch() {
//     const min = 1;
//     const max = 100;
//     const rand = min + Math.random() * (max - min);
//     this.setState({ random: this.state.random + rand });
//   }
//   render() {
//     return (
//     <Container>
//       <div className="wrap-card-detail">
//         <Row><Col className="text-left pb-2"><h1>Pokemon Detail</h1></Col></Row>
//         <Row>
//           <Col lg="4">
//           <Card style={{ width: '18rem', margin: '0 auto'}}>
//             <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/pokemon-ball.png"} style={{ padding: '40px' }}/>
//                 <Button variant="danger" size="md" onClick={this.handleCatch.bind(this)}>Catch</Button>
//                 <div>The number is: {this.state.random}</div>
//             </Card>
//           </Col>
//           <Col lg="8" className="text-left pt-2 pb-2">
//             <label>Name: {match.params.name}</label><br />
//             <label>Abilities: {match.params.name}</label><br />
//             <label>Types: {match.params.name}</label><br />
//             <label>Moves: {match.params.name}</label><br />
//             <label>Stats: {match.params.name}</label><br />
//             <label>Game Indices: {match.params.name}</label><br />
//           </Col>
//         </Row>
//       </div>
//     </Container>
//     )
//   }
// }
class MyPokemon extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      apiResponse: "",
      items: [],
      count: 0,
      isLoading: true
    }
  }

  // API Pokemon
  componentDidMount() {
    // fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          items: res.results,
          countAll: res.count,
          count: res.results.length,
          next: res.next,
          previous: res.previous,
          pokemonURL: res.url,
          isLoading: false
        });
      });
  }

  pokemonAPI() {
      fetch("http://localhost:9000/pokemonAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.pokemonAPI();
  }
  render() {
    const { items, isLoading, count, countAll } = this.state
    if (isLoading) { 
      return <p>Loading.....</p>
    }
    return (
      <Container>
        <h1>My Pokemon Collection</h1>
        <h3>Owned Pokemon ({count}/{countAll})</h3>
        <div className="wrap-card">
        <Row>
          {items.map(results => (
          <Col lg="3">
            <Card key={results.id} style={{ width: '15rem', margin: '20px auto'}}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/pokemon-ball.png"} style={{ padding: '40px' }}/>
              <Card.Body>
                <Card.Title>{results.name}</Card.Title>
                  <Link to={`/pokemon-list/${results.name}`}>
                    <Button variant="info" size="md">Detail</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
          ))}
          </Row>
          </div>
      </Container>
    )
  }
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
                  <Route path='/pokemon-list/:name' exact childen={DetailPokemon} component={DetailPokemon} />
                  <Route path='/my-pokemon-list' exact component={MyPokemon} />
                  <Route path='/my-pokemon-list/:name' exact component={DetailMyPokemon} />
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
