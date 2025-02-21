import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from './router/router';
import AuthProvider from './Provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>
 </AuthProvider>
  </StrictMode>,
)
