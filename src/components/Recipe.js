import React, {useState, useContext, Fragment} from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Spinner from './Spinner';
import { makeStyles } from '@material-ui/core/styles';
import {ModalContext} from '../context/ModalContext';

//Modal management
function getModalStyle() {
    const top =  50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 700,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

/**
 * @name: Recipe.
 * @description: Formats the data of the received object.
 * @param: Recipe object from RecipeList.
 * @return: Recipe view.
 */
const Recipe = ({recipe}) => {
    //Modal configuration
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
        showSpinner();
    };

    const handleClose = () => {
        setOpen(false);
    };

    //ModalContext data
    const {saveIdRecipe, recipeDetails, saveRecipeDetails} = useContext(ModalContext);
    //Spinner flag
    const [loading, saveLoading] = useState(false);

    /**
     * @name:showIngredients.
     * @description:Formats the ingredients obtained by the API.
     * @param:Ingredientes array.
     * @return:Formatted ingredients array.
    */
    const showIngredients = recipeDetails => {
        let ingredients = [];
        for (let index = 1; index < 16; index++) {
            if(recipeDetails[`strIngredient${index}`]){
                ingredients.push(
                    <li key={index}>{ recipeDetails[`strIngredient${index}`] } { recipeDetails[`strMeasure${index}`] }.
                    </li>
                );
            }          
        }
        return ingredients;
    }

    /**
     * @name: showSpinner.
     * @description: Show and hide spinner.
     * @param: none.
     * @return: none.
    */
    const showSpinner = function(){
        //Show spinner
        saveLoading(true);
         //Hide spinner
         setTimeout(() => {
            saveLoading(false);
        }, 1000)
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                {/* TITLE & IMAGE */}
                <h4 className="card-title text-center">{recipe.strDrink}</h4>       
                <img className="card-img-top rounded" 
                    src={recipe.strDrinkThumb} 
                    alt={`${recipe.strDrink}`}
                />
                {/* BUTTON & ICONS */}
                <div className="card-body card-title">
                    <button 
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                            //Send id to ModalContext
                            saveIdRecipe(recipe.idDrink);
                            handleOpen();
                        }}
                    >
                        <i className="far fa-list-alt"></i> Recipe
                    </button>
                    <i className="fas fa-share-alt text-muted float-right p-1 my-2" data-toggle="tooltip" data-placement="top" title="Share this post"></i>
                    <i className="fas fa-heart text-muted float-right p-1 my-2 mr-3" data-toggle="tooltip" data-placement="top" title="I like it"></i>
                {/* MODAL */}
                    <Modal
                        open={open}
                        onClose={() => {
                            //Clean id
                            saveIdRecipe(null);
                            //Clean modal data
                            saveRecipeDetails({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            {(loading) ? <Spinner /> : 
                                (<Fragment>
                                    <h2>{recipeDetails.strDrink}</h2>
                                    <h3 className="mt-2">Instructions</h3>
                                    <p>{recipeDetails.strInstructions}</p>
                                    <h3 className="mt-2">Ingredients and quantities</h3>
                                    <ul>
                                        { showIngredients(recipeDetails) }
                                    </ul>
                                </Fragment>)
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired
}

export default Recipe;