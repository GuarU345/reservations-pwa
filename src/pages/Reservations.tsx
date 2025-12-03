import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useFetchReservations } from "../hooks/useFetchReservations"
import ReservationCard from "../components/ReservationCard"

const Reservations: React.FC = () => {
    const { data: reservations, isLoading, error } = useFetchReservations()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bookly</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle style={{ marginTop: '20px' }}>Mis Reservaciones</IonTitle>

                {error && <p>Error: {error.message}</p>}
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <IonSpinner name="crescent" />
                    </div>
                )}

                {reservations?.length === 0 && !isLoading &&
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>No hay reservaciones</IonCardTitle>
                            <IonCardSubtitle>¡Crea una nueva reservación para empezar!</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                }

                <IonGrid>
                    <IonRow>
                        {reservations?.map((res) => (
                            <IonCol key={res.id} size="12" sizeMd="6">
                                <ReservationCard reservation={res} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default Reservations