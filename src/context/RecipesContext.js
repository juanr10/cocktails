import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
    //Flag to know if the user is searching.
    const [consult, saveConsult] = useState(false);

    const [recipesSearch, saveRecipesSearch] = useState({
        name: '',
        category: ''
    });

    const [recipes, saveRecipes] = useState([]);
   
    useEffect( () => {
        //When recipesSearch is updated and the user is searching:
        if (consult){
            const getRecipes = async () => {
                const urlIngredient =`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipesSearch.name}`;
                const urlComplete = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipesSearch.name}&c=${recipesSearch.category}`;
                let url = '';
                //Search only by ingredient or both
                (recipesSearch.category==='') ? url = urlIngredient : url = urlComplete;
      
                const result = await axios.get(url);
                saveRecipes(result.data.drinks);
            }
            getRecipes();
        }
    },[recipesSearch, consult]);


    return( 
        <RecipesContext.Provider
            value={{
                recipes,
                consult,
                saveRecipesSearch,
                saveConsult
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;