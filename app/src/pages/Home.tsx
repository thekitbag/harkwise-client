import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Blurb from '../components/Blurb';
import FeedbackBox from '../components/FeedbackBox';
import FollowUpQuestion from '../components/FollowUpQuestion';
import Rating from '../components/Rating'
import SubmitButton from '../components/SubmitButton';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Howzat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Howzat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Blurb />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Rating />              
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <FollowUpQuestion />              
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>        
              <FeedbackBox />              
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <SubmitButton />              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
