import { ViewTypes } from '../../Types/ViewTypes';

// Dummy data fetched with Postman from the API. These are used to provide mocks in tests,
// and use in development process before data fetching is wired up.
const mockData: ViewTypes[] = [
  {
    id: '1',
    moduleType: 'VTextBox',
    attributes: {
      padding: 14,
      backgroundColor: {
        hex: '#FFFFFF',
      },
      bodyText: '20% Discount on all items',
      textAlignment: 'left',
      fontSize: 14,
      capitalised: true,
      fontColor: {
        hex: '#000000',
      },
    },
  },
  {
    id: '2',
    moduleType: 'VImageWithPadding',
    attributes: {
      padding: 0,
      backgroundColor: {
        hex: '#000000',
      },
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
      link: {
        payload: '123',
        type: 'category',
      },
    },
    heightMultiplier: 1.25,
  },
  {
    id: '3',
    moduleType: 'VImageCarousel',
    attributes: {
      padding: 0,
      images: [
        'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
        'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
        'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
      ],
    },
    heightMultiplier: 1.25,
  },
];

export const mockView: ViewTypes = {
  moduleType: 'VTextBox',
  attributes: {
    padding: 18,
    backgroundColor: {
      hex: 'green',
    },
    bodyText: '15% Discount on all items',
    textAlignment: 'left',
    fontSize: 14,
    capitalised: true,
    fontColor: {
      hex: '#000000',
    },
  },
  isMarked: true,
};
