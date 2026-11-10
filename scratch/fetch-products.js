const https = require('https');

https.get('https://artisanwearcustom.com/page/Our-Products', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all cards
    const cardRegex = /<div class="aw-card">([\s\S]*?)<\/div>\s*<\/div>/g;
    let match;
    let count = 0;
    while ((match = cardRegex.exec(data)) !== null) {
      count++;
      const cardHtml = match[1];
      const title = (cardHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || [])[1] || '';
      const img = (cardHtml.match(/src="([^"]+)"/i) || [])[1] || '';
      const desc = (cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '';
      console.log(`CARD ${count}:`, { title: title.replace(/&nbsp;/g, '').trim(), img, desc: desc.trim() });
    }

    // Check sections
    console.log('\n--- SECTION HEADINGS ---');
    const secHeaders = data.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
    console.log(secHeaders);
  });
}).on('error', console.error);

