import React,{useEffect,useState} from 'react'
import './App.css'
import Recipe from './Recipe';


const App = () => {
  const APP_ID = '52f19399';
  const APP_key = '6aea33a6a6940771b112c876bc368460';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("")
  const  [query, setQuery]= useState('chicken')
  
  useEffect(()=>{
    getRecipes()
  }, [query])

  const getRecipes = async() => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_key}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)


  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    // after the search to reset the search input
    setSearch('')
  }

  return(
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input onChange={updateSearch} className='search-bar' type='text' value={search}></input>
        <button  className='search-button' type='submit'>Search</button>
      </form>
      <div className= 'recipes'>
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label} calories={recipe.recipe.calories}
        image= {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        ></Recipe>
      ))}
    </div>
    </div>
  )
}

export default App;
