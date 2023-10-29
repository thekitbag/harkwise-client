import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import ThankYouMessage from '../components/ThankYouMessage';
import { useHistory } from 'react-router';
import ReviewSite from '../utils/types';
import './Home.css'
import Header from '../components/Header';
import '../theme/Header.css'
import ContactForm from '../components/ContactForm';



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
      <Header url={'/' + establishmentId} />
      <IonContent color="primary">
        <ThankYouMessage establishment={establishmentName} rating={rating} publicReviewSites={publicReviewSites} captureEmail={captureEmail} establishmentId={establishmentId} />
        <ContactForm />
      </IonContent>
    </IonPage>
  );
};

export default Success;
