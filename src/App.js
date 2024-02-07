import Home from './pages/Home';
import ReactGA from 'react-ga';
ReactGA.initialize('G-Y38T7CPZ67');
ReactGA.pageview(window.location.pathname);
function App() {
  return (
    <>
      <Home/>
    </>
  );
}

export default App;
