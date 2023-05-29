import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Error from '../error/Error';
import Loader from '../loader/Loader';
import useMarvelService from '../../service/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';




const CharInfo = ({ charId }) => {

    const [char, setChar] = useState(null);


    const { loading, error, getCharacter } = useMarvelService();


    useEffect(() => {
        upDateChar();
    }, [charId])



    const upDateChar = () => {

        if (!charId) {
            return
        }

        getCharacter(charId)
            .then(char => setChar(char))
    }



    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Loader /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )

}
const View = ({ char }) => {
    const { name, description, thumbnail, wiki, comics, id } = char;

    if (comics.length > 10) {
        return comics.splice(9)
    }
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <>

            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`characters/${id}`} className="button button__main">
                            <div className="inner">Homepage</div>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There is no comics with this character' : null}
                {
                    comics.map((item, i) => {
                        const {resourceURI} = item;
                        const id = resourceURI.split('/')[6];
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`comics/${id}`} >
                                    {item.name}
                                </Link>
                            </li>

                        )
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;

