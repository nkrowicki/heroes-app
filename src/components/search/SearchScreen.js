import React, { useMemo } from 'react'
import {heroes} from '../../data/heroes';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import getHeroesByName from '../../selectors/getHeroesByName';



const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);


    
    const [formValues, handleInputChange ] = useForm({
        searchText: q
    });
    
    const {searchText} = formValues;

    

    const heroesFiltered =useMemo(() =>  getHeroesByName(q), [q]);
    
    
    const handleSearch = e => {
        e.preventDefault();
        
        history.push(`?q=${searchText}`)
        
        console.log('Presionado y valor: ' + searchText)
    }
    


    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div>
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr />

                    <form
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                            >
                            Search
                        </button>
                    
                    </form>


                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    
                    {
                    (q==='') &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                        }

                    {
                    (q!=='') && (heroesFiltered.length === 0) &&
                        (<div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>)
                      }

                      {
                          (q!=='') && (heroesFiltered.length>0) && 
                            heroesFiltered.map(hero =>(
                                
                                <HeroCard
                                    key={hero.id}
                                    {...hero}
                                    />
                            ))}

                </div>

            </div>
        </div>
    )
}

export default SearchScreen
