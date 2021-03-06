import { insecureGet, insecurePost } from './AxiosConfig.js';

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
      const students = await insecureGet('/api/student/all', null)
      const faculties = await insecureGet('/api/faculty/all', null)

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
      return await insecureGet('/api/student/all', null)
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
      return await insecureGet('/api/faculty/all', null)
    },

    async getSection(id){  
      return await insecureGet(`/api/faculty/${id}/section`, null)
    },

    getConsultationSchedule(id){
      return insecureGet(`/api/faculty/${id}/schedule/consultation`, null)
    },

    getDefenseSchedule(id){
      return insecureGet(`/api/faculty/${id}/schedule/defense`, null)
    },

    getProject(id){
      return insecureGet(`/api/faculty/${id}/project`, null)
    },
    
    async setAdviser(FacultyId, ResearchProjectId){
      return await insecurePost(`/api/faculty/setAdviser`, null, {FacultyId, ResearchProjectId})
    },

    async setPanelist(FacultyIds, ResearchProjectId){
      return await insecurePost(`/api/faculty/setPanelist`, null, {FacultyIds, ResearchProjectId})
    }
  },

  Section: {
    async createSection (FacultyId, PeriodId, name){
      return await insecurePost('/api/section/createSection', null, {name, FacultyId, PeriodId})
    },

    async fetchSection(SectionId){
      return await insecureGet(`/api/section/fetch/${SectionId}`, null)
    },

    async getEnrollee(SectionId){
      return await insecureGet(`/api/section/${SectionId}/enrollee`, null)
    },

    async addEnrollee(SectionId, enrollee){
      return await insecurePost(`/api/section/${SectionId}/addEnrollee`, null, {ResearchSectionId: SectionId, enrollee})
    }
  },

  Period: {
    async getCurrentPeriod () {
      const periods = await insecureGet('/api/period/all')
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

    async fetchSchedule (ConsultationScheduleId){
      return await insecureGet(`/api/consultationschedule/fetch/${ConsultationScheduleId}`, null)
    },
  },

  Project: {
    async createProject (studentIds, title, abstract){
      return await insecurePost('/api/researchproject/createProject', null, {studentIds, title, abstract})
    },

    async updateProject (ResearchProjectId, title, abstract){
      return await insecurePost('/api/researchproject/updateProject', null, {ResearchProjectId, title, abstract})
    },

    async fetchProject (ResearchProjectId){
      return await insecureGet(`/api/researchproject/fetch/${ResearchProjectId}`, null)
    },

    async setProponent(ResearchProjectId, StudentIds){
      return await insecurePost('/api/researchproject/setProponent', null, {ResearchProjectId, StudentIds})
    }
  },

  Appointment: {
    async sendRequest (ResearchProjectId, ConsultationScheduleId, concern) {
      return await insecurePost('/api/appointment/sendRequest', null, {ResearchProjectId, ConsultationScheduleId, concern})
    },

    async sendResponse (ResearchProjectId, ConsultationScheduleId, prerequisite, status) {
      return await insecurePost('/api/appointment/sendResponse', null, {ResearchProjectId, ConsultationScheduleId, prerequisite, status})
    },

    async setFeedback (ResearchProjectId, ConsultationScheduleId, feedback) {
      return await insecurePost('/api/appointment/setFeedback', null, {ResearchProjectId, ConsultationScheduleId, feedback})
    },

    async fetchAppointment (AppointmentId) {
      return await insecureGet(`/api/appointment/fetch/${AppointmentId}`, null)
    },

  },

  Criteria: {
    async fetchCriteria (CriteriaId) {
      return await insecureGet(`/api/criteria/fetch/${CriteriaId}`, null)
    },

    async create (title, description, percentage) {
      return await insecurePost('/api/criteria/create', null, {title, description, percentage})
    }
  },

  GradingSheet: {
    async fetchGradingSheet (GradingSheetId) {
      return await insecureGet(`/api/gradingsheet/fetch/${GradingSheetId}`, null)
    },

    async createGradingSheet (ResearchProjectId, PanelistIds, criteria) {
      return await insecurePost('/api/gradingsheet/createGradingSheet', null, { ResearchProjectId, PanelistIds, criteria })
    }
  },

  Defense: {
    async fetchDefenseSchedule (DefenseScheduleId) {
      return await insecureGet(`/api/defenseschedule/fetch/${DefenseScheduleId}`, null)
    },

    async createDefenseSchedule (ResearchProjectId, PanelistIds, dateTime, venue, category) {
      return await insecurePost('/api/defenseschedule/createDefenseSchedule', null, { ResearchProjectId, PanelistIds, dateTime, venue, category })
    }
    
  }
};
