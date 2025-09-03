export default async function getArticleList(slug) {
  try {
    const res = await fetch(`/index/${slug}.csv`);
    if (res.status === 404) {
      console.warn(`CSV file not found: ${slug}.csv`);
      return [];
    }
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.text();
    const lines = data.trim().split('\n');
    if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === '')) {
      return [];
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    
    const expectedHeaders = ['date', 'title', 'description'];
    const hasValidHeaders = expectedHeaders.every(header => headers.includes(header));
    
    if (!hasValidHeaders) {
      console.warn(`CSV file ${slug}.csv does not have expected headers: ${expectedHeaders.join(',')}`);
      console.log('Actual headers found:', headers);
      return [];
    }
    
    const articles = lines.slice(1)
      .filter(row => row.trim() !== '')
      .map(row => {
        const values = row.split(',').map(v => v.trim());
        const article = {};
        headers.forEach((header, index) => {
          article[header] = values[index] || '';
        });
        return article;
      })
      .filter(article => {
        return Object.values(article).some(value => value !== '');
      });
    
    return articles;
  } catch (e) {
    console.error('Error fetching CSV:', e);
    return [];
  }
}
