const getSuperHero = (id) => {
  $.ajax({
    url:`https://www.superheroapi.com/api.php/3933154296912140/${id}`,
    type:'GET',
    dataType: 'json',
    success: function(superhero){
      $('#error-section').css('display', 'none');
      displayInfo(superhero);
      displayGraph(superhero);
    },
    error: function(error){
      $('#error-section').css('display', 'block');
      $('#error-section').html(`Error al conectar con api: ${error.status}`);
      console.log(`error: ${error}`);
    }
  });
}


const displayGraph = (superhero) => {
  let points = [];
  for(const [key, value] of Object.entries(superhero.powerstats)){
    points.push({y: value, label: key});
  }
  var chart = new CanvasJS.Chart("graph", {
    animationEnabled: true,
    title:{
      text: "Estadisticas",
      horizontalAlign: "center"
    },
    data: [{
      type: "doughnut",
      startAngle: 60,
      indexLabelFontSize: 10,
      indexLabel: "{label} ({y})",
      toolTipContent: "<b>{label}:</b> {y}",
      dataPoints: points
    }]
  });
  chart.render();
  $('.canvasjs-chart-credit').html('');
}
const displayInfo = (superhero) => {
  $('#result').html(`
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4 text-center">
        <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${superhero.name}</h5>
          <p class="card-text">${Object.values(superhero.connections)[0]}</p>
          <p class="card-text"><small class="text-body-secondary">Publicado por ${superhero.biography.publisher}</small></p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Ocupacion: ${superhero.work.occupation}</li>
          <li class="list-group-item">Primera aparicion: ${Object.values(superhero.biography)[4]}</li>
          <li class="list-group-item">Altura: ${superhero.appearance.height[0]} - ${superhero.appearance.height[1]}</li>
          <li class="list-group-item">Peso: ${superhero.appearance.weight[0]} - ${superhero.appearance.weight[1]}</li>
          <li class="list-group-item">Alianzas: ${superhero.biography.aliases}</li>
        </ul>
      </div>
    </div>
  </div>
  `)
}
const isValid = (id) => {
  if(isNaN(id)){
    $('#error-section').css('display', 'block');
    $('#error-section').html('Solo se permiten valores numericos');
    return false
  }
  if(id <= 0 || id > 731){
    $('#error-section').css('display', 'block');
    $('#error-section').html('Id fuera de rango de superheros (1 - 731)');
    return false
  }
  return true
}

$(document).ready(function(){
  $('#btn-search').on('click', (event)=>{
    event.preventDefault();
    let id = $('#search-input').val();
    if(!isValid(id)){
      $('#result').html('')
      $('#graph').html('')
      return
    }
    getSuperHero(id);
  });

});