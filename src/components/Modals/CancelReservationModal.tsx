import {
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonModal,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useFetchCancelReservation } from "../../hooks/useFetchCancelReservation"
import ValidationAlert from "../ValidationAlert"

interface CancelReservationProps {
    showModal: boolean
    setShowModal: (show: boolean) => void
    reservationId: string
}

const CancelReservationModal: React.FC<CancelReservationProps> = ({
    reservationId,
    showModal,
    setShowModal
}) => {
    const {
        handleCancel,
        success,
        setSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors,
    } = useFetchCancelReservation(reservationId)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const data = {
            reason: formData.get('reason'),
        }

        handleCancel(data)
        if (success) {
            setShowModal(false)
        }
    }

    return (
        <>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nueva Reservación</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonLabel position="floating">Razon</IonLabel>
                            <IonTextarea
                                name="reason"
                            />
                        </IonItem>

                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <IonButton type="submit" color="success">
                                Guardar
                            </IonButton>
                            <IonButton color="medium" onClick={() => setShowModal(false)}>
                                Cancelar
                            </IonButton>
                        </div>
                    </form>
                </IonContent>
            </IonModal>

            <IonAlert
                isOpen={success}
                onDidDismiss={() => setSuccess(false)}
                header="Exito"
                message="Reservación cancelada con éxito"
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
        </>
    )
}

export default CancelReservationModal