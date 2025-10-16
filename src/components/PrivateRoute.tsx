import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';
import { useAuthStore } from '../store/useAuthStore';

interface PrivateRouteProps {
    path: string;
    exact?: boolean;
    component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, exact = false, component: Component }) => {
    const { isLogin } = useAuthStore();
    const router = useIonRouter();

    useEffect(() => {
        if (!isLogin) {
            router.push('/login', 'root');
        }
    }, [isLogin]);

    return (
        <Route
            path={path}
            exact={exact}
            render={() => (isLogin ? <Component /> : null)}
        />
    );
};

export default PrivateRoute