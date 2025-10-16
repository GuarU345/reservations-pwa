import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar, useIonRouter } from "@ionic/react"
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

    const router = useIonRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(e.target as HTMLFormElement)
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        handleSignin(data)
        form.reset()
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

                        <IonToast
                            isOpen={success}
                            onDidDismiss={() => setSuccess(false)}
                            message="Inicio de sesion correcto"
                            duration={1500}
                            position="middle"
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

                        <div>
                            <IonButton type="submit" expand="block" disabled={isLoading}>
                                {isLoading ? <IonSpinner name="crescent" /> : 'Iniciar Sesión'}
                            </IonButton>
                        </div>

                        <div>
                            <IonButton
                                style={{ display: 'flex', alingItems: 'center' }}
                                fill="clear"
                                color="primary"
                                onClick={() => router.push('/register')}
                            >
                                ¿No tienes cuenta? Regístrate
                            </IonButton>
                        </div>
                    </IonList>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Login