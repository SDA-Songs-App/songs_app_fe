export default ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    "expo-router"
  ],
  extra: {
    API_URL: process.env.EXPO_PUBLIC_API_URL,
  },
});
