import {useState, useEffect} from "react"
import axios from 'axios'

export default function Hello(){
    // useEffect( () => { 
    //     async function fetchData() {
    //         try {
    //             const data = {
    //                 siteUrl: 'https://www.linkedin.com/jobs/search/?currentJobId=3570594499&f_C=1480%2C236175%2C1053555%2C5273045%2C48453&geoId=91000000&originToLandingJobPostings=3570594499%2C3464449124%2C3407679990%2C3569003063%2C3555148105%2C3542756041%2C3533522946%2C3468310171%2C3562643898'
    //             };
    //             const res = await axios.post('/api/postData', data, {
    //                 'Content-Type': 'application/json'
    //               });
    //             console.info('response', res);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     fetchData();
    // }, []);
    const [_url, setUrl] = useState("");
    

    const handleSubmit = async (event) => {
        console.info('clicked submit button');
        event.preventDefault();
        try {
        //   const res = await axios.post("/api/submit-_url", { _url });
            
          const res = await axios.post('/api/postData', {_url});
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="_url">Enter URL:</label>
            <input
              type="text"
              id="_url"
              value={_url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}


/*
const Hello = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/submit-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    console.log(data);
  };

  
};
*/