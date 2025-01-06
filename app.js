// Create the Photo Sphere Viewer instance
const viewer = new PhotoSphereViewer.Viewer({
    container: document.getElementById('viewer-container'),
    panorama: './images/image1.png', // Default starting image
    plugins: [
      PhotoSphereViewer.MarkersPlugin,
    ],
  });
  
  // Store information about the images and markers
  const scenes = {
    image1: {
      panorama: './images/image1.png', // Use PNG images
      markers: [
        {
          id: 'to-image2',
          longitude: 0.5, // Adjust to the position of the hotspot
          latitude: 0.1,  // Adjust to the position of the hotspot
          image: 'https://cdn-icons-png.flaticon.com/512/189/189665.png', // Marker icon
          tooltip: 'Go to Image 2',
          data: { target: 'image2' }, // Link to the target scene
        },
      ],
    },
    image2: {
      panorama: './images/image2.png', // Use PNG images
      markers: [
        {
          id: 'to-image1',
          longitude: -0.5, // Adjust to the position of the hotspot
          latitude: 0.2,   // Adjust to the position of the hotspot
          image: 'https://cdn-icons-png.flaticon.com/512/189/189665.png',
          tooltip: 'Go to Image 1',
          data: { target: 'image1' },
        },
      ],
    },
  };
  
  // Load a scene by its ID
  function loadScene(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;
  
    viewer.setPanorama(scene.panorama).then(() => {
      const markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);
      markersPlugin.clearMarkers();
  
      scene.markers.forEach((marker) => {
        markersPlugin.addMarker(marker);
      });
    });
  }
  
  // Initialize the first scene
  loadScene('image1');
  
  // Handle marker clicks
  viewer.getPlugin(PhotoSphereViewer.MarkersPlugin).on('select-marker', (marker) => {
    const targetScene = marker.data.target;
    if (targetScene) {
      loadScene(targetScene);
    }
  });
  
