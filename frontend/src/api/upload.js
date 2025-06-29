// src/api/upload.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 30000, // 30 second timeout
});

/**
 * Uploads a file to the server with progress tracking
 * @param {File} file - The file to upload
 * @param {Function} [onUploadProgress] - Progress callback
 * @returns {Promise<string>} - URL of the uploaded file
 */
export const uploadFile = async (file, onUploadProgress) => {
  // Validate file
  if (!file) {
    throw new Error('No file provided');
  }

  // Check file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Validate file type (images only in this example)
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and GIF images are allowed');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percentCompleted);
        }
      },
    });

    if (!response.data.url) {
      throw new Error('Server did not return file URL');
    }

    toast.success('File uploaded successfully!');
    return response.data.url;
  } catch (error) {
    let errorMessage = 'Upload failed';
    
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      errorMessage = error.response.data?.message || error.response.statusText;
    } else if (error.request) {
      // Request made but no response received
      errorMessage = 'Network error - no response from server';
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Deletes an uploaded file
 * @param {string} fileUrl - URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileUrl) => {
  try {
    await api.delete('/upload', {
      data: { fileUrl },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    toast.success('File deleted successfully!');
  } catch (error) {
    toast.error('Failed to delete file');
    throw error;
  }
};

// Optional: File preview generator
export const generatePreview = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};