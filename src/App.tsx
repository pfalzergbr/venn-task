import { useContext } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ViewControlButtons from './Components/ViewControlButtons';
import ViewList from './Components/ViewList';
import './App.css';
import { ViewContext } from './Context/viewContext';
import LoadingScreen from './Components/LoadingScreen';

function App() {
  const { viewData, loading, error } = useContext(ViewContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="App">
      <Header />
      <ViewControlButtons />
      <ViewList viewData={viewData} />
      <Footer />
    </div>
  );
}

export default App;
