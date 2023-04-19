// 4-hbnb.js

const checkedAmenities = {};

$(document).ready(function () {
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmenities[$(this).attr('data-id')];
    }
    $('div.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });

  // Fetch API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Add click event to search button
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
      contentType: 'application/json',
      success: function (data) {
        // Clear the places section
        $('section.places').empty();
        // Add places to the section
        for (const place of data) {
          // (Generate HTML for place, same as in 3-hbnb.js)
          $('section.places').append(placeHtml);
        }
      }
    });
  });
});
