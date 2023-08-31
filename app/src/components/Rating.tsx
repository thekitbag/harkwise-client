import { IonCard, IonCardContent, IonIcon } from '@ionic/react'

interface RatingProps {

}

const Rating: React.FC<RatingProps> = () => {
    return ( 
    <IonCard>
        <IonCardContent>
            <IonIcon icon='sadOutline'></IonIcon>
        </IonCardContent>
    </IonCard>
    );
};

export default Rating