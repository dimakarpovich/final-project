import { useHttp } from "../hooks/Hooks";
import { API_BASE } from "../helpers/helpers";
import { API_KEY } from "../helpers/helpers";
import { BASE_OFFSET } from "../helpers/helpers";

const  useMarvelService = () => {


   const {loading, request,  error} = useHttp ();
   
    const getAllCharacters = async (offset=BASE_OFFSET) => {
        const res = await request(`${API_BASE}characters?limit=9&offset=${offset}&${API_KEY}`);
        return res.data.results.map(transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${API_BASE}characters/${id}?${API_KEY}`);
        return transformCharacter(res.data.results[0]);
    }

   

    const transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}...` : 'Character description not found',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = 0) => {
        const res = await request (`${API_BASE}comics?limit=8&offset=${offset}&${API_KEY}`);
        return res.data.results.map(transformComics);

    }

    const getComicsId = async (id) => {
        const res = await request (`${API_BASE}comics/${id}?${API_KEY}`);
        return transformComics(res.data.results[0]);
    }

    const transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title ,
            description: comics.description || 'there is not description',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            page: comics.pageCount ? ` ${comics.pageCount} pages` : 'There are no pages in the comic',
            prices: comics.prices[0].price ? `${comics.prices[0].price} $` : 'No price',
        };
        


    };

   

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComicsId};
}
export default useMarvelService;