// Shows Joined's daily reminder when the app isn't open.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyCGDINpgQLFSART1qmikrGBm_1nYh2ixug",authDomain:"joined-3adda.firebaseapp.com",projectId:"joined-3adda",storageBucket:"joined-3adda.firebasestorage.app",messagingSenderId:"946780758467",appId:"1:946780758467:web:43c76646d126d83bd25d76"});
firebase.messaging();
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("/#family"));});
