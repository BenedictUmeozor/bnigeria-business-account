import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import RootLayout from './layout/RootLayout';

const Onboarding = () => import('./pages/OnBoarding');

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={RootLayout}>
        <Route index lazy={Onboarding} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};
export default App;
