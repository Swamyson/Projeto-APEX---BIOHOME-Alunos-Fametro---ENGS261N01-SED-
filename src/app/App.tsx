import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppSettingsProvider } from './contexts/AppSettingsContext';

export default function App() {
  return (
    <AppSettingsProvider>
      <RouterProvider router={router} />
    </AppSettingsProvider>
  );
}
