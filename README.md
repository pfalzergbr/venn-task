# Test Challenge

Test Challenge submission by [Gabor Pfalzer](https://pfalzer.dev). Very educational, had a lot of fun with this one.

### The application as specified:

- Renders a list of Views, which could be TextBox, Image, or Carousel.
- The user can add a new view from any of these three types, using the buttons on the top.
- User can edit any existing view.
- The views are re-arrangable by drag & drop.
- Items can be selected for deletion, by clicking on delete buttons on the card. These can be removed together with the Delete Marked Views button.
- The application automatically fetches views from the server, and persists them on change.
- State management handled by React Context and useReducer, built into a custom useViewList hook. Requests are handled by a custom useFetch hook.

### VTextBox

Renders a TextBox view which supports the following details:

- Body Text
- Font and Background color
- Capitalised letters
- Padding
- Font size
- Text Alignment

### VImageWithPadding

Renders an Image view, that supports:

- Background color
- Padding
- Link type, selectable from category or product.
- Product or Category id,
- Height multiplier, calculated by the frontend.

### VCarousel

Renders a Carousel of images, where the user can:

- Add multiple images for the carousel. These images show up as a thumbnail, and can be removed one by one before the view is submitted
- set the Padding.

## External Libraries Used:

- Drag and drop: [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- Color Picker: [React Color](https://casesandberg.github.io/react-color/#usage-include)
- Form Control: [React Hook Form](https://react-hook-form.com/)
- Carousel: [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)
- ID generation: [uuid](https://www.npmjs.com/package/uuid)

- Mocking Server: [Mock Service Worker](https://mswjs.io/)
- Testing: [React-Testing-Library](https://testing-library.com/), [Jest](https://jestjs.io/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
