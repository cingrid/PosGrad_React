import { toast } from 'react-toastify'

export const toastSuccess = (texto: string) => toast.success(texto)
export const toastError = (texto: string) => toast.error(texto)