  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD5-tpktJRBbJwIP_TZmvGG0Yjrft1hcMg",
  authDomain: "test-formulario-a3ace.firebaseapp.com",
  projectId: "test-formulario-a3ace",
  storageBucket: "test-formulario-a3ace.appspot.com",
  messagingSenderId: "937793854384",
  appId: "1:937793854384:web:e97a3af5315be7836d9475"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//referencia a la base de datos
var baseDatos = firebase.database().ref('test-formulario')

// Creacion de registros a través del formulario con MODAL
function addTVshow(){
  $('#myModal').modal('show');
}

function guardar(){
	
	let titleVal = $("#txtTitle").val();	
	let networkVal = $("#txtNetwork").val();
	let numberVal = $("#txtNumberOfSeasons").val();
	let isCurrentVal = $("#isCurrent").prop('checked');
	let genresVal = $("#txtgenres").val();
	
  if(titleVal != "" && networkVal != "" && numberVal > 0){
    let nuevoTVShow = baseDatos.push();
	  nuevoTVShow.set({
		title : titleVal,
		network : networkVal,
		numberOfSeasons : numberVal,
    genres : genresVal,
		current : isCurrentVal,		
	});
  nuevoTVShow.on('value', (snapshot) =>{
    rellenarTabla();
  });

  }
	$('#myModal').modal('hide');
}
//carga los datos al iniciar
rellenarTabla();

var dataTvShow =[];
// Rellenar tabla con los datos de la database

function rellenarTabla(){
  var filas = "" ;
  var dataTvShow =[];
  firebase.database().ref('test-formulario').once('value', function(data){
    data.forEach(function(tvShow){
      var show = new Formulario();
      show.key = tvShow.key;
      show.title = tvShow.val().title;
      show.network = tvShow.val().network;
      show.numberOfSeasons = tvShow.val().numberOfSeasons;
      show.genres = tvShow.val().genres;
      show.current = tvShow.val().current;
      dataTvShow.push(show);
    });

    for (var i=0; i<dataTvShow.length; i++){
      filas += "<tr>"
      filas += "<td>"
      filas += dataTvShow[i].title;
      filas += "</td>"
      filas += "<td>"
      filas += dataTvShow[i].network;
      filas += "</td>"
      filas += "<td>"
      filas += dataTvShow[i].numberOfSeasons;
      filas += "</td>"
      filas += "<td>"
      filas += dataTvShow[i].genres;
      filas += "</td>"
      filas += "<td>"
      filas += dataTvShow[i].current;
      filas += "</td>"
      filas += "<td>"
      filas += "<button onclick=\"editar(\'"+ dataTvShow[i].key +"\')\" type='button' class='btn btn-success m-1'><i class='bi bi-pencil-square'></i></button><button onclick=\"eliminar(\'"+ dataTvShow[i].key +"\')\" type='button' class='btn btn-danger m-1'><i class='bi bi-x-square'></i></button>"
      filas += "</td>"     
      filas += "</tr>"
    }
    $('#datos').html(filas);
  });
}

function eliminar(key){
  firebase.database().ref('test-formulario').child(key).remove();
  rellenarTabla();
}

function editar(key){
  dataTvShow = [];
  firebase.database().ref('test-formulario').once('value', function(data){
    data.forEach(function(tvShow){
      var show = new Formulario();      
      show.key = tvShow.key;
      show.title = tvShow.val().title;
      show.network = tvShow.val().network;
      show.numberOfSeasons = tvShow.val().numberOfSeasons;
      show.genres = tvShow.val().genres;
      show.current = tvShow.val().current;
      dataTvShow.push(show);
    });
    for(var i=0; i<dataTvShow.length; i++){
      if(key === dataTvShow[i].key){
        $("#txtTitle").val(dataTvShow[i].title);	
        $("#txtNetwork").val(dataTvShow[i].network);
        $("#txtNumberOfSeasons").val(dataTvShow[i].numberOfSeasons);
        $("#isCurrent").val(dataTvShow[i].current);
        $("#txtgenres").val(dataTvShow[i].genres);
        $('#myModal').modal('show');
      }
    }
  });
}

// Creaión de una Clase
class Formulario{
  key;
  title;
  network;
  numberOfSeasons;
  genres;
  current;
    constructor(){
      this.key = '';
      this.title  = '';
      this.network = '';
      this.numberOfSeasons = 0;
      this.genres = '';
      this. current = '';
    }
}

// Creación de objetos en la base de datos para ver conexión
/* function primerosDatos(){
  let nuevapelicula = baseDatos.push();
  nuevapelicula.set({
    title : "Game of Thrones",
    network : "HBO",
    numberOfSeasons : " 8 ",
    genres : "Violencia",
    current : "NO" ,
  });
} */