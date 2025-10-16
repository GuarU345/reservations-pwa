import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';
import { useAuthStore } from '../store/useAuthStore';

interface PublicRouteProps {
    path: string;
    exact?: boolean;
    component: React.FC;
    redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
    path,
    exact = false,
    component: Component,
    redirectTo = '/home',
}) => {
    const { isLogin } = useAuthStore();
    const router = useIonRouter();

    useEffect(() => {
        if (isLogin) {
            router.push(redirectTo, 'root');
        }
    }, [isLogin]);

    return (
        <Route
            path={path}
            exact={exact}
            render={() => (!isLogin ? <Component /> : null)}
        />
    );
};

export default PublicRoute