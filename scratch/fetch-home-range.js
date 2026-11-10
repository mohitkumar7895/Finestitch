const https = require('https');

https.get('https://artisanwearcustom.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const s = data.indexOf('Product Range');
    if (s !== -1) {
      console.log(data.substring(s - 100, s + 3000));
    } else {
      console.log('Not found by "Product Range"');
    }
  });
}).on('error', console.error);

