import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ViewControlButtons from './Components/ViewControlButtons';
import { mockData } from './test-utils/data/mockData';
import ViewList from './Components/ViewList';

function App() {
  return (
    <div className="App">
      <Header />
      <ViewList viewData={mockData} />
      <ViewControlButtons />
      <Footer />
    </div>
  );
}

export default App;
