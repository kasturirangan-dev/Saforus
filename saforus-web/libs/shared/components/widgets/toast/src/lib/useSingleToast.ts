/**
 * This module provides a showToast object with methods for displaying toast notifications.
 * Toast Rules:
 * Keep Toast Message up is 5 seconds
 * Plus 1 extra second for every 100 words, rounding up. 
 * Only show 1 toast message until it's closed (We are showing whenever users click no, it makes so many message)
 * It ensures that only one toast is active at a time.
 * 
 * @module useSingleToast
 */

import { toast, Id, ToastOptions } from 'react-toastify';

/** @type {Id} The ID of the currently active toast. */
let toastId: Id;

/**
 * An object with methods for showing toast notifications.
 * 
 * @namespace showToast
 */

export const showToast = {
    /**
     * Displays a success toast notification.
     * 
     * @param {string} message - The message to display in the toast.
     * @param {ToastOptions} [options] - Optional settings for the toast.
     */
    success: (message: string, options?: ToastOptions) => {
        const duration = calculateDuration(message);
        if (!toast.isActive(toastId)) {
            toastId = toast.success(message, { autoClose: duration, ...options });
        }
    },
    /**
     * Displays an error toast notification.
     * 
     * @param {string} message - The message to display in the toast.
     * @param {ToastOptions} [options] - Optional settings for the toast.
     */
    error: (message: string, options?: ToastOptions) => {
        const duration = calculateDuration(message);
        if (!toast.isActive(toastId)) {
            toastId = toast.error(message, { autoClose: duration, ...options });
        }
    },
    /**
     * Displays a warning toast notification.
     * 
     * @param {string} message - The message to display in the toast.
     * @param {ToastOptions} [options] - Optional settings for the toast.
     */
    warning: (message: string, options?: ToastOptions) => {
        const duration = calculateDuration(message);
        if (!toast.isActive(toastId)) {
            toastId = toast.warning(message, { autoClose: duration, ...options });
        }
    },
    /**
     * Displays an info toast notification.
     * 
     * @param {string} message - The message to display in the toast.
     * @param {ToastOptions} [options] - Optional settings for the toast.
     */
    info: (message: string, options?: ToastOptions) => {
        const duration = calculateDuration(message);
        if (!toast.isActive(toastId)) {
            toastId = toast.info(message, { autoClose: duration, ...options });
        }
    },
        /**
     * Dismisses the currently displayed toast notification.
     */
    dismiss: () => {
        toast.dismiss(toastId);
    },
};

/**
 * Calculates the duration a toast should be displayed based on the number of words in the message.
 * 
 * @param {string} message - The message to display in the toast.
 * @returns {number} The duration the toast should be displayed, in milliseconds.
 */
function calculateDuration(message: string) {
    const words = message.split(/\s+/).length;
    const extraSeconds = Math.ceil(words / 100);
    const duration = 5000 + extraSeconds * 1000;
    return duration;
}