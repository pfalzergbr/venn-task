import { useContext } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ViewControlButtons from './Components/ViewControlButtons';
// import { mockData } from './test-utils/data/mockData';
import ViewList from './Components/ViewList';
import './App.css';
import { ViewContext } from './Context/viewContext';

function App() {
  const { viewData } = useContext(ViewContext);

  return (
    <div className="App">
      <Header />
      <ViewList viewData={viewData} />
      <ViewControlButtons />
      <Footer />
    </div>
  );
}

export default App;
