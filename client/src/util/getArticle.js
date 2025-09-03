export default async function getArticle(title, date, contentType) {

  const slug = `/content/${contentType}/${date}-${title}.md`
  try {
    const res = await fetch(slug);
    if (!res.ok) throw new Error('Failed to fetch the article');

    const data = await res.text();
    return data;
  } catch (e) {
    console.error('Error fetching article:', e);
    return [];
  }
}
