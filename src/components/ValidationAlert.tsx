import {
    IonPage,
    IonContent,
    IonButton,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";

interface ValidationAlertProps {
    isOpen: boolean;
    validationErrors: string[];
    onDidDismiss: () => void;
    header?: string;
}

const ValidationAlert: React.FC<ValidationAlertProps> = ({
    isOpen,
    validationErrors = [],
    onDidDismiss,
    header,
}) => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonModal
                    isOpen={isOpen}
                    onDidDismiss={onDidDismiss}
                >
                    <IonCard className="ion-margin">
                        <IonCardHeader>
                            <IonCardTitle className="ion-text-center text-lg font-semibold text-red-600">
                                {header}
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonList>
                                {validationErrors.map((err: string, index: number) => (
                                    <IonItem key={index} lines="none">
                                        <IonLabel color="danger">🔸{err}</IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>

                            <div className="ion-text-center ion-margin-top">
                                <IonButton color="primary" onClick={onDidDismiss}>
                                    Entendido
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default ValidationAlert