// Event listener for checkbox changes
let checked_box = {};

$(document).ready(function() {
  $('input:checkbox').change(function() {
    if ($(this).is(':checked')) {
      // Store State or City ID in the checked_box object
      checked_box[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove State or City ID from the checked_box object
      delete checked_box[$(this).data('id')];
    }

    // Update the amenities display
    $('div.amenities h4').html(function() {
      let amenities = [];

      // Convert checked_box object values to an array
      Object.keys(checked_box).forEach(function(key) {
        amenities.push(checked_box[key]);
      });

      if (amenities.length === 0) {
        return ('&nbsp');
      }

      return (amenities.join(', '));
    });
  });

  // Check API status and update the UI
  const apiStatus = $('DIV#api_status');
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function(data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });

  // Event listener for the "Search" button click
  $('button').click(function() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: '{}',
      success: function(data) {
        // Append HTML content for each place
        for (let currentPlace of data) {
          $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPlace.description + '</div></article>');
        }
      }
    });
  });
});

