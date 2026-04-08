const request = require('http');

async function testApi() {
  const data = JSON.stringify({
    name: "Springfield Elementary",
    address: "123 Evergreen Terrace, Springfield",
    latitude: 39.7817,
    longitude: -89.6501
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/addSchool',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = request.request(options, res => {
    let responseBody = '';

    res.on('data', chunk => {
      responseBody += chunk;
    });

    res.on('end', () => {
      console.log('--- POST /api/addSchool Response ---');
      console.log(responseBody);
      
      const parsed = JSON.parse(responseBody);
      if (parsed.success) {
        testGetSchools();
      }
    });
  });

  req.on('error', error => {
    console.error('Error in POST:', error);
  });

  req.write(data);
  req.end();
}

function testGetSchools() {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/listSchools?latitude=39.0000&longitude=-89.0000',
    method: 'GET'
  };

  const req = request.request(options, res => {
    let responseBody = '';

    res.on('data', chunk => {
      responseBody += chunk;
    });

    res.on('end', () => {
      console.log('\n--- GET /api/listSchools Response ---');
      console.log(responseBody);
      process.exit();
    });
  });

  req.on('error', error => {
    console.error('Error in GET:', error);
  });

  req.end();
}

testApi();
