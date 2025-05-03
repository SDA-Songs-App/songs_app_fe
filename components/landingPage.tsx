import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import landingPageStyles from '../components/css/landing-page'
type FeatureType = {
  icon: string;
  title: string;
  description: string;
  alignment?: "left" | "right";
};
const styles = landingPageStyles();

type LandingPageNavigationProp = StackNavigationProp<RootStackParams, "Home">;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ANIMATION_DURATION = 1000;
const ICON_SIZE = 20;
const LandingPage = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const containerAnim = useRef(new Animated.Value(0)).current;

  const leftLines = [
    "“Waaqayyoon \n faarfadhaa!” \n Bau 15:21",
    "“Maganoho \n Faarse!” \n Fulo 15፡21",
    "“Maganii \n Zammarre!” \n Fuli Max. 15፡21",
    "“የጔታ አዝምሮ!” \n  ዘጸ. 15፡21",
  ];
  const rightLines = [
    "“Waa'ina \n  zammallehe!” \n  Dooyyi 15:21",
    "“ንእግዚኣብሄር ዘምሩሉ!” \n  ዘፀ. 15:21",
    "“KietnƐ Kuoth \n nhial diit!” \n  Diit. 15:21",
    "“Xoossasi sabbite!” \n  Kes. 15:21",
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
            በኢትዮጲያ ሰባተኛ ቀን አድቬንቲስት ቤ/ክ በተለያየ ቋንቋ የተዘጋጀ የመዝሙር መተግበሪያ
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
            <Text style={styles.headingTitle}>የመዝሙር መተግበሪያ</Text>
          </View>
          <View style={styles.twoColumnContainer}>
            <View style={styles.column}>
              {leftLines.map((line, i) => renderAnimatedLine(line, i))}
            </View>
            <View style={styles.centerLogoContainer}>
              <Image
                source={require("../assets/images/sda-logo.png")}
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



export default LandingPage;
