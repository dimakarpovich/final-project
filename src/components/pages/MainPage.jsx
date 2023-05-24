import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import Spider from "../../resources/img/top-most-iconic-superheroes-379687.png"



const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    function onCharSelected(id) {
        setSelectedChar(id);

    }


    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                 <CharInfo charId={selectedChar} />
                <img style={{ position: 'absolute', right: '0', zIndex: '-10', bottom: '0' }} src={Spider} alt="" />
            </div>

        </>

    )
}

export default MainPage;