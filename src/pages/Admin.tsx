import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Trash2, Eye, Camera } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  description: string;
  frameSize: 'small' | 'medium' | 'large' | 'wide';
  watermarked: boolean;
  firebaseUrl?: string;
  firebaseId?: string;
  fileName?: string;
}

const Admin: React.FC = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, [auth]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch(err => setAuthError(err.message));
  };

  const categories = useMemo(() => ['courtship', 'feathers', 'natural', 'closeup', 'display', 'behavior', 'habitat'], []);
  const frameSizes = ['small', 'medium', 'large', 'wide'];

  // Load existing photos from Firebase with real-time updates
  useEffect(() => {
    const photosQuery = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(photosQuery, (querySnapshot) => {
      try {
        const photos: UploadedPhoto[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          photos.push({
            id: doc.id,
            file: new File([], data.title), // Placeholder file
            preview: data.downloadURL,
            title: data.title,
            category: data.category,
            description: data.description || '',
            frameSize: data.frameSize,
            watermarked: data.watermarked || false,
            firebaseUrl: data.downloadURL,
            firebaseId: doc.id,
            fileName: data.fileName
          });
        });
        
        setUploadedPhotos(photos);
      } catch (error) {
        console.error('Error loading photos from Firebase:', error);
        // Continue with empty state if Firebase fails
        setUploadedPhotos([]);
      }
    }, (error) => {
      console.error('Error setting up real-time listener:', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      
      try {
        // Create a local preview first
        const localPreview = URL.createObjectURL(file);
        
        // Create a temporary photo object
        const tempPhoto: UploadedPhoto = {
          id: `temp-${Date.now()}-${i}`,
          file,
          preview: localPreview,
          title: `Photograph ${uploadedPhotos.length + i + 1}`,
          category: categories[0],
          description: '',
          frameSize: 'medium' as const,
          watermarked: false
        };
        
        // Add to local state immediately for preview
        setUploadedPhotos(prev => [...prev, tempPhoto]);
        setUploadProgress(((i + 1) / acceptedFiles.length) * 100);
        
        // Try to upload to Firebase (but don't block the UI)
        try {
          const fileName = `photos/${Date.now()}-${file.name}`;
          const storageRef = ref(storage, fileName);
          
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          
          // Add to Firestore
          const photoData = {
            title: tempPhoto.title,
            category: tempPhoto.category,
            description: tempPhoto.description,
            frameSize: tempPhoto.frameSize,
            watermarked: tempPhoto.watermarked,
            fileName: fileName,
            downloadURL: downloadURL,
            createdAt: new Date()
          };
          
          const docRef = await addDoc(collection(db, 'photos'), photoData);
          
          // Update the photo with Firebase data
          setUploadedPhotos(prev => 
            prev.map(p => 
              p.id === tempPhoto.id 
                ? { 
                    ...p, 
                    id: docRef.id,
                    preview: downloadURL,
                    firebaseUrl: downloadURL,
                    firebaseId: docRef.id,
                    fileName: fileName
                  }
                : p
            )
          );
          
          console.log('Photo successfully uploaded to Firebase:', docRef.id);
        } catch (firebaseError) {
          console.error('Firebase upload failed, keeping local version:', firebaseError);
          // Keep the local version if Firebase upload fails
        }
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
    
    setIsUploading(false);
  }, [uploadedPhotos.length, categories]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const addWatermark = (photo: UploadedPhoto): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new window.Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Add watermark
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('BBPhotography', canvas.width / 2, canvas.height - 50);
        
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      
      img.src = photo.preview;
    });
  };

  const handleWatermark = async (photo: UploadedPhoto) => {
    const watermarkedDataUrl = await addWatermark(photo);
    setUploadedPhotos(prev => 
      prev.map(p => 
        p.id === photo.id 
          ? { ...p, preview: watermarkedDataUrl, watermarked: true }
          : p
      )
    );
  };

  const handleDelete = async (photoId: string) => {
    const photo = uploadedPhotos.find(p => p.id === photoId);
    
    // Try to delete from Firebase if it exists there
    if (photo?.firebaseId && photo?.firebaseUrl) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'photos', photo.firebaseId));
        
        // Delete from Storage
        if (photo.fileName) {
          const storageRef = ref(storage, photo.fileName);
          await deleteObject(storageRef);
        }
      } catch (error) {
        console.error('Error deleting from Firebase:', error);
        // Continue with local deletion even if Firebase fails
      }
    }
    
    // Always remove from local state
    setUploadedPhotos(prev => prev.filter(p => p.id !== photoId));
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const handleUpdatePhoto = async (photoId: string, updates: Partial<UploadedPhoto>) => {
    const photo = uploadedPhotos.find(p => p.id === photoId);
    if (photo?.firebaseId) {
      try {
        // Update in Firestore
        await updateDoc(doc(db, 'photos', photo.firebaseId), {
          title: updates.title || photo.title,
          category: updates.category || photo.category,
          description: updates.description || photo.description,
          frameSize: updates.frameSize || photo.frameSize
        });
      } catch (error) {
        console.error('Error updating photo:', error);
      }
    }
    
    setUploadedPhotos(prev => 
      prev.map(p => p.id === photoId ? { ...p, ...updates } : p)
    );
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg space-y-4 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-text-primary">Admin Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-text-primary focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-800 text-text-primary focus:outline-none"
          />
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          <button type="submit" className="w-full bg-accent-color text-primary-color py-2 rounded-lg">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-primary-color">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Admin Dashboard
          </h1>
          <p className="text-xl text-text-secondary">
            Manage your photography collection and upload new images
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Upload className="h-6 w-6 mr-2 text-accent-color" />
                Upload Photos
              </h2>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-accent-color bg-accent-color bg-opacity-10'
                    : 'border-gray-600 hover:border-accent-color'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-accent-color mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-accent-color font-semibold">Drop the files here...</p>
                ) : (
                  <div>
                    <p className="text-text-primary font-semibold mb-2">
                      Drag & drop photos here
                    </p>
                    <p className="text-text-secondary text-sm">
                      or click to select files
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-accent-color h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Photos</span>
                  <span className="text-accent-color font-bold">{uploadedPhotos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Watermarked</span>
                  <span className="text-accent-color font-bold">
                    {uploadedPhotos.filter(p => p.watermarked).length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photos Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uploadedPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-xl overflow-hidden hover-lift"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent-color to-gradient-blue-dark relative">
                    <img
                      src={photo.preview}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {photo.watermarked && (
                      <div className="absolute top-2 right-2 bg-accent-color text-primary-color px-2 py-1 rounded text-xs font-bold">
                        WATERMARKED
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedPhoto(photo)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30"
                        >
                          <Eye className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleWatermark(photo)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30"
                        >
                          <Camera className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(photo.id)}
                          className="p-2 bg-red-500 bg-opacity-80 backdrop-blur-sm rounded-full text-white hover:bg-opacity-100"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => handleUpdatePhoto(photo.id, { title: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-600 text-text-primary font-semibold mb-2 focus:border-accent-color focus:outline-none"
                      placeholder="Photo title"
                    />
                    <select
                      value={photo.category}
                      onChange={(e) => handleUpdatePhoto(photo.id, { category: e.target.value })}
                      className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-text-primary text-sm focus:border-accent-color focus:outline-none mb-2"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                    <select
                      value={photo.frameSize}
                      onChange={(e) => handleUpdatePhoto(photo.id, { frameSize: e.target.value as any })}
                      className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-text-primary text-sm focus:border-accent-color focus:outline-none"
                    >
                      {frameSizes.map(size => (
                        <option key={size} value={size}>
                          {size.charAt(0).toUpperCase() + size.slice(1)} Frame
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>

            {uploadedPhotos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Image className="h-16 w-16 text-text-secondary mx-auto mb-4" />
                <p className="text-xl text-text-secondary">
                  No photos uploaded yet. Start by uploading some images!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-full overflow-auto bg-gray-900 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="aspect-[16/9] bg-gradient-to-br from-accent-color to-gradient-blue-dark rounded-lg overflow-hidden mb-6">
                  <img
                    src={selectedPhoto.preview}
                    alt={selectedPhoto.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={selectedPhoto.title}
                    onChange={(e) => handleUpdatePhoto(selectedPhoto.id, { title: e.target.value })}
                    className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-text-primary font-semibold text-xl focus:border-accent-color focus:outline-none"
                    placeholder="Photo title"
                  />
                  
                  <textarea
                    value={selectedPhoto.description}
                    onChange={(e) => handleUpdatePhoto(selectedPhoto.id, { description: e.target.value })}
                    className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-text-secondary focus:border-accent-color focus:outline-none resize-none"
                    rows={3}
                    placeholder="Photo description"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedPhoto.category}
                      onChange={(e) => handleUpdatePhoto(selectedPhoto.id, { category: e.target.value })}
                      className="bg-transparent border border-gray-600 rounded px-4 py-3 text-text-primary focus:border-accent-color focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedPhoto.frameSize}
                      onChange={(e) => handleUpdatePhoto(selectedPhoto.id, { frameSize: e.target.value as any })}
                      className="bg-transparent border border-gray-600 rounded px-4 py-3 text-text-primary focus:border-accent-color focus:outline-none"
                    >
                      {frameSizes.map(size => (
                        <option key={size} value={size}>
                          {size.charAt(0).toUpperCase() + size.slice(1)} Frame
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWatermark(selectedPhoto)}
                      className="flex-1 px-6 py-3 bg-accent-color text-primary-color font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      {selectedPhoto.watermarked ? 'Re-watermark' : 'Add Watermark'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-3 border border-accent-color text-accent-color font-semibold rounded-lg hover:bg-accent-color hover:text-primary-color transition-colors"
                    >
                      Download
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
