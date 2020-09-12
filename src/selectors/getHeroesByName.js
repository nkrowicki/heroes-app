import {heroes} from '../data/heroes';

const getHeroesByName = (name = '') => {

    if (name === '')
        return [];

    const result = heroes.find(hero => hero.superhero.toLowerCase().includes(name));
    
    if (result === undefined) 
        return [];

   return [result]
}

export default getHeroesByName
