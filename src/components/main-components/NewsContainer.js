import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import News from "./News";

export default function NewsContainer({ query, apiKey }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/db.json");

        if (!response.ok) {
          throw new Error(`Error mengambil berita: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("memeriksa data:", data);

        if (data.articles) {
          const filteredArticles = query
            ? data.articles.filter(
                (article) =>
                  article.title.toLowerCase().includes(query.toLowerCase()) ||
                  article.description
                    .toLowerCase()
                    .includes(query.toLowerCase())
              )
            : data.articles;

          setNews(filteredArticles);
        } else {
          setError("Tidak ada artikel yang ditemukan");
          setNews([]);
        }
      } catch (error) {
        console.log("Terjadi kesalahan:", error);
        setError(error.message || "Error mengambil berita");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, category]);

  if (loading)
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return <News news={news} />;
}
