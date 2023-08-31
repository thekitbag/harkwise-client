import { IonCard, IonCardContent, IonIcon } from '@ionic/react'

interface FeedbackBoxProps {

}

const FeedbackBox: React.FC<FeedbackBoxProps> = () => {
    return ( 
    <IonCard>
        <IonCardContent>
            <form></form>
        </IonCardContent>
    </IonCard>
    );
};

export default FeedbackBox