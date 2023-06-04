$(document).ready(function() {
  // Variable to store the selected amenity IDs
  const selectedAmenities = [];

  // Function to update the h4 tag with selected amenities
  function updateSelectedAmenities() {
    const selectedAmenitiesString = selectedAmenities.join(', ');
    $('#amenities-checked').text(selectedAmenitiesString);
  }

  // Event listener for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // Add the Amenity ID to the selectedAmenities list
      selectedAmenities.push(amenityId);
    } else {
      // Remove the Amenity ID from the selectedAmenities list
      const index = selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag with selected amenities
    updateSelectedAmenities();
  });
});

// Function to check the API status and update the div#api_status accordingly
  function checkApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

// Check the API status on page load
  checkApiStatus();
});
 
