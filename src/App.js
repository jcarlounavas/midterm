import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/header.tsx';
import Countries from './components/countryDetails.tsx';
import Footer from './components/footer.tsx';


function App() {
  return (
    <div className="App">
      <Header />
      
      <main>
      <Countries />
      </main>

      <Footer />
    </div>
  );
}

export default App;
