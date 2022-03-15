/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react';
import './App.css';

function App() {

  const [endpoint,setendpoint]= useState('');
  const [container,setContainer]= useState([]);

  const [finalInput , setFinalInput] = useState('');

useEffect(() => {
  fetchme()
},[finalInput])



  const onChangeHandler = (e) => {
    setendpoint(e.target.value)
    
  }
  const submitHandler = (e) => {
    e.preventDefault()
    setFinalInput(endpoint)
  }

  const fetchme = () => {

    fetch(`https://shazam.p.rapidapi.com/search?term=+${endpoint}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "9a0518fdebmshb2dc4e85a9b4188p102c03jsn9b16ba65610b"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setContainer(data.tracks.hits)
    })
    .catch(err => {
      console.error(err);
    }); }

  return (
    <div className='App'>
      <form onSubmit={submitHandler}>
        <input placeholder='Enter movie name...' type='text' value={endpoint} onChange={onChangeHandler}/>
        <button  type='submit'> Search</button>
      </form>
      <br></br>
      <div className='element'>
      {container.map((item,index) => {
          return (
            <div className='element_div'>

                <p>{item.track.title}</p>
                <a href={item.track.url}><img src={item.track.images.coverart} alt='coverart'/></a>
            </div>
              
          )
      })}
      </div>
      </div>
  );
}

export default App;
