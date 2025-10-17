import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { useFetchCreateReservation } from "../../hooks/useFetchCreateReservation"
import React from "react"
import ValidationAlert from "../ValidationAlert"
import { useModalStore } from "../../store/useModalStore"

interface ReservationModalProps {
    businessId: string | undefined
}

const ReservationModal: React.FC<ReservationModalProps> = ({
    businessId
}) => {
    const {
        createReservation,
        isSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors
    } = useFetchCreateReservation()

    const { showModal, setShowModal } = useModalStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const data = {
            businessId,
            numberOfPeople: Number(formData.get('numberOfPeople')),
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime')
        }

        createReservation(data)
    }

    return (
        <>
            <IonModal isOpen={showModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nueva Reservación</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonLabel position="floating">Número de Personas</IonLabel>
                            <IonInput
                                name="numberOfPeople"
                                type="number"
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Hora de Inicio</IonLabel>
                            <IonInput
                                name="startTime"
                                type="datetime-local"
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Hora de Fin</IonLabel>
                            <IonInput
                                name="endTime"
                                type="datetime-local"
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

            <IonToast
                isOpen={isSuccess}
                position="middle"
                message="Reservación creada correctamente"
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
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default ReservationModal