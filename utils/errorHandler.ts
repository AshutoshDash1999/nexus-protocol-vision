
/**
 * Intelligently parses an error from an API call and returns a user-friendly string.
 * It specifically checks for common authentication/API key issues.
 * @param error The error object caught from a try-catch block.
 * @returns A user-friendly error message string.
 */
export const getApiErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        
        // Check for common API key error messages from Google's services.
        if (errorMessage.includes('api key not valid') || 
            errorMessage.includes('permission denied') ||
            errorMessage.includes('api_key') ||
            errorMessage.includes('authentication')) {
            return 'Authentication Error: The API Key is invalid or missing. Please ensure it is configured correctly.';
        }

        // Return the original message for other types of errors.
        return `An error occurred: ${error.message}`;
    }
    
    // Fallback for non-Error objects.
    return 'An unknown error occurred. Please try again.';
};
