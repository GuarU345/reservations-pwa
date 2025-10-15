import { IonCard, IonCardTitle, IonIcon } from "@ionic/react"

interface HomeItemProps {
    link: string
    icon: string
    color: string
    text: string
}

const HomeItem: React.FC<HomeItemProps> = ({
    link,
    icon,
    color,
    text
}) => {
    return (
        <IonCard style={{ padding: '1rem' }} routerLink={link} button>
            <IonIcon icon={icon} size="large" color={color} />
            <IonCardTitle>{text}</IonCardTitle>
        </IonCard>
    )
}

export default HomeItem