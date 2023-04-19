$(document).ready(function () {
  const amenityIds = {};
  
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityIds[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityIds[$(this).data('id')];
    }
    
    const amenityNames = Object.values(amenityIds);
    if (amenityNames.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenityNames.join(', '));
    }
  });

  // API status check
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Fetch places data
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        $('.places').append(`
          <article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">
                ${place.price_by_night}
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br />
                ${place.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${place.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="user">
              <strong>Owner: PLACEHOLDER</strong>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `);
      }
    }
  });
});
