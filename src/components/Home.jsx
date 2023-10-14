import React, { useState } from 'react'
import axios from 'axios'
const Home = () => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const getEmail = (event) => {
  // Start loading

  event.preventDefault();
  const apiUrl = `https://validemail.io/v1/validate?api_key=${process.env.REACT_APP_API_KEY}&email=${event?.target[0]?.value}`;

  if (event?.target[0]?.value.length > 0) {
    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed:", error);
        setLoading(false);
      });
  }
};

  console.log(data)
  return (
    <div className='home-container'>
      <span>Validate any email address</span> 
      <div class="container">
	<div class="container__item">
		<form class="form" onSubmit={getEmail}>
			<input type="email" class="form__field" placeholder="Your E-Mail Address" />
			<button type="submit" class="btn btn--primary btn--inside uppercase">{loading ? 'Checking..' : 'Check'}</button>
		</form>
	</div>
	
</div>
{
  data?.message && 
  <div className='info-card' style={{background : data.is_valid == 'Valid' ? 'green' : 'red'}}>
  <span>{data?.message}</span>
</div>
}

    </div>
  )
}

export default Home
