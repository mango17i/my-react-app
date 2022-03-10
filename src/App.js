import { Component } from "react";
import { Header, Loading } from "./components";
import { MovieDetails, MovieList } from "./features/movies/components";
import { default as data } from './utils/data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selected: null
    };
  }

  //   setTimeout(() => 
  //   this.updateSelected("ead538d8-6314-44ef-afdb-d63a3d79f321"),
  //   2000);
  // }

  componentDiMount() {
    setTimeout(() => {
      this.setState({
        movies: data.movies
      });
    }, 2000);
    }
  
  updateSelected = (idMovie) => {
    // console.log(this);
    const movie = this.state.movies.find(m => m._id === idMovie);
    this.setState({ selected: movie });
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.movies.length ?
        <>
        <MovieList
          updateSelected={this.updateSelected}
          movies={this.state.movies} />
        <MovieDetails selectedMovie={this.state.selected} />
        </>
        :
          <Loading />
        }
      </div>
    );
  }
}

export default App;
