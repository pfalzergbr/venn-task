import { useContext } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ViewControlButtons from './Components/ViewControlButtons';
import ViewList from './Components/ViewList';
import './App.css';
import { ViewContext } from './Context/viewContext';

function App() {
  const { viewData, loading } = useContext(ViewContext);

  if (loading) {
    return <p>Loading</p>;
  }
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
