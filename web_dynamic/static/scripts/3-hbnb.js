$(document).ready(function () {
  // Initialize an empty object to store the checked checkboxes
  let checkedBox = {};

  $('input:checkbox').change(function () {
    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the checkbox's id and name to the checkedBox object
      checkedBox[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove the checkbox's id from the checkedBox object
      delete checkedBox[$(this).data('id')];
    }

    // Update the amenities display
    $('div.amenities h4').html(function () {
      let amenities = Object.values(checkedBox);
      if (amenities.length === 0) {
        return '&nbsp';
      }
      return amenities.join(', ');
    });
  });

  // Get the API status and update the availability indicator
  const apiStatus = $('DIV#api_status');
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });

  // Fetch places data and append them to the DOM
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let currentPlace of data) {
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

