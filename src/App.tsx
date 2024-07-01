import MovieSearch from './components/MovieSearch'

function App() {
  return (
    <div className="App">
      <Header />
      <MovieSearch />
    </div>
  )
}

export default App

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 p-4">
      <h1 className="text-3xl text-white text-center">Movie Search</h1>
    </header>
  );
};
