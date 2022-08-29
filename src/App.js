import './App.css';
import Weather from "./Weather"

function App() {
  return (
    <div className="App">
      <Weather defaultCity="New York" />
      <p><a href="https://github.com/Cstoscup/new-weather-app" target="_blank">Open-source</a> code, by <a href='https://www.linkedin.com/in/callie-stoscup-475b1683/' target='_blank'>Callie Stoscup</a></p>
    </div>
  );
}

export default App;
