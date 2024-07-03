import MovieSearch from './components/MovieSearch'

function App() {
  return (
    <div className="App text-white bg-black">
      <Header />
      <MovieSearch />
    </div>
  )
}

export default App

const Header: React.FC = () => {
  return (
    <header className="bg-black-600 p-4 border-gray-500 border-b">
      <h1 className="text-3xl text-white text-center">Movie Search</h1>
    </header>
  );
};
