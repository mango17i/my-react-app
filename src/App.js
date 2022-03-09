import { Component } from "react";
import { Header } from "./components";
import { MovieDetails, MovieList } from "./features/movies/components";
import { default as data } from './utils/data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: data.movies,
      selected: {}
    };
  }

  updateSelected = (idMovie) => {
    const movie = this.state.movies.find(m => m._id == idMovie);
    this.setState({ selected: movie });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MovieList
          updateSelected={this.updateSelected}
          movies={this.state.movies} />
        <MovieDetails selectedMovie={this.state.selected} />
      </div>
    );
  }
}

export default App;
