// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyC-jVMnG7VwsrjHu6XNMpzabeSpoSKXo2M",
  authDomain: "ripples-6b880.firebaseapp.com",
  projectId: "ripples-6b880",
  storageBucket: "ripples-6b880.appspot.com",
  messagingSenderId: "218937808215",
  appId: "1:218937808215:web:9d6dee13de124e0ac09a12",
};

// Initialize Firebase
export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    console.log("got config");
    return config;
  }
}
