import React, {useContext, useState} from 'react';
import Error from './Error';
import {CategoriesContext} from '../context/CategoriesContext';
import {RecipesContext} from '../context/RecipesContext';

/**
 * @name: Form.
 * @description: Displays the form view, collects the data entered by the user, and passes it to the RecipesContext.
 * @param: none.
 * @return: Form view.
 */
const Form = () => {
    //Categories from CategoriesContext
    const {categories} = useContext(CategoriesContext);
    //Update functions from RecipesContext
    const {saveRecipesSearch, saveConsult} = useContext(RecipesContext);
    //Error flag
    const [error, saveError] = useState(false);

    const [search, saveSearch] = useState({
        name: '',
        category: ''
    });

    /**
     * @name: getSearchData
     * @description: Update component state reading the data introduced by the user.
     * @param: event.
     * @return: none.
    */
    const getSearchData = e =>{
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        });
    }

    /**
     * @name: handleSubmit.
     * @description: Validates the state of the component and passes the data to RecipesContext.
     * @param: event.
     * @return:
    */
    const handleSubmit = e =>{
        e.preventDefault();
        if(search.name === '' && search.category === ''){
            saveError(true);
            return;
        }
        //User is searching
        saveConsult(true);
        //Update RecipesContext state
        saveRecipesSearch(search);
        //Clean errors
        saveError(false);
    }

    return (
        <form className="col-12"
            onSubmit = {handleSubmit}
        >
            <fieldset className="text-center card-title">
                <legend><strong>SEARCH BY INGREDIENT OR CATEGORY</strong></legend>
            </fieldset>
            <div className="row mt-4">
                {/* INGREDIENTS */}
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Insert an ingredient, ex. vodka"
                        onChange={getSearchData}
                    />
                </div>
                {/* CATEGORY */}
                <div className="col-md-4">
                    <select className="form-control select-mobile-style" name="category" onChange={getSearchData}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>
                {/* SUBMIT */}
                <div className="col-md-4">
                    <button type="submit" className="btn btn-block btn-primary"><i className="fas fa-search"></i> Search</button> 
                </div>
            </div>
            {/* ERROR MESSAGE */}
            {error ? <Error message="Complete at least one field"/> : null}
        </form>
    );
};

export default Form;