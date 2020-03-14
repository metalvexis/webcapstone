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
      return insecurePost('/api/auth/login', null, {email, password})
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
    },
  },

  Student: {
    async getStudents(){  
      return await insecureGet('/api/student', null)
    },
    
    async getSection(StudentId){  
      return await insecureGet(`/api/student/${StudentId}/section`, null)
    },

    async getProject(StudentId){  
      return await insecureGet(`/api/student/${StudentId}/project`, null)
    }
  },

  Faculty: {
    async getFaculties(){
      return await insecureGet('/api/faculty', null)
    },

    async getSection(){  
      return await insecureGet('/api/faculty/:id/section', null)
    },

    getConsultationSchedule(id){  
      console.log({getSched: id})
      return insecureGet(`/api/faculty/${id}/schedule/consultation`, null) // TODO: Create Endpoint
    }
  },

  Section: {
    async createSection (FacultyId, PeriodId, name){
      return await insecurePost('/api/section/createSection', null, {name, FacultyId, PeriodId})
    },

    async fetchAllSection(){
      return await insecureGet('/api/section/fetch', null)
    },

    async getEnrollee(SectionId){
      return await insecureGet('/api/section/:id/enrollee', null)
    },
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
  },

  Schedule: {
    async createSchedule (FacultyId, dateTime, venue){
      return await insecurePost('/api/consultationschedule/createSchedule', null, {FacultyId, dateTime, venue, recurring: "once"})
    },
  },

  Project: {
    async createProject (studentIds, title, abstract){
      return await insecurePost('/api/researchproject/createProject', null, {studentIds, title, abstract})
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