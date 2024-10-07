export default function News({ news }) {
  return (
    <div className="news-container">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <img
        src={article.urlToImage || "default_image_url"}
        alt={article.description || "News Image"}
        className="card-img-top"
      />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}
