module.exports = {
  server: {
    baseDir: "./",
    headers: {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' data: blob:;"
    }
  }
};
