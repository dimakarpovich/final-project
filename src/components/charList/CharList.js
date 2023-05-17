import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import useMarvelService from '../../service/MarvelService';
import Loader from '../loader/Loader';
import Error from '../error/Error';


const CharList = ({onCharSelected}) =>  {
    
    const [charList, setCharList] = useState([]);
    const [ newLoading, setNewLoading] = useState(false); 
    const [offset, setOffset] = useState (210);
    
   
    const {loading, error, getAllCharacters} =  useMarvelService();

    useEffect(() =>{
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewLoading( false) : setNewLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            
    }

   

    const onCharListLoaded = (nextCharList) => {

        setCharList (charList => [ ...charList, ...nextCharList]);
        setNewLoading (newLoading => false);
        setOffset (ofsset => offset + 9);
    }
    

   

    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, index) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            

            return (
                <li 
                    ref = {el => itemRefs.current[index] = el}
                    className="char__item"
                    key={item.id} 
                    onClick={()=>{onCharSelected(item.id);
                    focusOnItem(index);
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__flex">
                {items}
            </ul>
        )
    }

    
        
        const items = renderItems(charList);

        const errorMessage = error ? <Error/> : null;
        const spinner = loading && newLoading ? <Loader/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button className="button button__main button__long" disabled = {newLoading} onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    

}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;