const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1;
};

const totalLikes = (blogs) => {
  if (Array.isArray(blogs)) {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0);
  }
};

const favoriteBlog = (blogs) => {
  if (Array.isArray(blogs)) {
    const likes = blogs.map((b) => b.likes);
    const maxLikes = Math.max(...likes);
    return blogs[likes.indexOf(maxLikes)];
  }
};

const mostBlogs = (blogs) => {
  if (Array.isArray(blogs)) {
    const res = [];
    blogs.forEach((b) => {
      const existing = res.find((r) => r.author === b.author);
      if (existing) {
        const updated = { ...existing, blogs: existing.blogs + 1 };
        res[res.indexOf(existing)] = updated;
      } else {
        res.push({ author: b.author, blogs: 1 });
      }
    });
    const maxBlogs = Math.max(...res.map((r) => r.blogs));
    return res.find((r) => r.blogs === maxBlogs);
  }
};
const mostLikes = (blogs) => {
  if (Array.isArray(blogs)) {
    const res = [];
    blogs.forEach((b) => {
      const existing = res.find((r) => r.author === b.author);
      if (existing) {
        const updated = { ...existing, likes: existing.likes + b.likes };
        res[res.indexOf(existing)] = updated;
      } else {
        res.push({ author: b.author, likes: b.likes });
      }
    });
    const maxBlogs = Math.max(...res.map((r) => r.likes));
    return res.find((r) => r.likes === maxBlogs);
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
