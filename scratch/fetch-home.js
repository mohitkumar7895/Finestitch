const https = require('https');

https.get('https://artisanwearcustom.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const titles = data.match(/<(h1|h2|h3)[^>]*>[\s\S]*?<\/\1>/gi) || [];
    console.log('HOMEPAGE TITLES:');
    titles.forEach((t, i) => console.log(`${i+1}. ${t.replace(/<[^>]+>/g, '').trim()}`));
    
    console.log('\n--- BUTTONS / LINKS ---');
    const links = data.match(/<a[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/a>/gi) || [];
    console.log('Sample links:', links.slice(0, 10).map(l => l.replace(/<[^>]+>/g, '').trim()));
  });
}).on('error', console.error);

