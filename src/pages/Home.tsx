import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { calendar, pin, heart } from 'ionicons/icons'
import { useAuthStore } from '../store/useAuthStore';
import HomeItem from '../components/HomeItem';

const Home: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bookly</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ marginLeft: '1rem' }}>
          <h2>¡Hola, {user?.name}!</h2>
          <p>¿Qué deseas hacer hoy?</p>
        </div>

        <div style={{ display: 'grid' }}>
          <HomeItem text='Mis reservaciones' link='/reservations' color='primary' icon={calendar} />
          <HomeItem text='Agendar una reservación' link='/businesses' color='secondary' icon={pin} />
          <HomeItem text='Favoritos' link='/favorites' color='danger' icon={heart} />
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
