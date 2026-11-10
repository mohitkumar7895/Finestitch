const https = require('https');

https.get('https://artisanwearcustom.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const s = data.indexOf('YOUR BRAND, OUR CANVAS');
    if (s !== -1) {
      console.log(data.substring(s - 50, s + 3500));
    }
  });
}).on('error', console.error);

