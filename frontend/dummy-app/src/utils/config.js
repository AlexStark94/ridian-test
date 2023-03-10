export const getConfig = () => {
    try {
      return {
        API_URL: process.env.API_URL || "http://localhost:8080",
      };
    } catch (error) {
      return {};
    }
  };