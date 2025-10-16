/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonAlert, IonIcon } from '@ionic/react'
import { star } from 'ionicons/icons'
import { useAuthStore } from '../store/useAuthStore'
import { useLikeBusiness } from '../hooks/useLikeBusiness'

interface FavoriteBusinessProps {
    businessId: string
    liked: boolean
}

const FavoriteBusiness: React.FC<FavoriteBusinessProps> = ({ businessId, liked }) => {
    const { token } = useAuthStore()
    const {
        handleLikeBusiness,
        error,
        setError,
        message,
        success,
        setSuccess,
        isLiked
    } = useLikeBusiness(token!, businessId, liked)

    return (
        <>
            <IonIcon color={isLiked ? 'warning' : 'medium'} onClick={handleLikeBusiness} icon={star} size="large" className="mb-2 text-primary" />

            <IonAlert
                header='Exito'
                isOpen={success}
                onDidDismiss={() => setSuccess(false)}
                message={message}
                buttons={['Ok']}
            />

            <IonAlert
                isOpen={!!error}
                onDidDismiss={() => setError('')}
                header="Error"
                message={error || ''}
                buttons={['Entendido']}
            />
        </>
    )
}

export default FavoriteBusiness