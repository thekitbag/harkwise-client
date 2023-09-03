import { IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonTextarea } from '@ionic/react'
import { Dispatch, SetStateAction, useState } from 'react';

interface FeedbackBoxProps {
    setComment: Dispatch<SetStateAction<string>>;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = () => {
    const [comment, setComment] = useState('');

  

  return (
    <IonItem>
    <IonLabel position="floating">Enter your comment about the place (up to 160 characters)</IonLabel>
    <IonTextarea 
        value={comment}
        onIonChange={(e: any) => setComment(e.detail.value)}
        maxlength={160}
        rows={4}
        placeholder="Your Comment"
    />
    </IonItem>
  );
};

export default FeedbackBox