import { IonAlert, IonIcon, IonToast } from '@ionic/react'
import { star } from 'ionicons/icons'
import { useLikeBusiness } from '../hooks/useLikeBusiness'
import { useState } from 'react'

interface FavoriteBusinessProps {
    businessId: string
    liked: boolean
}

const FavoriteBusiness: React.FC<FavoriteBusinessProps> = ({ businessId, liked }) => {
    const {
        handleLikeBusiness,
        error,
        setError,
        message,
        isSuccess,
        isLiked
    } = useLikeBusiness(businessId, liked)

    const [showOfflineAlert, setShowOfflineAlert] = useState(false)

    const handleClick = () => {
        if (!navigator.onLine) {
            setShowOfflineAlert(true)
            return
        }

        handleLikeBusiness()
    }

    return (
        <>
            <IonIcon color={isLiked ? 'warning' : 'medium'} onClick={handleClick} icon={star} size="large" className="mb-2 text-primary" />

            <IonToast
                isOpen={isSuccess}
                position='middle'
                message={message}
                duration={2000}
            />

            <IonToast
                isOpen={showOfflineAlert}
                position='middle'
                message="No puedes realizar esta acción sin conexión"
                duration={2000}
                onDidDismiss={() => setShowOfflineAlert(false)}
            />

            <IonAlert
                isOpen={!!error}
                onDidDismiss={() => setError("")}
                header="Error"
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default FavoriteBusiness