import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated , TextInput, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Navbar from './navbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '@/app/(tabs)/types';
type LandingPageNavigationProp = StackNavigationProp<RootStackParams, 'Home'>
const LandingPage = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<LandingPageNavigationProp>();
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
    navigation.navigate('Navbar')
  }
  const handleNoFocus =() =>{
    startAnimation();
  }

  return (
    <LinearGradient colors={['#1abc9c', '#2575fc']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}></Text>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.NavText}></Text>
            </TouchableOpacity>
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
        <View style={styles.featureContainer}>
         
        <ImageBackground
              source={require('../assets/images/SDA.jpg')}
               style = {styles.backgroundImage}
            >
              <Text> Features containers</Text>
  {/* Your components here */}
</ImageBackground>
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
const featuresData2 = [
  {
  icon:'list',
  title:'search', 
  description:'To say something sldnfdfs ksdf skddfjgngdkf'
  }, 
  {
    icon:'play',
    title:'search', 
    description:'To say something sdfgk dfgkjs lkdjfg lkdjfg '
  }, 
  {
    icon:'cog',
    title:'search', 
    description:'To say something sdfg kldjfgk jdlfgjl dj ksdjlfg'
  }
]

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
  featureContainer:{
    backgroundColor:'#fff',
    flexDirection: 'row', // Align the child views horizontally
    justifyContent: 'space-between', // Place the views on opposite sides (left and right)
    alignItems: 'center',
  },
  featuresSection2: {
    paddingLeft: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 20,
    alignItems:'center',
    backgroundColor:'#fff'
      },
  feature: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  feature2: {
    alignItems: 'flex-start',
    marginBottom: 30,
    marginLeft:50
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  backgroundImage:{
     
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire background
    justifyContent: 'center',
    height:229,
    width:400 // Centers the content inside

},
  featureTitle1:{
      fontSize:14, 
      fontWeight:'bold',
      color: '#333'
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#666',
     },
    featureDescription2: {
      fontSize: 14,
      textAlign: 'justify',
      marginRight:0,
      color: '#666',
      },
      featureLeft:{
        flex:1,
        alignItems:'flex-start'
      },
      featureRight:{
        flex:1, 
        alignItems:'flex-end'
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
