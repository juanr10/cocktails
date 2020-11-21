import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import CategoriesProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';
import RecipesList from './components/RecipesList';
import ModalProvider from './context/ModalContext';

/**
 * @name: cocktails.
 * @description: Drinks searcher. Made with ReactJS (hooks & contextAPI), bootstrap, Material-UI(Modal) & FontAwesome.
 * @author: Juan Argudo.
 * @version: 22/04/2020.
 */
function App() {
  return (
    <CategoriesProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>

            <RecipesList />

          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoriesProvider>
  );
}

export default App;
