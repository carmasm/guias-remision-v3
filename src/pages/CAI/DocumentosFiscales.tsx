import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';

const DocumentosFiscales: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Documentos Fiscales</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Documentos Fiscales</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Documentos Fiscales" />
      </IonContent>
    </IonPage>
  );
};

export default DocumentosFiscales;