import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useFetchReservations } from "../hooks/useFetchReservations"
import { RESERVATION_STATUS } from "../utils/constants"

const Reservations: React.FC = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkM2M3MGI1LTY1N2YtNGMyNC1hNTY3LTJhNmE0ZDI4MzI2MSIsImVtYWlsIjoiam9oYW5AZ21haWwuY29tIiwicm9sZSI6IkJVU0lORVNTX09XTkVSIiwiaWF0IjoxNzYwMzcwMjA4fQ.Y9zsW1yTq-6ZSxRom8l3qXvp7hbsDDAbrTh4vQOK1_8"
    const { reservations, isLoading, error } = useFetchReservations(token)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reservaciones</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
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

                <IonList>
                    {reservations.map((res) => (
                        <IonCard key={res.id}>
                            <IonCardHeader>
                                <IonCardTitle>{res.status}</IonCardTitle>
                                <IonCardSubtitle>{RESERVATION_STATUS[res.status as keyof typeof RESERVATION_STATUS]}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p><strong>Email:</strong> {res.status}</p>
                                <p><strong>Personas:</strong> {res.number_of_people}</p>
                                <p>
                                    <strong>Horario:</strong> {new Date(res.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(res.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p><strong>Creada:</strong> {new Date(res.created_at).toLocaleDateString()}</p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Reservations