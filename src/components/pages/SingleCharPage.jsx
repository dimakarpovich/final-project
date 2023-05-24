import AppBanner from "../appBanner/AppBanner";
import { useState, useEffect } from "react";
import useMarvelService from "../../service/MarvelService";
import Page404 from "./Page404";
import Loader from "../loader/Loader";
import {Link, useParams} from "react-router-dom"

import dared from "../../resources/img/daredevil-logo-D06D1F6324-seeklogo.com.png"



const SingleCharPage = () => {
    const {charId} = useParams();
    // const {pathname} = useLocation();
    // console.log(pathname);
    // console.log(charId);
    const [char, setChar] = useState(null);
    const { loading, error, getCharacter } = useMarvelService();

    useEffect(() => {
        upDateChar();
    }, [charId])



    const upDateChar = () => {

        getCharacter(charId)
            .then(onCharLoaded)
    }


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <Page404 /> : null;
    const spinner = loading ? <Loader /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}

const View = ({ char }) => {
    const { thumbnail, name, description, comicsCount, series, stories} = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
    }
    return (

        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"  style={imgStyle}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Count comics: {comicsCount}</p>
                <p className="single-comic__descr">Count series: {series}</p>
                <p className="single-comic__descr">Count stories: {stories}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
            <img style={{ position: 'absolute', right: '0', zIndex: '-10', bottom: '0' }} src={dared} alt="" />
        </div>
    )
}
export default SingleCharPage;
   