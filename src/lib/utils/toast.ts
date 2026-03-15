import { toast as sonnerToast } from 'sonner'

type ToastOptions = {
  description?: string
  duration?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}

/**
 * Custom toast utility with styled variants
 */
export const toast = {
  /**
   * Show a success toast (green)
   */
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      position: options?.position || 'top-right',
      description: options?.description,
      duration: options?.duration || 4000,
    })
  },

  /**
   * Show an error toast (red)
   */
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      position: options?.position || 'top-right',
      description: options?.description,
      duration: options?.duration || 5000,
    })
  },

  /**
   * Show a warning toast (yellow)
   */
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      position: options?.position || 'top-right',
      description: options?.description,
      duration: options?.duration || 4000,
    })
  },

  /**
   * Show an info toast (blue)
   */
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      position: options?.position || 'top-right',
      description: options?.description,
      duration: options?.duration || 4000,
    })
  },

  /**
   * Show a loading toast
   */
  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, {
      position: options?.position || 'top-right',
      description: options?.description,
    })
  },

  /**
   * Show a default toast
   */
  message: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      position: options?.position || 'top-right',
      description: options?.description,
      duration: options?.duration || 4000,
    })
  },

  /**
   * Dismiss a specific toast by ID or all toasts
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId)
  },
}
