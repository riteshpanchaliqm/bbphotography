import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, ZoomIn, Download } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

interface Photo {
  id: string;
  src: string;
  title: string;
  category: string;
  frameSize: 'small' | 'medium' | 'large' | 'wide';
  description: string;
  downloadURL?: string;
  createdAt?: Date;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories = useMemo(() => ['all', 'courtship', 'feathers', 'natural', 'closeup', 'display'], []);

  // Load photos from Firebase with real-time updates
  useEffect(() => {
    const photosQuery = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(photosQuery, (querySnapshot) => {
      try {
        const loadedPhotos: Photo[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedPhotos.push({
            id: doc.id,
            src: data.downloadURL || `/api/placeholder/800/600/${doc.id}`,
            title: data.title,
            category: data.category,
            frameSize: data.frameSize || 'medium',
            description: data.description || `A stunning capture showcasing the beauty of ${data.category} photography.`,
            downloadURL: data.downloadURL,
            createdAt: data.createdAt?.toDate()
          });
        });
        
        setPhotos(loadedPhotos);
        setFilteredPhotos(loadedPhotos);
      } catch (error) {
        console.error('Error loading photos from Firebase:', error);
        // Fallback to sample photos if Firebase fails
        const samplePhotos: Photo[] = Array.from({ length: 12 }, (_, i) => ({
          id: `sample-${i + 1}`,
          src: `/api/placeholder/${Math.random() > 0.5 ? '800/600' : '600/800'}/${i + 1}`,
          title: `Sample Photograph ${i + 1}`,
          category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
          frameSize: ['small', 'medium', 'large', 'wide'][Math.floor(Math.random() * 4)] as Photo['frameSize'],
          description: `A stunning capture showcasing the beauty of ${categories[Math.floor(Math.random() * (categories.length - 1)) + 1]} photography.`
        }));
        setPhotos(samplePhotos);
        setFilteredPhotos(samplePhotos);
      }
    }, (error) => {
      console.error('Error setting up real-time listener:', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [categories]);

  useEffect(() => {
    let filtered = photos;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(photo => photo.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPhotos(filtered);
  }, [photos, selectedCategory, searchTerm]);

  const getFrameSizeClass = (size: Photo['frameSize']) => {
    switch (size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'medium': return 'col-span-1 row-span-2';
      case 'large': return 'col-span-2 row-span-2';
      case 'wide': return 'col-span-2 row-span-1';
      default: return 'col-span-1 row-span-1';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-primary-color">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Photography Gallery
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Explore my collection of carefully curated photographs, each telling a unique story through the lens
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search photographs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent-color focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent-color text-primary-color'
                        : 'bg-gray-700 text-text-primary hover:bg-gray-600'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-accent-color text-primary-color'
                      : 'bg-gray-700 text-text-primary hover:bg-gray-600'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'masonry'
                      ? 'bg-accent-color text-primary-color'
                      : 'bg-gray-700 text-text-primary hover:bg-gray-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedCategory}-${searchTerm}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
              }
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-xl hover-lift ${
                    viewMode === 'grid' ? getFrameSizeClass(photo.frameSize) : ''
                  }`}
                  onClick={() => setSelectedPhoto(photo)}
                >
                                  <div className="aspect-[4/3] bg-gradient-to-br from-accent-color to-gradient-blue-dark relative overflow-hidden">
                  {photo.downloadURL ? (
                    <img
                      src={photo.downloadURL}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  )}
                  
                  {/* Watermark */}
                  <div className="absolute top-4 right-4 text-white text-sm font-semibold opacity-80">
                    BBPhotography
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                      >
                        <ZoomIn className="h-6 w-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                      >
                        <Download className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                  
                  {/* Photo Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPhotos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-text-secondary">
                No photographs found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      <AnimatePresence>
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
              className="relative max-w-4xl w-full max-h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-accent-color to-gradient-blue-dark relative overflow-hidden">
                  {selectedPhoto.downloadURL ? (
                    <img
                      src={selectedPhoto.downloadURL}
                      alt={selectedPhoto.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                  )}
                  <div className="absolute top-4 right-4 text-white text-sm font-semibold">
                    BBPhotography
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                  <p className="text-text-secondary mb-4">{selectedPhoto.description}</p>
                  <div className="flex gap-4">
                    <span className="px-3 py-1 bg-accent-color text-primary-color rounded-full text-sm">
                      {selectedPhoto.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-text-primary rounded-full text-sm">
                      {selectedPhoto.frameSize} frame
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
