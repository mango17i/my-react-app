import { Component } from "react";
import { Header, Loading } from "./components";
import { mapMovies, urlApiMovie } from "./conf/api.movie";
import { MovieDetails, MovieList, SearchBar } from "./features/movies/components";
import { Movie } from "./features/movies/models/movie";
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

  // componentDiMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       movies: data.movies
  //     });
  //   }, 200);
  // }

  componentDidMount() { //async
    urlApiMovie.get('/discover/movie')
      .then(res => res.data.results)
      .catch(console.error)
      .then(movies => {
        if (!movies && !movies.length) {
          throw new Error('Pas de films!');
        }
        movies = mapMovies(movies);
        this.setState({ movies });
      })
      .catch(console.error)
  }
    // const options = {
    //   headers: {
    //     'Content-type': 'application/json;charset=utf-8',
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjJmM2Y1NjUxY2ZlZWUxMGVlZjNhMTUzMmI2ZWJmNiIsInN1YiI6IjYyMjlkNGZlMTJjNjA0MDA0NjE0YmQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcZZUw4NuRMmT9muz6w7N7QJ19kRAg9JkkOOlDrH_u4'
    //   }
    // }
    // try {
    //   let movies = await fetch(
    //     'https://api.themoviedb.org/4/discover/movie', options
    //   )
    //     .then(res => res.json())
    //     .catch(console.error)
    //     .then(data => data.results)
    //     .catch(console.error)
      
    //     if (!movies.length) throw new Error("Pas de films!");
    //     movies = movies.map(m => new Movie(
    //       m.id,
    //       m.title,
    //       'https://image.tmdb.org/t/p/w500' + m.poster_path,
    //       `${m.release_date} | ${m.vote_average}/10 (${m.vote_count})`,
    //       m.overview
    //     ));
    //     this.setState({ movies });
    // }
    // catch (e) {
    //   console.error(e);
    // }
  // }
    
    
    
  //   promise
  //     .then(res => res.json())
  //     .then((data) => data.results)
  //     .then((movies) => {
  //       movies = movies.map((movie) => ({
  //         title: movie.title,
  //         _id: movie.id,
  //         img: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" + movie.poster_path,
  //         details: movie.popularity,
  //         desc: movie.overview
  //       }))
  //       this.setState({ movies })
  //     });
  // }
  
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
        <div className="d-flex justify-content-center p-4">
          <SearchBar />  
        </div>
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
