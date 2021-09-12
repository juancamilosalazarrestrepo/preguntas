window.onload =  async function() {
    base_preguntas = await readText("base-preguntas.json");
    interprete_bp = await   JSON.parse(base_preguntas)
    
  }
  let nombre
  let preguntasCat=[]
  let categoriaElegida
  let pregunta
  let posibles_respuestas
  btn_correspondiente = [
    select_id("btn1"), select_id("btn2"),
    select_id("btn3"), select_id("btn4")
  ]
  npreguntas = []
  
  let contenedor = select_id("contenedor")
  let contCategorias= select_id("contCategorias")
  let formulario = select_id("formulario")
  let preguntas_hechas = 0
  let preguntas_correctas = 0
  let score = select_id("score")
  let score2 = select_id("score2")
  let scoreacumulado = 0
  let impnombre = select_id("impnombre")

  function enviarNombre(){

   
   contCategorias.style.opacity=100;
   nombre=document.getElementById("name").value ;
   console.log(nombre) 
   


  }
  
  function escogerPreguntaAleatoria(categoriaElegida) {

    let n = Math.floor(Math.random() * 4)
    // n = 0
    
    while (npreguntas.includes(n)) {
      n++
      if (n >= 5) {
        n = 0
      }
      if (npreguntas.length == 5) {
        npreguntas = []
      }
    }
    npreguntas.push(n)
    preguntas_hechas++
    
    escogerPregunta(n,categoriaElegida)

  }
  
  async function escogerPregunta(n,categoriaElegida) {
    
    

    

     preguntasCat = await interprete_bp.filter(e => e.categoria == categoriaElegida);
     
    

    /* if(categoriaElegida=="Deporte"){

        preguntasCat = interprete_bp.filter(e => e.categoria == categoriaElegida);
        console.log(preguntasCat);
       }

       if(categoriaElegida=="Ciencia"){

        preguntasCat = interprete_bp.filter(e => e.categoria == categoriaElegida);
        console.log(preguntasCat);
       }   

       if(categoriaElegida=="Geografia"){

        preguntasCat = interprete_bp.filter(e => e.categoria == categoriaElegida);
        console.log(preguntasCat);
       } 

       if(categoriaElegida=="Matematicas"){

        preguntasCat = interprete_bp.filter(e => e.categoria == categoriaElegida);
        console.log(preguntasCat);
       }  */

    pregunta = await preguntasCat[n]
    console.log(pregunta)
    select_id("categoria").innerHTML = await pregunta.categoria
    select_id("pregunta").innerHTML = await pregunta.pregunta
    select_id("numero").innerHTML = n
    let pc = preguntas_correctas
    if(preguntas_hechas>1){
      select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas-1)
    }else{
       select_id("puntaje").innerHTML = ""
    }
      
    style("imagen").objectFit = pregunta.objectFit;
    desordenarRespuestas(pregunta)
    if (pregunta.imagen) {
      select_id("imagen").setAttribute("src", pregunta.imagen)
      style("imagen").height = "200px"
      style("imagen").width = "100%"
    } else {
      style("imagen").height = "0px"
      style("imagen").width = "0px"
      setTimeout(() => {
              select_id("imagen").setAttribute("src", "")
      }, 500);
    }
  }
  
  function desordenarRespuestas(pregunta) {
    posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
      pregunta.incorrecta2,
      pregunta.incorrecta3
    ]
    posibles_respuestas.sort(() => Math.random() - 0.5)
  
    select_id("btn1").innerHTML = posibles_respuestas[0]
    select_id("btn2").innerHTML = posibles_respuestas[1]
    select_id("btn3").innerHTML = posibles_respuestas[2]
    select_id("btn4").innerHTML = posibles_respuestas[3]
  }
  
let suspender_botones = false
  
  function oprimir_btn(i) {
    
   
    if( preguntas_hechas == 5){

       alert("terminaste")
    }
    if (posibles_respuestas[i] == pregunta.respuesta) {
      preguntas_correctas++
      btn_correspondiente[i].style.background = "lightgreen"
    } else {
      btn_correspondiente[i].style.background = "pink"
      gameover();
    }
    for (let j = 0; j < 4; j++) {
      if (posibles_respuestas[j] == pregunta.respuesta) {
        btn_correspondiente[j].style.background = "lightgreen"
        break
      }
    }
    setTimeout(() => {
      reiniciar()
      
    }, 3000);
    scoreacumulado = preguntas_correctas * 1000
    score.innerHTML = scoreacumulado
  
  }

  /* funcion para terminar el juego */

  function gameover(){
    impnombre.innerHTML = nombre
    contenedor.style.opacity=0;
    contenedor.style.height="0px";

   
  }
  

  function asignarCategoria(j){
      
     if (j==1){
        categoriaElegida="Artes"
        
      }
      
      
      if (j==2){
        categoriaElegida="Matematicas"
        
      }
      if (j==3){
        categoriaElegida="Geografia"
        
      }
      if (j==4){
        categoriaElegida="Ciencia"
        
      }
      if (j==5){
        categoriaElegida="Deporte"
        
      } 

      escogerPreguntaAleatoria(categoriaElegida)
      
      contenedor.style.opacity = 100
      formulario.style.marginTop = "-20px";
      formulario.style.opacity= 0
      contCategorias.style.opacity=0
  }



  
  
  // let p = prompt("numero")
  
  function reiniciar() {
    for (const btn of btn_correspondiente) {
      btn.style.background = "white"
    }
    escogerPreguntaAleatoria(categoriaElegida)
  }
  
  function select_id(id) {
    return document.getElementById(id)
  }
  
  function style(id) {
    return select_id(id).style
  }
  
  function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      texto = xmlhttp.responseText;
    }
    return texto;
  }