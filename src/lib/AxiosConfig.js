import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;
console.log(`StoneCap API : ${baseURL}`);


const insecureaxiosJson = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function insecureGet (url='', params={}) {
  try{
    let response = await insecureaxiosJson.get(url, {
      params
    });
    let { data } = response;
    return(data);
  }catch(err){
    const { data, status } = err.response;
    console.error(status, data);
  }
}

async function insecurePost (url='', params={}, body={}) {
  try{
    let response = await insecureaxiosJson.post(url, body, {
      params
    });
    let { data } = response;
    console.log({returnData: data})
    return(data);
  }catch(err){
    // const { data, status } = err.response;
    console.error(err);
  }
}

export {
  insecureGet,
  insecurePost
}