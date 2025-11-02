const API_KEY = window.NEWS_KEY || "";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const newsContainer = document.getElementById("newsContainer");

// Fetch and display news
async function fetchNews(query = "tesla") {
  try {
    const response = await fetch(
      `${BASE_URL}${query}&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    const data = await response.json();

    newsContainer.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = `<p>No news found for "${query}".</p>`;
      return;
    }

    data.articles.forEach((article) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      newsCard.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News image" />
        <div class="news-content">
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `;

      newsContainer.appendChild(newsCard);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchNews(query);
});

// Load default news
fetchNews();
