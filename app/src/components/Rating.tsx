import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { Dispatch, SetStateAction } from 'react';

interface RatingProps {
    setRated: Dispatch<SetStateAction<boolean>>;
}

const Rating: React.FC<RatingProps> = ({setRated}) => {
    return ( 
    <IonCard>
        <IonCardContent>
            <IonButton onClick = { ()=> setRated(true) }>Awful</IonButton>
            <IonButton>Bad</IonButton>
            <IonButton>OK</IonButton>
            <IonButton>Good</IonButton>
            <IonButton>Amazing</IonButton>
        </IonCardContent>
    </IonCard>
    );
};

export default Rating