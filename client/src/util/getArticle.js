export default async function getArticle(title, date, contentType) {

  const slugifiedTitle = slugify(title);
  const slug = `/content/${contentType}/${date}-${slugifiedTitle}.md`;
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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") 
    .trim();
}