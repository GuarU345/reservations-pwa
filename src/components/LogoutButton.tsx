import { IonAlert, IonButton, IonIcon, IonToast } from "@ionic/react"
import { logOutOutline } from "ionicons/icons"
import { useLogout } from "../hooks/useLogout"

const LogoutButton: React.FC = () => {
    const {
        handleLogout,
        isSuccess,
        error,
        setError
    } = useLogout()

    const handleClick = () => {
        handleLogout()
    }

    return (
        <>
            <IonButton onClick={handleClick}>
                <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>

            <IonToast
                isOpen={isSuccess}
                position="middle"
                message="Sesión cerrada correctamente"
                duration={2000}
            />

            <IonAlert
                isOpen={!!error}
                onDidDismiss={() => setError("")}
                header="Error"
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default LogoutButton