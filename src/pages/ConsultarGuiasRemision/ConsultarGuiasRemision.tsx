import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';

const ConsultarGuiasRemision: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Consultar Guías Remisión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Consultar Guías Remisión</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Consultar Guías Remisión" />
      </IonContent>
    </IonPage>
  );
};

export default ConsultarGuiasRemision;