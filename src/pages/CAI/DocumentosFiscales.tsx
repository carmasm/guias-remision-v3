import { IonAvatar, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { add, documentText } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { pouchdbService } from '../../pouchdbService';
import { format } from 'date-fns';

const DocumentosFiscales: React.FC<RouteComponentProps> = ({ history }) => {

  const [doctosFiscales, setDoctosFiscales] = useState<any>([]);
  const location = useLocation();

  useEffect(() => {

    if (location.pathname === '/page/cai') {
      pouchdbService.findAllDocumentsByCollectionSorted('DocumentosFiscales', 'CAI', 'asc')
        .then(data => {
          setDoctosFiscales(data)
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

  }, [location.key]);

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
        <IonList>
          {
            doctosFiscales?.map((documento: any) => {
              return (
                <IonItem key={documento._id}>
                  <IonAvatar slot="start"><img src="paperwork.png" /></IonAvatar>
                  <IonLabel>{documento.CAI}</IonLabel>
                  <IonLabel>
                    <h4>{format(documento.FechaLimiteEmision, 'dd/MM/yyyy')}</h4>
                    <p>Cantidad Otorgada: {documento.CantidadOtorgada}</p>
                    <p>Corr. Actual: {documento.NumeracionCorrelativaActual}</p>
                  </IonLabel>
                  <IonLabel>{documento.Activo}</IonLabel>
                  <IonButton onClick={e => {
                    e.preventDefault();
                    // history.push(`/page/codigos/${codigo.idUsuario}`)
                    // history.push({
                    //   pathname: `/page/cai/${documento._id}`,
                    //   state: {
                    //     _id: documento._id,
                    //     _rev: documento._rev,
                    //     IdCodigo: documento.IdCodigo,
                    //     Nombre: documento.Nombre,
                    //     Apellido: documento.Apellido,
                    //     Usuario: documento.Usuario,
                    //     Contrasena: documento.Contrasena,
                    //     CContrasena: documento.CContrasena,
                    //     CorrelativosAsignados: documento.CorrelativosAsignados,
                    //     Rol: documento.Rol,
                    //     Activo: documento.Activo
                    //   }
                    // })
                  }}>
                    <IonLabel>Ver</IonLabel>
                  </IonButton>
                </IonItem>
              );
            })
          }
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            {/* <IonRouterLink routerDirection="forward" routerLink={`/item/${item.id}`}> */}
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default DocumentosFiscales;