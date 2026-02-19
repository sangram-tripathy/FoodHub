import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';
import { API_URL } from '../config';


const requestConfig={};

const Meals = () => {
  const{
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`${API_URL}/meals`,requestConfig,[]);

  if(isLoading){
    return <p className='center'>Fetching meals...</p>
  }
  if(error){
    return <Error title='Failed to fetch meals' message={error}/>
  }

  return (
    <ul id='meals'>
        {loadedMeals.map((meal)=>(
            <MealItem key={meal.id} meal={meal} />
        ))}
        </ul>
  )
}

export default Meals