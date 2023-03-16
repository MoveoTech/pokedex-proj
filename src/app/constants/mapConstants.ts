export const mapStyles = [
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#CBC3E3',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#efefef',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#0000FF',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#dedddd',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#C4A484',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];

export const homeLoc = { lat: 32.0624536, lng: 34.771485 };
export const destinationLoc = { lat: 32.0497089, lng: 34.7616289 };
