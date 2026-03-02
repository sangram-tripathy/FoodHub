import { useState } from 'react';
import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';
import Loading from './UI/Loading';
import { API_URL } from '../config';


const requestConfig={};

const Meals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const{
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`${API_URL}/meals`,requestConfig,[]);

  // Filter meals based on search term
  const filteredMeals = loadedMeals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(isLoading){
    return <Loading message="Fetching delicious meals..." />;
  }
  if(error){
    return <Error title='Failed to fetch meals' message={error}/>
  }

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search for meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredMeals.length === 0 ? (
        <div className="no-results">
          <p>No meals found matching "{searchTerm}"</p>
          <p>Try searching for something else!</p>
        </div>
      ) : (
        <ul id='meals'>
          {filteredMeals.map((meal)=>(
              <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Meals