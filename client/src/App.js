import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./styles.css"
import { Oval } from  'react-loader-spinner';


function App() {
	const [data,setData] = useState()
	const [query,setQuery] = useState({stock:'',date:''})
	const [loading,setLoading] = useState(false)
	const [flag,setFlag] = useState(false)

	
	const updateQuery = (e) => {
		const fieldname = e.target.name;
		setQuery(existing =>({
			...existing,
			[fieldname] : e.target.value
		}))	
	}

	const fetchStock = async () => {
		setLoading(!loading)
		let res_data;
		res_data = await axios.get('http://localhost:5000/api/fetchStockData',{params:query})
		.then(res_data =>{
			setData(res_data.data)
			setLoading(!loading)
			setQuery({stock:'',date:''})
			setLoading(!loading)
		 })
		.catch( (error)=> {
			console.log(error.toJSON());
			setFlag(true)
			setLoading(false)
			setQuery({stock:'',date:''})	
		  });
			
	}
	return (
		<>	
			<form>
				<input required type='text' placeholder='Enter the Stock Name' name="stock" maxLength="4" size="4" value={query.stock} onChange={updateQuery}></input>
				<input required type="date" id="date" name="date" value={query.date} onChange={updateQuery}></input>
				<button type="button" onClick={fetchStock}>Search</button>
			</form>
		<div>
		{flag === true? <h4>Something went wrong, try again!!!</h4>:""}
			{data?<>
			<div className='server-response'>
				<h1>{data.stock}</h1>
				<h3>Open: {data.stats[0].o}</h3>
				<h3>High: {data.stats[0].h}</h3>
				<h3>Low: {data.stats[0].l}</h3>
				<h3>Close: {data.stats[0].c}</h3>
				<h3>Volume: {data.stats[0].v}</h3>
			</div>
			</>: loading && <div className='spinner'><Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}
/></div>
}
		</div>

	</>
	);
}

export default App;