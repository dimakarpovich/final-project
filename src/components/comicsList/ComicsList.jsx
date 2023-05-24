import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../service/MarvelService';
import { useState, useEffect } from 'react';
import Error from '../error/Error';
import Loader from '../loader/Loader';





const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const { error, loading, getAllComics } = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, []);


    const onRequest = (offset, initial) => {
        initial ? setNewLoading(false) : setNewLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)


    }

    const onComicsListLoaded = (nextComicsList) => {
        setComicsList(comicsList => [...comicsList, ...nextComicsList]);
        setNewLoading(newLoading => false);
        setOffset(ofsset => offset + 8);

    }


    function renderComics(arr) {





        const items = arr.map((item, id) => {

            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                    <li className="comics__item" key={id} >

                        <Link to={`/comics/${item.id}`} className="comics__item-link" >
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle} />
                            <div className="comics__item-name">{`${item.title.slice(0, 60)}...`}</div>
                            <div className="comics__item-price">{item.prices}</div>
                        </Link>
                   </li>
            )
        });

        return (

            <ul className="comics__flex"> 
                    {items}
            </ul>


        )
    }
    const items = renderComics(comicsList);

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Loader /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long" disabled={newLoading} onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )



}

export default ComicsList;