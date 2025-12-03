import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useFetchBusinesses } from "../hooks/useFetchBusinesses"
import FavoriteBusiness from '../components/FavoriteBusiness';

const FavoriteBusinesses: React.FC = () => {
    const { filtered: businesses, error, isLoading } = useFetchBusinesses()

    const likedBusinesses = businesses.filter(business => business.liked)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bookly</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {error && <p>Error: {error}</p>}

                <IonTitle style={{ marginTop: '20px' }}>Tus Favoritos</IonTitle>

                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <IonSpinner name="crescent" />
                    </div>
                )}

                {likedBusinesses.length === 0 && !isLoading && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>No se encontraron negocios, agrega tu primer negocio</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                )}

                {likedBusinesses.map(business => (
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
    )
}

export default FavoriteBusinesses