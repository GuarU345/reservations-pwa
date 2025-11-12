import { IonAlert, IonIcon, IonToast } from '@ionic/react'
import { star } from 'ionicons/icons'
import { useLikeBusiness } from '../hooks/useLikeBusiness'

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

    const handleClick = () => {
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