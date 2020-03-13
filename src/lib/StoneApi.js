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

      if (findS.length) {
        return {
          user: findS,
          userType: "student"
        }
      } else if (findF.length) {
        return {
          user: findF,
          userType: "faculty"
        }
      }
      
      return { user: null , userType: null };
    }
  },

  Section: {
    async createSection (name, FacultyId, PeriodId){
      return await insecurePost('/api/section/createSection', null, {name, FacultyId, PeriodId})
    }
  },

  Period: {
    async getCurrentPeriod () {
      const periods = await insecureGet('/api/period')
      const current = periods.filter( period => {
        return period.schoolYear==="2019" && period.semester==="2"
      } )

      return current[0] || null
    },
    

    async createPeriod (schoolYear, semester){
      return await insecurePost('/api/period/createPeriod', null, {schoolYear, semester})
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