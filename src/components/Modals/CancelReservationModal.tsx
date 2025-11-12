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
import { useModalStore } from "../../store/useModalStore"

const CancelReservationModal: React.FC = () => {
    const { showModal, selectedId, closeModal } = useModalStore()

    const {
        cancelReservation,
        success,
        setSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors,
    } = useFetchCancelReservation(selectedId!)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const data = {
            reason: formData.get('reason'),
        }

        cancelReservation(data)
    }

    return (
        <>
            <IonModal isOpen={showModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Cancelar Reservación</IonTitle>
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
                            <IonButton color="medium" onClick={() => closeModal()}>
                                Cancelar
                            </IonButton>
                        </div>
                    </form>
                </IonContent>
            </IonModal>

            <IonAlert
                isOpen={success}
                onDidDismiss={() => {
                    setSuccess(false)
                    closeModal()
                }}
                header="Exito"
                message="Reservación cancelada correctamente"
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
                onDidDismiss={() => setError("")}
                header="Error"
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default CancelReservationModal