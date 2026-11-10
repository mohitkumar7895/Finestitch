const https = require('https');

https.get('https://artisanwearcustom.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find Testimonials section
    const tIdx = data.indexOf('B2B Partners Say');
    if (tIdx !== -1) {
      console.log('--- TESTIMONIALS SECTION ---');
      console.log(data.substring(tIdx - 200, tIdx + 2500));
    } else {
      console.log('B2B Partners Say not found directly, searching for testimonials');
      const m = data.match(/<section[^>]*>[\s\S]*?(testimonial|partner|review)[\s\S]*?<\/section>/gi);
      console.log(m ? m.slice(0, 3) : 'None found');
    }

    // Find Product Range section
    const prIdx = data.indexOf('Our Product Range');
    if (prIdx !== -1) {
      console.log('\n--- PRODUCT RANGE SECTION ---');
      console.log(data.substring(prIdx - 100, prIdx + 2000));
    }
  });
}).on('error', console.error);

