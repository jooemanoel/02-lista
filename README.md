# 02Lista

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## ESLint

ng add @angular-eslint/schematics

## Karma

ng generate config karma

## Terminal gráfico para testes

npm install --save-dev istanbul-reports

## bootstrap via CDN

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

## Firebase

### 1 - NPM

```
npm install firebase
```

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6D-EiO-Bi6wb7fePa-FLnIE3NqY62BjM",
  authDomain: "testebd-80d9e.firebaseapp.com",
  databaseURL: "https://testebd-80d9e.firebaseio.com",
  projectId: "testebd-80d9e",
  storageBucket: "testebd-80d9e.firebasestorage.app",
  messagingSenderId: "33530023257",
  appId: "1:33530023257:web:d9c421b634ce9e510c5048"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### 2 - html

```
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6D-EiO-Bi6wb7fePa-FLnIE3NqY62BjM",
    authDomain: "testebd-80d9e.firebaseapp.com",
    databaseURL: "https://testebd-80d9e.firebaseio.com",
    projectId: "testebd-80d9e",
    storageBucket: "testebd-80d9e.firebasestorage.app",
    messagingSenderId: "33530023257",
    appId: "1:33530023257:web:d9c421b634ce9e510c5048"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
```
