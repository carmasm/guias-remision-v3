import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';

const NuevaGuiaRemision: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nueva Guía Remisión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nueva Guía Remisión</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Nueva Guía Remisión" />
      </IonContent>
    </IonPage>
  );
};

export default NuevaGuiaRemision;