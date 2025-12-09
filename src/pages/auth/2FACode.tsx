import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar, useIonRouter } from "@ionic/react";
import React, { useState } from "react";
import ValidationAlert from "../../components/ValidationAlert";
import { useFetchVerifyCode } from "../../hooks/useFetchVerifyCode";

const VerifyCode: React.FC = () => {
    const {
        handleVerifyCode,
        isLoading,
        isSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors,
    } = useFetchVerifyCode();

    const router = useIonRouter();
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            email: formData.get("email") as string,
            usr_id: formData.get("id") as string,
        };
        handleVerifyCode(data);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Verificación de código</IonTitle>
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
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value || "")}
                                required
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Código de verificación</IonLabel>
                            <IonInput
                                type="text"
                                name="code"
                                required
                            />
                        </IonItem>

                        <IonToast
                            isOpen={isSuccess}
                            position="middle"
                            message="Código verificado correctamente"
                            duration={2000}
                        />

                        <ValidationAlert
                            isOpen={validationErrors.length > 0}
                            onDidDismiss={() => setValidationErrors([])}
                            header="Corrige los siguientes errores"
                            validationErrors={validationErrors}
                        />

                        <IonAlert
                            isOpen={!!error}
                            onDidDismiss={() => setError("")}
                            header="Error"
                            message={error || ""}
                            buttons={["Entendido"]}
                        />

                        <div>
                            <IonButton type="submit" expand="block" disabled={isLoading}>
                                {isLoading ? <IonSpinner name="crescent" /> : "Verificar Código"}
                            </IonButton>
                        </div>

                        <div>
                            <IonButton
                                fill="clear"
                                color="primary"
                                onClick={() => router.push("/home")}>
                                Ir directamente a Inicio
                            </IonButton>
                        </div>
                    </IonList>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default VerifyCode;
