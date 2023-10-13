import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import ThankYouMessage from '../components/ThankYouMessage';
import { useHistory } from 'react-router';
import ReviewSite from '../utils/types';
import './Success.css'


interface SuccessState {
    establishmentName: string;
    rating: number;
    publicReviewSites: ReviewSite[];
    captureEmail: boolean;
    establishmentId: number;
}

const Success: React.FC<SuccessState> = () => {
  const history = useHistory();
  const state = history.location.state as SuccessState;

  const { establishmentName, rating, publicReviewSites, captureEmail, establishmentId } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Harkwise</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ThankYouMessage establishment={establishmentName} rating={rating} publicReviewSites={publicReviewSites} captureEmail={captureEmail} establishmentId={establishmentId} />
      </IonContent>
    </IonPage>
  );
};

export default Success;
