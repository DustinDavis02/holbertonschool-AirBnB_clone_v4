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
  });
  