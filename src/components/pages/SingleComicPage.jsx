import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../service/MarvelService';
import { useEffect, useState } from 'react';
import Page404 from './Page404';
import Loader from '../loader/Loader';
import Vision from "../../resources/img/vision.png"

const SingleComicPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComicsId } = useMarvelService();

    useEffect(() => {
        upDateComic();
    }, [comicId])



    const upDateComic = () => {

        getComicsId(comicId)
            .then(onComicLoaded)
    }


    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <Page404 /> : null;
    const spinner = loading ? <Loader /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}

const View = ({ comic }) => {
    const { thumbnail, title, description, page, prices, date} = comic;
   
    return (

        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__date">Release date: {date}</p>
                <p className="single-comic__descr">{page}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
            <img style={{ position: 'absolute', right: '0', zIndex: '-10', bottom: '0' }} src={Vision} alt="" />
        </div>
    )
}
export default SingleComicPage;