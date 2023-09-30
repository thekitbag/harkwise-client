import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Blurb from '../components/Blurb';
import FeedbackBox from '../components/FeedbackBox';
import FollowUpQuestion from '../components/FollowUpQuestion';
import Rating from '../components/Rating'
import SubmitButton from '../components/SubmitButton';
import ReviewSite from '../utils/types';
import './Home.css';
import mainLogo from '../assets/Original Logo Symbol.png'


const Home: React.FC = () => {
  const [rated, setRated] = useState({rated: false, rating: 0});
  const [establishmentName, setEstablishmentName] = useState<string>('');
  const [publicReviewSites, setPublicReviewSites] = useState<ReviewSite[]>([]);
  const [captureEmail, setCaptureEmail] = useState<boolean>(false);
  const [comment, setComment] = useState('')
  const { establishmentId } = useParams<{ establishmentId?: string }>();
  const history = useHistory();

  useEffect(() => {
    const fetchEstablishmentDetails = async () => {
        if (establishmentId) {
            try {
                const response = await fetch(`/api/get_establishment_details/${establishmentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setEstablishmentName(data.name);
                    setPublicReviewSites(data.publicReviewSites || []);
                    setCaptureEmail(data.captureEmail);
                } else if (response.status === 404 ) {
                    history.push('/establishmentNotFound');
                }
                else {
                    console.error('Failed to fetch establishment details.');
                }
            } catch (error) {
                console.error('Error fetching establishment details:', error);
            }
        }
    };

    fetchEstablishmentDetails();
}, [establishmentId]);



  

  const followUpText = () => {
    if(rated.rating > 3.5) {
      return "What made " + establishmentName  + " so good?"
    } else {
      return "How could " + establishmentName + " have been better?"
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.length <= 160) {
      try {
        const response = await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            establishmentId: establishmentId,
            comment:comment,
            rating:rated.rating
           }),
        });

        if (response.ok) {
          setComment('');
          history.push({
            pathname: '/success',
            state: {
              establishmentName: establishmentName,
              establishmentId: establishmentId,
              rating: rated.rating,
              publicReviewSites: publicReviewSites,
              captureEmail: captureEmail
            }
          });
        } else {
          console.error('Failed to send rating and comment');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    } else {
      console.error('Comment exceeds the 160 character limit');
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar className="logo-toolbar">
        <IonTitle>Harkwise</IonTitle>
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonImg>{mainLogo}</IonImg>
            <IonTitle size="large">Harkwise</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Blurb establishment={establishmentName}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Rating setRated={setRated}/>              
            </IonCol>
          </IonRow>

          {rated.rated === true &&
          <>
          <IonRow>
            <IonCol>
              <FollowUpQuestion followUpQuestion={followUpText()}/>       
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>        
              <FeedbackBox setComment={setComment}/>              
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <SubmitButton handleSubmit={handleSubmit}/>              
            </IonCol>
          </IonRow>
          </>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
