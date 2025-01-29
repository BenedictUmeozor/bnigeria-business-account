import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import RootLayout from './layout/RootLayout';

const Onboarding = () => import('./pages/OnBoarding');
const SoleTraderOnboarding = () => import('./pages/SoleTraderOnboarding');
const GetStarted = () => import('./pages/GetStarted');

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route Component={RootLayout}>
          <Route index lazy={SoleTraderOnboarding} />
          <Route path="corporate" lazy={Onboarding} />
        </Route>
        <Route path="get-started" lazy={GetStarted} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};
export default App;
