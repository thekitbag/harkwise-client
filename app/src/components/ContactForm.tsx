import React, { useState } from 'react';
import { IonInput, IonButton, IonLabel, IonItem, IonCard, IonCardContent, IonCardHeader, IonIcon, IonText, IonCardTitle } from '@ionic/react';
import { useForm } from '../utils/EmailValidation';
import { thumbsUpOutline } from 'ionicons/icons';


const ContactForm: React.FC = () => {
    const {
      firstName, setFirstName,
      lastName, setLastName,
      businessName, setBusinessName,
      email, setEmail,
      phoneNumber, setPhoneNumber,
      errors, validate
    } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!validate()) return;
    
    (window as any).dataLayer.push({
        event: 'form_submit_attempt'
      });

    setIsSubmitted(true);  // setting here to avoid long wait

    const payload = {
      firstName,
      lastName,
      businessName,
      email,
      phoneNumber,
    };

    try {
      const response = await fetch('/api/interest', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });
      
      
      const data = await response.json();
      if (data.status === 'success') {
        (window as any).dataLayer.push({
            event: 'form_submit_success'
          });
      } else {
        (window as any).dataLayer.push({
            event: 'form_submit_failure'
          });
      }
    } catch (error)  {
        console.error('There was an error!', error);
        (window as any).dataLayer.push({
          event: 'form_submit_error',
          error_message: error
        });
      }
  };   

    const handleInputChange = (e: any) => {
        setEmail(e.detail.value!);
    };
    
    const handleInputCommit = (e: any) => {
        (window as any).dataLayer.push({
            event: 'input_email',
            input_value: e.detail.value!
        });
    };

    const handleFirstNameCommit = (e: any) => {
      setFirstName(e.detail.value!);
      (window as any).dataLayer.push({
          event: 'input_first_name',
          input_value: e.detail.value!
      });
  };
  
  const handleLastNameCommit = (e: any) => {
      setLastName(e.detail.value!);
      (window as any).dataLayer.push({
          event: 'input_last_name',
          input_value: e.detail.value!
      });
  };
  
  const handleBusinessNameCommit = (e: any) => {
      setBusinessName(e.detail.value!);
      (window as any).dataLayer.push({
          event: 'input_business_name',
          input_value: e.detail.value!
      });
  };
  
  const handlePhoneNumberCommit = (e: any) => {
      setPhoneNumber(e.detail.value!);
      (window as any).dataLayer.push({
          event: 'input_phone_number',
          input_value: e.detail.value!
      });
  };
  

      
    return (
        <IonCard color="tertiary" className='contact-form'>
              <IonCardContent>
                  {isSubmitted ? (
                  <div className="submission-success-container">
                      <IonIcon icon={thumbsUpOutline} style={{ fontSize: '4em' }} />
                      <IonText>
                      <h2>Thank You!</h2>
                      <p>We've received your details and will be in touch shortly.</p>
                      </IonText>
                  </div>
                  ) : (
                  <>
                  <IonCardHeader>
                    <IonCardTitle>
                        If you want Harkwise to help you understand your customers better, leave your details below.
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonInput 
                      value={firstName} 
                      placeholder="First Name" 
                      onIonChange={handleFirstNameCommit} 
                  />
                  {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}

                  <IonInput 
                      value={lastName} 
                      placeholder="Last Name" 
                      onIonChange={handleLastNameCommit} 
                  />
                  {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

                  <IonInput 
                      value={businessName} 
                      placeholder="Business Name" 
                      onIonChange={handleBusinessNameCommit} 
                  />
                  {errors.businessName && <p style={{ color: 'red' }}>{errors.businessName}</p>}

                  <IonInput 
                      value={phoneNumber} 
                      placeholder="Phone Number" 
                      onIonChange={handlePhoneNumberCommit} 
                  />
                  {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}

                  <IonInput 
                      value={email} 
                      placeholder="Your Email" 
                      onIonInput={handleInputChange} 
                      onIonChange={handleInputCommit} 
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                  <IonButton color="secondary" expand="block" onClick={handleSubmit}>
                      Submit
                  </IonButton>
                  </>
                      )
                  }       
                  </IonCardContent>
              <br />
        </IonCard>
    );
}
export default ContactForm
