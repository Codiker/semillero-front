import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const reportsService = {

  async getAllActivities(eventId) {
    const response = await axios.get(`${API_URL}reports/events/${eventId}/activities`)
    return response.data.actividades
  },


  async getProjectsWithAuthors() {
    const response = await axios.get(`${API_URL}reports/projects/with-authors`)
    return response.data.data
  },

  async getCertificates() {
    const response = await axios.get(`${API_URL}reports/certificates`)
    return response.data.data
  },

  async generateCertificate(payload) {
    const response = await axios.post(`${API_URL}reports/certificates/generate`, payload)
    return response.data
  },


  async generateCertificatesForEvent(eventId) {
    const response = await axios.get(`${API_URL}reports/certificates/event/${eventId}/generate-all`)
    return response.data
  },


  async getEventReport(eventId) {
    const response = await axios.get(`${API_URL}reports/events/${eventId}/report`)
    return response.data
  },

  async getProjectScores() {
    const response = await axios.get(`${API_URL}reports/projects/scores`)
    return response.data.data
  }
}
