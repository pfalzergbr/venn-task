import { useContext } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ViewControlButtons from './Components/ViewControlButtons';
import ViewList from './Components/ViewList';
import './App.css';
import { ViewContext } from './Context/viewContext';
import { useFetch } from './hooks/useFetch';

function App() {
  const { viewData } = useContext(ViewContext);
  // const { data } = useFetch(
  //   'https://venn-interviews-server.herokuapp.com/json',
  // );

  // console.log(data);

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
