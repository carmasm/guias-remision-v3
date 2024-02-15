import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { pouchdbService } from '../../pouchdbService';
import { pencil, trash } from 'ionicons/icons';

const ConsultarGuiasRemision: React.FC = () => {
    
    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState('');
    const [editItem, setEditItem] = useState<any[]>([]);

    const { name } = useParams<{ name: string; }>();

  useEffect(() => {
    // Load documents from CouchDB
    pouchdbService.findAllDocumentsByType('GuiaRemision')
              .then(data => {
                setItems(data)
                console.log(data)
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
    // console.count()
    // debugger
  }, []);

  const handleAddItem = () => {

    debugger
    // Create a new document based on the interface
    const newItemData = {
      FechaTransaccion: new Date(),
      DNI: 'XXXX-XXXX-XXXXX',
      Descripcion: 'Description test',
      Nombre: newItem,
      Tipo: 'GuiaRemision'
  };
  
      // Add a new document to PouchDB
      pouchdbService.addDocument(newItemData)
      .then(() => {
          // After adding, fetch the updated list
          return pouchdbService.findAllDocumentsByType('GuiaRemision');
      })
      .then((data) => {
          setItems(data);
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
         return pouchdbService.findAllDocumentsByType('GuiaRemision');
     })
     .then((data) => {
         setItems(data);
         setEditItem([]);
     });
  };

  const handleDeleteItem = (id: string, rev: string) => {
    // Delete a document in PouchDB
    debugger
    pouchdbService.deleteDocument(id, rev)
    .then(() => {
        // After deleting, fetch the updated list
        return pouchdbService.findAllDocumentsByType('GuiaRemision');
    })
    .then((data) => {
        setItems(data);
    });
  };

  return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonMenuButton />
        </IonButtons>
        <IonTitle>Google Cloud Firestore CRUD v3</IonTitle>
        </IonToolbar>
    </IonHeader>

    <IonContent>
        <IonItem>
          <IonInput
            placeholder="New Item"
            value={newItem}
            onIonInput={(e) => setNewItem(e.detail.value!)}
          />
          <IonButton onClick={handleAddItem}>Add Item</IonButton>
        </IonItem>

        <IonList>
          {items.map((item) => (
            <IonItem key={item._id}>
              <IonInput
                value={item.DNI}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated DNI
                  setEditItem({ ...item, DNI: e.detail.value! });
                }}
              />
              <IonInput
                value={item.Descripcion}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated Descripcion
                  setEditItem({ ...item, Descripcion: e.detail.value! });
                }}
              />
              <IonInput
                value={item.Nombre}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated Nombre
                  setEditItem({ ...item, Nombre: e.detail.value! });
                }}
              />
              <IonButton onClick={handleUpdateItem}>
                <IonIcon icon={pencil} />
              </IonButton>
              <IonButton onClick={() => handleDeleteItem(item._id, item._rev)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ConsultarGuiasRemision;