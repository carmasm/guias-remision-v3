import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { addDocument, getDocuments, updateDocument, deleteDocument } from '../../firestoreService';
import { useEffect, useState } from 'react';
import { Remitentes, Destinatarios, CentrosdeRecoleccion } from '../../../interfaces/modelService';


const NuevaGuiaRemision: React.FC = () => {
  
  const [remitentes, setRemitentes] = useState<Remitentes[]>([]);
  const [destinatarios, setDestinatarios] = useState<Destinatarios[]>([]);
  const [centrosdeRecoleccion, setCentrosdeRecoleccion] = useState<CentrosdeRecoleccion[]>([]);

  useEffect(() => {
    getDocuments('Remitentes').then((querySnapshot) => {
        const data: Remitentes[] = [];
        querySnapshot.forEach((doc) => {
          data.push({...doc.data() } as Remitentes);
        });

        setRemitentes(data);
      });

      getDocuments('Destinatarios').then((querySnapshot) => {
        const data: Destinatarios[] = [];
        querySnapshot.forEach((doc) => {
          data.push({...doc.data() } as Destinatarios);
        });

        setDestinatarios(data);
      });

      // debugger
      // console.log(remitentes);
  }, []);

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