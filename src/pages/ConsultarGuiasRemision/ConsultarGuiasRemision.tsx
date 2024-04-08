import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { pouchdbService } from '../../pouchdbService';
import { pencil, trash, print, eye } from 'ionicons/icons';
import GuiaRemisionPrintPreview from './GuiaRemisionPrintPreview';
import './ConsultarGuiasRemision.css';
import { useLocation } from 'react-router';

const ConsultarGuiasRemision: React.FC = () => {

  const [documents, setDocuments] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<any[]>([]);
  const location = useLocation<any>();
  const [showAlert, setShowAlert] = useState(false);


  // const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState<any>([]);

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");

  const { name } = useParams<{ name: string; }>();

  useEffect(() => {

    if (location.pathname === '/page/consultar-guias-remision') {
      // Load documents from CouchDB
      pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc')
        .then(data => {
          setDocuments(data)
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      debugger
      console.log(navigator.userAgent);
    }
    // console.count()
    // debugger
  }, [location.key]);

  const handleAddItem = () => {

    debugger
    // Create a new document based on the interface
    const newItemData = {
      FechaTransaccion: new Date(),
      DNI: 'XXXX-XXXX-XXXXX',
      Descripcion: 'Description test',
      Nombre: newItem,
      Collection: 'GuiasRemision'
    };

    // Add a new document to PouchDB
    pouchdbService.addDocument(newItemData)
      .then(() => {
        // After adding, fetch the updated list
        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');
      })
      .then((data) => {
        setDocuments(data);
        setNewItem('');
      });
  };

  const handleUpdateItem = () => {
    if (!editItem) return;
    debugger

    // Update a document in PouchDB
    pouchdbService.updateDocument(editItem)
      .then(() => {
        // After updating, fetch the updated list
        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');
      })
      .then((data) => {
        setDocuments(data);
        setEditItem([]);
      });
  };

  const handleDeleteItem = (id: string, rev: string) => {
    // Delete a document in PouchDB
    debugger
    pouchdbService.deleteDocument(id, rev)
      .then(() => {
        // After deleting, fetch the updated list

        setToastMessage("¡Hecho!");
        setToast(true);

        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');

      })
      .then((data) => {
        setDocuments(data);
      });
  };

  const handleAlertAction = (confirmed: boolean) => {
    if (confirmed) {
      handleDeleteItem(selectedItem2._id, selectedItem2._rev);
    }

    setShowAlert(false);
    setSelectedItem2(null);
  };

  const handleDeleteButtonClick = (doc: any) => {
    setSelectedItem2(doc);
    setShowAlert(true);
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null); // Hide the print preview by setting selectedItem to null
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Get day, month, year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
  }

  return (
    <IonPage>
      <IonToast className="custom-toast" isOpen={toast} onDidDismiss={() => setToast(false)} message={toastMessage} duration={2000} color={toastColor} />
      <IonHeader className="hide-content-print">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Apache CouchDB v3.3</IonTitle>
        </IonToolbar>
        {/* <IonToolbar>
          <IonSearchbar />
        </IonToolbar> */}
      </IonHeader>

      <IonContent className="hide-content-print">
        <IonGrid>
          <IonRow>
            {documents.map((doc) => (
              <IonCol key={doc._id} size="12" size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
                <IonCard color="primary">
                  <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', zIndex: '10' }}>
                    {doc.NumeracionCorrelativa}
                  </div>
                  <IonCardHeader>
                    <IonCardSubtitle>{formatDate(doc.FechaTransaccion)}</IonCardSubtitle>
                    <IonCardTitle>{doc.NombreDestinatario}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {doc.NombrePuntoDeDestino}
                  </IonCardContent>
                  <div style={{ marginTop: 'auto' }}>
                    <IonButton onClick={() => handleDeleteButtonClick(doc)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    <IonButton onClick={() => setSelectedItem(doc)}>
                      <IonIcon icon={eye} />
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          message="¿Está seguro que desea eliminar el documento?"
          // trigger="present-alert"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              handler: () => handleAlertAction(false)
            },
            {
              text: 'Si',
              role: 'confirm',
              handler: () => handleAlertAction(true)
            },
          ]}
        // onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>

      <div className={`print-preview ${selectedItem ? 'visible' : ''}`}>
        {selectedItem && (
          <GuiaRemisionPrintPreview guiaRemisionData={selectedItem} onBackButtonClick={handleBackButtonClick} />
        )}
      </div>
    </IonPage>
  );
};

export default ConsultarGuiasRemision;