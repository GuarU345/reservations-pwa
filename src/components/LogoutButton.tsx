import { IonAlert, IonButton, IonIcon } from "@ionic/react"
import { logOutOutline } from "ionicons/icons"
import { useLogout } from "../hooks/useLogout"

const LogoutButton: React.FC = () => {
    const {
        handleLogout,
        success,
        setSuccess,
        error,
        setError
    } = useLogout()

    return (
        <>
            <IonButton onClick={handleLogout}>
                <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>

            <IonAlert
                header='Exito'
                isOpen={success}
                onDidDismiss={() => setSuccess(false)}
                message="Sesión cerrada correctamente"
                buttons={['Ok']}
            />

            <IonAlert
                isOpen={!!error}
                onDidDismiss={() => setError('')}
                header="Error"
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default LogoutButton