module.exports = {
  apps: [
    {
      name: "hcfsme",
      script: "server.mjs",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || "8787",
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        ADMIN_TOKEN_SECRET: process.env.ADMIN_TOKEN_SECRET,
        DATA_FILE: process.env.DATA_FILE || "./data/store.json",
        UPLOAD_DIR: process.env.UPLOAD_DIR || "./data/uploads",
      },
    },
  ],
};
