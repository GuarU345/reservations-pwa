import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useFetchReservations } from "../hooks/useFetchReservations"
import { RESERVATION_STATUS } from "../utils/constants"
import { useAuthStore } from "../store/useAuthStore"

const Reservations: React.FC = () => {
    const { token, user } = useAuthStore()
    const { reservations, isLoading, error } = useFetchReservations(token!)

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bookly</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle style={{ marginTop: '20px' }}>Mis Reservaciones</IonTitle>

                {isLoading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {reservations.length === 0 && !isLoading &&
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>No hay reservaciones</IonCardTitle>
                            <IonCardSubtitle>¡Crea una nueva reservación para empezar!</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                }

                <IonGrid>
                    <IonRow>
                        {reservations.map((res) => (
                            <IonCol size="12" sizeMd="6" key={res.id}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>{user?.name}</IonCardTitle>
                                        <IonChip
                                            color={getStatusColor(res.status)}
                                        >
                                            {
                                                RESERVATION_STATUS[
                                                res.status
                                                ]
                                            }
                                        </IonChip>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonList lines="none">
                                            <IonItem>
                                                <IonLabel>
                                                    <strong>Email:</strong> {user?.email}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>
                                                    <strong>Personas:</strong> {res.number_of_people}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>
                                                    <strong>Horario:</strong>{' '}
                                                    {new Date(res.start_time).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}{' '}
                                                    -{' '}
                                                    {new Date(res.end_time).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>
                                                    <strong>Creada:</strong>{' '}
                                                    {new Date(res.created_at).toLocaleDateString()}
                                                </IonLabel>
                                            </IonItem>
                                        </IonList>
                                        {res.status === 'PENDING' && (
                                            <IonButton>
                                                Cancelar Reservación
                                            </IonButton>
                                        )}
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Reservations