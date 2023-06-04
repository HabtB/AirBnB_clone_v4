$(document).ready(function () {
  let checkedBox = {}; // Object to store the checked amenities

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      // Add checked amenity to the object
      checkedBox[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove unchecked amenity from the object
      delete checkedBox[$(this).data('id')];
    }

    $('div.amenities h4').html(function () {
      let amenities = Object.values(checkedBox); // Get an array of checked amenities
      if (amenities.length === 0) {
        return '&nbsp'; // Display placeholder if no amenities are checked
      }
      return amenities.join(', '); // Display checked amenities separated by comma
    });
  });

  const apiStatus = $('DIV#api_status');
  // Make a GET request to check API status
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available'); // Add 'available' class if API is OK
    } else {
      apiStatus.removeClass('available'); // Remove 'available' class if API is not OK
    }
  });

  $('button').click(function () {
    // Event listener for the button click

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checkedBox) }),
      // Send the list of checked amenities as JSON data
      success: function (data) {
        // Handle the success response and update the DOM accordingly
        $('.places').empty(); // Clear the existing places

        for (var i = 0; i < data.length; i++) {
          var currentPlace = data[i];
          // Append HTML content for each place
          $('.places').append(`<article>
            <div class="title">
              <h2>${currentPlace.name}</h2>
              <div class="price_by_night">$${currentPlace.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />
                ${currentPlace.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />
                ${currentPlace.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />
                ${currentPlace.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="user"></div>
            <div class="description">$${currentPlace.description}</div>
          </article>`);
        }
      }
    });
  });
});

