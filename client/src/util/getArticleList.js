export default async function getArticleList(slug) {
  try {
    const res = await fetch(`/index/${slug}.csv`);
    if (!res.ok) throw new Error('Failed to fetch CSV');
    
    const data = await res.text();
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const articles = lines.slice(1).map(row => {
      const values = row.split(',').map(v => v.trim());
      const article = {};
      headers.forEach((header, index) => {
        article[header] = values[index] || '';
      });
      return article;
    });
    
    return articles;
  } catch (e) {
    console.error('Error fetching CSV:', e);
    return [];
  }
}
