import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;
console.log(`StoneCap API : ${baseURL}`);

export const StoneApi = {
  health: async () => {
    return await insecureGet('/api')
  },

  testfail: async () => {
    return await insecureGet('/api/failure')
  },

  Auth: {
    async login(email, password){
      return await insecurePost('/api/auth/login', null, {email, password})
    }
  },

  User: {
    async getFaculties(){  
      return await insecureGet('/api/faculty', null)
    },

    async getStudents(){  
      return await insecureGet('/api/student', null)
    },

    async getUser(email){  
      const students = await insecureGet('/api/student', null)
      const faculties = await insecureGet('/api/faculty', null)

      const findS = students ? students.filter(student=>student.email===email) : null
      const findF = faculties ? faculties.filter(faculty=>faculty.email===email) : null
      
      return findS ? findS : findF || null;
    }
  }
};

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