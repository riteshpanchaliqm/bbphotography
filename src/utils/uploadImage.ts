import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../firebase';

export const uploadImageWithMeta = async (
  file: File,
  metadata: { title: string; description: string }
) => {
  const fileName = `images/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  await addDoc(collection(db, 'photos'), {
    title: metadata.title,
    description: metadata.description,
    downloadURL,
    createdAt: new Date()
  });
  return downloadURL;
};
