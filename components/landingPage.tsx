import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  ImageBackground,
  Image,
  ListRenderItemInfo,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./navbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@/app/types";
import { Dimensions } from "react-native";

type FeatureType = {
  icon: string;
  title: string;
  description: string;
  alignment?: "left" | "right";
};

type LandingPageNavigationProp = StackNavigationProp<RootStackParams, "Home">;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ANIMATION_DURATION = 1000;
const ICON_SIZE = 20;
const LandingPage = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const containerAnim = useRef(new Animated.Value(0)).current;

  const leftLines = [
    "“Waaqayyoon faarfadhaa!” Bau 15:21",
    "“Maganoho Faarse!” Fulo 15፡21",
    "“Maganii Zammarre!” Fuli Max. 15፡21",
    "“የጔታ አዝምሮ!” ዘጸ. 15፡21",
  ];
  const rightLines = [
    "“Waa'ina zammallehe!” Dooyyi 15:21",
    "“ንእግዚኣብሄር ዘምሩሉ!” ዘፀ. 15:21",
    "“KietnƐ Kuoth nhial diit!” Diit. 15:21",
    "“Xoossasi sabbite!” Kes. 15:21",
  ];

  const allLines = [...leftLines, ...rightLines];

  const lineAnimValues = useRef(
    allLines.map(() => new Animated.Value(0))
  ).current;

  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<LandingPageNavigationProp>();
  useEffect(() => {
    startSearchAnimation();
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      animateLines();
    });
  }, [scaleAnim, containerAnim]);

  const startSearchAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateLines = () => {
    const animations = lineAnimValues.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    );
    // Stagger them so each line animates in sequence
    Animated.stagger(150, animations).start();
  };

  const handleInputFocus = () => {
    scaleAnim.stopAnimation();
    navigation.navigate("Navbar");
  };
  const handleNoFocus = () => {
    startSearchAnimation();
  };

  const renderFeatureItem = useCallback(
    ({ item }: ListRenderItemInfo<FeatureType>) => (
      <FeatureCard {...item} alignment={item.alignment} />
    ),
    []
  );

  // Interpolate the containerAnim to create a slide-up + fade-in effect
  const containerAnimatedStyle = {
    opacity: containerAnim, // fades from 0 to 1
    transform: [
      {
        translateY: containerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0], // slides up from 30px
        }),
      },
    ],
  };

  // We'll create helper functions to render the lines with animations
  const renderAnimatedLine = (text: string, index: number) => {
    // For each line, use lineAnimValues[index] to fade/slide in
    const lineAnim = lineAnimValues[index];
    const lineStyle = {
      opacity: lineAnim,
      transform: [
        {
          translateY: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0], // slides up from 10px
          }),
        },
      ],
    };
    return (
      <Animated.Text key={index} style={[styles.featureLine, lineStyle]}>
        {text}
      </Animated.Text>
    );
  };

  return (
    <LinearGradient
      colors={["#1abc9c", "#2575fc"]}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/*<Text style={styles.logo}></Text> */}
          {/*<View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.NavText}></Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            በኢትዮጲያ ሰባተኛ ቀን አድቬንቲስት ቤ/ክ በተለያየ ቋንቋ የተዘጋጀ የመዝሙር ደብተር
          </Text>
          {/** Welcome To The SDA Songs App*
            Explore lyrics, favorites, and albums with ease.
            Search By #, title, category, artist name
          */}
          <Text style={styles.heroSubtitle}>
            የመዝሙር ግጥሞችን ተወዳጅ መዝሞሮችን እና አልበሞችን በቀላሉ ያግኙ።
          </Text>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="በቁጥር፣ በርዕስ፣ በምድብ ወይም በዘማሪ ስም ይፈልጉ"
                placeholderTextColor={"#888"}
                value={searchText}
                onChangeText={setSearchText}
                onFocus={handleInputFocus}
                onBlur={handleNoFocus}
              ></TextInput>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View
          style={[styles.featureContainer, containerAnimatedStyle]}
        >
          {/*<ImageBackground
            source={require("../assets/images/SDA.jpg")}
            style={styles.backgroundImage}
          >
            <Text> Features containers</Text>
            {/* Your components here 
          </ImageBackground> 
          */}
          {/* Now list the lines or items from your image */}

          <View style={styles.footerRow}>
            <Text style={styles.headingTitle}>የመዝሙር ደብተር</Text>
          </View>
          <View style={styles.twoColumnContainer}>
            <View style={styles.column}>
              {leftLines.map((line, i) => renderAnimatedLine(line, i))}
            </View>
            <View style={styles.centerLogoContainer}>
              <Image
                source={require("../assets/images/SDA.jpg")}
                style={styles.centerLogo}
              />
            </View>
            <View style={styles.column}>
              {rightLines.map((line, i) =>
                // The index for the right lines starts after left lines
                renderAnimatedLine(line, i + leftLines.length)
              )}
            </View>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>“ለእግዚአብሔር ዘምሩ!” ዘጸ. 15፡21</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const FeatureCard: React.FC<FeatureType> = ({
  icon,
  title,
  description,
  alignment = "left",
}) => (
  <View style={[styles.feature, alignment === "right" && styles.featureRight]}>
    <Icon name={icon} size={ICON_SIZE} color="#2575fc" />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);
