import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonItem, IonLabel, IonList, IonText, IonTitle } from "@ionic/react"
import { Reservation } from "../types/reservation"
import { RESERVATION_STATUS } from "../utils/constants"
import CancelReservationModal from "./Modals/CancelReservationModal"
import { useModalStore } from "../store/useModalStore"
import { useAuthStore } from "../store/useAuthStore"

interface ReservationCardProps {
    reservation: Reservation
}

const ReservationCard: React.FC<ReservationCardProps> = ({
    reservation
}) => {
    const {
        id,
        status,
        number_of_people,
        start_time,
        end_time,
        businesses,
        reservation_cancellations
    } = reservation

    const { user } = useAuthStore()
    const { showModal, openModal } = useModalStore()

    const getStatusColor = (status: keyof typeof RESERVATION_STATUS) => {
        const statusColors = {
            CONFIRMED: 'success',
            PENDING: 'warning',
            CANCELLED: 'medium',
            COMPLETED: 'primary',
        }

        return statusColors[status] || 'medium'
    }

    return (
        <>
            <IonCard>
                <IonCardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <IonChip
                        color={getStatusColor(status)}
                    >
                        {
                            RESERVATION_STATUS[
                            status
                            ]
                        }
                    </IonChip>
                </IonCardHeader>

                <IonCardContent>
                    <IonList lines="none">
                        <IonItem>
                            <IonLabel>
                                <strong>Negocio: {businesses.name}</strong>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Personas:</strong> {number_of_people}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Fecha: </strong>{' '}
                                {new Date(start_time).toLocaleDateString()}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Horario:</strong>{' '}
                                {new Date(start_time).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}{' '}
                                -{' '}
                                {new Date(end_time).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </IonLabel>
                        </IonItem>
                        {status === "CANCELLED" && (
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle style={{ margin: 'auto' }}>
                                        <IonTitle color="medium">Datos Cancelación</IonTitle>
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonText>Cancelado por: {
                                        reservation_cancellations.cancelled_by !== user?.name
                                            ? "Dueño del negocio"
                                            : "Usuario"
                                    }

                                    </IonText>
                                    <p>
                                        <span>Motivo:</span>{' '}
                                        {reservation_cancellations.reason || "Sin especificar"}
                                    </p>
                                    <IonText>Fecha: {new Date(reservation_cancellations.cancelled_at).toLocaleDateString()}</IonText>
                                </IonCardContent>
                            </IonCard>
                        )}
                    </IonList>
                    {status === 'PENDING' && (
                        <IonButton onClick={() => openModal(id)}>
                            Cancelar Reservación
                        </IonButton>
                    )}

                    {showModal &&
                        <CancelReservationModal />
                    }
                </IonCardContent>
            </IonCard>
        </>

    )
}

export default ReservationCard