import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import React from "react"
import ValidationAlert from "../../components/ValidationAlert"
import { useFetchSignin } from "../../hooks/useFetchSignin"

const Login: React.FC = () => {
    const {
        handleSignin,
        isLoading,
        setError,
        error,
        setValidationErrors,
        validationErrors,
        setSuccess,
        success
    } = useFetchSignin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        handleSignin(data)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicio de sesión</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <form onSubmit={handleSubmit}>
                    <IonList>

                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                type="email"
                                name="email"
                                required
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput
                                type="password"
                                name="password"
                                required
                            />
                        </IonItem>

                        <IonAlert
                            isOpen={success}
                            onDidDismiss={() => setSuccess(false)}
                            header="Exito"
                            message="Inicio de sesion correcto"
                            buttons={['Entendido']}
                        />

                        <ValidationAlert
                            isOpen={validationErrors.length > 0}
                            onDidDismiss={() => setValidationErrors([])}
                            header="Corrige los siguientes errores"
                            validationErrors={validationErrors}
                        />

                        <IonAlert
                            isOpen={!!error}
                            onDidDismiss={() => setError('')}
                            header="Error"
                            message={error || ''}
                            buttons={['Entendido']}
                        />

                        <div className="ion-text-center ion-margin-top">
                            <IonButton type="submit" expand="block" disabled={isLoading}>
                                {isLoading ? <IonSpinner name="crescent" /> : 'Iniciar Sesión'}
                            </IonButton>
                        </div>
                    </IonList>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Login