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
  });
