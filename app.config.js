export default ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
     [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: "35.0.0",
          enableMinifyInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ]
    ,
    "expo-router"
  ],
  extra: {
    API_URL: process.env.EXPO_PUBLIC_API_URL || "http://10.72.30.211:3001",
      "eas": {
        "projectId": "12ff9f06-1cc6-496d-9116-ea9c7fd0f738"
      }
  },
});
