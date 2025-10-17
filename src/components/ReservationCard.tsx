import { IonButton, IonCard, IonCardContent, IonCardHeader, IonChip, IonItem, IonLabel, IonList } from "@ionic/react"
import { Reservation } from "../types/reservation"
import { RESERVATION_STATUS } from "../utils/constants"
import CancelReservationModal from "./Modals/CancelReservationModal"
import { useModalStore } from "../store/useModalStore"

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
        created_at
    } = reservation

    const { showModal, setShowModal } = useModalStore()

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
                        <IonItem>
                            <IonLabel>
                                <strong>Creada:</strong>{' '}
                                {new Date(created_at).toLocaleDateString()}
                            </IonLabel>
                        </IonItem>
                    </IonList>
                    {status === 'PENDING' && (
                        <IonButton onClick={() => setShowModal(true)}>
                            Cancelar Reservación
                        </IonButton>
                    )}

                    {showModal &&
                        <CancelReservationModal
                            reservationId={id}
                        />
                    }
                </IonCardContent>
            </IonCard>
        </>

    )
}

export default ReservationCard