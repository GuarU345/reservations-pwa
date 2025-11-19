import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Reservations from './pages/Reservations';
import Register from './pages/auth/Register';
import Business from './pages/Business';
import Businesses from './pages/Businesses';
import FavoriteBusinesses from './pages/FavoritesBusinesses';
import SessionChecker from './components/SessionChecker';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/auth/Login';
import PushSubscriber from './components/PushSubscriber';

setupIonicReact();
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <SessionChecker />
          <PushSubscriber />
          <IonRouterOutlet>
            {/* Protected Routes */}
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/reservations" component={Reservations} />
            <PrivateRoute exact path="/businesses" component={Businesses} />
            <PrivateRoute exact path="/businesses/:businessId" component={Business} />
            <PrivateRoute exact path="/favorites" component={FavoriteBusinesses} />

            {/* Public Routes */}
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/" component={Login} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  )
};

export default App;
