import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';

const CentrosDeRecoleccion: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Centros de Recolección</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Centros de Recolección</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Centros de Recolección" />
      </IonContent>
    </IonPage>
  );
};

export default CentrosDeRecoleccion;