import './App.css';
import Footer from './components/Footer';
import HeaderInicio from './components/HeaderInicio';
import ListaPokemon from './components/ListaPokemon';

function App() {
  return (
    <div className="App">
      <HeaderInicio/>
      <ListaPokemon/>
      <Footer/>
    </div>
  );
}

export default App;