/*
const FeatureSection: React.FC<{
  title: string;
  data: FeatureType[];
  renderItem: ({ item }: ListRenderItemInfo<FeatureType>) => JSX.Element;
}> = ({ title, data, renderItem }) => (
  <View style={styles.featureSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  </View>
);
*/

const featuresData = [
  {
    icon: "heart",
    title: "Favorites",
    description: "Save and access your favorite songs and albums easily.",
  },
  {
    icon: "search",
    title: "Search",
    description: "Quickly find lyrics and songs with an intuitive search.",
  },
  {
    icon: "music",
    title: "Lyrics Sync",
    description: "Sync lyrics with songs for a seamless experience.",
  },
];
const featuresData2 = [
  {
    icon: "list",
    title: "search",
    description: "To say something sldnfdfs ksdf skddfjgngdkf",
  },
  {
    icon: "play",
    title: "search",
    description: "To say something sdfgk dfgkjs lkdjfg lkdjfg ",
  },
  {
    icon: "cog",
    title: "search",
    description: "To say something sdfg kldjfgk jdlfgjl dj ksdjlfg",
  },
];

const styles = StyleSheet.create({
  gradientBackground: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  navbar: {
    flexDirection: "row",
  },
  navItem: {
    marginHorizontal: 10,
  },
  NavText: {
    fontSize: 16,
    color: "#fff",
  },
  heroSection: {
    padding: 40,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  ctaButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaText: {
    color: "#6a11cb",
    fontSize: 18,
    fontWeight: "bold",
  },
  featureContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "space-between", // Place the views on opposite sides (left and right)
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  featureContainerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  featuresSection2: {
    paddingLeft: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  featureLine: {
    fontSize: 14,
    color: "#333",
    marginVertical: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a11cb",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // Two-column layout + logo in center
  twoColumnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // space-around or space-evenly if you prefer
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  centerLogoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    // Shadow for the circular logo container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centerLogo: {
    width: 80,
    height: 80,
    //marginHorizontal: 16,
    resizeMode: "contain",
  },
  feature: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  feature2: {
    alignItems: "flex-start",
    marginBottom: 30,
    marginLeft: 50,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  // The heading outside (above) the container
  headingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ensures the image covers the entire background
    justifyContent: "center",
    height: 229,
    width: 400, // Centers the content inside
  },
  featureTitle1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "justify",
    color: "#666",
  },
  featureDescription2: {
    fontSize: 14,
    textAlign: "justify",
    marginRight: 0,
    color: "#666",
  },
  featureLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  featureRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingLeft: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default LandingPage;
