import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { calendar, pin, heart } from 'ionicons/icons'
import { useAuthStore } from '../store/useAuthStore';

const Home: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bookly</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="p-4 space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">¡Hola, {user?.name}!</h2>
          <p className="text-gray-600">¿Qué deseas hacer hoy?</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <IonCard routerLink="/reservations" button>
            <IonIcon icon={calendar} size="large" className="mb-2 text-primary" />
            <IonCardTitle>Mis reservaciones</IonCardTitle>
          </IonCard>

          <IonCard routerLink="/businesses" button>
            <IonIcon icon={pin} size="large" className="mb-2 text-secondary" />
            <IonCardTitle>Agendar una reservación</IonCardTitle>
          </IonCard>

          <IonCard routerLink="/favorites" button>
            <IonIcon icon={heart} size="large" className="mb-2 text-red-500" />
            <IonCardTitle>Favoritos</IonCardTitle>
          </IonCard>
        </div>

        {/* Próxima reservación */}
        {/* <div>
            <h3 className="text-lg font-semibold mb-2">Próxima reservación</h3>
            {nextReservation ? (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{nextReservation.businessName}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    📅 {new Date(nextReservation.date).toLocaleDateString()} <br />
                    ⏰ {new Date(nextReservation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <br />
                    👥 {nextReservation.numberOfPeople} personas
                  </p>
                  <IonButton expand="block" routerLink={`/reservations/${nextReservation.id}`}>
                    Ver detalles
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ) : (
              <p className="text-gray-500">No tienes reservaciones próximas</p>
            )}
          </div> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
