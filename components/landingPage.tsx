import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated , TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const LandingPage = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [searchText, setSearchText] = useState('');
 // const navigation = useNavigation();
  useEffect(() => {
    startAnimation();
    return () =>{
      scaleAnim.stopAnimation()
    };
  }, [scaleAnim]);
 
  const startAnimation = ()=>{
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue:1.05, 
          duration:1000, 
          useNativeDriver:true
        }), 
        Animated.timing(scaleAnim, {
          toValue:1,
          duration:1000, 
          useNativeDriver:true
        })
      ])
    ).start();
  }
  const handleInputFocus = () =>{
    scaleAnim.stopAnimation();
   // navigation.navigate('NavBabar')
  }
  const handleNoFocus =() =>{
    startAnimation();
  }

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}></Text>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.NavText}></Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.navItem}>
              <Text style={styles.NavText}>Testing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.NavText}>Share</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome To The SDA Songs App</Text>
          <Text style={styles.heroSubtitle}>Explore lyrics, favorites, and albums with ease.</Text>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity>
              <TextInput 
                            style = {styles.searchInput}
                            placeholder="Search By #, title, category, artist name"
                            placeholderTextColor={'#888'}
                            value={searchText}
                            onChangeText={setSearchText}
                            onFocus={handleInputFocus}
                            onBlur={handleNoFocus}>    
                        </TextInput>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>App Features</Text>
          {featuresData.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Icon name={feature.icon} size={50} color="#6a11cb" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const featuresData = [
  {
    icon: 'heart',
    title: 'Favorites',
    description: 'Save and access your favorite songs and albums easily.',
  },
  {
    icon: 'search',
    title: 'Search',
    description: 'Quickly find lyrics and songs with an intuitive search.',
  },
  {
    icon: 'music',
    title: 'Lyrics Sync',
    description: 'Sync lyrics with songs for a seamless experience.',
  },
];

const styles = StyleSheet.create({
  gradientBackground: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
  },
  navItem: {
    marginHorizontal: 10,
  },
  NavText: {
    fontSize: 16,
    color: '#fff',
  },
  heroSection: {
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaText: {
    color: '#6a11cb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 20,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 30,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  searchInput:{
    height:40, 
    borderColor:'#ccc', 
    borderRadius:5, 
    borderWidth:1, 
    width:'100%',
    paddingHorizontal: 10, 
    marginBottom: 15,
    backgroundColor:'#fff'
}
});

export default LandingPage;
