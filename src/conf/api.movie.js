import * as axios from "axios";
import { Movie } from '../features/movies/models/movie'

export const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjJmM2Y1NjUxY2ZlZWUxMGVlZjNhMTUzMmI2ZWJmNiIsInN1YiI6IjYyMjlkNGZlMTJjNjA0MDA0NjE0YmQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcZZUw4NuRMmT9muz6w7N7QJ19kRAg9JkkOOlDrH_u4';

export const urlApiMovie = axios.create({
    baseURL: 'https://api.themoviedb.org/4',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
    },
    timeout: 4000
});

urlApiMovie.interceptors.request.use(req => {
    req.headers['Authorization'] = 'Bearer ' + API_TOKEN;
    return req;
});

export const mapMovies = movies =>
    movies.map(m => new Movie(
        m.id,
        m.title,
        'https://image.tmdb.org/t/p/w500' + m.poster_path,
        `${m.release_date} | ${m.vote_average}/10 (${m.vote_count})`,
        m.overview
    )
);