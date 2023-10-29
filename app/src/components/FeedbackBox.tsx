import { IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonTextarea } from '@ionic/react'
import { Dispatch, SetStateAction, useState } from 'react';

interface FeedbackBoxProps {
    setComment: Dispatch<SetStateAction<string>>;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({setComment}) => {
    const [feedback, setFeedback] = useState('');

  return (

        <IonItem className='feedback-box' color="tertiary">
        <IonLabel color="primary" position="floating">Enter comment (160 characters Max)</IonLabel>
        <IonTextarea
            color="primary"
            value={feedback}
            onIonInput={(e: any) => {
                const newValue = e.detail.value;
                setFeedback(newValue);
                setComment(newValue);
            }}
            maxlength={160}
            rows={4}
            placeholder="Your Comment"
        />
        </IonItem>
  );
};

export default FeedbackBox