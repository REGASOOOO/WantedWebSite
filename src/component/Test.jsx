// Define the API endpoint URL
const url = new URL('https://api.fbi.gov/wanted/v1/list');
url.searchParams.append('field_offices', 'miami');

function Test(){// Make the API request
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the data
    console.log('FBI Most Wanted Data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

};
export default Test;