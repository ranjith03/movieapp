import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import '../Search/Search.css'

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);


   {/*-------------- Search--------------- */}
  
   const [searchText, setSearchText] = useState("");
   const [type, setType] = useState(0);
   const fetchSearch = async () => {
     try {
       const { data } = await axios.get(
         `https://api.themoviedb.org/3/search/tv?api_key=${
           process.env.REACT_APP_API_KEY
         }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
       );
       setContent(data.results);
       setNumOfPages(data.total_pages);
       // console.log(data);
     } catch (error) {
       console.error(error);
     }
   };
 
   useEffect(() => {
     window.scroll(0, 0);
     fetchSearch();
     // eslint-disable-next-line
   }, [type, page]);


   const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
 
 {/*-------------- Search--------------- */}

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

    {/*-------------- Search--------------- */}
    
      <ThemeProvider theme={darkTheme}>
          <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
          </div>
          </ThemeProvider>
    {/*-------------- Search--------------- */}

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
          
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
