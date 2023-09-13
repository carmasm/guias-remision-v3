import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { addDocument, getDocuments, updateDocument, deleteDocument } from '../../firestoreService';
import { pencil, trash } from 'ionicons/icons';

// Define the interface for Firestore documents
interface YourDocument {
    DNI: string;
    Descripcion: string;
    Nombre: string;
    id: string;
  }

const ConsultarGuiasRemision: React.FC = () => {
    
    const [items, setItems] = useState<YourDocument[]>([]);
    const [newItem, setNewItem] = useState('');
    const [editItem, setEditItem] = useState<YourDocument | null>(null);

    const { name } = useParams<{ name: string; }>();

  useEffect(() => {
    // Load documents from Firestore
    getDocuments('Codigos').then((querySnapshot) => {
        const data: YourDocument[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as YourDocument);
        });
        setItems(data);
      });
  }, []);

  const handleAddItem = () => {

    // Create a new document based on the interface
    const newItemData: Omit<YourDocument, 'id'> = {
        DNI: 'XXXX-XXXX-XXXXX',
        Descripcion: 'Description test',
        Nombre: newItem,
      };
  
      // Add a new document to Firestore
      addDocument('Codigos', newItemData)
        .then(() => {
          // After adding, fetch the updated list
          return getDocuments('Codigos');
        })
        .then((querySnapshot) => {
          const data: YourDocument[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as YourDocument);
          });
          setItems(data);
          setNewItem('');
        });
  };

  const handleUpdateItem = () => {
    if (!editItem) return;

    // Update a document in Firestore
    updateDocument('Codigos', editItem.id, {
      DNI: editItem.DNI,
      Descripcion: editItem.Descripcion,
      Nombre: editItem.Nombre,
    })
      .then(() => {
        // After updating, fetch the updated list
        return getDocuments('Codigos');
      })
      .then((querySnapshot) => {
        const data: YourDocument[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as YourDocument);
        });
        setItems(data);
        setEditItem(null);
      });
  };

  const handleDeleteItem = (id: string) => {
    // Delete a document in Firestore
    deleteDocument('Codigos', id)
      .then(() => {
        // After deleting, fetch the updated list
        return getDocuments('Codigos');
      })
      .then((querySnapshot) => {
        const data: YourDocument[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as YourDocument);
        });
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
        <IonTitle>Google Cloud Firestore CRUD</IonTitle>
        </IonToolbar>
    </IonHeader>

    <IonContent>
        <IonItem>
          <IonInput
            placeholder="New Item"
            value={newItem}
            onIonChange={(e) => setNewItem(e.detail.value!)}
          />
          <IonButton onClick={handleAddItem}>Add Item</IonButton>
        </IonItem>

        <IonList>
          {items.map((item) => (
            <IonItem key={item.id}>
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
              <IonButton onClick={() => handleDeleteItem(item.id)}>
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