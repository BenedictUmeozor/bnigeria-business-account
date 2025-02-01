import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import RootLayout from './layout/RootLayout';

const Dashboard = () => import('./pages/Dashboard');
const GetStarted = () => import('./pages/GetStarted');
const Onboarding = () => import('./pages/OnBoarding/Corporate');
const SoleTraderOnboarding = () => import('./pages/OnBoarding/SoleTrader');

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route Component={RootLayout}>
          <Route index lazy={Dashboard} />
          <Route path="onboarding">
            <Route path="sole-trader" lazy={SoleTraderOnboarding} />
            <Route path="corporate" lazy={Onboarding} />
          </Route>
        </Route>
        <Route path="get-started" lazy={GetStarted} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};
export default App;
