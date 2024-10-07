import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import News from "./News";

export default function NewsContainer({ query, apiKey }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      console.log(
        "fetchNews called with query:",
        query,
        "and category:",
        category
      );

      try {
        setLoading(true);
        setError("");
        const currentCategory = category || "general";
        const response = await fetch(
          query === ""
            ? `https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=us&apiKey=${apiKey}`
            : `https://newsapi.org/v2/everything?q=${encodeURIComponent(
                query
              )}&apiKey=${apiKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Error fetching news: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("checking for data:", data);

        if (data.articles) {
          setNews(data.articles);
        } else {
          setError(data.message || "Error fetching news");
          setNews([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Error occurred:", error);
          setError(error.message || "Error fetching news");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };
  }, [query, category, apiKey]);

  if (loading)
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return <News news={news} />;
}
