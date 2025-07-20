import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

class RestClient {
  private axiosInstance: AxiosInstance

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public setRequestInterceptor(
    onFulfilled?: (
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    onRejected?: (error: any) => any
  ): number {
    return this.axiosInstance.interceptors.request.use(onFulfilled, onRejected)
  }

  public setResponseInterceptor(
    onFulfilled?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  ): number {
    return this.axiosInstance.interceptors.response.use(onFulfilled, onRejected)
  }

  public ejectRequestInterceptor(interceptorId: number): void {
    this.axiosInstance.interceptors.request.eject(interceptorId)
  }

  public ejectResponseInterceptor(interceptorId: number): void {
    this.axiosInstance.interceptors.response.eject(interceptorId)
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', path, undefined, config)
  }

  async post<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('POST', path, data, config)
  }

  async put<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('PUT', path, data, config)
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config)
  }

  private async request<T>(
    method: string,
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      let response: AxiosResponse<T>
      switch (method) {
        case 'GET':
          response = await this.axiosInstance.get<T>(path, config)
          break
        case 'POST':
          response = await this.axiosInstance.post<T>(path, data, config)
          break
        case 'PUT':
          response = await this.axiosInstance.put<T>(path, data, config)
          break
        case 'DELETE':
          response = await this.axiosInstance.delete<T>(path, config)
          break
        default:
          throw new Error(`Unsupported HTTP method: ${method}`)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios request failed:',
          error.response?.data || error.message
        )
        throw new Error(error.response?.data?.message || error.message)
      } else {
        console.error('Unexpected error:', error)
        throw error
      }
    }
  }
}

export default RestClient
