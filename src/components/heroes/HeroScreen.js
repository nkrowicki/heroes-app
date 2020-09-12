import React, { useMemo } from 'react'
import { useParams, Redirect} from 'react-router-dom'
import getHeroById from '../../selectors/getHeroById';

const HeroScreen = ({history}) => {

    const {heroeId} = useParams();

    const hero = useMemo(() => getHeroById(heroeId), [heroeId])

    if(!hero){
        return (<Redirect to="/" />)
    }

    const {superhero, publisher, alter_ego, first_appaerance, characters} = hero;

    const handleReturn = () => {
        if(history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col -4 animate__animated animate__fadeInLeft">
                <img
                    src={`../assets/heroes/${heroeId}.jpg`}
                    className="img-thumbnail"
                    alt={superhero}
                    />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush" />
                    <li className="list-group-item"><b>Alter ego: {alter_ego}</b></li>
                    <li className="list-group-item"><b>Publisher: {publisher}</b></li>
                    <li className="list-group-item"><b>First Appaerence: {first_appaerance}</b></li>
                    <li className="list-group-item"><b>Characters: {characters}</b></li>

            <h5>Characters</h5>
            <p>{characters}</p>

            <button 
                onClick={handleReturn}
                className="btn btn-outline-info">
                Return
            </button>

            </div>
        </div>
    )
}

export default HeroScreen
