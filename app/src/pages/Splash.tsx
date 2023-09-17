import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonText, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput } from '@ionic/react';
import { checkmarkOutline, thumbsUpOutline } from 'ionicons/icons';
import mainLogo from '../assets/Original Logo.png'
import './Splash.css';
import {emailValidation, useForm} from '../utils/emailValidation';

import feature1 from '../assets/qrscan.jpeg';
import feature2 from '../assets/report.jpeg';
import feature3 from '../assets/money.jpeg';


const Splash: React.FC = () => {
  const { name, setName, email, setEmail, errors, validate } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!validate()) return;  // Don't proceed if there are validation errors

    console.log('trying to handle submit')

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setIsSubmitted(true); 
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <IonPage className="splash-page">

      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Harkwise
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="logo-container">
            <img src={mainLogo} alt="Harkwise Logo"></img>
          </div>
          <h2>Unlock the Power of Customer Feedback</h2>
        </div>

        {/* Features Section */}
        <div className="features-grid">
          <IonCard className="feature-card">
            <img src={feature1} alt="Feature 1"/>
            <IonLabel>Immediate Customer Insights</IonLabel>
          </IonCard>
          <IonCard className="feature-card">
            <img src={feature2} alt="Feature 2"/>
            <IonLabel>AI Synthesised Insights</IonLabel>
          </IonCard>
          <IonCard className="feature-card">
            <img src={feature3} alt="Feature 3"/>
            <IonLabel>Empower Business Decisions</IonLabel>
          </IonCard>
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <h2>About Harkwise</h2>
          <h3>We help business understand what their cutomers REALLY think about their products and services so they can make sure they keep coming back</h3>
          <p>Our QR Codes make it easy for your customers to tell you what they do and don't like about your establishment, allowing you to make changes that really move the needle</p>
        </div>

        <div className='cta-section'>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Get Started with Harkwise</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {isSubmitted ? (
          // Display this JSX when the form is successfully submitted
          <div className="submission-success-container">
            <IonIcon icon={thumbsUpOutline} style={{ fontSize: '4em' }} />
            <IonText>
              <h2>Thank You!</h2>
              <p>We've received your details and will be in touch shortly.</p>
            </IonText>
          </div>
        ) : (
          <>
            Enter your details and we'll be in touch shortly.
            <IonInput
              value={name}
              placeholder="Your Name"
              onIonChange={(e) => setName(e.detail.value!)}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <IonInput
              value={email}
              placeholder="Your Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <IonButton expand="block" onClick={handleSubmit}>
              Submit
            </IonButton>
          </>
            )
          }       
          </IonCardContent>
        </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;