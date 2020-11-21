import React, {useContext, useState, useEffect} from 'react';
import Recipe from './Recipe';
import Spinner from './Spinner';
import Error from './Error';
import {RecipesContext} from '../context/RecipesContext';

/**
 * @name: RecipesList.
 * @description: Go through all the recipes obtained by passing them to the Recipes component. If there are no recipes, it indicates an error message.
 * @param: none.
 * @return: View of each recipe.
 */
const RecipesList = () => {
    //RecipesContext data
    const {recipes, consult} = useContext(RecipesContext);
    //Loading spinner flag
    const [loading, saveLoading] = useState(false);

    const [results, saveResults] = useState('');

    useEffect( () => {
        if(consult){
            //Show spinner
            saveLoading(true);

            //Recipes management
            const results = (!recipes) ? 
                <div className="col-12"><Error message="No results, try another one."/></div>
                : 
                recipes.map(recipe => (
                    <Recipe 
                        key={recipe.idDrink}
                        recipe={recipe}
                    />
                ));

            saveResults(results);

            //Hide spinner
            setTimeout(() => {
            saveLoading(false);
            }, 2000)
        }
    },[consult, recipes]);

    return (
        <div className="row mt-4">
            {(loading) ? 
                <Spinner/> :
                results
            }
        </div>
    );
};

export default RecipesList;