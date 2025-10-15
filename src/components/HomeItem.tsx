import { IonCard, IonCardContent, IonCardTitle, IonIcon } from "@ionic/react"

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
        <IonCard style={{ padding: '0.5rem' }} routerLink={link} button>
            <IonCardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IonCardTitle>{text}</IonCardTitle>
                <IonIcon icon={icon} size="large" color={color} />
            </IonCardContent>
        </IonCard>
    )
}

export default HomeItem