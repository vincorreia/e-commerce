import './App.css';
import Nav from "./components/Nav"
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <main className='main'>
        <Nav />
        <Home/>
      </main>
    </div>
  );
}

export default App;
