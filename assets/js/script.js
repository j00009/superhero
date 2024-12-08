$('#boton').on('click', () => {
  $('#resultado').html("");

  let input = $('#nuestro-input').val().trim();

  if (input) {
    $.ajax({
      dataType: "json",
      type: "get",
      url: `https://superheroapi.com/api.php/4905856019427443/search/${input}`,

      success: (response) => {
        if (response.response === "success") {
          let exactMatches = response.results.filter(
            hero => hero.name.toLowerCase() === input.toLowerCase()
          );

          if (exactMatches.length > 0) {
            exactMatches.forEach((hero, index) => {
              // Crear tarjeta con botón para abrir el modal
              let tarjeta = `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 resultado">
                <div class="card h-100" style="max-width: 300px;">
                  <div class="row g-0">
                    <div class="col-4">
                      <img src="${hero.image.url}" class="card-img img-fluid" alt="Imagen de ${hero.name}">
                    </div>
                    <div class="col-8">
                      <div class="card-body">
                        <h5 class="card-title">Nombre: ${hero.name}</h5>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                          data-bs-target="#heroModal" data-index="${index}">
                          Información Completa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            
              $('#resultado').append(tarjeta);
            });

            
            $('button[data-bs-toggle="modal"]').on('click', function () {
              let index = $(this).data('index');
              let hero = exactMatches[index];

              $('#modalContent').html('');
              $('#modalChartContainer').html(''); 
            
              
              $('#modalContent').html(`
                <h5>Nombre: ${hero.name}</h5>
                <p>Conexiones: ${hero.connections['group-affiliation']}</p>
                <p>Publicado por: ${hero.biography.publisher}</p>
                <img src="${hero.image.url}" class="img-fluid" alt="Imagen de ${hero.name}">
              `);

              if (
                hero.powerstats &&
                Object.keys(hero.powerstats).every(stat => !isNaN(parseInt(hero.powerstats[stat])) && parseInt(hero.powerstats[stat]) > 0)
              ) {
                let misDataPoint = Object.entries(hero.powerstats).map(([key, value]) => ({
                  label: key,
                  y: parseInt(value)
                }));
              
                let options = {
                  title: {
                    text: `Estadísticas para ${hero.name}`
                  },
                  data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString: "#,##0.#'%'",
                    dataPoints: misDataPoint
                  }]
                };
              
                $("#modalChartContainer").CanvasJSChart(options);
              } else {
                console.log(`El héroe ${hero.name} tiene estadísticas incompletas o inválidas y será excluido.`);
                const alertHTML = ` <br><br>
                <div class="alert alert-danger" role="alert">
                  El héroe ${hero.name} tiene estadísticas incompletas o inválidas, por lo cual no se puede generar su respectivo gráfico.
                </div>
              `;  
              $("#modalChartContainer").html(alertHTML);
              }
              
            });
          } else {
            alert("No se encontraron superhéroes con ese nombre exacto.");
          }
        } else {
          alert("No se encontraron superhéroes con ese nombre.");
        }
      },

      error: (error) => {
        alert("Ocurrió un error al buscar el superhéroe.");
      }
    });
  } else {
    alert("El input está vacío");
  }
});
