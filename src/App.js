import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function Home() { 
  return <h1>Ini Halaman Home</h1>
}

function ListUsers() { 
  return (
    <div>
      <h1>Ini Halaman Users</h1>
      <ul>
        <Link to='users/Betteng'> Betteng</Link> <br />
        <Link to='users/Syaiful'> Syaiful</Link>
      </ul>
    </div>

  ) 
}
function DetailUsers({ match }) { 
  return <h1>ini Halaman { match.params.name }</h1>
}

function NotFound() { 
  return <h1>404, Halaman Tidak ditemukan</h1>
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
           <nav>
            <li> <Link to='/'> Home </Link></li>
            <li> <Link to='/users'> Users </Link></li>
          </nav>
          <main>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/users' exact component={ListUsers} />
              <Route path='/users/:name' exact component={DetailUsers} />
              <Route component={NotFound} />
            </Switch>
          </main>
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      </div>
      </BrowserRouter>
  );
}

export default App;
