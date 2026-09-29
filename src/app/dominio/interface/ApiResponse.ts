export interface ApiResponse <T> {
    succeeded: boolean
    message: string
    totalRecords: number
    errors: string
    data: T[]
  }
  