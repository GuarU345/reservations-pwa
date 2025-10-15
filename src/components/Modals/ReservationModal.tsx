import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react"
import { useFetchCreateReservation } from "../../hooks/useFetchCreateReservation"
import React from "react"
import ValidationAlert from "../ValidationAlert"

interface ReservationModalProps {
    showModal: boolean
    setShowModal: (show: boolean) => void
    businessId: string | undefined
}

const ReservationModal: React.FC<ReservationModalProps> = ({
    showModal,
    setShowModal,
    businessId
}) => {
    const {
        handleCreate,
        success,
        setSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors
    } = useFetchCreateReservation()

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

        handleCreate(data)
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

            <IonAlert
                isOpen={success}
                onDidDismiss={() => setSuccess(false)}
                header="Exito"
                message="Reservación creada con éxito"
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

export default ReservationModal