import axios from 'axios'

// Create axios instance with default config
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Update this to match your Spring Boot backend URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // You can add auth token here if needed
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default instance 