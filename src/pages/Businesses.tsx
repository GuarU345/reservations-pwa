import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonSearchbar,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useFetchBusinesses } from '../hooks/useFetchBusinesses';
import { useAuthStore } from '../store/useAuthStore';
import FavoriteBusiness from '../components/FavoriteBusiness';

const Businesses: React.FC = () => {
    const { token } = useAuthStore()
    const { filtered: businesses, isLoading, error, searchText, setSearchText } = useFetchBusinesses(token!)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bookly</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {error && <p>Error: {error}</p>}

                <IonTitle style={{ marginTop: '20px' }}>Explorar negocios</IonTitle>

                <IonSearchbar
                    placeholder="Buscar por nombre o categoría..."
                    value={searchText}
                    onIonChange={e => setSearchText(e.detail.value!)}
                />

                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <IonSpinner name="crescent" />
                    </div>
                )}

                {businesses.length === 0 && !isLoading && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>No se encontraron negocios</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                )}

                {businesses.map(business => (
                    <IonCard key={business.id}>
                        <IonCardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IonCardTitle>{business.name}</IonCardTitle>
                            <FavoriteBusiness businessId={business.id} liked={business.liked} />
                        </IonCardHeader>
                        <IonCardContent>
                            <p className="text-sm text-gray-600 mb-2">
                                Categoría:  {business.business_categories.category}
                            </p>
                            <p className="text-gray-800">{business.description}</p>
                            <IonButton routerLink={`/businesses/${business.id}`}>
                                Ver negocio
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default Businesses;