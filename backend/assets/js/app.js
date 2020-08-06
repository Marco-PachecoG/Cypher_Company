var firebaseConfig = {
    apiKey: "AIzaSyBtiC69qsTTJEOej-Ev1-q2b6ja-MhfL3s",
    authDomain: "cypher-61788.firebaseapp.com",
    databaseURL: "https://cypher-61788.firebaseio.com",
    projectId: "cypher-61788",
    storageBucket: "cypher-61788.appspot.com",
    messagingSenderId: "695203959830",
    appId: "1:695203959830:web:f5eb475d5c55fdbb8b5137",
    measurementId: "G-CL5K1Q13FB",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  
  db = firebase.firestore();

$(document).ready(function () {
    
        db.collection("messages").onSnapshot(snapshots => {
            let data = "";
            snapshots.forEach(doc => {
                data += `
                <tr>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().phone}</td>
                    <td>${doc.data().date}</td>
                    <td><button type="button" class="btn btn-danger">Eliminar</button></td>
                    <td><button onclick="viewMessage('${doc.id}')" type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">View</button></td>
                </tr>
                `;
            });
            document.getElementById('table_messages').innerHTML = data;
        });
});

function viewMessage(id) {
    db.collection('messages').doc(id).onSnapshot(doc => {
        document.getElementById('name').textContent = doc.data().name;
        document.getElementById('email').textContent = doc.data().email;
        document.getElementById('phone').textContent = doc.data().phone;
        document.getElementById('date').textContent = doc.data().date;
        document.getElementById('message').textContent = doc.data().message;
        
    });
}