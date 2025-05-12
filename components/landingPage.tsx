import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@/app/types";
import { Dimensions } from "react-native";
import landingPageStyles from "../components/css/landing-page";
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

  const leftVerses = [
   { text: "Waaqayyoon \nfaarfadhaa", verse: "Bau 15:21" },
  { text: "Maganoho \nFaarse!", verse: "Fulo 15፡21" },
  { text: "Maganii \nZammarre", verse: "Fuli Max. 15፡21" },
  { text: "የጔታ አዝምሮ", verse: "ዘጸ. 15፡21" },
  ];
  const rightVerses = [
    { text: "Waa'ina \nzammallehe", verse: "Dooyyi 15:21" },
  { text: "ንእግዚኣብሄር ዘምሩሉ", verse: "ዘፀ. 15:21" },
  { text: "KietnƐ Kuoth \nnhial diit", verse: "Diit. 15:21" },
  { text: "Xoossasi sabbite!", verse: "Kes. 15:21" },
  ];

  const allLines = [...leftVerses, ...rightVerses];

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
    <View style={{ flex: 1 }}>
    <LinearGradient
     colors={["#1abc9c", "#2575fc"]}
     style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            በኢትዮጵያ ሰባተኛ ቀን አድቬንቲስት ቤተክርስቲያን በተለያየ ቋንቋ የተዘጋጀ የመዝሙር መተግበሪያ
          </Text>
          <Text style={styles.heroSubtitle}>
            የመዝሙር ግጥሞችን፣ ተወዳጅ መዝሙሮችን እና አልበሞችን በቀላሉ ያግኙ።
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
          <View style={styles.footerRow}>
            <Text style={styles.headingTitle}>የመዝሙር መተግበሪያ</Text>
          </View>
          <View style={styles.twoColumnContainer}>
            
            <View  style={styles.column}>
              {leftVerses.map((verse, index) => (
                 <View key={index} style={styles.entry}>
                  <Text  style={styles.VerseText}>{verse.text}</Text>
                  <Text  style={styles.verse}>{verse.verse}</Text>
                  
                  </View>
           ))}
           </View>
               <View style={styles.iconContainer}>
              <Image
                source={require("../assets/images/sda-logo.png")

                }
                style={styles.centerLogo}
                resizeMode="contain"
              />
            </View>
          
            <View style={styles.column}>
               {rightVerses.map((verse, index) => (
                 <View key={index} style={styles.entryRight}>
                  <Text  style={styles.VerseTextRight}>{verse.text}</Text>
                  <Text  style={styles.verseRight}>{verse.verse}</Text>
            </View>
             ))}   
            </View>
              
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>ለእግዚአብሔር ዘምሩ! </Text>
            <Text style={styles.footerVerse}> ዘጸ. 15፡21</Text>

          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
    
    </View>
  );
};
export default LandingPage;
