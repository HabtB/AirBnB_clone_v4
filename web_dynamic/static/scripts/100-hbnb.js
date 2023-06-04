// Script that is executed only when DOM is loaded with jQuery
$(document).ready(function () {
  let checked_box = {};

  // Event listener for checkbox changes
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      // Store the checked state or city ID and name in the checked_box variable
      checked_box[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove the unchecked state or city ID from the checked_box variable
      delete checked_box[$(this).data('id')];
    }

    // Update the h4 tag in the div with the class "amenities" with the selected amenities
    $('div.amenities h4').html(function () {
      let amenities = [];
      // Get the names of the selected amenities
      Object.keys(checked_bith the selected amenities, cities, and states
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: '{}', // Send an empty object as the data
      success: function (data) {
        // Handle the success response and update the DOM accordingly
        for (let currentPlace of data) {
          // Append HTML content for each place
          $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPlace.description + '</div></artatus === 'OK') {
      // If the API status is OK, add the "available" class to the div with the ID "api_status"
      apiStatus.addClass('available');
    } else {
      // If the API status is not OK, remove the "available" class from the div with the Iox).forEach(function (key) {
        amenities.push(checked_box[key]);
      });

      // If no amenities are selected, display an empty space
      if (amenities.length === 0) {
        return ('&nbsp');
      }

      // Join the selected amenity names with a comma and display them
      return (amenities.join(', '));
    });
  });

  const apiStatus = $('div#api_status');

  // Make a GET request to check the API status
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.sD "api_status"
      apiStatus.removeClass('available');
    }
  });

  $('button').click(function () {
    // Make a POST request to places_search wticle>');
        }
      }
    });
  });
});

