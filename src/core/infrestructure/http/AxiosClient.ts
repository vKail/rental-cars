import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { getCookie } from "@/core/providers/CookiesUtils";
import { HTTP_STATUS_CODES } from "@/core/providers/HttpStatusCodes";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";


export class AxiosClient implements HttpHandler {
    private static instance: AxiosClient
    private axiosInstance: AxiosInstance
    private static readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    private static accessToken: string | null = null

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: AxiosClient.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        })

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const token = await getCookie('access_token')
                if (token) {
                    config.headers.Authorization = `Bearer ${token.replaceAll('"', '')}`
                  } else {
                    document.dispatchEvent(new CustomEvent('unauthorized'))
                  }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.axiosInstance.interceptors.response.use(
            (response) => {
              if (!['get'].includes(response.config.method || '')) toast.success('Acción realizada con éxito!')
              return response
            },
            (error) => {
              if (error.response) {
                toast.error(`Error: ${error.response.status} ${error.response.data?.message || error.message}`)
              } else {
                toast.error(`Error: ${error.message}`)
              }
              if (error.response?.status === HTTP_STATUS_CODES.FORBIDDEN) {
                if (typeof window !== 'undefined') {
                  window.location.href = '/dashboard'
                }
              }
              return Promise.reject(error)
            },
          )
    }

    public static getInstance(): AxiosClient {
        if (!AxiosClient.instance) {
            AxiosClient.instance = new AxiosClient()
        }

        return AxiosClient.instance
    }

    public static setAccessToken(accessToken: string): void {
        this.accessToken = accessToken
        if (this.instance) {
          this.instance.axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
        }
      }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const promise = this.axiosInstance.get<T>(url, config)
        const response: AxiosResponse<T> = await promise
        return response.data
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const promise = this.axiosInstance.post<T>(url, data, config)
        const response: AxiosResponse<T> = await promise
        return response.data
    }

    public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const promise = this.axiosInstance.put<T>(url, data, config)
        const response: AxiosResponse<T> = await promise
        return response.data
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const promise = this.axiosInstance.delete<T>(url, config)
        const response: AxiosResponse<T> = await promise
        return response.data
    }


    

}