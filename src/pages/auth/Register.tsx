import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { useFetchSignup } from "../../hooks/useFetchSignup"
import ValidationAlert from "../../components/ValidationAlert"

const Register: React.FC = () => {
    const {
        handleSignup,
        isLoading,
        setError,
        error,
        setValidationErrors,
        validationErrors,
        setSuccess,
        success
    } = useFetchSignup()

    const router = useIonRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string,
        }

        handleSignup(data)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registrate</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <form onSubmit={handleSubmit}>
                    <IonList>

                        <IonItem>
                            <IonLabel position="floating">Nombre</IonLabel>
                            <IonInput
                                type="text"
                                name="name"
                                required
                            />
                        </IonItem>

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

                        <IonItem>
                            <IonLabel position="floating">Telefono</IonLabel>
                            <IonInput
                                type="text"
                                name="phone"
                                required
                            />
                        </IonItem>

                        <IonAlert
                            isOpen={success}
                            onDidDismiss={() => setSuccess(false)}
                            header="Registro Exitoso"
                            message="Te has registrado correctamente"
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


                        {/* Botón */}
                        <div className="ion-text-center ion-margin-top">
                            <IonButton type="submit" expand="block" disabled={isLoading}>
                                {isLoading ? <IonSpinner name="crescent" /> : 'Registrarme'}
                            </IonButton>
                        </div>

                        <div>
                            <IonButton
                                style={{ display: 'flex', alingItems: 'center' }}
                                fill="clear"
                                color="primary"
                                onClick={() => router.push('/login')}
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </IonButton>
                        </div>
                    </IonList>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Register