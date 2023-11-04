import { IonContent, IonImg, IonPage} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Blurb from '../components/Blurb';
import FeedbackBox from '../components/FeedbackBox';
import Rating from '../components/Rating'
import SubmitButton from '../components/SubmitButton';
import ReviewSite from '../utils/types';
import './Home.css';
import '../theme/Header.css';
import Header from '../components/Header';


const Home: React.FC = () => {
  const [rated, setRated] = useState({rated: false, rating: 0});
  const [establishmentName, setEstablishmentName] = useState<string>('');
  const [publicReviewSites, setPublicReviewSites] = useState<ReviewSite[]>([]);
  const [captureEmail, setCaptureEmail] = useState<boolean>(false);
  const [comment, setComment] = useState('')
  const { establishmentId } = useParams<{ establishmentId?: string }>();
  const [establishmentLogo, setEstablishmentLogo] = useState<string>('');
  const [reviewMethod, setReviewMethod] = useState<string>('')

  const history = useHistory();
  const location = history.location;




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
                    setEstablishmentLogo(data.logoURL || '');
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

    const values = queryString.parse(location.search);
    const scanMethodMap: { [key: string]: string } = {
      '1': 'Business Card',
      '2': 'Poster'
    };

    const scanMethodKey = typeof values.m === 'string' ? values.m : '';
    const scanMethod = scanMethodMap[scanMethodKey];

    if (scanMethod) {
        setReviewMethod(scanMethod);
    }

    console.log("Determined scan method:", scanMethod); // Log the determined scan method

    fetchEstablishmentDetails();
}, [establishmentId, location.search]);



  

  const followUpText = () => {
    if(rated.rating > 3.5) {
      return "What did you like?"
    } else {
      return "How could your experience have been better?"
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
            rating:rated.rating,
            reviewMethod: reviewMethod
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
        <Header url={'#'}/>
        <IonContent className="main-content ion-padding" color="primary" fullscreen>
          <div className="business-logo-container">
            <IonImg className='business-logo' src={establishmentLogo} alt={`${establishmentName} Logo`} />
          </div>
          <Blurb establishment={establishmentName}/>
          <Rating setRated={setRated}/>              

          {rated.rated === true &&
          <>
            <h2>{followUpText()}</h2>    
            <FeedbackBox setComment={setComment}/>
            <SubmitButton handleSubmit={handleSubmit}/> 
          </>
          }
      </IonContent>
    </IonPage>
  );
};

export default Home;
