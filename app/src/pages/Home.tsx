import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        <Blurb />
        <Rating />
        <FollowUpQuestion />
        <FeedbackBox />
        <SubmitButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
