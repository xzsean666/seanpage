import RestClient from './RestClient'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 1. Create an instance of RestClient
const baseURL = 'https://jsonplaceholder.typicode.com' // A public API for demonstration
const api = new RestClient(baseURL)

// 2. Set up Request Interceptors (Optional)
// This interceptor will add an Authorization header to every request
const requestInterceptorId = api.setRequestInterceptor(
  (config: InternalAxiosRequestConfig) => {
    // In a real application, you might fetch a token from localStorage or a Pinia store
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      // config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${authToken}`
    }
    console.log('Request Sent:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error: any) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 3. Set up Response Interceptors (Optional)
// This interceptor will log responses and handle global errors
const responseInterceptorId = api.setResponseInterceptor(
  (response: AxiosResponse) => {
    console.log('Response Received:', response.status, response.config.url)
    return response
  },
  (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error - Status:', error.response.status)
      console.error('API Error - Data:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error: No response received')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Call the example function to run the demonstrations
// runExamples(); // Removed as the api instance will be exported

export { api, requestInterceptorId, responseInterceptorId } // Export the api instance instead of runExamples
