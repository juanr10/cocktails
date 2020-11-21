import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    const [idRecipe, saveIdRecipe] = useState(null);
    const [recipeDetails, saveRecipeDetails] = useState({});

    //Once a recipe is selected, it performs the call using the id:
    useEffect(() => {
        const getRecipeDetails = async () => {
            if(!idRecipe) return null;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
            const result = await axios.get(url);
            saveRecipeDetails(result.data.drinks[0]);
        }
        getRecipeDetails();
    },[idRecipe]);

    return (
        <ModalContext.Provider
            value={{
                recipeDetails,
                saveRecipeDetails,
                saveIdRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;