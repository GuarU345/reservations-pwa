import { useParams } from "react-router"
import { useFetchBusinessData } from "../hooks/useFetchBusinessData"
import { useAuthStore } from "../store/useAuthStore"
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSpinner, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { BusinessHour } from "../types/business"

const Business: React.FC = () => {
    const { businessId } = useParams<{ businessId: string }>()
    const { token } = useAuthStore()

    const { businessData, isLoading, error } = useFetchBusinessData(token!, businessId!)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Negocio: {businessData?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {error && <p>Error: {error}</p>}

                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <IonSpinner name="crescent" />
                    </div>
                )}

                <IonCard>
                    <IonCardHeader color="primary">
                        <IonCardTitle>Datos del negocio</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p style={{ marginTop: '20px' }}>
                            Categoría: <span>{businessData?.business_categories?.category}</span>
                        </p>
                        <p>{businessData?.description}</p>

                        <IonItem lines="none">
                            <IonLabel>
                                📍 {businessData?.address} <br />
                                📞 {businessData?.phone} <br />
                                ✉️ {businessData?.email}
                            </IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                {/* Horarios */}
                {businessData?.business_hours && businessData?.business_hours.length > 0 && (
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Horarios</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {businessData.business_hours.map((hour: BusinessHour) => (
                                <IonItem key={hour.day_of_week} lines="none">
                                    <IonLabel>
                                        <strong>
                                            {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][hour.day_of_week]}
                                        </strong>
                                        : {hour.is_closed ? (
                                            <IonText color="danger">Cerrado</IonText>
                                        ) : (
                                            `${hour.open_time} - ${hour.close_time}`
                                        )}
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>

    )
}

export default Business