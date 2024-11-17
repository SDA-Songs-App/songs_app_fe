import { DrawerActions, RouteProp, useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList, ScrollView, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RooStackSettingsParams, RootStackParams } from "@/app/(tabs)/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import GestureRecognizer from "react-native-swipe-gestures";
const styles = StyleSheet.create({
    container:{
 
    backgroundColor :'#f2f2f2',
    width:'100%',
    height:'100%'
    },

    navbar: {
        flexDirection:'row', 
        justifyContent: 'space-between',
        alignItems :'center', 
        padding : 10, 
        backgroundColor:'#1abc9c',
        marginTop: 30
    }, 
    number:{
        color:'#fff', 
        fontSize: 20
    }, 
    modalContainer :{
        width:'80%', 
        padding:20, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        alignItems: 'center'
    }, 
    modalBackground:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'rgb(0, 0, 0, 0.5'
    }, 
    modalTitle:{
        fontSize:18, 
        marginBottom:15,
    },
    verse1Style: {
      color: 'blue',
      fontWeight: 'bold',
    }, 
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
    },
    selectedCategoryButton: {
        backgroundColor: '#4CAF50',
    },
    categoryButtonText: {
        fontSize: 14,
        color: '#888',
    },
    selectedCategoryButtonText: {
        color: '#fff',
    },
    songItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    noResultsText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
    searchInput: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      listContent: {
        paddingVertical: 10,
      },
      songCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      },
      songDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
      },
      songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      songLyrics: {
        fontSize: 14,
        color: '#555',
      },
      iconContainer: {
        padding: 8,
      },
      songCategory: {
        fontStyle: 'italic',
      },
      columnWrapper: {
        justifyContent: 'space-between',
      },
      selectedSongContainer: {

        padding: 16,
        marginTop:40,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

      },
      selectedSongTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      selectedSongCategory: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 5,
      },
      selectedSongArtist: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
      },
      selectedSongLyrics: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
      },
      closeButton: {
        fontSize: 16,
        color: '#007bff',
        marginTop: 10,
        textAlign: 'right',
      },
      backButton: {
        marginRight: 1, 
        padding: 10,
    },
    LangModalContainer :{
        marginBottom:200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, 
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: 150,
        marginTop:-490,
        marginLeft:120
      },
      languageOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      languageText: {
        fontSize: 20,
        textAlign: 'center',
      },
      langContainer: { 
        flexDirection : 'row',
        alignItems: 'center',
      },

      pickerContainer: {
        width: 50,
       fontSize:20,
       fontWeight:'100',
        paddingVertical:5,

      },
      pickerText: {
        color: '#fff',
        fontSize: 16,
      },
      scrollContainer: {
        // flexGrow: 1, // Allows the content to grow
        // justifyContent: 'center', // Center content vertically
    },
    songContainer: {
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
})
type NavigationProp = DrawerNavigationProp<RootStackParams>;
type NavbarScreenProps = {
    navigation: StackNavigationProp<any>;
    route: RouteProp<any>;
  };
const NavbarScreen:FC<NavbarScreenProps> = () =>{
     Dimensions.get('window');

    const navigation = useNavigation<NavigationProp>();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearchModalVisible, setSearchModalVisible] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null); 
    // const [modalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Oromo');
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [verseIndex, setVerseIndex] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    

      const openSearchModal = () =>{
        setSearchModalVisible(true)
    }
    const closeSearchModal = () =>{
        setSearchModalVisible(false);
        
           // setIsModalVisible(false);
            setSearchText('');
            setFilteredSongs([]);
            setSelectedCategory(null);
    }
    const handlePress = (actionName :string) =>{
        console.log(`${actionName} component to be implemented`)
        
    };
    const handleSettingPress = () =>{
        // navigation.toggleDrawer();
        // navigation.toggleDrawer();
  console.log("navigation:", navigation);
    };
    type Song = {
        id:number
        song_num:number
        date?:string;
        title: string;
        chorus:string;
        category: string;
        artist: string;
        verse_1:string
        verse_2:string
        verse_3:string
        verse_4?:string
        verse_5?:string
        verse_6?:string
        verse_7?:string
        language_value:string          
    };
    type AllSongs = {
        language_key: string;
        Content: Song[];
    }[];
    const songsData = [
        { id: '1', date: '12/01/2021 04:11 pm', title: 'Song 1', lyrics: 'Here I am writing some amazing lyrics While my instrumental is', category: 'Praise' ,artist:'JOhn'},
        { id: '2', date: '12/01/2021 04:11 pm', title: 'Simple', lyrics: 'Fast and effective', category: 'Worship', artist:'JOhn 12' },
        { id: '3', date: '12/01/2021 04:10 pm', title: 'Musicians', lyrics: 'Best friend', category: 'Prayer',artist:'Dogn 123' },
        { id: '4', date: '12/01/2021 04:10 pm', title: 'Best App', lyrics: 'for great lyrics', category: 'Praise',artist:'Sam' },
        { id: '5', date: '10/01/2021 05:39 pm', title: 'Song 1', lyrics: 'Gotta write some inspirational lyrics for this song', category: 'Worship',artist:'Zack' },
        { id: '6', date: '10/01/2021 12:49 am', title: 'Carry on', lyrics: 'carry on carry on carry on', category: 'Prayer',artist:'Thomas' },
      
        // Add more songs here as needed
    ];

    const allSongs = [
      {
        language_key:'አማርኛ',
        Content:[
                {
                  id:1,
                  song_num: 1,
                  title: "ኃይል ያለው በጉልበት ላይ ነው",
                  category:"Cat 1",
                  chorus: " ኃይል ያለው በጉልበት ላይ ነው \/2*\/\nመንበርከክ መፀለይ ካለ\nሁሉም ነገር በእጃችን አለ\n",
                  verse_1: "ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው\nበደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው\nአርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው\n",
                  verse_2: "ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው\nበደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው\nአርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው\n",
                  verse_3: "ኤልያስ ሦስት ዓመት ሙሉ ዝናብ እንዳይወርድ የዘጋው\nበእምነት በፀሎት ኃይል ነው አመፀኛውን ሕዝብ የቀጣው\nለነገሥታትና ለአህዛብ የአምላኩን ክንድ የገለጸው\n",
                  verse_4: "በአንበሳ ጉድጓድ ውስጥ አድሮ ዳርዮስ ጠርቶ የጠየቀው\nዳንኤል አሳደረህ ወይ አምላክህ የምታመልከው\nአዎን ድኜ አድሬአለሁ አምላኬን አከብረዋለሁ\n",
                  artist: "ተፈራ ወ\/ማሪያም",
                  language_value: "አማርኛ"
                },
                {
                  id:2,
                  song_num: 2,
                 title: "ልመችህ ማደሪያህ ልሁን",
                 category:"Cat 1",
                  chorus: "ልመችህ ማደሪያህ ልሁን\nአፅዳኝና ገብተህ ተደላደል}2 \nአንተ እንዳትገባ ሚያደርገውን ሁሉ\nበጅራፍህ ገርፈህ አስወጣው በሙሉ}2\n",
                  verse_1: "አቤቱ አባታችን ይኸው በፊትህ ነን\nንስሐ እንገባለን ተቀበለን\nየምህረት አምላክ ነህ ርኅሩኅ ነህጌታ\nኃጢአታችን በዝቷል አርግልን ይቅርታ\nአርግልን ይቅርታ)2\n",
                  verse_2: "መች በእኛ ይጨክናል ልብህ\nመች በእኛ ይጨክናል ያ ኃይልህ\nየምህረት ምንጭ ነህ ራስህ)2\nለምህረት የፈጠንክ ለቁጣ የዘገየህ\nአምላኬ አንተ ነህ የምህረት አባት\/2\/\n",
                  verse_3: "አለም በዘፈኗ ገና ሳትወስደኝ\nበጠላት መጋጋ ወስዳ ሳትከተኝ\nፈጥነህ ደርሰህ ጌታ እንድታስመልጠኝ\nጠዋትና ማታ እለምንሃለሁ\nማስመለጥ ታውቃለህና ታስመለጠናለህ\nመለየት ታውቃለህና ትለየናለህ\n",
                  verse_4:"",
                  verse_5:"",
                  artist: "ሀዋሳ ታቦር ቤ\/ክ ውዳሴ ኳየር",
                  language_value: "አማርኛ"
                },

                {
                  id:3,
                  song_num: 3,
                title: "ስሙ የማይንደው ተራራ ",
                category:"Cat 1",
                  chorus: "ስሙ የማይንደው ተራራ \nበርሱ የማይታለፍ መከራ\nየለምና እኛም በእምነት ስሙን እንጥራ \/2*\/ አዎን\n",
                  verse_1: "አሁን በዙሪያችን የከበበን\nየማይታለፍ መስሎ የሚታየን\nስሙን ስንጠራ ሁሉ ይፈርሳል\nእንደ አመድ ሆኖ በኖ ይጠፋል \/2*\n",
                  verse_2: "የሚገዳደረን ብርቱ ሆኖ\nለዓይናችን የታየን እጅግ ገኖ\nረዳታችን ከላይ ሲደርስልን\nጠላት የካበብን ተናደልን \/2*\/\n",
                  verse_3: "ደመና ከሰማይ አይታይም\nምልክት የሚሆን ነፋስ የለም\nግን ሸለቆ ሁሉ ውኃ ሞልቷል\nስሙ ያደርገው ዘንድ   ተችሎታል \/2*\/\n",
                  verse_4: "ተራራ ሆኖብን የጋረደን\nአሻግረን እንዳናይ የከለለን\nታምረኛ ስሙን ስንጠራ\nይወዳደቅ ጀመር  በየተራ \/2*\/\n",
                  artist: "ሀዋሳ መናኸሪያ ቤ\/ክ አማኑዔል መዘምራን",
                  language_value: "አማርኛ"
                },

                {
                  id:4,
                  song_num: 4,
                  title: "በደመና ይመለሳል ",
                  category:"Cat 1",
                  chorus: "በደመና ይመለሳል \nበክብርም ይመለሳል \nየወጉትም ያዩታል \nጌታ አይቀርም ይመጣል\/2x\/\n",
                  verse_1: "ጽድቅ የሚኖርባትን አዲስ ምድር ሊያወርሰን \nእንደ ተስፋ ቃሉ ወደ ክብሩ ሊያገባን \nይመጣል\/3\/ በእርግጥም ይመጣል\n ",
                  verse_2: "የተስፋ ቃል የሰጠን እግዚአብሔር ታማኝ ነዉ \nሊፈጽመዉ ይችላል በትዕግሥት እንጠብቀዉ \nበቃሉ በተስፋ ብንቆም መገለፁ አይቀርም\n",
                  verse_3: "ለብዙዎች መዳን እያለ ቢዘገይም \nየተናገረዉን ቃል በፍፁም አያጥፈዉም \nይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል\n",
                  verse_4: "መጨረሻዉ ተቃርቧል ጌታ የሱስ ይመጣል \nብለን ለሁሉ እናዉጅ ይህን የምስራች ቃል \nይመጣል ይመጣል እያልን እንናገር ምፃቱን\n ",
                  artist: "አ\/አ ገርጂ ቤ\/ክ መዘምራን",
                  language_value: "አማርኛ"
                },
 
                {
                  id:5,
                  song_num: 5,
                  title: "ባመልከዉ አይበዛበትም",
                  category:"Cat 1",
                  chorus: "ባመልከዉ አይበዛበትም\nብሰግድም አይበዛበትም\nምስጋና አይበዛበትም\nለእየሱስ እበዛበትም\n",
                  verse_1: "ከሞት ነዉ እኔን ያዳነኝ\nሕይወቱን በመስቀል ሰጥቶኝ\nስለዚህ አመልከዋለሁ\nለፍቅሩ ምላሽ ይሄዉ ነዉ\nይሄው ነው\/2* ምላሹ ይሄ ነው\n",
                  verse_2: "ከእሥራት ፈትቶኛልና\nነፃነት ሰጥቶኛልና\nሰይጣንን ላሳፈረልኝ\nለየሱስ እሰገዳለሁኝ\nእየሱስ ጌታ ነዉ",
                  verse_3: "ጨለማን የገፈፈነዉ \nብርሃንን ያበራልኝ ነዉ\nህይወቴን ያረካልኝ ነዉ\nሰላምን ያበዛልኝ ነዉ\nጌታዬን ኢየሱሴን ሁሌ እባርከዋለሁ\n",
                  verse_4: "ስቸገር የደረሰልኝ\nስታረዝ ደግሞ ያለበሰኝ\nስቸገር ደርሶ ያገዘኝ\nየሱስ ነዉ እንዲህ ያደረገልኝ\nጌታ ነዉ የሱስ ነዉ እዲህ ያረገልኝ\n",
                  verse_5: "ምስኪኑን የማይንቅ ጌታ\nየድኃ አደጎች አለኝታ\nከፍ አድርጎ የሚያከብር ነው\nለቸርነቱ ወሰን የለው\nእየሱስ እየሱስ እጅግ ቸር አባት ነው\n",
                  artist: "ተስፋዬ ሽብሩ",
                  language_value: "አማርኛ"
                }
],
      },
        
          {
            language_key:'Oromo',
            Content:[

                {
                id:1,
                song_num: 1,
                title: "Lafarra tutturuu",
                category:"Cat 1",
                chorus: "Haadha irraa adda baatee daa'imni qofaa hafaa jirti\nDhalarra adda baatee haatimmoo gidirfamaa jirti\nBoo'icha irraan gadee kanatu hedduu nutti hammaate x2\nLola'uu dhiigaa hammaate kanaaf maal ta'a yoo dhufte",
                verse_1: "Lafarra tutturuu jal'ina dachee ilaaluun nuffe\nWaan namatti hin tolle yaadaaf garaa namaas hin gammachiisne\nXoofoo hadhaa'aa dhugaa irbaata gaddaa nyaachuun\nHaa ga'u (x2) Yesuus nuuf mul'adhu",
                verse_2: "Abjuun abjootamu sagaleekee kan ibsu tasa hin jiru\nYaaddoof yaadda'uudha maal taana laataadha har'a kan argamu\nBa'ee galuu yaadda'a dhugaa hin se'u namni\nAkka baalaa harca'ee dhumaa jira dhaloonni",
                verse_3: "Gurraan kan dhageenyu ijaan kan arginu hundumtuu hamaa\nWaan namatti tolu dhagahuun har'a daran yarateera\nAt dursitee nutti himte kun hunduu akka ta'u\nBarri xumuramee akka goolabbiin ta'u\n\n",
                verse_4: "Harka keenya qabi dachee horsossaa'erra turuu hin feenu\nWanta suukanneessaa hin feenu nuyi kana caala ilaaluu\nDafi ofitti nu fudhu nun tursiini lafarra\nMul'achuukee hawwine yoomuma nuuf dhufta\n",
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:2,
                song_num: 2,
                title: "Deemsi Siin Alaa",
                category:"Cat 3",
                chorus: "Siin malee (x2) jette lubbuunkoo gooftaa\nSiin malee ani hin barbaaduu harka abbaa ormaa x2\nDeemee ilaaleera argees madaaleeraa\nAbbaakoo naaf hin tahu harki horma",
                verse_1: "Deemsi siin alaa hin mijaatuu dadhabbii isaatu caalaa\nBaay'eetu har'a si dhiise gara biyya lafaa ilaalaa\nKanaafan sirratti of dhiisee nan leyyaasisin Abbaakoo\nBarri kun baay'ee hammaateeraa na furi maaloo Waaqakoo\n",
                verse_2: "Harra yemmuu ilaalanii baabilon baayyee miidhagdii\nDhangaanshees yemmuu mullatuu nama haawwattii\nGaruu daandii ballaan suni gara badiisaattii geessaa\nSi kadhachaaan jiraam anoo dafii bahi ishee keessaa\n",
                verse_3: "Qajeelummaan lafaa dhibee hunduu gumaan faalameraa\nHaadhoon haadhoosaaf hin iluu karaarra wal kaachiseeraa\nMilkkinni hunduu raawwatee hamma lafti xumuramtee\nOf murteessu barbaadeeraa naaf kahi adaraakee\n",
                verse_4: "Oduun dhagahamuu hunduu abdii na kutachiiseeraa\nKan gurratti tolu hin jiruu anatti hadhaa'eera\nLubbuunkoo siin malee jettee harkakeerratti hin miidhamtuu\nSitti deebinaa nuuf falmii ati homaa hin dadhabduu",
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:3,
                song_num: 3,
                title: "Ati Anaaf Jettee",
                category:"Cat 3",
                chorus: "Anaaf jettee maal hin taane ati abbaakoo\nGatii baastee boqochiisteetta lubbuukoo\nMaal sii kennuu hundaa qabda ati abbaakoo\nKanan qabuu siif wareegaa jireenyakoo",
                verse_1: "Ati anaaf jettee maal hin taane Abbaakoo\nWaanjoo guddaa baatte baraartee lubbuukoo\nAna oolchuuf jettee namaa gadi taatee\nHattoota wajjinis qofaakee reebamtee x2",
                verse_2: "Dafqa dhiigaan makaa naaf jettee roobsite\nDu'a na oolchuuf jecha alangaan reebamtee\nDhiphinni kee gooftaa na bilisoomseeraa\nWaanan jedhuu hin qabuu mo'i barabaraan x2",
                verse_3: "Utuu siin hin taanee an yoona badeeraa\nGalmeen seenaa kootii irraanfatameeraa\nNaaf mul'achuukeetiin har'a nama ta'ee\nTokko lama jedheen amma lafaa ka'ee x2\n\n",
                verse_4: "An barakoo keessatti harka ormaa hin ilaaluu\nSiif gugguufeen bulaa siin homtuu naan caaluu\nSiif of wareegeeraa mee narraatti mo'ii\nGolakeeen filadhee nan leeyyasisinii x2\n",
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:4,
                song_num: 4,
                title: "Nuuf Jettee",
                category:"Cat 4",
                chorus: "Siin baaneerraa du'a jalaa\nSiin oolleerraa boolla du'aa x2\nKankee maal jennaa waaqa jaalalaa\n",
                verse_1: "Nuuf jettee dhiphattee qaraaniyoorrattii\nWaanta atii nuuf hin taanee hin jiruu abbaa atii\nDafqa dhiigaan makaa lolaaste fannoorratttii\nNuuf jetteetuu baattee gindillaa jiidhaa atii\n",
                verse_2: "Utuu beekanii atii waaqa uumaa tahuukee\nMiidhaa siif hin mallee miidhamtee nu baraartee\nNamat harkakeen uumtee yeroo si fannisanii\nAti jettee kadhattee dhiisiif abbaa hin beekanii",
                verse_3: "Gatii ilmaan namootaaf kan darbitee dhaabattee\nDu'a ilmaan namootaas kan ofiitti fudhattee\nGatii cubbuu baastee kan fayyina nuuf laattee\nJaalallikee addaa kan akkasittiin nu jaallattee\nHammana jennee kan tilmaamuu hin dandeenyee\nNuuf raawwatteetta Gooftaa ati eebbifami malee x2\n",
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:5,
                song_num: 5,
                title: "Furiin Biyya Lafaa",
                category:"Cat 5",
                chorus: "Gaarummaa Waaqayyoon labsa\nAmala isaa isa dhugaa namoota fuuldurattiin mullisa\nUlfina isaan calaqqisiisa\nJaalalli Waaqayyoo lubbuukoo keessatti mo'eera'oo",
                verse_1: "Furiin biyya lafaa kanaa fannoo qaraaniyootti rarraafame\nQaamni waaqummaa guutummaatti kan keessa ture\nAarsaa ilma waaqayyoo isa jaallatamaa kana ilaaluudhaani\nOnneen koo baqee guutummaatti jaalala isaan qabamee\n",
                verse_2: "Kennaa dhuma hin qabne jireenya barabaraa nuuf laate\nUlfinni waaqaas eegaa keenya ta'eetu nuuf dhaabate\nQajeelummaan yesuus kiristoos golgaa jabaa anaafoo ta'eera\nXiyya diinakoo hundumaa jalaas an baraarameera\nNagaadhaaf boqonnaa naaf kenne gooftaa siin qabaachuunkoo\nSimboo ulfina koo humna samiitiin na miidhagsite\nAjaa'ibsiisaadha hojiin harkakee hunduu jaalalaan kan guute\nGa'ee hin tilmaamamne taphatee aarsaan ati anaaf kaffalte",
                verse_3: "Waaqayyo fayyina keenyarra caala\nHin qabu tasumaa fedha kan biraa\nHumni Isaa xumura hin qabu\nDhiifamni Isaa bira hin ga'amu\nHo'i Isaa safara hin qabu\nJaalallisaa daanga hin qabu Waaqayyo jaalala eeyyeen jaalala\n",
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                }
            ],
           },
           {
            language_key:'Tigregna',
            Content:[
             {
                id:1,
              song_num: 1,
              title: "ዝያዳ",
              category:"Cat 1",
              chorus: "ዝያዳ፡ ዝያዳ |*2\nመሪፀካ ኣነ ካብ ኩሉ ኣብሊፀ\nኣይፍለየካን’የ ዝመፀ እንተመፀ\nንዓኻ መሪፀ",
              verse_1: "ጎይታይ ብምሕረትካ ፈዊስካኒ እንዲኻ\nብርሃን ኣብሪህካለይ ካብ ፀላም ኣውፂእካ\nካብ ውሽጢ ካብ ልበይ ምስጋና ይብፃሕካ\nኣብ ቤትኻ’ዩ መንበረይ ኣይፍለይን ካባኻ\nመሪፀ ንዓኻ\n",
              verse_2: "ምስ ዓለም ከለኹ ተዋሒጠ ብሓጢያት\nጎይታ ንዓይ ክትብል ወሪድኻ ካብ ሰማያት\nኣብ መስቀል ውዒልካ ኣብ መቓብር ሓዲርካ\nነቲ መቚሕ በቲኽካ ነፃ ጌርካኒ እንዲኻ\nምስጋና ይብፃሕካ\n",
              verse_3: "ክዛረብ’የ ገና ብዛዕባኻ ጎይታይ\nስቕ ዘየብል ኣሎኒ ውሽጠይ ዝመለኣኒ\nብዛዕባኻ ክምስክር ዝደፋፍኣኒ\nንዓኻ ክመርፅ ምኽንያት ዝኾነኒ\nካብ ሞት ዘውፀኣኒ\n",
              verse_4: "ዘመናት ክልወጥ ነገስታት ክሓልፉ\nቃላትካ ግን ህያው እዮም ኣብ ልበይ ዝተፃሕፉ\nካብ ፍቓድካ ከይወፅእ ንነብሰይ ዝግስፁ\nንነብሰይ ካብ ኩሉ ንዓኻ ዘምረፁ\nካባኻ ዝመፁ\n",
                 artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             
             },
             {
                id:2,
              song_num: 2,
              title: "ይገርመኒ’ሎ",
              category:"Cat 2",
              chorus: "ይገርመኒ'ሎ  የግርመለይ ኣሎ\nይገርመኒ’ሎ እቲ ናትካ ውህብቶ",
              verse_1: "ንኸመስግነካ ቃላትካ ሂብካኒ\nዜማ ከዚመልካ ጎይታ ባሪኽካኒ\nካባይ ዝኾነ ክእለት የብለይን\nደጊመ ይብለካ ጎይታይ ተመስገን\n",
              verse_2: "ናይ መንፈስካ ስራሕ ኣብ ልዕለይ ውሒዙ\nተኣምራትካ’ውን ኣዝዩ በዚሑ\nንዓኻ ከመስግን ደው ኢለ ኣለኹ\nብዝገበርካለይ ተገሪመ’ለኹ\n",
              verse_3: "ናይዛ ዓለም ናብራ ከየታልለና\nብመንፈስካ የሱስ ዕርዲ ኹነልና\nዝሃብካና ህያብ ሎሚ ተጠቒምና\nክትመፅእ እንከሎኻ ክንፀንሕ ኣትሪፍና\n",
              verse_4: "ትዕግስትኻ የሱስ ንሕናስ ኣግሪሙልና\nተጠፊእና እኳ መሊስካ ትደልየና\nእቲ ምሕረትካ’ውን በዚሑ ኣብ ሂወትና\nየብልናን ንህበካ ብጄካ ምስጋና\n",
             artist: "ለምለም ሃ\/ማርያም",
              language_value: "ትግርኛ",
           
             },
             {
                id:3,
              song_num: 3,
              title: "ኣበይ እሞ ኣሎኒ",
              category:"Cat 3",
              chorus: "ኣበይ እሞ ኣሎኒ ወረቐት ክንድቲ ዝሓስቦ ዝኾነለይ\nዘርዚረ ዝፅሕፈሉ ጎይታየይ ንዓይ ዝኾንካለይ\nምድርን ባሕርን ብርዕን ወረቐትን ጌርካ ተትህበኒ\nዘርዚረ ክፅሕፎ ክውድኦ ፍጹም ዘይኣኽለኒ",
              verse_1: "ገና ካብ ፍጥረተይ ዝኸድ ተዓሚተ\nንስኻ ትመርሓኒ እናበልካ ታተ\nጽምዋ ዓሲሉኒ ንበይነይ ብሒተ\nንርእሰይ እንትምልከት ካብ ኩሉ ኣትሒተ |*2\nመልኣኽካ ልኢእኻ ክተበርትዓኒ\nኣለኩልካ ኣነ ኣጆኻ ትብለኒ\n",
              verse_2: "እንተይፈተኹኻ ኣዚኻ ኣፍቂርካኒ\nኣነ እንትርሕቐካ የሱስ ቀሪብካኒ\nጸልማት እናሓረኹ ብርሃንካ ሂብካኒ\nብምንታይ ክገልጾ ቃላት ሓፂሩኒ |*2\nብሒተ እንከለኹ ጎይታ ዝኾንካኒ\nምስ ብዙሕ ሓጥያተይ ንዓይ ሓሪኻኒ\n",
              verse_3: "_",
              verse_4: "_",
              artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             },
             {
                id:4,
              song_num: 4,
              title: "ፍቕሪ ኢኻ’ሞ",
              category:"Cat 4",
              chorus: "ፍቕሪ ኢኻ’ሞ ስለ ፍቕርኻ ተመስገን\nሓላዪ ኢኻ’ሞ ስለ ሓልዮትካ ተመስገን\nኣኽባሪ ኢኻ’ሞ ስለ ኽብረትካ ተመስገን\nመሓሪ ኢኻ’ሞ ስለ ምሕረትካ ተመስገን",
              verse_1: "ኣብ ፅምዋ ኣብቲ ፀምፀም በረኻ\nነፍሰይ ረዳኢ ስኢና ተሃዊኻ\nንስኻ መፂእካ ዕረፍቲ ሂብካያ\nስለቲ ምሕረትካ ተመስግነካ’ላ |*2",
              verse_2: "ንግብፂ ንባርነት ሸይጦምኒ\nኣይርከብን’ዩ ኢሎም ደርብዮምኒ\nንስኻ ኣምላኸይ ኣብ ዝፋንካ ኮይንኻ\nኣኽቢርካኒ ኢኻ’ሞ ጎይታ ከኽብረካ |*2",
              verse_3: "ነቲ ፍቕርኻ ጎይታ መግለፂ ስኢነ\nብዝገበርካለይ ሰናይ ተገሪመ\nክሳብ መስቀል ሞይትኻ ኣድሒንካኒ ኢኻ\nበቲ ክቡር ቃልካ ባሪኽካኒ እንዲኻ |*2",
              verse_4: "_",
                  artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             },
             {
                id:5,
              song_num: 5,
              title: "ኦ ነብሰይ",
              category:"Cat 5",
              chorus: "ኦ ነብሰይ መን'ዩ ኣባዲኺ\nኦ ነብሰይ መን'ዩ ኣባዲኺ |*2",
              verse_1: "ክፀሮ ዘይእኽል ሓዘን እንትወድቀኒ\nፈተውተይ 'ውን ዝብሎም እንትፍለዩኒ\nፍቓድካ ኣምላኸይ ኣብ ዘይጥዕመኒ\nሽዑ በፂሕካ ኣፀናንዓኒ",
              verse_2: "መንፈሰይ ቅሂሙ ኣምሪረ እንትነብዕ\nንልበይ ዝድግፍ እውን ዘተባብዕ\nተስፋ ስኢነ ዓው ኢለ እንትፅውዕ\nሽዑ ልኣኽ መንፈስካ እቲ ዘህድእ",
              verse_3: "ፈተና መከራ ሕማም ከምኡ'ውን ሞት\nበቲ ዝበፅሕ ኩሉ ምስ ርእሰይ እንትሙግት\nብበዝሒ ስቅያት ኣብ ዝስእነሉ ትርጉም ህይወት\nሽዑ በለኒ ኣለኹ እጥምት",
              verse_4: "_",
              artist: "ኡሪም ቱሚም መዘምራን",
              language_value: "ትግርኛ",

             }
            ],
           },
           {
            language_key:'Kembatissa',
            Content:[
             {
                id:1,
              song_num: 1 ,
              title: "እሶን ኩዕል",
              category:"Cat 1",
              chorus: "\nእሶን ኩዕል 2* አዝክ ቦረሸተ ሙልክ ሆንግተ መገኖንተክ ኩዕል\nእሶን ኩዕል 2* ሜጥን ኦዕሲሾኬረ እንጂጄዕሾኬረ ፈዕሱናን ኩዕል\nእሶን ኩዕል 2* ቢዝማሃንስ ገበሉ ኣሰንቺሃንስ ወሉት ዮበዕሃኔን ኩዕል\nእሶን ኩዕል 2* ቢጠተ ኢል ጠዋክ ዙንስ አሰኖሃኒን መገኒሃንክ ኩዕል",
              verse_1: "\nመኑ መኑ እኮደ አፌን ኦሰዕለን አዚን ጬመኖ\nመቴ ለሜ አሴዕች ሰክ ተኔን ሚንተ ጡረኖ\nመገኑ መኒገ እሁምቧ ጃን ጃን ሀለስ ዶሩምቧ\nመከራሮኬ ጠዋን ኡጅ ሁኑምቧ\nመገኑ መንገ እሁምቧ ጃን ጃን ሚንስ ዶሩምቧ\nመር ገአተ ፈንቀልት ዋል ይ ኮመ ሂርሲሱምቧ",
              verse_2: "\nሃናች አበ ገደንቲ መኒን ጎንበንት ጬመንቴንትንዶ\nሀወሩተ ገስመ አረቤ ጦርቄን ጮአንቴንትንዶ\nመገኑ በሬንተስ ኢሊ ቤቱ ኣሴሴበንዶ\nማለሉተ ሁጀቺ ካዕሌሴበንዶ\nመላን ኣግሽ ሙዴንኬ ባልታንት ጠዋኒ\nመገኑ ሰዕም ያኖበአ ቤትስ ሀዋኒ",
              verse_3: "\nወዘንክ አዜን ቂርተን ሀዊሶ ቃረተ ጉርዱተ አፍ\nወጌች ወጋሃ ቶልተን ዶለ ወልሶ ኬዕመተ ጠዕሙተ አፍ\nዱማን ኮሻን ማጠንቲ ሜጥን ቁሩተዮንቲ\nቆንቆንክ አዜን እክ ጉንጉንተዮንቲ\nኦሶሃንስ ማሹ ቢዙ ደናሙ አኑ ሄአኔንኬ\nአኑ ዮበዕ ኦስችገ ም ኦዕሲሾኬ",
              verse_4: "\nመኬን ጉራን ጎንበንኬዕ ሲኣዝሾኬ ሀዊ ሐዊ መቃሙ\nመስቹ ሶኬንስ ዋልኬዕ ሲአዝሾኬ ወዕ ወርጃሙ\nመኒ አብሽ ኬዕሜሩ መገኒሃ ኬዕሙምቧ\nጡዲ አብሽ ቱንሴኬሩ እሲች ቴዕሉምቧ\nጡፈንትዳ ኡሩኪ ዲንክ ዳፊን\nጡድ አንክበ ብዝት ዋለኖ ጊራን",
              artist: "ዘማሪ በረከት ዮሐንስ ",
              language_value: "ከምባትሳ",

             },
             {
                id:2,
              song_num: 2,
              title: "ኡለ አሌን",
              category:"Cat 2",
              chorus: "  ኡለ አሌን ፍንጨሞ ባጢሉ ጎሞገ ሻረሜን\nጡንዱነን አመዕንኖም ተሶ ብሬንተኔ ብድቅዬን\nሀሹ እልል ሀንደ ይነን ሀጢጥናም በጅጎን\/2\/\n",
              verse_1: "ሱዕሙኔ ሄቻ መዝገባን ጣፈሞረ\nባጥሉኔ ፈኤኡ በጅቀሜ ያመሞሩ\nፈኡ ደቅት ሀሹ እልል ይታራን\nነኦንንት መናም በቅይዬ ፅዮንቹተ ኣጋራን",
              verse_2: "\nአለም አል ሀዋ ሀምብ አጉን\nፈዕ ሳሙ አሰሜን ሰሜ ባዱ ጡንደን\nሾሏንከ ውዲች ጣጭኖም ኬኑ ኢየሱሰ ጡንደን\nኒ ቀርቾ ሀንደሄ ይናም ሁንዱንኩ ጡምጨመን",
              verse_3: "\nቀርቹኔ ኢየሱሱ አርቾገ ጫከኔን\nሀዋ ሁንደንከ ቄን አጉን ቤዜገ ቤሌሌንሰን\nሄቸ ባድ ወቄ ህጊ አብኑ አሰሜን\nቄል መዝሙረ ዘመነን መናም እልል ይነን በጅጎን",
              verse_4: "\nባጢሉሁ ጤሌሉሁ ሆረን ዮበዕ መዕኔን\nአንነ ቤት ላሁ ሄጌጉሴ ክቤ መዕኔን\nማሰቱ ጡሙ አብኑ አብኑ በጅጉት ዊንት ትርፍቴ መዕኔን\nሬኑነ በኑዕነ ሰዕምን ሄዕናም ሃሮ ዬሩሳሌንቾን",
             
              artist: "Qeesichu Bayana Badcha",
              language_value: "kambaatisata"
             },
             {
                id:3,
              song_num: 3,
              title: "ኢ ህዞ",
              category:"Cat 3",
              chorus: "ኢ ህዞ (ህዞት) ህገኖራ ጡድ ሚኃት አገንታንቲ\nህለረ ቁልጥት ባጢላን አጋንቲ\nአለማ እቲት በዕ ኦሮታንቲ\nአንገክ አሲት ሬሆ ቅጠንታንቲ\n\n",
              verse_1: "አጉር ፈንቀል የሱስች ሄቻ ቡዕሌች ሁንቶት\nአቢኑ ዮባዕ ሎጅጋ ግግለኖራ ሸርቶት\nሆቀም እተም ፎርጎ ይቶንቲ ፎሊኪ ዘቢን\nሆፋን መርቶት ቱንሶ ሀሌችች ደዕል የሱስበሁን\n",
              verse_2: "\nስንስኔ ስማ ዋሱ ቦንቃ ዬኖ የኑ ኪ አሌን ሚ ጡደሞ\nስራ ማነክ እኮ ሴራስ ቆረቡ ሱዕመስ አቢስሱ ቴሱ ማ እኮ\nሲክት ×2 ከችት መረሚ እንስት ዋልት ሀትታ ድዕኖን አግ\nስፍጥሳንኬ ሄቻን አንጅት ባዲ ሁንዲ ጎሊ ሆባስ ሚ ሆግ\n",
              verse_3: "\nቀንግቶት ሳማክ ቆረጵ ቁዕማት አፎክ ቁል ይቱና እሱ ዬዕ\nቀሆ በሬ ቀባጢ ቀፈደንት ቀሊቶት ቁልጥት ቁፋታስ\nቀርቾንተክ ጣጠም ቃርሲ ኩላንኬ በርጊ ቄርሲት ሰዊይ ቁጦት\nቀንሱተ ሙች ቃፉ ከም ሰማ ሀብሲሾሄሪ ዑብ ዑጭ አንገተ አቶት\n\n",
              verse_4: "yerusaalenchoon\nመቅች ደማ አፌን ሞቹ ሸርናም ዬን ምንች ፉሌኖዕንዶ\nመቃሙ ሞቹ ጎጫ ዑሪ ሁኑ ግብ ቴሸሞዳ ወቀሬን ሼኖዕንዶ\nአማዕነት ቁጡ ከኒች ህጋ ባሳ ሸዕሌን ህጌኑምቧ\n",
              artist: "ዘማራንቹ ሙሉነህ አኑሎ",
              language_value: "ከምባትሳ",
             },
             {
                id:4,
              song_num: 4,
              title: "መነ ኔሳች",
              category:"Cat 4",
              chorus: "መነ ኔሳች አደ መቱ ጠው ሀበሜቤ\nየሱስ ዋሉ ኢሌጉ ኔሳሀ ለልምበቤ\nመነ ኔሳች አደ መቱ ጠው ሀበሜቤ\nጡማንቹ አያኑ ኔሳን አብሽ ክቼአዮቤ\n",
              verse_1: "ማሊሀኔ መኬን እቲን አጊን ጠሊን ነኦት ሄዕነዮምቤ\nዋልቶተ ዮ ወሞማሀ ቅጠንችኔ ጄቹት ጠለንከ ህገዮቤ\nከኒች ኬኦሀ የሱሱ በኡኔ ጡጅ አጉር ሰማን ኦአዮቤ\nኣየ ኢ ቄጎ የን አንስ መኬን እክ እንጂጄአዮቤ\n",
              verse_2: "ኢነ ክዕኔ ፈኢሀ ሰሞሁ ኡሼጡዕናች ሁርበጣዋዮቤ\nአንከርሃ በራሃ አንገስ ብድቀዕ የሱሱ ኡጨዮቤ\nመሃመት ኒ ሄቻች መገኑ ዋጅቢሀ አያነ ቄርሴዕሁ\nሀእ አጉሬ መነ ቴሶን እስበ ዋኑን ከኔት ወየኖኔሁ\n",
              verse_3: "ኡለት ዮሴሪንን መዕንተ ገፈርታ በሩ ቴሱ ኦንጠክ ፈጄቤ\nተሳ አስናምሩ ኩን ተመኖ ይናምሩ ሜጡሩ ዮኔበቤ\nሆሩንኩኔ ከበር ናንጮምገ እሁምቦ ዘኩስ ሂለኖቤ\nክኖ ኢ አሌን ኡብ ሬሆ ኤስ ኣቄኤ ዩንኩ ዋለኖቤ",
              verse_4: "አበተ አሙሬን ገበሉ ዮበዕ ህቢን ሰሜን ጫኬ ጄቹተ\nሰሞሁ ከዕተ ከበሀ ኡለት ቁሙጭ ብድቅ ይተን ህጋ ጃተ\nሀከን ቆጠራ መንቹ ብሬንተስ እግማን ኡሮተ ደንደኖሁ\nመነ ቆርሰቅኑን አጉሬ በቅ ይኑን ከኔት ቃግሳሚሁ\n",
           
              artist: "ዘማራንቹ ሙሉነህ አኑሎ",
              language_value: "ከምባትሳ",
                },
             {
                id:5,
              song_num: 5,
              title: "ቤሬኤ ብልመታ ቦሮራንቻ ሁንዳንካ ቦቆችኒ",
              category:"Cat 5",
              chorus: "ቤሬኤ ብልመታ ቦሮራንቻ ሁንዳንካ ቦቆችኒ ሀብስሾ\nኦእኖም እንጅጅታ እሌችኔ ሽንሽ ከንገ ኦሰልስሾ\nገለጣሙ መገኑ ሜጥን ዮምብች መናን በርጊ ጣጆ\nጎፎ ፉሽካም ሃሮስ ኦድሻታ አንጋንታስ ኦድሾ\n",
              verse_1: "ገለጣሙ መገኑ ሰማኒ ኡላን\nገለጠሙ መገኑ ዶላካን ሆራን\nገለጠሙ መገኑ መናን ግዛን\nገለጠሙ መገኑ ቆጫንቻን ሆራን\n",
              verse_2: "\nፉናን አንገናንብሬንታኔ ዱና እክ ጡደሞሩ\nትጉንቡራ አጉጅ ቱንሱታ ኦደቅ አብሽ ባብሾሩ\nትጉንቡራ አጉጅ ቱንሱታ ኦደቅ አብሽ ባብሾሩ\nአብኑ መገን ዶሊ ሆሪ እሁን ሶጆኔ ሃሮ ዎጎ",
              verse_3: "\nሼጣኑ ከን ዘኩ መይኬች ጠዋቃኑ ገኤኔው የሱሳ\nቤኑኔ ባታሞ ሙጪሮስ ቄግኔት ምሁ ሜቾኔ ኔሳ\nእንቁታ እጣንኬች ነደደንን ፋኡን አቼኒ ንድኑ\nግብጽች ውዱ ለንቅኬኤ ዎማንማን ፉኔም ገለጠሙ መገኑ",
              verse_4: "\nኦርጫ ከድስሳን ኬኤማሻ እይሳን ፋሪኦን ጅቻንያን\nአኑ ዮባእ ኡጃንቴ እለጋ አስኬኤች ጡዳንያን\nመገኑ ጡጅኬኤች አበታንስ አሙሬን ግብጻ ሙሴ ሶኮ\nማለሉታ ሁጃታን ጎምኒ ግራኒ ኦሶሃስ ብጣታ ኣጎ",
              artist: "ዘማራንቹ ጴጥሮስ ተሰማ",
              language_value: "ከምባትሳ"
             }
             
            ],
           }, 
           {
            language_key:'Wolaita',
             Content:[
             {
                id:1,
              song_num: 1,
              title: "ባይናባ ኢማናው",
              category:"Cat 1",
              chorus: "ባይናባ ኢማናው\nዴኢያባ ጣይሳናው\nማታይ ዎልቃይ ዲዮጎ\nጦሶ ኔዮ ሆላ ኤ ሆላ\n",
              verse_1: "ሂዬሳይ ዬኪዲ ኔኮ ዪኮ\nሜቲስ ማሊስ ጊዲ ኒዮ ጡሪኮ\nሄጋና ዳሻ ጋዳ አጋባካ\nቢዲንታ ባናፔ ዴንታ ኤሳሳ\n",
              verse_2: "አሳ አቻን በሬ ካሬ ደኤስ\nሎይቲ ማይዳጋ ቦንቺ ካንቴስ\nላፓንቻ ቤኢዲ ዞኳ ዛሬስ\nነ ጣላላይ የሱስ ሙሊያው ጊዴስ\n",
              verse_3: "የሱሳ ያጊዲ ካውያይ ኦኔ\nአን ጬቄቲዲ ጉጣይ ኦኔ\nሙሌ በኢቦኮ ኑ አይፊያን\nጋላቴቶ ያጎስ ኑ ዶናን\n",
              verse_4: "የሱሳ ያጊዲ ካውያይ ኦኔ\nአን ጬቄቲዲ ጉጣይ ኦኔ\nሙሌ በኢቦኮ ኑ አይፊያን\nጋላቴቶ ያጎስ ኑ ዶናን\n",
              artist: "ዘማሪ ዳታን ደምሴ",
              language_value: "ወላይትኛ"
             },
             {
                id:2,
              song_num: 2,
              title: "ሐሶሁዋን ሐሺቋን ",
              category:"Cat 2",
              chorus: "ሐሶሁዋን ሐሺቋን ኑ ጊዶን ኔ ቤታ\nኔኒ ሺሾጋዳን ኔቃላ ኔ ዮታ\nኑ ኩሺያ ሚጪዱ ኦይቺዮባ ኔ ኢማ\nኔ አያና አንጁዋን ኡባ ኩንታዲ ዬዲ\n",
              verse_1: "ሀጋን ሀሶሁዋን ኔ ቦንቿራ ቆንጫ\nኦቲዮ ኦሱዋ ኡባ ኔኒ ፖላ\nሻሄቴናን ኑናራ ኔ ዴአ\nሀጋን ቤቲያ ኡባታ ኔኒ አንጃ\n",
              verse_2: "ኑኒ ኡባይ ፑዳ ኔኮ ጤሎስ\nኑ ናጋራ ኡባ ኔሲ ፓጦስ\nሳሉዋ ማዶይ ኔጌ ያናው ኮዮስ\nጊዲያ ካታ ኔኩሺያፔ ናጎስ\n",
              verse_3: "ሀርጊያጌታ ጋካዳ ኔ ቤአ\nዬኪያጌቱሲ አፑታ ኔ ቁጫ\nኡባ ዎሳ ጋካዳ ኔ ሲያ\nኔ ሲቋራ ኑ ጊዶን ሲሜሬታ\n",
              verse_4: "ሀጋ ኔ ዴሪያ ኢሲቶ ኔ ቆፓ\nሜቱዋ ጫርኩዋ ኔ ሱንታን ሴራ\nጦኒያ ዎልቃ ኔጋ ኡባ ቤሳ\nኔ ኬታ ጋካናው ኑ ኩሺያ ኔ ኦይቃ\n",
              artist: "ዘማሪ ተገኝ ጋንታ",
              language_value: "ወላይትኛ"
             },
             {
                id:3,
              song_num: 3,
              title: "ጮ ታና አሺዳጎ",
              category:"Cat 3",
              chorus: "ጮ ታና አሺዳጎ\nጮ ታና ማዲዳጎ\nጮ ታና ሲቂዳጎ\nአይባኔ ቃንጤናን ኔዮ ናአ ኦቲዳጎ\nጋላታይ ኒዮ ጊዶ (3) ጦሶ ታጎ ጋላታይ ኒዮ ጊዶ\n",
              verse_1: "ታ ጉዪያ ታ ዛሪያ ቆዴናን ጤሲዲጎ\nታጋ ላፋቴታ ነ ዎልቃን ሚንቲዳጎ\nሀይቋ ያአፔ ታ ሀራቂያ ኦይካ ሾዲዳጎ\nያኮ ኔዮ ዳና ታና ጮ ሺሻ ኤካጎ\n",
              verse_2: "ታ ሞርኪያፔ ታዮ ኪቴቲያ ሀርጊያ ሀይቋ\nሀቺ ኔባይ ሀኒፔ ፒኔና ጊ ሂርጊሳባ\nአራታፔ ታ ጊሻው ዴንዳ ኤቃዳ ኔ ቃሊን ሻሪዳጎ\nቤኒ ጣዬስ ጎጋው ዴኡዋ ኢማዳ ሀቺካ ዎቲዳጎ\n",
              verse_3: "ማዳናው ኮያዳ ኢ አውፔ ዪዴ ያጌናጎ\nአውዴኔ ኔኮ ዋሲን ሲያይዳ ጮ አዼናጎ\nአዋጢዴ ቡኪዴ ኑና ዜንፒሲያ ኩሺያ ሚጫ ዎቲዳጎ\nዚኔ ኢማስ ጋዳ ጉይያ ቆዴናን ዎንቷዉካ አማንቲያጎ\n",
              verse_4: "ኑሲካ ኪጢያ አባታ ሻካናው ዎልቃይ ዲዮጎ\nፓሮናዳን ዬዴቲያባታ ጦኒሳናው ኑ ጎንዳሊያው\nኔና ካሉ ኪዪዲ አሳ ውርሳ ኦላዳ ዶጋ አጌናጎ\nሀሹ አማኒዲ ኔና ኑጎ ጦሶ ኦፔኔ ኑዮ ማታቲሰያጎ\n",
              artist: "ዘማሪ ዳንኤል ዳምጠው",
              language_value: "ወላይትኛ"
             },
             {
                id:4,
              song_num: 4,
              title: "ፔንቲያ ዛይቲያን ዬጊን አሺዲ ኬሲስ",
              category:"Cat 4",
              chorus: "ፔንቲያ ዛይቲያን ዬጊን አሺዲ ኬሲስ\nሀሩሩዋን ቃቾሳን አጁታ ቤሲስ\nአማንቴሲ ኑ አዋ ዎልቃይ\nሲንታናው ዴኢያ ኑ ሂዶታይ    2X\n",
              verse_1: "ኑ ማሊ ባ ጊያ ኡባታ\nጣጷ ጤራ ጣይሲዮ ማታ\nባ ኩሺያን ኦይቂ ዎቲስ\nጦሳ ዎሌቃን አማኔቶስ\n",
              verse_2: "ብኤሊ ናቤታ ካውሺስ\nኤሊያሳዮ ታማን ዛሪስ\nባናቱዮ ቱማ ኬሲስ\nባ ዎዲያን ጦሳይ ጋኪስ\n",
              verse_3: "ኤርቴራ አባ ናአው ሻኪስ \nእሥራኤሊያ ፒንቲ ኬሲስ\nፈርዖና ጊዷን አሺስ\nሙሴ ጦሳይ ሀቺካ ዴስ\n ",
              verse_4: "ዎልቃማ ጎሊያዳ ኦጊስ ",
              artist: "የሳኬና አከባቢ ማህበር ሙዚቃና ዜማ ኳየር",
              language_value: "ወላይትኛ"
             },
             {
                id:5,
              song_num: 5,
              title: "ጦሲ ጊኮ",
              category:"Cat 5",
              chorus: "ጦሲ ጊጎ እ ጊዶባይ ሀኒጌስ (3)\nጮ ኦኔ አይ ጊንካ አባይ ፖሌቴስ\n",
              verse_1: "በኒ ወዲያንካ ጦሲስ ጎባይ ሀኔስ\nሀቺ ላይታንካ ጦስ ጎባይ ሀኔስ\nሳሉዋን ዲያባይ ሳአን ዲያባይ አዮ ኤኔስ\nወንቶናውካ መሪናውካ ጦሲ ጎባይ ሀኔስ",
              verse_2: "አፑና በኢዶ ጦሲ ጎባይ ሀኒን\n   አፑን አፑዋ ጣሊዶ እ ኑ ዛርጴ ግዲን\n   መኢን ስሊን ቱሊን ቆቂን የሱሳ ፓቴስ\n   ዴጥዳባ ቶሆ ግዲዳባ ኡባ እ ካውሼስ\n",
              verse_3: "ሐይቅዳ የሱሲ ዱፑዋ ጦቆሊኒ \nወልቃማ ሹቻካ ባኮያ ኦቲኒ \nደንዲድ ቢን ጦኒ ስሚን ሞርኬ የላቲስ\nጫዳይ ወራይ ሚጫይ ጉፓይ ኡባይ ጉጢጊስ",
              verse_4: "ኦይዱ ጋላ ሙልያ ዱፖይ ጌንቲዶጋ \nሃይቂዳ አሳን ጋቲዲ ይባቲቺዶጋ\nላ ፉጣ ጊዲ ፓት ኤስድ ኡባ ኡፓይሲያጋ\nጎይኒድ ዲን ሳቢድ ዲን ሙሌ ቆህያቢ ባ ",
              artist: "ዘማሪ ገነቱ ጋጋዶ",
              language_value: "ወላይትኛ"
             }
            ]  
           } , 
           {
            language_key:'ሀዲይኛ',
              Content:[
                      {
                       id:1, 
                        song_num: 1,
                       title: "ገለተኔ ካች ዮሀኔ",
                       category:"Cat 1",
                        chorus: "ሀንደ ሀንደ ንዋእነ ሀንዳ \nሀንደ ሀንደ እሱክ አንግና   2*\nአን ኡዎሞ ጉራል ገለታ ጌጅ ገለታ\nአን ኡዎሞ  ሉዳም ገለተ ዋእነ ገለታ \nገለተኔ ካች ዮሀኔ(2*) መዝሙረኔም ካች ዮሀኔ\nዲነዕ ሀኔኔ ካቸ ኡዎሀኔ ሀንቀሜ ካቸ ኡዎሀኔ\n    ሀንቀሜ ካቸ ኡዎሀኔ(2*) እያርኮእ ዱነ ትግሶሀኔ\nሀንቀሜ ካቸ ኡዎሀኔ(2*) ከረጥ ችምችመ ሙረንሶሀኔ\n\n\n ",
                        verse_1: "ጰውሎሳም ከረጥ ምኔኔ\nእጡዊ ዋእነ ኦቶስምኔ\nመዝሙርኔ ገለጥምኔ\nዋእ ወደ ሞዕሎኦ ማለለትኔ\n",
                        verse_2: " ኢመኒንሴ ዋእ መላይ  አፋ\nኤከረጥ ምዕን ሾሆዕ ሸፍሸፋ\nአይም ነኮዕኔ ጎጩዊ ፎቁኮ\nከቶዕ ኬዕን ወሽ ኮመም ገቱኮ",
                        verse_3: "  እዮብ ኤ ኬእማል ሀዎኔ\nአመጥ ሁንድም ቤዱክ በለኔ\nእመዕን ዋኣ ገለጥምኔ\nኤጡኮ ማስ እጥ ምኔኔ\n",
                        verse_4: "ሊረንችኔ መዝሙሉምተእኔ\nእሱክ ኤሮማ ጠንዱም-ቤዕተዕኔ\nህንክ ሀወኔም ሀንዳ ይኑምተዕኔ\nንቡድ እምኮ ዲነእ ሀኔኔ\n",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      {
                        id:2,
                        song_num: 2,
                       title: "አን በኬኦሞ ዋአ",
                       category:"Cat 1",
                        chorus: "አን በኬኦሞ ዋአ\nአመእነሞሞ ዋአ\nአፋ ለኣሞ ቆሳ(ሞአ)\nእጥ ኦስከ ዲነአ ካኣ\nሆጎዮ(4*) ሁንድ በለም እጥ ካች ዋአ(2*)\n",
                        verse_1: "ኦድ ኤሴ መህ በድሶኮ\nእጥ ለጥ ወሮኔ ቃጳኮ\nኡልጠማን ጠኖዮ\nእጠበቅች ሆጎዮ",
                        verse_2: "አግደንንሴ ፍሳኮ\nእቀቾ ያ ዌሻኮ\nኡንጆዮ ዋእ ሞጋከ\nኤሴ ዲነእና ኡዋከ\n",
                        verse_3: "  አን ጀቡምበለ ፈይሳ\nአን ሆጉም በለ ቆጥሳ\nኡንጠቁምበለ መጬሳ\nአፈ ለኣሞ ቆሳ\n",
                        verse_4: " ኤራዕል ዶሌም ከበላ\nእስረኤእል ዋእ አድላ\nእጤኔ ጉዶ ህንክ ዳና\nአበጉድ ቤእ ሎብ ዳና\n",
                        verse_5: "ገምበብ ቱንስ ወሪ ፍሳ\nገቶም ጎጎ እነ ሞእሳ\nአንገ አመዳ አወንሳ \nእጥ ለጎዮ መአንሳ\n",
                        verse_6: "ዋእ በጦ ጉላ ኩሬና\nከቀጣ ያ ቆዴና\nጠኖሞዮ በሽላ\nሎጶና እጥ አድላ\n",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },

                      {
                        id:3,
                        song_num: 3,
                       title: "ደናሞ የሱስ ብጃላ",
                       category:"Cat 1",
                        chorus: "ደናደናሞ የሱስ ብጃላ\n ዱና ጥጊን ብታአካ ዕጥ እት ማለላ\nድናዕና ኡዉቤአኔ ቅሽጣላ\n ዶዕጥየሄ ምናደባ ከደናም  ዶላ አት ከደናም ዶላ\n",
                        verse_1: "ብራ ዮንት መንቾ ከበድን ዋዕ ኮሎ ዋሬ\nብኦ ኩ ኡል ሁንድ አመኔም ጡም ኡዎ  ቤአኔ\nበጥ ባጥል ብራ ይታ ዋዕን ዎር ኩሬ\n ብጃላ ዋዕ ህንጩ ኬንና ሀፋ ዮሃኔ ዋዕ ሀፋ ዮሃኔ\n",
                        verse_2: "ኩኡል ሴር ቤዕ ታኬኡኩይ የሱስ ሞአካ\nሶኖ ሁንደም ሎስሱኮ ጎጎ ሞዕሳካ\nሶጉካሬ ደበሉኮ እጃጀማካ\n ሰኡቤአኔ ከበል ክነም ዋዕስ አይ መካ ክና ዋዕስ አይ መካ\n",
                        verse_3: "ዋዕ ደናሞ ህራጋንና አወናንና ኩራ እጥ ዎሻ\nወደለኔዮ ከዶሌኔም ኤች ጎጎ ንና ኩሻ\nዌሻ ዎራ ሀንቅ ጫክሳ አንም ነቃሻ\n ወንጌል ሰገር ዶል ሁንደኔም ቤዶቤዕ ምሻ ወንጌል ቤዶቤዕ ምሻ\n",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      
                      {
                        id:4,
                        song_num: 4,
                       title: "የሱስ ዋሬና አመን አፋኮ",
                       category:"Cat 1",
                        chorus: "የሱስ ዋሬና አመን አፋኮ\nህራጉው ሁንድም እሀኮ ቤዳኮ\nኤሃር አመናኖ ንምን ህንክዴቴ\nየሱስ ዋሮ በላ ኣኔና ጉንዳህኔ\n",
                        verse_1: "ቤበል ሞኑማኖኔ ማለልኖናም\nሶድ ሀሬች እሆኮ ይና ዎንጮናም\nከበል ሞኖማሬ ቤባል ህገንች ባሳ\nመጬንሳ ሞኖሞክ ሁንድችም ክቼቻ\n",
                        verse_2: "እሆ ሉዊ ሁንድም የሱስ ዋር ኩሮላ\nቀራር ቤዕ ጀቡዊ ከኡላ ሎጶላ\nከካ ሞናመ ኔስ መህንዱ ሰህናቴ\nእል ዕም ደበሎና ኡረጥ ዶል ቤዶኔ\n",
                        verse_3: "ዶል ዮኮ ይናማ ድርሉምሰም\nየሱስ ዋሬነቴ ኔስ በቅኖኔም\nኤብክን አመናን ንጋጋ ጉድንሶና\nኤ ዋሮ ጊል ብችንስ ጋጋንባ ግንቦና\n",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      
                      {
                        id:5,
                        song_num: 5,
                       title: "አትምዱ አመዴ ን አንገ",
                       category:"Cat 1",
                        chorus: "አትምዱ አመዴ ንአንገ\/3\nከኡላን ዮድርስ መሶቤቤእሳ አጋ\nአትምዱ በክሴ ክዎዳ\/3\nለመዱ ንካ ቆጥሴ ኤዳ ኤዳ\n",
                        verse_1: "ክሱማ ሾልንሳ ሾሌኖም ቤእሳ\nኬሳም ክአያን ክቼኦ ቤእሳ\nከኡል ምጣንና ኬስ ብቴንሶም ቤእሳ\nከበድ ከበዴም ሃረሜ የሱሳ\n",
                        verse_2: "አመንና ሕጎ ሉዊ አረቅ ኬኖ ቀዊሳ\nአጋ ኤሌሶላ ክምንስ ጎሳሳ\nዱት አዋዳንም አመዕነቶ ብቴሳ\nደልላና ኡዎላ ሶምሶኔሳ ህግሳ\nብረን በድኑም ሉዊ ንምን አጎቤዕሳ\nንኩሉሌት ሁንዳም ግርን ኦት የሱሳ\n",
                        verse_3: "በጥሉ ለቡኮዮ ቡሻሎማ በጥም\nባኦ መን ሆፋኔ ዋዕ መዮኮ ይም\nዎደኖን ሰውክ ጆል ኡል በላን በጦላ\nዋዕ ምኔኔ አዋዳ ፍራ መቻሮላ\nኤሃንስ ክኣካ ኩኡል ዱማሞላ\nአት በራሬ ዋኣ ኬሴ ኡንጥኖሙላ\n\n",
                        verse_4: "ጎቅ ሀኔኔ የምኔዕሳ ድናክች ጠድሳ\nጌጅ ኡስን ከራኮ ሄኖም ኡልሳ እሳ\nአመንና ፍታካ ግግሮ ሉዋ ሎንሳ\nአረቅ መን ኤሃኖን እል ካሶዕሳ እሳ\nእማዕን ዎሾ ጠደማ መኒ ኡልና በቶላ\nአት ንእል ፎቃኤ ኬስ ኡንጥኖሙላ\n",
                        verse_5: "አረቅ ሉዊ ከኡላን መንካ ትሮ አጎላ\nአማዕን ፋሽና ለሴሽ ክንስ ኡቡሶላ\nማኣል ምጣኖ ዎሽምና ዱት ኬን ጋጋቦላ\nሞኣካማ ዋዕ መን ፋንዴንስ ጆሮላ\nሄኤኖና ሃስት ለሴንስ የሱሳ ሀዳራ\nሀሬች ዎደኑ ቆጬ ለይ አት ህሞ ደራ\n",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      
                      }
                     ]
            },
            {
              language_key:'ጉራጊኛ',
              Content:[

                        {
                          id:1,
                          song_num: 1,
                         title: "ይናሽ በጋድነዳ",
                         category:"Cat 1",
                          chorus: "ይናሽ በጋደንዳ ይናሸ ባማደንዳ\nትንም ንቅ የኸረ ይሱስ ጔታነዳ\nአሜን የሱስ አባንዳ \n",
                          verse_1: "ሲጣር ይና ቲሽ ቢቸን ተደወታ  \nባነ ቲና ግዝይ ንቅ የኽረ  ጔታ \nይና አትጨንቅ በዋናም በምሳረ\nትንም ንቅ የኸረ የሱስንዳ ነረ  አሜን የሱሰንዳ ነረ\n",
                          verse_2: "ጔታ ቲጠራንደ ትክኖ ቲብርንደ\nእዮ ይሽርኸማ ትሁትም ቲያስድንደ\nተጥፚ ጥፚ ዘንጋ እንምጊ ይቅየንደ\nያገነንደ እንም የሁዝህ ይብርንደ አሜን የሁዝህ ይብርንደ\n",
                          verse_3: "ይናሽ በጋደንዳ የሱስ  ነመደንደም\nይናሽ ባማደንዳ ትከሮ ባረንደም\nትፍትሜ ተንቛሜ ይቅየንደቃር ናኸም\nምስጋና የሁት የኽር የዝህ አበቃንደም አሜን የዝህ አበቃንደም\n",
                          verse_4: "ቲያጌንደ ይና የሁትሄ  ንሮጥነ\nጅጔረንዳ ኑድኔይ  ይፈተቴ ንቸነ\nየሱስ ያገነደ  እንም ቃር አበንደም \nእዮ ዝህ ንቅ ጔታ መምር ነመደንደም አሜን መምር ነመደንደም",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                        },

                        {
                          id:2,
                          song_num: 2,
                         title: "የሰብ አትመሮ",
                         category:"Cat 1",
                          chorus: "የሰብ አትመሮ ሰቦ\nየሰብ አትዘቦ ሰቦ\nሰብሽ እንም ኸጂ ቃሩ\nበዝረኵን ዘንጋ ኤቛም ቃሩ\n",
                          verse_1: "ሠብ ባፚታ ቢቅማምሩህ \nየግዚየታ ነረኹ ቢብርሁ\nአትመሮይ ይፈጥርሁ\nያርወታ ቲብር ያታልልሁ\n",
                          verse_2: "በዝ አፈር ፚር ያሙሪ እኔ\nበጉራም ኸረም ዌም በከነ\nዩርም በኸረ ኤማ ያርቅር\nየሱስ ባንኸሬ ኤነ እንጛድ ቃር \n",
                          verse_3: "እማት በየሱስ ኧመሮ\nታለም ዘንጋሁ ተቤተሮ\nሰብ በግብታ ኤም ቴቃሽሁ\nኸሮ ተጔታ ይፈዝሁ\n",
                          verse_4: "ይረምድሁ ቃር ኸማ ቃር\nያታልልሁ ቢዝረኲን ቃር \nዩርም ዘንጋ ያጭዋድሽ ቃር\nተጔታ በረን ኤን እንጉድ ቃር",
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                        },

                        {
                          id:3,
                          song_num: 3,
                         title: "የጌታ ምህረት ሥርም ኤያርቅ ",
                         category:"Cat 1",
                          chorus: "የጌታ ምህረት ሥርም ኤያርቅ \nየየሱስ ፍቅር ሥርም ኤያርቅ\nቛጫ ኤነን ቃሩ ትንም ቃር ይርቅ \nየጔታ ምህረት ሥርም ኤያርቅ \n",
                          verse_1: "ኧኳ ኤቴ ባነኸ የሱስ ታንቅየናኸ\nኧኳ  ኤቴ ባነኸ የሱስ ታሟተንኸ\nአዊ ይብራኸባ የቀነ ጣይኸማ\nበጐጀ ትጠቅባ በዱየ ጠነማ \n",
                          verse_2: "ባጢር ናዘንደምታ ወሮት ቲቜምንደ \nእንባቋም ተፈምታ ጠላት ቲደቅብንደ \nተዝህ እንም ዉርደት ጔታ አተነፈንደም \nየሰማይ ንቅ አግዘር ባፈር ተጨነንደም  \n",
                          verse_3: "ቢና ሟሬ ኸረም ጮረም ባጢረንደ \nበሁት ጭንቀት ሥቃይ አፈካም ባሸንዳ \nበቀራንዩ መስቀር ይና ዃም ደመታ\nጄነት ንገባኔ ሥየም ህይወተንዳ \n",
                          verse_4: "የሁትሄ የቸነ ሥርም ኤያቅሟጭን\nየምህረት ኧጅታ ዝራግም ይትቕቧን\nኧኳ አኸም ኔኸ ጔታ ይሳንሽ\nየዘላለም ህይወት በነፃ ትንክብሽ\n",
                          artist: "ዮሴፍ ሁሴን ",
                          language_value: "ጉራጊኛ"
                        },
                      ]

            },
            {
              language_key:'Neur',
              Content:[
                    {
                      id:1,
                      song_num: 1,
                     title: "T0th lsac",
                     category:"Cat 1",
                      chorus: "Jvn k` rsa m5 c5 t2kdv th6p kv f66 b` k``n, Jvn k` rsa m5 c5 rsdv th6p kv gu11thd`x2",
                      verse_1: "V t0th lsac m5 n5nd5 m5 d22 laar nh66kdu l6? V t0th lsac m5 n5nd5 m5 d22 laar nh6kdu kv.",
                      verse_2: "V j5n buay k` f` Kuoth kv r5eet ku tin b6th kv f`; v t0th lsac m5 n5nd5 m5 d22 laar nh6k r5eetn5ku\n\n",
                      verse_3: "K` b77thdan n5 J5thvth k` cuumdan n5 jvn Y522 Kusth, v t0th lsac tee Kuoth in Gu1n bv tee ns m`n5 c`xkvl.",
                      verse_4: "K` lu]]ku kv cu]x cu]x baa j5 l5ak kv ku5c vms k` gssydu jvn d5tv bv tee ns m`n5 c`xkvl",
                      verse_5: "_",
                      artist: "D22b5t K0k Cusl",
                      language_value: "Nueer",
                    },
                    {
                      id:2,
                      song_num: 2,
                     title: "Baa j5 puany",
                     category:"Cat 1",
                      chorus: "Kuoth nh5al m5 r7xn5 jvn kv l5aak nhsk5 f`, f`n ram m5 j5``k j5n c5 f` ksk kv r5vvm m5 gsaa,( v r5vm ruath d00ln5) (M5 gsaa m5 gsaan5 ) Kuray vjvn c5 f`n ku gsaa kv jv",
                      verse_1: "Baa j5 puany kv diit Kuoth nh5al j5n m5 r7xn5 j5n kv l5aak. B5 t5eyd` j5 puany rvy fsaa vj5``k vmv.",
                      verse_2: "Baa j5 puany kv tin c5 l11t j5n m5 r7xn5 j5n kv l5ak, Gu1 gsaa n5 j5n k` rsaadu y5er teek`. T22 kv kir m5 n7x p5kv wec Kusth t0th lsac gu11th c52x Kusth in D55tn5 jvn k` rvlgssydv rs",
                      verse_3: "V pu11r l5ak l`tku tin g``y naath j5n m5 r7xn5 j5n kv l5aak, v gssydu l1tkv dol`du mn rvlrs",
                      verse_4: "N5 m22 \/ken5 p``mn5 caak, n5 m22 \/ken5 fswn5 caak, vj5n Kuoth m5 te th5n n5 wal. V j5n min jak naath k` l5w w55 5, 'luscv tuur l6 gaat Advm, kv f66 cet run t5 bathdssr kv c`xkvl k` j5",
                      verse_5: "Dee gsaa n5 f66 dee f`n a g``x thusk kal Kusthd`, k` f66 d22 c5ex kvvmvk` gu1n nyusn5. Gsaa n5 f66 dee ran c`x kvl ku thukn5 rvy kalu, k` n5n t5 bathdssr5 rvy gu1th m5 d].",
                      artist: "D22b5t K0k Cusl",
                      language_value: "Nueer",
                    },
                    {
                      id:3,
                      song_num: 3,
                     title: "L]1x t5y`",
                     category:"Cat 1",
                      chorus: "T5eyd` cv l]]x, t5eyd` cv l]]x ku`r. T5eyd` cv l]]x n5 rvydu Ku``r. T5eyd` cv l]]x, t5eyd` cv l]x Ku``r t5eyd` cv l]]xn5 rvy du]pdu",
                      verse_1: "J5thvth v Ku``r` p1ny, k` vjvn b77thd`, k` vjvn gu55c in gax t5eyd`. J5thvth v lu``kd` p1ny, rvy l`tn5k` d5aal vjvn k` rsaa la Lu``kd` ms. ",
                      verse_2: "J5thvth v y5eend` p1ny, k` f`n m5 w11 j1l jvn b` v du]]pd` min th5vl muth. J5thvth v yuupd` p1ny, k` f`n m5 c` c56t, jvn bv f` looc kv jsw m5 pusl.",
                      verse_3: "J5thvth v f77r` p1ny, tvy fsaa c`x nyu1n` b` x`thn5 f77r` min te nh5al. J5thvth bv f` ben nax, b0c b0c fsaa vmv m5 w22 we jssc b5 kvn cu dusth",
                      verse_4: "_",
                      verse_5: "_",
                      artist: "D22-b5t K0k",
                      language_value: "Nuer",
                    },
                    {
                      id:4,
                      song_num: 4,
                     title: "Nh6kdv",
                     category:"Cat 1",
                      chorus: "Nh6kdv jvn gsaa v, gsaa v kv t5eyd`. T0th lsacdv d5tv , jvn d5tv kv f` x2",
                      verse_1: "L1rv Kuoth nh5al t0th lsac kv ku5 gssy`dv, nh6kdv min th5vl peek v d7r. Kv nvy tin c5 Kuoth nh5al kv k`n la ruac t], kvn nvy tin cv k`n rvy rikn5.",
                      verse_2: "K` c5 th11x nath y5cn5 d`dsar m5 lu]t, k` \/caa du]p in wee kv c52x jek. K` n`k busth kv m`n5 rvw c5 l7ck5vn baath k` cukv Kuoth nh5al csl kv rik5vn.",
                      verse_3: "Kuoth cv naath k`n rvy cuc` m5 d55t, k` cuv kv b7th kv du]p m5 cux. Am`n5 m22 c5kv cop wecd5vn in d55t l1rkv Kuoth nh5al t0th lsac kv diit.",
                      verse_4: "Th11x nath c5kv nyuur rvy mu]th m5 col vl7x, kvn nvy tin caa y5an kv kuatn5 kv f66 c5kv Kuoth l7k am`n5 lu22kv, k` cuv kv moc cu]c l1t m5 bvc. K` cukv Kuoth nh5al csl kv riik5vn t5 uan k` cuv kv k1m raar n5 rvy mu]th. Akv puanykv Kuoth nh5al kv t0th lsac m5 d55t.",
                      verse_5: "_",
                      artist: "D22-b5t K00k",
                      language_value: "Nueer",
                    },
 
                    {
                      id:5,
                      song_num: 5,
                     title: "Kv gssy pusny`du",
                     category:"Cat 1",
                      chorus: "Kv gssy pusny`du l66 C``k, gssy` pusny`du, vjvn in jak xsal d5aal k` gsw. K` gssy pusny`du l66 C``k vjvn nyuth ks gssy. ",
                      verse_1: "Kv gssy pusny`du l66 C``k rvlv rs. Gssy pusny`du min d7raar. Jsscv k` xsak d5aal tin gsw tin c5 caak. Jscv k` kvn tin c5 caak.",
                      verse_2: "Kv gssy pusny`du l66 C``k vjvn in jak xsak d5aal k` gsw. K` j5n la t55 pusny m5 d55t, k` kvn xsan5 d5aal tin c5 caak.",
                      verse_3: "Kv gssy pusny`du l66 C``k vjvn in nyuth ks t22k. K` j5n la mooc5 ks pu]]th rvy n5n5 ks tin yoop j5n.",
                      verse_4: "Kv gssy pusny`du l66 C``k, cur5 ks nyu]th nh6kdu min d55t. Min cur5 nyooth kv l511 gatdu in luvl ks k` dueer.",
                      verse_5: "_",
                      artist: "Bol Thsst",
                      language_value: "Nuer",
                    }
                 ],
            },
            {
              language_key:'ሲዳሚኛ',
              Content:[
                      {
                        id:1,
                        song_num: 1,
                       title: "Leellinke",
                       category:"Cat 1",
                        chorus: "Leellinke, coyiirinke, xaadinke, iillinke magano\nWolasaanke yite agartewooha xagicho shiteenna roortinori\"\nGodowa cortuhe laittota mararsituhe hexxo qoortinori.\nWolasaanke yite agartewooha Xagicho shiteenna roortinori.\nEemawusi doogo aana xaadde hasaawisse ille xawisitto.\nHexxo haaroonsanno qaale coyiidhe xaadeewonsa dadille hawisitto\n\n",
                        verse_1: "Coyiirinke magano coyiirinke\nCoyiirinke mooticha coyiirinke\nBorreessinoye fojo buunxeemmona mooticha atilla coyiirinke\nIi Magano coyiirinke \n",
                        verse_2: "Wayi aana Hadhanna lae halche anino dayeemmo yii pheexiroosi\nMayi Darawoonyeeti yiittokkinni faanakki daa gede fajjitosi\nHuluullo boo'nate karsiisante sayiisse uutinoha dambalaho\niillie yee raarita iillito mule nootto woshaahu baalaho.\n\n",
                        verse_3: "iillinke magano iillinke\niillinke mooticha iillinke\nDambalu egemma yorewoonkena\nPheexiroosira iillittohu iillinke\nMagano iiillinke\n\n",
                        verse_4: "maalu hinaasinni bubbuqame dancha assayi nooha laweennasi\nShorra noonku ate ikkoottota lii'lu haweennasi\nHaranna doogote xaadittosi qasanno bagado heleelloha.\niimi caabichinni qafadittosi isitero baalanka qeelloha.\n",
                        verse_5: "Xaadinke mooticha xaadinke\nUurrinoommo doogo laa'neemmona\nSawulira xaadittohu xaadinke\nMagano xaadinke\n",
                        verse_6: "Heeshshonniha reyeeteewoori mereero haafate hassanni raatabbanni\nBorreessinoyi qaale qaaga hooge kuloottoha rewookkira albaanni\nAte afa hoolteennase hindiido illese jaanjursite\nLeellito mayiiraami wi'litanna mooticha'ya moroonnie yite\ni",
                        verse_7: "Leellinke magano leellinke\nLeellinke mooticha Leellinke\nMullawa raataambanni he'noommona\nMayiiramira leellittohu leellinke\nMagano leellinke\n",
                        artist: "Faarsancho Eliasi Batiro",
                        language_value: "Sidaamu Afoo",
                      },
                      {
                        id:2,
                      song_num: 2,
                     title: "Muse",
                     category:"Cat 1",
                      chorus: "Xiinbo Wongeellu gafa (2)\nBadhe higa dasiissannonke noonke alba hige qaafa\nManqisaame baatto dola dubbo e'ne faasha\nWongrella assira noonke looso barra hashsha\n",
                      verse_1: "Muse diwaajjino Firiooniwa mara \nNigusa ikkeenna diwaajjino cooyiira \nMishe giwi wooylite Mannasi agura\nDano dirrisino Gibtsete baattora\nAgurino Manna Maganuuyiiha\nGaabbe sooyiino diina shorrannoha\nMaganu fushshi Manni fuli taayiise \nDiinansa gudino dimme eesse\n\n",
                      verse_2: " Goowi ale doge heeranni no\n Mannu Giddo wodananke illaaho\n Maganu Badhe hanni qollo anfoommoha dinbe \n Massine guxxino ganto gafa xiinbe\nBalaxo aa noonke tee sokkara\nSokka ranke kulle gundammora\nMuddineemmo gede ballo daasi \nBaala baqqi assonke ayyaanisi\n",
                      verse_3: "Waajja dasiissaawoonke\nNigussano ikkituro\nKulleemmo halaalesi baxxure abbito\nHee'neemmo olliira ikko katammate\nBaxxino fiixa'ya Wongellaho heerate\nAlamete ledo jirte e'ne\nMageeshsha hee'neemmo tenneeyi hee'ne\nHeera hasiissuro baxxa noonke\nMuse ledo ikkihu no ledonke\n",
                      verse_4: "Ledonke hosanna ledonke itanna\nMe eho kulloommo lubbo rewoote hadhanna\nXa'misiissannonke lubbuwate hajo\nHonseemmo Jaalira kullo shoolki hajajo\nMannu xiikkamanna giiramara\nWaajja dasiissaawoonke ma're reyaara\nQawaandanke geeshsha baqqaallanke \nMikiyaasi cooyiiri gede cooyiira noonke\n",
                      artist: "Faarsancho Argiso Adiso",                 
                      language_value: "Sidaamu Afoo"
                      },
                      {
                        id:3,
                        song_num: 6,
                       title: "ተዮኖ ዶርሽነ",
                       category:"Cat 1",
                        chorus: "ተዮኖ ዶርሽነ ማት\/2\nተዮኖ ዶርሽነ ማት ዓለመተንሶ የሱሳት\nጎፌ ዳይኖ ድር ግዶ ንንኬ ካይን ሮዶዋ\nቃራ ባላ ሳይሳኖሃ ሄገር ሔሾ የሱሳ ቡሳ ዶረሻንከ አስኖ የሱሳ\n",
                        verse_1: "አልባንሰን ሽቅንሸ የሱሳና ባርባን\nክነራ ወያኖነሐ ራክኔ ዶጸ(doodhe) ጣን\nይንሳ ወይቴ አይሁዴ ሀበ ባኦ ደድትኖ\nየሱስ ሱታሜና ባርባን ትሮንከ ይትኖ\n",
                        verse_2: "እሚድ ቃለ ሮሳን የሱስ ለዴ ሃራይ ኬሸ\nዶርሻስ ምቶ አስራ ሆጌ ግዶ ቡንሰ አማጠ ኬሸ\nቡንሸስ ቃል ቀስ ወይቴ የሱሳ ህሬ ሃርኖ\nሔሾ አኖክ ወጥራ ይሁዱ ባኤ ጋትኖ",
                        verse_3: "ማጋኑ ዶርኖ ማንች ጃዋታ ወልቃ ኡድስሴ\nቄለተን ሳይሳንሳራ አይሁደ ድኦይ ጋትሴ\nማጋኖ አናስ ሾለሸ ዳሊላ ላኤዶጋሜ\nሳመሶም እሌ ባዕኖዶርሻስ አስሬ አለሜ\n",
                        verse_4: "ሽማ ማና አጉራና ክሬ ቱንቃንክ ማን\nኣለሜ ዶጋይ ሳእኖ ማጋኖ ዳድልሳን\nእንሳ ጫላ ድኩላይና ተዮኖ ንንኬ ዶርሽ ማት\nዶጸነ ሔኖሞ ጋሞንከ አለሜተንሶ የሱሳት\n",
                        artist: "ዘማሪ አሰፋ ናሮ",
                        language_value: "ሲዳሚኛ መዝሙር"
                      },

                      {
                        id:4,
                        song_num: 9,
                       title: "ሎወሬ ሎሱና",
                       category:"Cat 1",
                        chorus: "ሎወሬ ሎሱና አልብ ሐዋርያቴ\nማሆዬ ይቱና ምቱ ጎራማቴ\nባሩ ጋንባ ይና ኢየሱስ ዳቴ\nማጌስ ቅጣንቦ ለዶስ ሀራቴ\n",
                        verse_1: "ቅጣብኖ ማን ለዶስ ሀድኖ\nሄኒክኡ ማሊ ኮነ ድጋትኖ\nንንከ ህክኖያ ድቅጣንቦና\nወይ ድኢብኖሞ ወይ ድቅንዶሞና\nምቴክኔ ባሎ ኡምቤ ባነሞና\n",
                        verse_2: "ሳሱ ቅጣብኖር ግራ ጦስትኖ\nወልቃ ማጋኑይታ ሾልክ አስድኖ\nንንከ ህክኖያ ድቅጣንቦሞና\nማጋኖ ሁጭኖ ወልቃ አኖንከና\nሁሉላንተኖንተ የሱስ ቄላና\n",
                        verse_3: "ድንኤል ቆድኖ አማተ ሀሎ\nዶብቹ ባለ ግዶ እታምክን ጋሎ\nካካቹ ኑጉስ ሻራ ሀስሬና\nማጋኑ ጋሸዮስ ሄጦ አስሬና\nተዮኖ ሄጥኖላ ንንለዶ ኖና\n",
                        verse_4: "አልብ ሀዋርያት ጣገ አስትኖ\nሁጫቶተ ናፋ ሬይኖሃ ካይስኖ\nንንከ ካይን ሙንጎሞ ዶጋና ድኒንከ\nአያናክ ሶይኖንከ ጎርዱ ማጋኖንንከ\nኬሩይ እልሽንከ እምሃ ምነንከ\n",
                        artist: "ዘማሪ ኢያሱ ራጋሳ",
                        language_value: "ሲዳሚኛ መዝሙር"
                      },

                      {
                        id:5,
                        song_num: 5,
                       title: "ካዊ ፉላ ሀስነሞ ",
                       category:"Cat 1",
                        chorus: "ካዊ ፉላ ሀስነሞ ምቴ ቃፎ ለንደ\nሔሾተ ኡርንሳሃ ቃለክ ሄሳንጌ\nጩቡ ጥብ አማደዮንከ ድህሳትወንከ ኡርደ\nዳፉራሞ እክንና  ህኩያኖ ወርቡ\n",
                        verse_1: "ኑጉሳተ አልባ ሀላለክ ኩላተ ድዋጅኔሞ\nኑጉሳተ አልባ ሀላለክ ኩላተ ድዋጅኔሞ\nጮይነ ድሳሌሞ ሳልስሳኖክሀ እኮቶሁራ *2\nሶቃኖ አጉር ኮ ዳፉራማ ዶዳቶሁራ\n",
                        verse_2: "አድንታይ ሞትቻ ለዶንከ ኖቶታ ጣን ኤጌንስስንከ\nፉልቶክን ፉለ ድናሆ አማማሞራ ላኦትንከ\nዱቹርች እካዎንከ አተ አፋማ መሬሮሆ ሄዱሮ 2*\nማይኖ ድዱሻዎንከ እካዎንከ ቃልክ ዳይሮ\n",
                        verse_3: "ሬዮተ ጎጥቾ ጎጣይክ ገደ አት እለያ ጣዊስ\nተቾ ያና ሔዴና ጃዋችሽኤና አንጋክ ድርርስ\nወዳንዌሎታ እለ ሔዴናንሳ ባልትዮረ 2*\nሀን ላዌ ሌሎ  ማጫ ኖንሳ ካይን ዳንቅተዎረ",
                        verse_4: "ማጋኑ ጋልትኖስ አስርኖ ግራማ ካታም ግዶ\nባአዎር ዳፍራ ዱንታና አት እለክ ህንድዶ \nሁንታዮ ካዮ ዶገ ቶታዬስታን ኖንከና ኩኔ  2*\nማስተ እልሽንከ ወዳንንከ ወጅ ያኖ ምኔ\n",
                        artist: "ዘማሪ ለገሰ ላንቃሞ",
                        language_value: "ስዳሚኛ መዝሙር"
                      }
                    ]
            }

           

    ]
    const SongsFormatted =[
      {
        language_key:'አማርኛ',
        Content:[
                {
                  id:1,
                  song_num: 1,
                  title: "ኃይል ያለው በጉልበት ላይ ነው",
                  category:"Cat 1",
                  chorus: " ኃይል ያለው በጉልበት ላይ ነው \/2*\/\nመንበርከክ መፀለይ ካለ\nሁሉም ነገር በእጃችን አለ\n",
                  verses: [
                  "ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው\nበደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው\nአርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው\n",
                  "ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው\nበደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው\nአርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው\n",
                  "ኤልያስ ሦስት ዓመት ሙሉ ዝናብ እንዳይወርድ የዘጋው\nበእምነት በፀሎት ኃይል ነው አመፀኛውን ሕዝብ የቀጣው\nለነገሥታትና ለአህዛብ የአምላኩን ክንድ የገለጸው\n",
                  "በአንበሳ ጉድጓድ ውስጥ አድሮ ዳርዮስ ጠርቶ የጠየቀው\nዳንኤል አሳደረህ ወይ አምላክህ የምታመልከው\nአዎን ድኜ አድሬአለሁ አምላኬን አከብረዋለሁ\n",
                  ],
                  artist: "ተፈራ ወ\/ማሪያም",
                  language_value: "አማርኛ"
                },
                {
                  id:2,
                  song_num: 2,
                 title: "ልመችህ ማደሪያህ ልሁን",
                 category:"Cat 1",
                  chorus: "ልመችህ ማደሪያህ ልሁን\nአፅዳኝና ገብተህ ተደላደል}2 \nአንተ እንዳትገባ ሚያደርገውን ሁሉ\nበጅራፍህ ገርፈህ አስወጣው በሙሉ}2\n",
                  verses: [
                  "አቤቱ አባታችን ይኸው በፊትህ ነን\nንስሐ እንገባለን ተቀበለን\nየምህረት አምላክ ነህ ርኅሩኅ ነህጌታ\nኃጢአታችን በዝቷል አርግልን ይቅርታ\nአርግልን ይቅርታ)2\n",
                  "መች በእኛ ይጨክናል ልብህ\nመች በእኛ ይጨክናል ያ ኃይልህ\nየምህረት ምንጭ ነህ ራስህ)2\nለምህረት የፈጠንክ ለቁጣ የዘገየህ\nአምላኬ አንተ ነህ የምህረት አባት\/2\/\n",
                  "አለም በዘፈኗ ገና ሳትወስደኝ\nበጠላት መጋጋ ወስዳ ሳትከተኝ\nፈጥነህ ደርሰህ ጌታ እንድታስመልጠኝ\nጠዋትና ማታ እለምንሃለሁ\nማስመለጥ ታውቃለህና ታስመለጠናለህ\nመለየት ታውቃለህና ትለየናለህ\n",
                  "",
                  ""
                  ],
                  artist: "ሀዋሳ ታቦር ቤ\/ክ ውዳሴ ኳየር",
                  language_value: "አማርኛ"
                },

                {
                  id:3,
                  song_num: 3,
                title: "ስሙ የማይንደው ተራራ ",
                category:"Cat 1",
                  chorus: "ስሙ የማይንደው ተራራ \nበርሱ የማይታለፍ መከራ\nየለምና እኛም በእምነት ስሙን እንጥራ \/2*\/ አዎን\n",
                  verses: [ 
                    "አሁን በዙሪያችን የከበበን\nየማይታለፍ መስሎ የሚታየን\nስሙን ስንጠራ ሁሉ ይፈርሳል\nእንደ አመድ ሆኖ በኖ ይጠፋል \/2*\n",
                    "የሚገዳደረን ብርቱ ሆኖ\nለዓይናችን የታየን እጅግ ገኖ\nረዳታችን ከላይ ሲደርስልን\nጠላት የካበብን ተናደልን \/2*\/\n",
                    "ደመና ከሰማይ አይታይም\nምልክት የሚሆን ነፋስ የለም\nግን ሸለቆ ሁሉ ውኃ ሞልቷል\nስሙ ያደርገው ዘንድ   ተችሎታል \/2*\/\n",
                    "ተራራ ሆኖብን የጋረደን\nአሻግረን እንዳናይ የከለለን\nታምረኛ ስሙን ስንጠራ\nይወዳደቅ ጀመር  በየተራ \/2*\/\n"
                  ],
                  artist: "ሀዋሳ መናኸሪያ ቤ\/ክ አማኑዔል መዘምራን",
                  language_value: "አማርኛ"
                },

                {
                  id:4,
                  song_num: 4,
                  title: "በደመና ይመለሳል ",
                  category:"Cat 1",
                  chorus: "በደመና ይመለሳል \nበክብርም ይመለሳል \nየወጉትም ያዩታል \nጌታ አይቀርም ይመጣል\/2x\/\n",
                  verses: [
                   "ጽድቅ የሚኖርባትን አዲስ ምድር ሊያወርሰን \nእንደ ተስፋ ቃሉ ወደ ክብሩ ሊያገባን \nይመጣል\/3\/ በእርግጥም ይመጣል\n ",
                   "የተስፋ ቃል የሰጠን እግዚአብሔር ታማኝ ነዉ \nሊፈጽመዉ ይችላል በትዕግሥት እንጠብቀዉ \nበቃሉ በተስፋ ብንቆም መገለፁ አይቀርም\n",
                   "ለብዙዎች መዳን እያለ ቢዘገይም \nየተናገረዉን ቃል በፍፁም አያጥፈዉም \nይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል\n",
                   "መጨረሻዉ ተቃርቧል ጌታ የሱስ ይመጣል \nብለን ለሁሉ እናዉጅ ይህን የምስራች ቃል \nይመጣል ይመጣል እያልን እንናገር ምፃቱን\n "
                  ],
                  artist: "አ\/አ ገርጂ ቤ\/ክ መዘምራን",
                  language_value: "አማርኛ"
                },
 
                {
                  id:5,
                  song_num: 5,
                  title: "ባመልከዉ አይበዛበትም",
                  category:"Cat 1",
                  chorus: "ባመልከዉ አይበዛበትም\nብሰግድም አይበዛበትም\nምስጋና አይበዛበትም\nለእየሱስ እበዛበትም\n",
                  verses: [ 
                    "ከሞት ነዉ እኔን ያዳነኝ\nሕይወቱን በመስቀል ሰጥቶኝ\nስለዚህ አመልከዋለሁ\nለፍቅሩ ምላሽ ይሄዉ ነዉ\nይሄው ነው\/2* ምላሹ ይሄ ነው\n",
                    "ከእሥራት ፈትቶኛልና\nነፃነት ሰጥቶኛልና\nሰይጣንን ላሳፈረልኝ\nለየሱስ እሰገዳለሁኝ\nእየሱስ ጌታ ነዉ",
                    "ጨለማን የገፈፈነዉ \nብርሃንን ያበራልኝ ነዉ\nህይወቴን ያረካልኝ ነዉ\nሰላምን ያበዛልኝ ነዉ\nጌታዬን ኢየሱሴን ሁሌ እባርከዋለሁ\n",
                    "ስቸገር የደረሰልኝ\nስታረዝ ደግሞ ያለበሰኝ\nስቸገር ደርሶ ያገዘኝ\nየሱስ ነዉ እንዲህ ያደረገልኝ\nጌታ ነዉ የሱስ ነዉ እዲህ ያረገልኝ\n",
                    "ምስኪኑን የማይንቅ ጌታ\nየድኃ አደጎች አለኝታ\nከፍ አድርጎ የሚያከብር ነው\nለቸርነቱ ወሰን የለው\nእየሱስ እየሱስ እጅግ ቸር አባት ነው\n"
                  ],
                  artist: "ተስፋዬ ሽብሩ",
                  language_value: "አማርኛ"
                }
],
      },
        
          {
            language_key:'Oromo',
            Content:[

                {
                id:1,
                song_num: 1,
                title: "Lafarra tutturuu",
                category:"Cat 1",
                chorus: "Haadha irraa adda baatee daa'imni qofaa hafaa jirti\nDhalarra adda baatee haatimmoo gidirfamaa jirti\nBoo'icha irraan gadee kanatu hedduu nutti hammaate x2\nLola'uu dhiigaa hammaate kanaaf maal ta'a yoo dhufte",
                verses: [
                    "Lafarra tutturuu jal'ina dachee ilaaluun nuffe\nWaan namatti hin tolle yaadaaf garaa namaas hin gammachiisne\nXoofoo hadhaa'aa dhugaa irbaata gaddaa nyaachuun\nHaa ga'u (x2) Yesuus nuuf mul'adhu",
                    "Abjuun abjootamu sagaleekee kan ibsu tasa hin jiru\nYaaddoof yaadda'uudha maal taana laataadha har'a kan argamu\nBa'ee galuu yaadda'a dhugaa hin se'u namni\nAkka baalaa harca'ee dhumaa jira dhaloonni",
                    "Gurraan kan dhageenyu ijaan kan arginu hundumtuu hamaa\nWaan namatti tolu dhagahuun har'a daran yarateera\nAt dursitee nutti himte kun hunduu akka ta'u\nBarri xumuramee akka goolabbiin ta'u\n\n",
                    "Harka keenya qabi dachee horsossaa'erra turuu hin feenu\nWanta suukanneessaa hin feenu nuyi kana caala ilaaluu\nDafi ofitti nu fudhu nun tursiini lafarra\nMul'achuukee hawwine yoomuma nuuf dhufta\n"
                ],
                
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:2,
                song_num: 2,
                title: "Deemsi Siin Alaa",
                category:"Cat 3",
                chorus: "Siin malee (x2) jette lubbuunkoo gooftaa\nSiin malee ani hin barbaaduu harka abbaa ormaa x2\nDeemee ilaaleera argees madaaleeraa\nAbbaakoo naaf hin tahu harki horma",
                verses: [
                      "Deemsi siin alaa hin mijaatuu dadhabbii isaatu caalaa\nBaay'eetu har'a si dhiise gara biyya lafaa ilaalaa\nKanaafan sirratti of dhiisee nan leyyaasisin Abbaakoo\nBarri kun baay'ee hammaateeraa na furi maaloo Waaqakoo\n",
                      "Harra yemmuu ilaalanii baabilon baayyee miidhagdii\nDhangaanshees yemmuu mullatuu nama haawwattii\nGaruu daandii ballaan suni gara badiisaattii geessaa\nSi kadhachaaan jiraam anoo dafii bahi ishee keessaa\n",
                      "Qajeelummaan lafaa dhibee hunduu gumaan faalameraa\nHaadhoon haadhoosaaf hin iluu karaarra wal kaachiseeraa\nMilkkinni hunduu raawwatee hamma lafti xumuramtee\nOf murteessu barbaadeeraa naaf kahi adaraakee\n",
                      "Oduun dhagahamuu hunduu abdii na kutachiiseeraa\nKan gurratti tolu hin jiruu anatti hadhaa'eera\nLubbuunkoo siin malee jettee harkakeerratti hin miidhamtuu\nSitti deebinaa nuuf falmii ati homaa hin dadhabduu"
                       ],
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:3,
                song_num: 3,
                title: "Ati Anaaf Jettee",
                category:"Cat 3",
                chorus: "Anaaf jettee maal hin taane ati abbaakoo\nGatii baastee boqochiisteetta lubbuukoo\nMaal sii kennuu hundaa qabda ati abbaakoo\nKanan qabuu siif wareegaa jireenyakoo",
                verses: [
                      "Ati anaaf jettee maal hin taane Abbaakoo\nWaanjoo guddaa baatte baraartee lubbuukoo\nAna oolchuuf jettee namaa gadi taatee\nHattoota wajjinis qofaakee reebamtee x2",
                      "Dafqa dhiigaan makaa naaf jettee roobsite\nDu'a na oolchuuf jecha alangaan reebamtee\nDhiphinni kee gooftaa na bilisoomseeraa\nWaanan jedhuu hin qabuu mo'i barabaraan x2",
                      "Utuu siin hin taanee an yoona badeeraa\nGalmeen seenaa kootii irraanfatameeraa\nNaaf mul'achuukeetiin har'a nama ta'ee\nTokko lama jedheen amma lafaa ka'ee x2\n\n",
                      "An barakoo keessatti harka ormaa hin ilaaluu\nSiif gugguufeen bulaa siin homtuu naan caaluu\nSiif of wareegeeraa mee narraatti mo'ii\nGolakeeen filadhee nan leeyyasisinii x2\n"
                ],
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:4,
                song_num: 4,
                title: "Nuuf Jettee",
                category:"Cat 4",
                chorus: "Siin baaneerraa du'a jalaa\nSiin oolleerraa boolla du'aa x2\nKankee maal jennaa waaqa jaalalaa\n",
                verses: [
                      "Nuuf jettee dhiphattee qaraaniyoorrattii\nWaanta atii nuuf hin taanee hin jiruu abbaa atii\nDafqa dhiigaan makaa lolaaste fannoorratttii\nNuuf jetteetuu baattee gindillaa jiidhaa atii\n",
                      "Utuu beekanii atii waaqa uumaa tahuukee\nMiidhaa siif hin mallee miidhamtee nu baraartee\nNamat harkakeen uumtee yeroo si fannisanii\nAti jettee kadhattee dhiisiif abbaa hin beekanii",
                      "Gatii ilmaan namootaaf kan darbitee dhaabattee\nDu'a ilmaan namootaas kan ofiitti fudhattee\nGatii cubbuu baastee kan fayyina nuuf laattee\nJaalallikee addaa kan akkasittiin nu jaallattee\nHammana jennee kan tilmaamuu hin dandeenyee\nNuuf raawwatteetta Gooftaa ati eebbifami malee x2\n"
                ],
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                },
                {
                    id:5,
                song_num: 5,
                title: "Furiin Biyya Lafaa",
                category:"Cat 5",
                chorus: "Gaarummaa Waaqayyoon labsa\nAmala isaa isa dhugaa namoota fuuldurattiin mullisa\nUlfina isaan calaqqisiisa\nJaalalli Waaqayyoo lubbuukoo keessatti mo'eera'oo",
                verses: [
                      "Furiin biyya lafaa kanaa fannoo qaraaniyootti rarraafame\nQaamni waaqummaa guutummaatti kan keessa ture\nAarsaa ilma waaqayyoo isa jaallatamaa kana ilaaluudhaani\nOnneen koo baqee guutummaatti jaalala isaan qabamee\n",
                      "Kennaa dhuma hin qabne jireenya barabaraa nuuf laate\nUlfinni waaqaas eegaa keenya ta'eetu nuuf dhaabate\nQajeelummaan yesuus kiristoos golgaa jabaa anaafoo ta'eera\nXiyya diinakoo hundumaa jalaas an baraarameera\nNagaadhaaf boqonnaa naaf kenne gooftaa siin qabaachuunkoo\nSimboo ulfina koo humna samiitiin na miidhagsite\nAjaa'ibsiisaadha hojiin harkakee hunduu jaalalaan kan guute\nGa'ee hin tilmaamamne taphatee aarsaan ati anaaf kaffalte",
                      "Waaqayyo fayyina keenyarra caala\nHin qabu tasumaa fedha kan biraa\nHumni Isaa xumura hin qabu\nDhiifamni Isaa bira hin ga'amu\nHo'i Isaa safara hin qabu\nJaalallisaa daanga hin qabu Waaqayyo jaalala eeyyeen jaalala\n"
                ],
                artist: "Gimbie C. Choir",
                language_value: "Afan Oromo"
                }
            ],
           },
           {
            language_key:'Tigregna',
            Content:[
             {
                id:1,
              song_num: 1,
              title: "ዝያዳ",
              category:"Cat 1",
              chorus: "ዝያዳ፡ ዝያዳ |*2\nመሪፀካ ኣነ ካብ ኩሉ ኣብሊፀ\nኣይፍለየካን’የ ዝመፀ እንተመፀ\nንዓኻ መሪፀ",
              verses: [
                    "ጎይታይ ብምሕረትካ ፈዊስካኒ እንዲኻ\nብርሃን ኣብሪህካለይ ካብ ፀላም ኣውፂእካ\nካብ ውሽጢ ካብ ልበይ ምስጋና ይብፃሕካ\nኣብ ቤትኻ’ዩ መንበረይ ኣይፍለይን ካባኻ\nመሪፀ ንዓኻ\n",
                    "ምስ ዓለም ከለኹ ተዋሒጠ ብሓጢያት\nጎይታ ንዓይ ክትብል ወሪድኻ ካብ ሰማያት\nኣብ መስቀል ውዒልካ ኣብ መቓብር ሓዲርካ\nነቲ መቚሕ በቲኽካ ነፃ ጌርካኒ እንዲኻ\nምስጋና ይብፃሕካ\n",
                    "ክዛረብ’የ ገና ብዛዕባኻ ጎይታይ\nስቕ ዘየብል ኣሎኒ ውሽጠይ ዝመለኣኒ\nብዛዕባኻ ክምስክር ዝደፋፍኣኒ\nንዓኻ ክመርፅ ምኽንያት ዝኾነኒ\nካብ ሞት ዘውፀኣኒ\n",
                    "ዘመናት ክልወጥ ነገስታት ክሓልፉ\nቃላትካ ግን ህያው እዮም ኣብ ልበይ ዝተፃሕፉ\nካብ ፍቓድካ ከይወፅእ ንነብሰይ ዝግስፁ\nንነብሰይ ካብ ኩሉ ንዓኻ ዘምረፁ\nካባኻ ዝመፁ\n"
              ],
                 artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             
             },
             {
                id:2,
              song_num: 2,
              title: "ይገርመኒ’ሎ",
              category:"Cat 2",
              chorus: "ይገርመኒ'ሎ  የግርመለይ ኣሎ\nይገርመኒ’ሎ እቲ ናትካ ውህብቶ",
              verses: [
                  "ንኸመስግነካ ቃላትካ ሂብካኒ\nዜማ ከዚመልካ ጎይታ ባሪኽካኒ\nካባይ ዝኾነ ክእለት የብለይን\nደጊመ ይብለካ ጎይታይ ተመስገን\n",
                  "ናይ መንፈስካ ስራሕ ኣብ ልዕለይ ውሒዙ\nተኣምራትካ’ውን ኣዝዩ በዚሑ\nንዓኻ ከመስግን ደው ኢለ ኣለኹ\nብዝገበርካለይ ተገሪመ’ለኹ\n",
                  "ናይዛ ዓለም ናብራ ከየታልለና\nብመንፈስካ የሱስ ዕርዲ ኹነልና\nዝሃብካና ህያብ ሎሚ ተጠቒምና\nክትመፅእ እንከሎኻ ክንፀንሕ ኣትሪፍና\n",
                  "ትዕግስትኻ የሱስ ንሕናስ ኣግሪሙልና\nተጠፊእና እኳ መሊስካ ትደልየና\nእቲ ምሕረትካ’ውን በዚሑ ኣብ ሂወትና\nየብልናን ንህበካ ብጄካ ምስጋና\n"
             ],
             artist: "ለምለም ሃ\/ማርያም",
              language_value: "ትግርኛ",
           
             },
             {
                id:3,
              song_num: 3,
              title: "ኣበይ እሞ ኣሎኒ",
              category:"Cat 3",
              chorus: "ኣበይ እሞ ኣሎኒ ወረቐት ክንድቲ ዝሓስቦ ዝኾነለይ\nዘርዚረ ዝፅሕፈሉ ጎይታየይ ንዓይ ዝኾንካለይ\nምድርን ባሕርን ብርዕን ወረቐትን ጌርካ ተትህበኒ\nዘርዚረ ክፅሕፎ ክውድኦ ፍጹም ዘይኣኽለኒ",
              verses: [
                  "ገና ካብ ፍጥረተይ ዝኸድ ተዓሚተ\nንስኻ ትመርሓኒ እናበልካ ታተ\nጽምዋ ዓሲሉኒ ንበይነይ ብሒተ\nንርእሰይ እንትምልከት ካብ ኩሉ ኣትሒተ |*2\nመልኣኽካ ልኢእኻ ክተበርትዓኒ\nኣለኩልካ ኣነ ኣጆኻ ትብለኒ\n",
                  "እንተይፈተኹኻ ኣዚኻ ኣፍቂርካኒ\nኣነ እንትርሕቐካ የሱስ ቀሪብካኒ\nጸልማት እናሓረኹ ብርሃንካ ሂብካኒ\nብምንታይ ክገልጾ ቃላት ሓፂሩኒ |*2\nብሒተ እንከለኹ ጎይታ ዝኾንካኒ\nምስ ብዙሕ ሓጥያተይ ንዓይ ሓሪኻኒ\n",
                  "_",
                  "_"
              ],
              artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             },
             {
                id:4,
              song_num: 4,
              title: "ፍቕሪ ኢኻ’ሞ",
              category:"Cat 4",
              chorus: "ፍቕሪ ኢኻ’ሞ ስለ ፍቕርኻ ተመስገን\nሓላዪ ኢኻ’ሞ ስለ ሓልዮትካ ተመስገን\nኣኽባሪ ኢኻ’ሞ ስለ ኽብረትካ ተመስገን\nመሓሪ ኢኻ’ሞ ስለ ምሕረትካ ተመስገን",
              verses: [
                  "ኣብ ፅምዋ ኣብቲ ፀምፀም በረኻ\nነፍሰይ ረዳኢ ስኢና ተሃዊኻ\nንስኻ መፂእካ ዕረፍቲ ሂብካያ\nስለቲ ምሕረትካ ተመስግነካ’ላ |*2",
                  "ንግብፂ ንባርነት ሸይጦምኒ\nኣይርከብን’ዩ ኢሎም ደርብዮምኒ\nንስኻ ኣምላኸይ ኣብ ዝፋንካ ኮይንኻ\nኣኽቢርካኒ ኢኻ’ሞ ጎይታ ከኽብረካ |*2",
                  "ነቲ ፍቕርኻ ጎይታ መግለፂ ስኢነ\nብዝገበርካለይ ሰናይ ተገሪመ\nክሳብ መስቀል ሞይትኻ ኣድሒንካኒ ኢኻ\nበቲ ክቡር ቃልካ ባሪኽካኒ እንዲኻ |*2",
                  "_"
              ],
                  artist: "መዘምራን ሻብዐይቲ መዓልቲ\nኣድቬንቲስት ቤ\/ያን መቐለ",
              language_value: "ትግርኛ",
             },
             {
                id:5,
              song_num: 5,
              title: "ኦ ነብሰይ",
              category:"Cat 5",
              chorus: "ኦ ነብሰይ መን'ዩ ኣባዲኺ\nኦ ነብሰይ መን'ዩ ኣባዲኺ |*2",
              verses: [
                    "ክፀሮ ዘይእኽል ሓዘን እንትወድቀኒ\nፈተውተይ 'ውን ዝብሎም እንትፍለዩኒ\nፍቓድካ ኣምላኸይ ኣብ ዘይጥዕመኒ\nሽዑ በፂሕካ ኣፀናንዓኒ",
                    "መንፈሰይ ቅሂሙ ኣምሪረ እንትነብዕ\nንልበይ ዝድግፍ እውን ዘተባብዕ\nተስፋ ስኢነ ዓው ኢለ እንትፅውዕ\nሽዑ ልኣኽ መንፈስካ እቲ ዘህድእ",
                    "ፈተና መከራ ሕማም ከምኡ'ውን ሞት\nበቲ ዝበፅሕ ኩሉ ምስ ርእሰይ እንትሙግት\nብበዝሒ ስቅያት ኣብ ዝስእነሉ ትርጉም ህይወት\nሽዑ በለኒ ኣለኹ እጥምት",
                    "_"
              ],
              artist: "ኡሪም ቱሚም መዘምራን",
              language_value: "ትግርኛ",

             }
            ],
           },
           {
            language_key:'Kembatissa',
            Content:[
             {
                id:1,
              song_num: 1 ,
              title: "እሶን ኩዕል",
              category:"Cat 1",
              chorus: "\nእሶን ኩዕል 2* አዝክ ቦረሸተ ሙልክ ሆንግተ መገኖንተክ ኩዕል\nእሶን ኩዕል 2* ሜጥን ኦዕሲሾኬረ እንጂጄዕሾኬረ ፈዕሱናን ኩዕል\nእሶን ኩዕል 2* ቢዝማሃንስ ገበሉ ኣሰንቺሃንስ ወሉት ዮበዕሃኔን ኩዕል\nእሶን ኩዕል 2* ቢጠተ ኢል ጠዋክ ዙንስ አሰኖሃኒን መገኒሃንክ ኩዕል",
              verses: [
                    "\nመኑ መኑ እኮደ አፌን ኦሰዕለን አዚን ጬመኖ\nመቴ ለሜ አሴዕች ሰክ ተኔን ሚንተ ጡረኖ\nመገኑ መኒገ እሁምቧ ጃን ጃን ሀለስ ዶሩምቧ\nመከራሮኬ ጠዋን ኡጅ ሁኑምቧ\nመገኑ መንገ እሁምቧ ጃን ጃን ሚንስ ዶሩምቧ\nመር ገአተ ፈንቀልት ዋል ይ ኮመ ሂርሲሱምቧ",
                    "\nሃናች አበ ገደንቲ መኒን ጎንበንት ጬመንቴንትንዶ\nሀወሩተ ገስመ አረቤ ጦርቄን ጮአንቴንትንዶ\nመገኑ በሬንተስ ኢሊ ቤቱ ኣሴሴበንዶ\nማለሉተ ሁጀቺ ካዕሌሴበንዶ\nመላን ኣግሽ ሙዴንኬ ባልታንት ጠዋኒ\nመገኑ ሰዕም ያኖበአ ቤትስ ሀዋኒ",
                    "\nወዘንክ አዜን ቂርተን ሀዊሶ ቃረተ ጉርዱተ አፍ\nወጌች ወጋሃ ቶልተን ዶለ ወልሶ ኬዕመተ ጠዕሙተ አፍ\nዱማን ኮሻን ማጠንቲ ሜጥን ቁሩተዮንቲ\nቆንቆንክ አዜን እክ ጉንጉንተዮንቲ\nኦሶሃንስ ማሹ ቢዙ ደናሙ አኑ ሄአኔንኬ\nአኑ ዮበዕ ኦስችገ ም ኦዕሲሾኬ",
                    "\nመኬን ጉራን ጎንበንኬዕ ሲኣዝሾኬ ሀዊ ሐዊ መቃሙ\nመስቹ ሶኬንስ ዋልኬዕ ሲአዝሾኬ ወዕ ወርጃሙ\nመኒ አብሽ ኬዕሜሩ መገኒሃ ኬዕሙምቧ\nጡዲ አብሽ ቱንሴኬሩ እሲች ቴዕሉምቧ\nጡፈንትዳ ኡሩኪ ዲንክ ዳፊን\nጡድ አንክበ ብዝት ዋለኖ ጊራን"
              ],
              artist: "ዘማሪ በረከት ዮሐንስ ",
              language_value: "ከምባትሳ",

             },
             {
                id:2,
              song_num: 2,
              title: "ኡለ አሌን",
              category:"Cat 2",
              chorus: "  ኡለ አሌን ፍንጨሞ ባጢሉ ጎሞገ ሻረሜን\nጡንዱነን አመዕንኖም ተሶ ብሬንተኔ ብድቅዬን\nሀሹ እልል ሀንደ ይነን ሀጢጥናም በጅጎን\/2\/\n",
              verses: [
                  "ሱዕሙኔ ሄቻ መዝገባን ጣፈሞረ\nባጥሉኔ ፈኤኡ በጅቀሜ ያመሞሩ\nፈኡ ደቅት ሀሹ እልል ይታራን\nነኦንንት መናም በቅይዬ ፅዮንቹተ ኣጋራን",
                  "\nአለም አል ሀዋ ሀምብ አጉን\nፈዕ ሳሙ አሰሜን ሰሜ ባዱ ጡንደን\nሾሏንከ ውዲች ጣጭኖም ኬኑ ኢየሱሰ ጡንደን\nኒ ቀርቾ ሀንደሄ ይናም ሁንዱንኩ ጡምጨመን",
                  "\nቀርቹኔ ኢየሱሱ አርቾገ ጫከኔን\nሀዋ ሁንደንከ ቄን አጉን ቤዜገ ቤሌሌንሰን\nሄቸ ባድ ወቄ ህጊ አብኑ አሰሜን\nቄል መዝሙረ ዘመነን መናም እልል ይነን በጅጎን",
                  "\nባጢሉሁ ጤሌሉሁ ሆረን ዮበዕ መዕኔን\nአንነ ቤት ላሁ ሄጌጉሴ ክቤ መዕኔን\nማሰቱ ጡሙ አብኑ አብኑ በጅጉት ዊንት ትርፍቴ መዕኔን\nሬኑነ በኑዕነ ሰዕምን ሄዕናም ሃሮ ዬሩሳሌንቾን"
             ],
             
              artist: "Qeesichu Bayana Badcha",
              language_value: "kambaatisata"
             },
             {
                id:3,
              song_num: 3,
              title: "ኢ ህዞ",
              category:"Cat 3",
              chorus: "ኢ ህዞ (ህዞት) ህገኖራ ጡድ ሚኃት አገንታንቲ\nህለረ ቁልጥት ባጢላን አጋንቲ\nአለማ እቲት በዕ ኦሮታንቲ\nአንገክ አሲት ሬሆ ቅጠንታንቲ\n\n",
              verses: [
                  "አጉር ፈንቀል የሱስች ሄቻ ቡዕሌች ሁንቶት\nአቢኑ ዮባዕ ሎጅጋ ግግለኖራ ሸርቶት\nሆቀም እተም ፎርጎ ይቶንቲ ፎሊኪ ዘቢን\nሆፋን መርቶት ቱንሶ ሀሌችች ደዕል የሱስበሁን\n",
                  "\nስንስኔ ስማ ዋሱ ቦንቃ ዬኖ የኑ ኪ አሌን ሚ ጡደሞ\nስራ ማነክ እኮ ሴራስ ቆረቡ ሱዕመስ አቢስሱ ቴሱ ማ እኮ\nሲክት ×2 ከችት መረሚ እንስት ዋልት ሀትታ ድዕኖን አግ\nስፍጥሳንኬ ሄቻን አንጅት ባዲ ሁንዲ ጎሊ ሆባስ ሚ ሆግ\n",
                  "\nቀንግቶት ሳማክ ቆረጵ ቁዕማት አፎክ ቁል ይቱና እሱ ዬዕ\nቀሆ በሬ ቀባጢ ቀፈደንት ቀሊቶት ቁልጥት ቁፋታስ\nቀርቾንተክ ጣጠም ቃርሲ ኩላንኬ በርጊ ቄርሲት ሰዊይ ቁጦት\nቀንሱተ ሙች ቃፉ ከም ሰማ ሀብሲሾሄሪ ዑብ ዑጭ አንገተ አቶት\n\n",
                  "yerusaalenchoon\nመቅች ደማ አፌን ሞቹ ሸርናም ዬን ምንች ፉሌኖዕንዶ\nመቃሙ ሞቹ ጎጫ ዑሪ ሁኑ ግብ ቴሸሞዳ ወቀሬን ሼኖዕንዶ\nአማዕነት ቁጡ ከኒች ህጋ ባሳ ሸዕሌን ህጌኑምቧ\n"
              ],
              artist: "ዘማራንቹ ሙሉነህ አኑሎ",
              language_value: "ከምባትሳ",
             },
             {
                id:4,
              song_num: 4,
              title: "መነ ኔሳች",
              category:"Cat 4",
              chorus: "መነ ኔሳች አደ መቱ ጠው ሀበሜቤ\nየሱስ ዋሉ ኢሌጉ ኔሳሀ ለልምበቤ\nመነ ኔሳች አደ መቱ ጠው ሀበሜቤ\nጡማንቹ አያኑ ኔሳን አብሽ ክቼአዮቤ\n",
              verses: [
                    "ማሊሀኔ መኬን እቲን አጊን ጠሊን ነኦት ሄዕነዮምቤ\nዋልቶተ ዮ ወሞማሀ ቅጠንችኔ ጄቹት ጠለንከ ህገዮቤ\nከኒች ኬኦሀ የሱሱ በኡኔ ጡጅ አጉር ሰማን ኦአዮቤ\nኣየ ኢ ቄጎ የን አንስ መኬን እክ እንጂጄአዮቤ\n",
                    "ኢነ ክዕኔ ፈኢሀ ሰሞሁ ኡሼጡዕናች ሁርበጣዋዮቤ\nአንከርሃ በራሃ አንገስ ብድቀዕ የሱሱ ኡጨዮቤ\nመሃመት ኒ ሄቻች መገኑ ዋጅቢሀ አያነ ቄርሴዕሁ\nሀእ አጉሬ መነ ቴሶን እስበ ዋኑን ከኔት ወየኖኔሁ\n",
                    "ኡለት ዮሴሪንን መዕንተ ገፈርታ በሩ ቴሱ ኦንጠክ ፈጄቤ\nተሳ አስናምሩ ኩን ተመኖ ይናምሩ ሜጡሩ ዮኔበቤ\nሆሩንኩኔ ከበር ናንጮምገ እሁምቦ ዘኩስ ሂለኖቤ\nክኖ ኢ አሌን ኡብ ሬሆ ኤስ ኣቄኤ ዩንኩ ዋለኖቤ",
                    "አበተ አሙሬን ገበሉ ዮበዕ ህቢን ሰሜን ጫኬ ጄቹተ\nሰሞሁ ከዕተ ከበሀ ኡለት ቁሙጭ ብድቅ ይተን ህጋ ጃተ\nሀከን ቆጠራ መንቹ ብሬንተስ እግማን ኡሮተ ደንደኖሁ\nመነ ቆርሰቅኑን አጉሬ በቅ ይኑን ከኔት ቃግሳሚሁ\n"
              ],
           
              artist: "ዘማራንቹ ሙሉነህ አኑሎ",
              language_value: "ከምባትሳ",
                },
             {
                id:5,
              song_num: 5,
              title: "ቤሬኤ ብልመታ ቦሮራንቻ ሁንዳንካ ቦቆችኒ",
              category:"Cat 5",
              chorus: "ቤሬኤ ብልመታ ቦሮራንቻ ሁንዳንካ ቦቆችኒ ሀብስሾ\nኦእኖም እንጅጅታ እሌችኔ ሽንሽ ከንገ ኦሰልስሾ\nገለጣሙ መገኑ ሜጥን ዮምብች መናን በርጊ ጣጆ\nጎፎ ፉሽካም ሃሮስ ኦድሻታ አንጋንታስ ኦድሾ\n",
              verses: [
                  "ገለጣሙ መገኑ ሰማኒ ኡላን\nገለጠሙ መገኑ ዶላካን ሆራን\nገለጠሙ መገኑ መናን ግዛን\nገለጠሙ መገኑ ቆጫንቻን ሆራን\n",
                  "\nፉናን አንገናንብሬንታኔ ዱና እክ ጡደሞሩ\nትጉንቡራ አጉጅ ቱንሱታ ኦደቅ አብሽ ባብሾሩ\nትጉንቡራ አጉጅ ቱንሱታ ኦደቅ አብሽ ባብሾሩ\nአብኑ መገን ዶሊ ሆሪ እሁን ሶጆኔ ሃሮ ዎጎ",
                  "\nሼጣኑ ከን ዘኩ መይኬች ጠዋቃኑ ገኤኔው የሱሳ\nቤኑኔ ባታሞ ሙጪሮስ ቄግኔት ምሁ ሜቾኔ ኔሳ\nእንቁታ እጣንኬች ነደደንን ፋኡን አቼኒ ንድኑ\nግብጽች ውዱ ለንቅኬኤ ዎማንማን ፉኔም ገለጠሙ መገኑ",
                  "\nኦርጫ ከድስሳን ኬኤማሻ እይሳን ፋሪኦን ጅቻንያን\nአኑ ዮባእ ኡጃንቴ እለጋ አስኬኤች ጡዳንያን\nመገኑ ጡጅኬኤች አበታንስ አሙሬን ግብጻ ሙሴ ሶኮ\nማለሉታ ሁጃታን ጎምኒ ግራኒ ኦሶሃስ ብጣታ ኣጎ"
              ],
              artist: "ዘማራንቹ ጴጥሮስ ተሰማ",
              language_value: "ከምባትሳ"
             }
             
            ],
           }, 
           {
            language_key:'Wolaita',
             Content:[
             {
                id:1,
              song_num: 1,
              title: "ባይናባ ኢማናው",
              category:"Cat 1",
              chorus: "ባይናባ ኢማናው\nዴኢያባ ጣይሳናው\nማታይ ዎልቃይ ዲዮጎ\nጦሶ ኔዮ ሆላ ኤ ሆላ\n",
              verses: [
                  "ሂዬሳይ ዬኪዲ ኔኮ ዪኮ\nሜቲስ ማሊስ ጊዲ ኒዮ ጡሪኮ\nሄጋና ዳሻ ጋዳ አጋባካ\nቢዲንታ ባናፔ ዴንታ ኤሳሳ\n",
                  "አሳ አቻን በሬ ካሬ ደኤስ\nሎይቲ ማይዳጋ ቦንቺ ካንቴስ\nላፓንቻ ቤኢዲ ዞኳ ዛሬስ\nነ ጣላላይ የሱስ ሙሊያው ጊዴስ\n",
                  "የሱሳ ያጊዲ ካውያይ ኦኔ\nአን ጬቄቲዲ ጉጣይ ኦኔ\nሙሌ በኢቦኮ ኑ አይፊያን\nጋላቴቶ ያጎስ ኑ ዶናን\n",
                  "የሱሳ ያጊዲ ካውያይ ኦኔ\nአን ጬቄቲዲ ጉጣይ ኦኔ\nሙሌ በኢቦኮ ኑ አይፊያን\nጋላቴቶ ያጎስ ኑ ዶናን\n"
              ],
              artist: "ዘማሪ ዳታን ደምሴ",
              language_value: "ወላይትኛ"
             },
             {
                id:2,
              song_num: 2,
              title: "ሐሶሁዋን ሐሺቋን ",
              category:"Cat 2",
              chorus: "ሐሶሁዋን ሐሺቋን ኑ ጊዶን ኔ ቤታ\nኔኒ ሺሾጋዳን ኔቃላ ኔ ዮታ\nኑ ኩሺያ ሚጪዱ ኦይቺዮባ ኔ ኢማ\nኔ አያና አንጁዋን ኡባ ኩንታዲ ዬዲ\n",
              verses: [
                    "ሀጋን ሀሶሁዋን ኔ ቦንቿራ ቆንጫ\nኦቲዮ ኦሱዋ ኡባ ኔኒ ፖላ\nሻሄቴናን ኑናራ ኔ ዴአ\nሀጋን ቤቲያ ኡባታ ኔኒ አንጃ\n",
                    "ኑኒ ኡባይ ፑዳ ኔኮ ጤሎስ\nኑ ናጋራ ኡባ ኔሲ ፓጦስ\nሳሉዋ ማዶይ ኔጌ ያናው ኮዮስ\nጊዲያ ካታ ኔኩሺያፔ ናጎስ\n",
                    "ሀርጊያጌታ ጋካዳ ኔ ቤአ\nዬኪያጌቱሲ አፑታ ኔ ቁጫ\nኡባ ዎሳ ጋካዳ ኔ ሲያ\nኔ ሲቋራ ኑ ጊዶን ሲሜሬታ\n",
                    "ሀጋ ኔ ዴሪያ ኢሲቶ ኔ ቆፓ\nሜቱዋ ጫርኩዋ ኔ ሱንታን ሴራ\nጦኒያ ዎልቃ ኔጋ ኡባ ቤሳ\nኔ ኬታ ጋካናው ኑ ኩሺያ ኔ ኦይቃ\n"
              ],
              artist: "ዘማሪ ተገኝ ጋንታ",
              language_value: "ወላይትኛ"
             },
             {
                id:3,
              song_num: 3,
              title: "ጮ ታና አሺዳጎ",
              category:"Cat 3",
              chorus: "ጮ ታና አሺዳጎ\nጮ ታና ማዲዳጎ\nጮ ታና ሲቂዳጎ\nአይባኔ ቃንጤናን ኔዮ ናአ ኦቲዳጎ\nጋላታይ ኒዮ ጊዶ (3) ጦሶ ታጎ ጋላታይ ኒዮ ጊዶ\n",
              verses: [
                  "ታ ጉዪያ ታ ዛሪያ ቆዴናን ጤሲዲጎ\nታጋ ላፋቴታ ነ ዎልቃን ሚንቲዳጎ\nሀይቋ ያአፔ ታ ሀራቂያ ኦይካ ሾዲዳጎ\nያኮ ኔዮ ዳና ታና ጮ ሺሻ ኤካጎ\n",
                  "ታ ሞርኪያፔ ታዮ ኪቴቲያ ሀርጊያ ሀይቋ\nሀቺ ኔባይ ሀኒፔ ፒኔና ጊ ሂርጊሳባ\nአራታፔ ታ ጊሻው ዴንዳ ኤቃዳ ኔ ቃሊን ሻሪዳጎ\nቤኒ ጣዬስ ጎጋው ዴኡዋ ኢማዳ ሀቺካ ዎቲዳጎ\n",
                  "ማዳናው ኮያዳ ኢ አውፔ ዪዴ ያጌናጎ\nአውዴኔ ኔኮ ዋሲን ሲያይዳ ጮ አዼናጎ\nአዋጢዴ ቡኪዴ ኑና ዜንፒሲያ ኩሺያ ሚጫ ዎቲዳጎ\nዚኔ ኢማስ ጋዳ ጉይያ ቆዴናን ዎንቷዉካ አማንቲያጎ\n",
                  "ኑሲካ ኪጢያ አባታ ሻካናው ዎልቃይ ዲዮጎ\nፓሮናዳን ዬዴቲያባታ ጦኒሳናው ኑ ጎንዳሊያው\nኔና ካሉ ኪዪዲ አሳ ውርሳ ኦላዳ ዶጋ አጌናጎ\nሀሹ አማኒዲ ኔና ኑጎ ጦሶ ኦፔኔ ኑዮ ማታቲሰያጎ\n"
              ],
              artist: "ዘማሪ ዳንኤል ዳምጠው",
              language_value: "ወላይትኛ"
             },
             {
                id:4,
              song_num: 4,
              title: "ፔንቲያ ዛይቲያን ዬጊን አሺዲ ኬሲስ",
              category:"Cat 4",
              chorus: "ፔንቲያ ዛይቲያን ዬጊን አሺዲ ኬሲስ\nሀሩሩዋን ቃቾሳን አጁታ ቤሲስ\nአማንቴሲ ኑ አዋ ዎልቃይ\nሲንታናው ዴኢያ ኑ ሂዶታይ    2X\n",
              verses:[
                  "ኑ ማሊ ባ ጊያ ኡባታ\nጣጷ ጤራ ጣይሲዮ ማታ\nባ ኩሺያን ኦይቂ ዎቲስ\nጦሳ ዎሌቃን አማኔቶስ\n",
                  "ብኤሊ ናቤታ ካውሺስ\nኤሊያሳዮ ታማን ዛሪስ\nባናቱዮ ቱማ ኬሲስ\nባ ዎዲያን ጦሳይ ጋኪስ\n",
                  "ኤርቴራ አባ ናአው ሻኪስ \nእሥራኤሊያ ፒንቲ ኬሲስ\nፈርዖና ጊዷን አሺስ\nሙሴ ጦሳይ ሀቺካ ዴስ\n ",
                  "ዎልቃማ ጎሊያዳ ኦጊስ "
              ],
              artist: "የሳኬና አከባቢ ማህበር ሙዚቃና ዜማ ኳየር",
              language_value: "ወላይትኛ"
             },
             {
                id:5,
              song_num: 5,
              title: "ጦሲ ጊኮ",
              category:"Cat 5",
              chorus: "ጦሲ ጊጎ እ ጊዶባይ ሀኒጌስ (3)\nጮ ኦኔ አይ ጊንካ አባይ ፖሌቴስ\n",
              verses: [
                  "በኒ ወዲያንካ ጦሲስ ጎባይ ሀኔስ\nሀቺ ላይታንካ ጦስ ጎባይ ሀኔስ\nሳሉዋን ዲያባይ ሳአን ዲያባይ አዮ ኤኔስ\nወንቶናውካ መሪናውካ ጦሲ ጎባይ ሀኔስ",
                  "አፑና በኢዶ ጦሲ ጎባይ ሀኒን\n   አፑን አፑዋ ጣሊዶ እ ኑ ዛርጴ ግዲን\n   መኢን ስሊን ቱሊን ቆቂን የሱሳ ፓቴስ\n   ዴጥዳባ ቶሆ ግዲዳባ ኡባ እ ካውሼስ\n",
                  "ሐይቅዳ የሱሲ ዱፑዋ ጦቆሊኒ \nወልቃማ ሹቻካ ባኮያ ኦቲኒ \nደንዲድ ቢን ጦኒ ስሚን ሞርኬ የላቲስ\nጫዳይ ወራይ ሚጫይ ጉፓይ ኡባይ ጉጢጊስ",
                  "ኦይዱ ጋላ ሙልያ ዱፖይ ጌንቲዶጋ \nሃይቂዳ አሳን ጋቲዲ ይባቲቺዶጋ\nላ ፉጣ ጊዲ ፓት ኤስድ ኡባ ኡፓይሲያጋ\nጎይኒድ ዲን ሳቢድ ዲን ሙሌ ቆህያቢ ባ "
              ],
              artist: "ዘማሪ ገነቱ ጋጋዶ",
              language_value: "ወላይትኛ"
             }
            ]  
           } , 
           {
            language_key:'ሀዲይኛ',
              Content:[
                      {
                       id:1, 
                        song_num: 1,
                       title: "ገለተኔ ካች ዮሀኔ",
                       category:"Cat 1",
                        chorus: "ሀንደ ሀንደ ንዋእነ ሀንዳ \nሀንደ ሀንደ እሱክ አንግና   2*\nአን ኡዎሞ ጉራል ገለታ ጌጅ ገለታ\nአን ኡዎሞ  ሉዳም ገለተ ዋእነ ገለታ \nገለተኔ ካች ዮሀኔ(2*) መዝሙረኔም ካች ዮሀኔ\nዲነዕ ሀኔኔ ካቸ ኡዎሀኔ ሀንቀሜ ካቸ ኡዎሀኔ\n    ሀንቀሜ ካቸ ኡዎሀኔ(2*) እያርኮእ ዱነ ትግሶሀኔ\nሀንቀሜ ካቸ ኡዎሀኔ(2*) ከረጥ ችምችመ ሙረንሶሀኔ\n\n\n ",
                        verses: [
                        "ጰውሎሳም ከረጥ ምኔኔ\nእጡዊ ዋእነ ኦቶስምኔ\nመዝሙርኔ ገለጥምኔ\nዋእ ወደ ሞዕሎኦ ማለለትኔ\n",
                        " ኢመኒንሴ ዋእ መላይ  አፋ\nኤከረጥ ምዕን ሾሆዕ ሸፍሸፋ\nአይም ነኮዕኔ ጎጩዊ ፎቁኮ\nከቶዕ ኬዕን ወሽ ኮመም ገቱኮ",
                        "  እዮብ ኤ ኬእማል ሀዎኔ\nአመጥ ሁንድም ቤዱክ በለኔ\nእመዕን ዋኣ ገለጥምኔ\nኤጡኮ ማስ እጥ ምኔኔ\n",
                        "ሊረንችኔ መዝሙሉምተእኔ\nእሱክ ኤሮማ ጠንዱም-ቤዕተዕኔ\nህንክ ሀወኔም ሀንዳ ይኑምተዕኔ\nንቡድ እምኮ ዲነእ ሀኔኔ\n"
                        ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      {
                        id:2,
                        song_num: 2,
                       title: "አን በኬኦሞ ዋአ",
                       category:"Cat 1",
                        chorus: "አን በኬኦሞ ዋአ\nአመእነሞሞ ዋአ\nአፋ ለኣሞ ቆሳ(ሞአ)\nእጥ ኦስከ ዲነአ ካኣ\nሆጎዮ(4*) ሁንድ በለም እጥ ካች ዋአ(2*)\n",
                        verses: [
                        "ኦድ ኤሴ መህ በድሶኮ\nእጥ ለጥ ወሮኔ ቃጳኮ\nኡልጠማን ጠኖዮ\nእጠበቅች ሆጎዮ",
                        "አግደንንሴ ፍሳኮ\nእቀቾ ያ ዌሻኮ\nኡንጆዮ ዋእ ሞጋከ\nኤሴ ዲነእና ኡዋከ\n",
                        "  አን ጀቡምበለ ፈይሳ\nአን ሆጉም በለ ቆጥሳ\nኡንጠቁምበለ መጬሳ\nአፈ ለኣሞ ቆሳ\n",
                         " ኤራዕል ዶሌም ከበላ\nእስረኤእል ዋእ አድላ\nእጤኔ ጉዶ ህንክ ዳና\nአበጉድ ቤእ ሎብ ዳና\n",
                         "ገምበብ ቱንስ ወሪ ፍሳ\nገቶም ጎጎ እነ ሞእሳ\nአንገ አመዳ አወንሳ \nእጥ ለጎዮ መአንሳ\n",
                         "ዋእ በጦ ጉላ ኩሬና\nከቀጣ ያ ቆዴና\nጠኖሞዮ በሽላ\nሎጶና እጥ አድላ\n"
                        ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },

                      {
                        id:3,
                        song_num: 3,
                       title: "ደናሞ የሱስ ብጃላ",
                       category:"Cat 1",
                        chorus: "ደናደናሞ የሱስ ብጃላ\n ዱና ጥጊን ብታአካ ዕጥ እት ማለላ\nድናዕና ኡዉቤአኔ ቅሽጣላ\n ዶዕጥየሄ ምናደባ ከደናም  ዶላ አት ከደናም ዶላ\n",
                        verses:[
                         "ብራ ዮንት መንቾ ከበድን ዋዕ ኮሎ ዋሬ\nብኦ ኩ ኡል ሁንድ አመኔም ጡም ኡዎ  ቤአኔ\nበጥ ባጥል ብራ ይታ ዋዕን ዎር ኩሬ\n ብጃላ ዋዕ ህንጩ ኬንና ሀፋ ዮሃኔ ዋዕ ሀፋ ዮሃኔ\n",
                         "ኩኡል ሴር ቤዕ ታኬኡኩይ የሱስ ሞአካ\nሶኖ ሁንደም ሎስሱኮ ጎጎ ሞዕሳካ\nሶጉካሬ ደበሉኮ እጃጀማካ\n ሰኡቤአኔ ከበል ክነም ዋዕስ አይ መካ ክና ዋዕስ አይ መካ\n",
                         "ዋዕ ደናሞ ህራጋንና አወናንና ኩራ እጥ ዎሻ\nወደለኔዮ ከዶሌኔም ኤች ጎጎ ንና ኩሻ\nዌሻ ዎራ ሀንቅ ጫክሳ አንም ነቃሻ\n ወንጌል ሰገር ዶል ሁንደኔም ቤዶቤዕ ምሻ ወንጌል ቤዶቤዕ ምሻ\n"
                        ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      
                      {
                        id:4,
                        song_num: 4,
                       title: "የሱስ ዋሬና አመን አፋኮ",
                       category:"Cat 1",
                        chorus: "የሱስ ዋሬና አመን አፋኮ\nህራጉው ሁንድም እሀኮ ቤዳኮ\nኤሃር አመናኖ ንምን ህንክዴቴ\nየሱስ ዋሮ በላ ኣኔና ጉንዳህኔ\n",
                        verses: [
                        "ቤበል ሞኑማኖኔ ማለልኖናም\nሶድ ሀሬች እሆኮ ይና ዎንጮናም\nከበል ሞኖማሬ ቤባል ህገንች ባሳ\nመጬንሳ ሞኖሞክ ሁንድችም ክቼቻ\n",
                        "እሆ ሉዊ ሁንድም የሱስ ዋር ኩሮላ\nቀራር ቤዕ ጀቡዊ ከኡላ ሎጶላ\nከካ ሞናመ ኔስ መህንዱ ሰህናቴ\nእል ዕም ደበሎና ኡረጥ ዶል ቤዶኔ\n",
                        "ዶል ዮኮ ይናማ ድርሉምሰም\nየሱስ ዋሬነቴ ኔስ በቅኖኔም\nኤብክን አመናን ንጋጋ ጉድንሶና\nኤ ዋሮ ጊል ብችንስ ጋጋንባ ግንቦና\n"
                        ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      },
                      
                      {
                        id:5,
                        song_num: 5,
                       title: "አትምዱ አመዴ ን አንገ",
                       category:"Cat 1",
                        chorus: "አትምዱ አመዴ ንአንገ\/3\nከኡላን ዮድርስ መሶቤቤእሳ አጋ\nአትምዱ በክሴ ክዎዳ\/3\nለመዱ ንካ ቆጥሴ ኤዳ ኤዳ\n",
                        verses: [
                        "ክሱማ ሾልንሳ ሾሌኖም ቤእሳ\nኬሳም ክአያን ክቼኦ ቤእሳ\nከኡል ምጣንና ኬስ ብቴንሶም ቤእሳ\nከበድ ከበዴም ሃረሜ የሱሳ\n",
                         "አመንና ሕጎ ሉዊ አረቅ ኬኖ ቀዊሳ\nአጋ ኤሌሶላ ክምንስ ጎሳሳ\nዱት አዋዳንም አመዕነቶ ብቴሳ\nደልላና ኡዎላ ሶምሶኔሳ ህግሳ\nብረን በድኑም ሉዊ ንምን አጎቤዕሳ\nንኩሉሌት ሁንዳም ግርን ኦት የሱሳ\n",
                         "በጥሉ ለቡኮዮ ቡሻሎማ በጥም\nባኦ መን ሆፋኔ ዋዕ መዮኮ ይም\nዎደኖን ሰውክ ጆል ኡል በላን በጦላ\nዋዕ ምኔኔ አዋዳ ፍራ መቻሮላ\nኤሃንስ ክኣካ ኩኡል ዱማሞላ\nአት በራሬ ዋኣ ኬሴ ኡንጥኖሙላ\n\n",
                        "ጎቅ ሀኔኔ የምኔዕሳ ድናክች ጠድሳ\nጌጅ ኡስን ከራኮ ሄኖም ኡልሳ እሳ\nአመንና ፍታካ ግግሮ ሉዋ ሎንሳ\nአረቅ መን ኤሃኖን እል ካሶዕሳ እሳ\nእማዕን ዎሾ ጠደማ መኒ ኡልና በቶላ\nአት ንእል ፎቃኤ ኬስ ኡንጥኖሙላ\n",
                         "አረቅ ሉዊ ከኡላን መንካ ትሮ አጎላ\nአማዕን ፋሽና ለሴሽ ክንስ ኡቡሶላ\nማኣል ምጣኖ ዎሽምና ዱት ኬን ጋጋቦላ\nሞኣካማ ዋዕ መን ፋንዴንስ ጆሮላ\nሄኤኖና ሃስት ለሴንስ የሱሳ ሀዳራ\nሀሬች ዎደኑ ቆጬ ለይ አት ህሞ ደራ\n"
                        ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                      
                      }
                     ]
            },
            {
              language_key:'ጉራጊኛ',
              Content:[

                        {
                          id:1,
                          song_num: 1,
                         title: "ይናሽ በጋድነዳ",
                         category:"Cat 1",
                          chorus: "ይናሽ በጋደንዳ ይናሸ ባማደንዳ\nትንም ንቅ የኸረ ይሱስ ጔታነዳ\nአሜን የሱስ አባንዳ \n",
                          verses: [
                           "ሲጣር ይና ቲሽ ቢቸን ተደወታ  \nባነ ቲና ግዝይ ንቅ የኽረ  ጔታ \nይና አትጨንቅ በዋናም በምሳረ\nትንም ንቅ የኸረ የሱስንዳ ነረ  አሜን የሱሰንዳ ነረ\n",
                          "ጔታ ቲጠራንደ ትክኖ ቲብርንደ\nእዮ ይሽርኸማ ትሁትም ቲያስድንደ\nተጥፚ ጥፚ ዘንጋ እንምጊ ይቅየንደ\nያገነንደ እንም የሁዝህ ይብርንደ አሜን የሁዝህ ይብርንደ\n",
                          "ይናሽ በጋደንዳ የሱስ  ነመደንደም\nይናሽ ባማደንዳ ትከሮ ባረንደም\nትፍትሜ ተንቛሜ ይቅየንደቃር ናኸም\nምስጋና የሁት የኽር የዝህ አበቃንደም አሜን የዝህ አበቃንደም\n",
                          "ቲያጌንደ ይና የሁትሄ  ንሮጥነ\nጅጔረንዳ ኑድኔይ  ይፈተቴ ንቸነ\nየሱስ ያገነደ  እንም ቃር አበንደም \nእዮ ዝህ ንቅ ጔታ መምር ነመደንደም አሜን መምር ነመደንደም"
                          ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                        },

                        {
                          id:2,
                          song_num: 2,
                         title: "የሰብ አትመሮ",
                         category:"Cat 1",
                          chorus: "የሰብ አትመሮ ሰቦ\nየሰብ አትዘቦ ሰቦ\nሰብሽ እንም ኸጂ ቃሩ\nበዝረኵን ዘንጋ ኤቛም ቃሩ\n",
                          verses: [
                              "ሠብ ባፚታ ቢቅማምሩህ \nየግዚየታ ነረኹ ቢብርሁ\nአትመሮይ ይፈጥርሁ\nያርወታ ቲብር ያታልልሁ\n",
                              "በዝ አፈር ፚር ያሙሪ እኔ\nበጉራም ኸረም ዌም በከነ\nዩርም በኸረ ኤማ ያርቅር\nየሱስ ባንኸሬ ኤነ እንጛድ ቃር \n",
                              "እማት በየሱስ ኧመሮ\nታለም ዘንጋሁ ተቤተሮ\nሰብ በግብታ ኤም ቴቃሽሁ\nኸሮ ተጔታ ይፈዝሁ\n",
                              "ይረምድሁ ቃር ኸማ ቃር\nያታልልሁ ቢዝረኲን ቃር \nዩርም ዘንጋ ያጭዋድሽ ቃር\nተጔታ በረን ኤን እንጉድ ቃር"
                          ],
                          artist: "አለሙ ብላቱ",
                          language_value: "ጉራጊኛ"
                        },

                        {
                          id:3,
                          song_num: 3,
                         title: "የጌታ ምህረት ሥርም ኤያርቅ ",
                         category:"Cat 1",
                          chorus: "የጌታ ምህረት ሥርም ኤያርቅ \nየየሱስ ፍቅር ሥርም ኤያርቅ\nቛጫ ኤነን ቃሩ ትንም ቃር ይርቅ \nየጔታ ምህረት ሥርም ኤያርቅ \n",
                          verses: [
                              "ኧኳ ኤቴ ባነኸ የሱስ ታንቅየናኸ\nኧኳ  ኤቴ ባነኸ የሱስ ታሟተንኸ\nአዊ ይብራኸባ የቀነ ጣይኸማ\nበጐጀ ትጠቅባ በዱየ ጠነማ \n",
                              "ባጢር ናዘንደምታ ወሮት ቲቜምንደ \nእንባቋም ተፈምታ ጠላት ቲደቅብንደ \nተዝህ እንም ዉርደት ጔታ አተነፈንደም \nየሰማይ ንቅ አግዘር ባፈር ተጨነንደም  \n",
                              "ቢና ሟሬ ኸረም ጮረም ባጢረንደ \nበሁት ጭንቀት ሥቃይ አፈካም ባሸንዳ \nበቀራንዩ መስቀር ይና ዃም ደመታ\nጄነት ንገባኔ ሥየም ህይወተንዳ \n",
                              "የሁትሄ የቸነ ሥርም ኤያቅሟጭን\nየምህረት ኧጅታ ዝራግም ይትቕቧን\nኧኳ አኸም ኔኸ ጔታ ይሳንሽ\nየዘላለም ህይወት በነፃ ትንክብሽ\n"
                          ],
                          artist: "ዮሴፍ ሁሴን ",
                          language_value: "ጉራጊኛ"
                        },
                      ]

            },
            {
              language_key:'Neur',
              Content:[
                    {
                      id:1,
                      song_num: 1,
                     title: "T0th lsac",
                     category:"Cat 1",
                      chorus: "Jvn k` rsa m5 c5 t2kdv th6p kv f66 b` k``n, Jvn k` rsa m5 c5 rsdv th6p kv gu11thd`x2",
                      verses: [
                       "V t0th lsac m5 n5nd5 m5 d22 laar nh66kdu l6? V t0th lsac m5 n5nd5 m5 d22 laar nh6kdu kv.",
                       "V j5n buay k` f` Kuoth kv r5eet ku tin b6th kv f`; v t0th lsac m5 n5nd5 m5 d22 laar nh6k r5eetn5ku\n\n",
                       "K` b77thdan n5 J5thvth k` cuumdan n5 jvn Y522 Kusth, v t0th lsac tee Kuoth in Gu1n bv tee ns m`n5 c`xkvl.",
                       "K` lu]]ku kv cu]x cu]x baa j5 l5ak kv ku5c vms k` gssydu jvn d5tv bv tee ns m`n5 c`xkvl",
                        "_"
                      ],
                      artist: "D22b5t K0k Cusl",
                      language_value: "Nueer",
                    },
                    {
                      id:2,
                      song_num: 2,
                     title: "Baa j5 puany",
                     category:"Cat 1",
                      chorus: "Kuoth nh5al m5 r7xn5 jvn kv l5aak nhsk5 f`, f`n ram m5 j5``k j5n c5 f` ksk kv r5vvm m5 gsaa,( v r5vm ruath d00ln5) (M5 gsaa m5 gsaan5 ) Kuray vjvn c5 f`n ku gsaa kv jv",
                      verses: [
                      "Baa j5 puany kv diit Kuoth nh5al j5n m5 r7xn5 j5n kv l5aak. B5 t5eyd` j5 puany rvy fsaa vj5``k vmv.",
                      "Baa j5 puany kv tin c5 l11t j5n m5 r7xn5 j5n kv l5ak, Gu1 gsaa n5 j5n k` rsaadu y5er teek`. T22 kv kir m5 n7x p5kv wec Kusth t0th lsac gu11th c52x Kusth in D55tn5 jvn k` rvlgssydv rs",
                       "V pu11r l5ak l`tku tin g``y naath j5n m5 r7xn5 j5n kv l5aak, v gssydu l1tkv dol`du mn rvlrs",
                      "N5 m22 \/ken5 p``mn5 caak, n5 m22 \/ken5 fswn5 caak, vj5n Kuoth m5 te th5n n5 wal. V j5n min jak naath k` l5w w55 5, 'luscv tuur l6 gaat Advm, kv f66 cet run t5 bathdssr kv c`xkvl k` j5",
                      "Dee gsaa n5 f66 dee f`n a g``x thusk kal Kusthd`, k` f66 d22 c5ex kvvmvk` gu1n nyusn5. Gsaa n5 f66 dee ran c`x kvl ku thukn5 rvy kalu, k` n5n t5 bathdssr5 rvy gu1th m5 d]."
                      ],
                      artist: "D22b5t K0k Cusl",
                      language_value: "Nueer",
                    },
                    {
                      id:3,
                      song_num: 3,
                     title: "L]1x t5y`",
                     category:"Cat 1",
                      chorus: "T5eyd` cv l]]x, t5eyd` cv l]]x ku`r. T5eyd` cv l]]x n5 rvydu Ku``r. T5eyd` cv l]]x, t5eyd` cv l]x Ku``r t5eyd` cv l]]xn5 rvy du]pdu",
                      verses: [
                      "J5thvth v Ku``r` p1ny, k` vjvn b77thd`, k` vjvn gu55c in gax t5eyd`. J5thvth v lu``kd` p1ny, rvy l`tn5k` d5aal vjvn k` rsaa la Lu``kd` ms. ",
                       "J5thvth v y5eend` p1ny, k` f`n m5 w11 j1l jvn b` v du]]pd` min th5vl muth. J5thvth v yuupd` p1ny, k` f`n m5 c` c56t, jvn bv f` looc kv jsw m5 pusl.",
                       "J5thvth v f77r` p1ny, tvy fsaa c`x nyu1n` b` x`thn5 f77r` min te nh5al. J5thvth bv f` ben nax, b0c b0c fsaa vmv m5 w22 we jssc b5 kvn cu dusth",
                       "_",
                      "_"
                      ],
                      artist: "D22-b5t K0k",
                      language_value: "Nuer",
                    },
                    {
                      id:4,
                      song_num: 4,
                     title: "Nh6kdv",
                     category:"Cat 1",
                      chorus: "Nh6kdv jvn gsaa v, gsaa v kv t5eyd`. T0th lsacdv d5tv , jvn d5tv kv f` x2",
                      verses: [
                      "L1rv Kuoth nh5al t0th lsac kv ku5 gssy`dv, nh6kdv min th5vl peek v d7r. Kv nvy tin c5 Kuoth nh5al kv k`n la ruac t], kvn nvy tin cv k`n rvy rikn5.",
                       "K` c5 th11x nath y5cn5 d`dsar m5 lu]t, k` \/caa du]p in wee kv c52x jek. K` n`k busth kv m`n5 rvw c5 l7ck5vn baath k` cukv Kuoth nh5al csl kv rik5vn.",
                      "Kuoth cv naath k`n rvy cuc` m5 d55t, k` cuv kv b7th kv du]p m5 cux. Am`n5 m22 c5kv cop wecd5vn in d55t l1rkv Kuoth nh5al t0th lsac kv diit.",
                       "Th11x nath c5kv nyuur rvy mu]th m5 col vl7x, kvn nvy tin caa y5an kv kuatn5 kv f66 c5kv Kuoth l7k am`n5 lu22kv, k` cuv kv moc cu]c l1t m5 bvc. K` cukv Kuoth nh5al csl kv riik5vn t5 uan k` cuv kv k1m raar n5 rvy mu]th. Akv puanykv Kuoth nh5al kv t0th lsac m5 d55t.",
                       "_"
                      ],
                      artist: "D22-b5t K00k",
                      language_value: "Nueer",
                    },
 
                    {
                      id:5,
                      song_num: 5,
                     title: "Kv gssy pusny`du",
                     category:"Cat 1",
                      chorus: "Kv gssy pusny`du l66 C``k, gssy` pusny`du, vjvn in jak xsal d5aal k` gsw. K` gssy pusny`du l66 C``k vjvn nyuth ks gssy. ",
                      verses: [
                      "Kv gssy pusny`du l66 C``k rvlv rs. Gssy pusny`du min d7raar. Jsscv k` xsak d5aal tin gsw tin c5 caak. Jscv k` kvn tin c5 caak.",
                      "Kv gssy pusny`du l66 C``k vjvn in jak xsak d5aal k` gsw. K` j5n la t55 pusny m5 d55t, k` kvn xsan5 d5aal tin c5 caak.",
                      "Kv gssy pusny`du l66 C``k vjvn in nyuth ks t22k. K` j5n la mooc5 ks pu]]th rvy n5n5 ks tin yoop j5n.",
                       "Kv gssy pusny`du l66 C``k, cur5 ks nyu]th nh6kdu min d55t. Min cur5 nyooth kv l511 gatdu in luvl ks k` dueer.",
                      "_"
                      ],
                      artist: "Bol Thsst",
                      language_value: "Nuer",
                    }
                 ],
            },
            {
              language_key:'ሲዳሚኛ',
              Content:[
                      {
                        id:1,
                        song_num: 1,
                       title: "Leellinke",
                       category:"Cat 1",
                        chorus: "Leellinke, coyiirinke, xaadinke, iillinke magano\nWolasaanke yite agartewooha xagicho shiteenna roortinori\"\nGodowa cortuhe laittota mararsituhe hexxo qoortinori.\nWolasaanke yite agartewooha Xagicho shiteenna roortinori.\nEemawusi doogo aana xaadde hasaawisse ille xawisitto.\nHexxo haaroonsanno qaale coyiidhe xaadeewonsa dadille hawisitto\n\n",
                        verses: [
                        "Coyiirinke magano coyiirinke\nCoyiirinke mooticha coyiirinke\nBorreessinoye fojo buunxeemmona mooticha atilla coyiirinke\nIi Magano coyiirinke \n",
                        "Wayi aana Hadhanna lae halche anino dayeemmo yii pheexiroosi\nMayi Darawoonyeeti yiittokkinni faanakki daa gede fajjitosi\nHuluullo boo'nate karsiisante sayiisse uutinoha dambalaho\niillie yee raarita iillito mule nootto woshaahu baalaho.\n\n",
                         "iillinke magano iillinke\niillinke mooticha iillinke\nDambalu egemma yorewoonkena\nPheexiroosira iillittohu iillinke\nMagano iiillinke\n\n",
                        "maalu hinaasinni bubbuqame dancha assayi nooha laweennasi\nShorra noonku ate ikkoottota lii'lu haweennasi\nHaranna doogote xaadittosi qasanno bagado heleelloha.\niimi caabichinni qafadittosi isitero baalanka qeelloha.\n",
                        "Xaadinke mooticha xaadinke\nUurrinoommo doogo laa'neemmona\nSawulira xaadittohu xaadinke\nMagano xaadinke\n",
                        "Heeshshonniha reyeeteewoori mereero haafate hassanni raatabbanni\nBorreessinoyi qaale qaaga hooge kuloottoha rewookkira albaanni\nAte afa hoolteennase hindiido illese jaanjursite\nLeellito mayiiraami wi'litanna mooticha'ya moroonnie yite\ni",
                        "Leellinke magano leellinke\nLeellinke mooticha Leellinke\nMullawa raataambanni he'noommona\nMayiiramira leellittohu leellinke\nMagano leellinke\n"
                        ],
                        artist: "Faarsancho Eliasi Batiro",
                        language_value: "Sidaamu Afoo",
                      },
                      {
                        id:2,
                      song_num: 2,
                     title: "Muse",
                     category:"Cat 1",
                      chorus: "Xiinbo Wongeellu gafa (2)\nBadhe higa dasiissannonke noonke alba hige qaafa\nManqisaame baatto dola dubbo e'ne faasha\nWongrella assira noonke looso barra hashsha\n",
                      verses: [
                          "Muse diwaajjino Firiooniwa mara \nNigusa ikkeenna diwaajjino cooyiira \nMishe giwi wooylite Mannasi agura\nDano dirrisino Gibtsete baattora\nAgurino Manna Maganuuyiiha\nGaabbe sooyiino diina shorrannoha\nMaganu fushshi Manni fuli taayiise \nDiinansa gudino dimme eesse\n\n",
                          " Goowi ale doge heeranni no\n Mannu Giddo wodananke illaaho\n Maganu Badhe hanni qollo anfoommoha dinbe \n Massine guxxino ganto gafa xiinbe\nBalaxo aa noonke tee sokkara\nSokka ranke kulle gundammora\nMuddineemmo gede ballo daasi \nBaala baqqi assonke ayyaanisi\n",
                          "Waajja dasiissaawoonke\nNigussano ikkituro\nKulleemmo halaalesi baxxure abbito\nHee'neemmo olliira ikko katammate\nBaxxino fiixa'ya Wongellaho heerate\nAlamete ledo jirte e'ne\nMageeshsha hee'neemmo tenneeyi hee'ne\nHeera hasiissuro baxxa noonke\nMuse ledo ikkihu no ledonke\n",
                          "Ledonke hosanna ledonke itanna\nMe eho kulloommo lubbo rewoote hadhanna\nXa'misiissannonke lubbuwate hajo\nHonseemmo Jaalira kullo shoolki hajajo\nMannu xiikkamanna giiramara\nWaajja dasiissaawoonke ma're reyaara\nQawaandanke geeshsha baqqaallanke \nMikiyaasi cooyiiri gede cooyiira noonke\n"
                      ],
                      artist: "Faarsancho Argiso Adiso",                 
                      language_value: "Sidaamu Afoo"
                      },
                      {
                        id:3,
                        song_num: 6,
                       title: "ተዮኖ ዶርሽነ",
                       category:"Cat 1",
                        chorus: "ተዮኖ ዶርሽነ ማት\/2\nተዮኖ ዶርሽነ ማት ዓለመተንሶ የሱሳት\nጎፌ ዳይኖ ድር ግዶ ንንኬ ካይን ሮዶዋ\nቃራ ባላ ሳይሳኖሃ ሄገር ሔሾ የሱሳ ቡሳ ዶረሻንከ አስኖ የሱሳ\n",
                        verses: [
                            "አልባንሰን ሽቅንሸ የሱሳና ባርባን\nክነራ ወያኖነሐ ራክኔ ዶጸ(doodhe) ጣን\nይንሳ ወይቴ አይሁዴ ሀበ ባኦ ደድትኖ\nየሱስ ሱታሜና ባርባን ትሮንከ ይትኖ\n",
                            "እሚድ ቃለ ሮሳን የሱስ ለዴ ሃራይ ኬሸ\nዶርሻስ ምቶ አስራ ሆጌ ግዶ ቡንሰ አማጠ ኬሸ\nቡንሸስ ቃል ቀስ ወይቴ የሱሳ ህሬ ሃርኖ\nሔሾ አኖክ ወጥራ ይሁዱ ባኤ ጋትኖ",
                            "ማጋኑ ዶርኖ ማንች ጃዋታ ወልቃ ኡድስሴ\nቄለተን ሳይሳንሳራ አይሁደ ድኦይ ጋትሴ\nማጋኖ አናስ ሾለሸ ዳሊላ ላኤዶጋሜ\nሳመሶም እሌ ባዕኖዶርሻስ አስሬ አለሜ\n",
                            "ሽማ ማና አጉራና ክሬ ቱንቃንክ ማን\nኣለሜ ዶጋይ ሳእኖ ማጋኖ ዳድልሳን\nእንሳ ጫላ ድኩላይና ተዮኖ ንንኬ ዶርሽ ማት\nዶጸነ ሔኖሞ ጋሞንከ አለሜተንሶ የሱሳት\n"
                        ],
                        artist: "ዘማሪ አሰፋ ናሮ",
                        language_value: "ሲዳሚኛ መዝሙር"
                      },

                      {
                        id:4,
                        song_num: 9,
                       title: "ሎወሬ ሎሱና",
                       category:"Cat 1",
                        chorus: "ሎወሬ ሎሱና አልብ ሐዋርያቴ\nማሆዬ ይቱና ምቱ ጎራማቴ\nባሩ ጋንባ ይና ኢየሱስ ዳቴ\nማጌስ ቅጣንቦ ለዶስ ሀራቴ\n",
                        verses: [
                        "ቅጣብኖ ማን ለዶስ ሀድኖ\nሄኒክኡ ማሊ ኮነ ድጋትኖ\nንንከ ህክኖያ ድቅጣንቦና\nወይ ድኢብኖሞ ወይ ድቅንዶሞና\nምቴክኔ ባሎ ኡምቤ ባነሞና\n",
                         "ሳሱ ቅጣብኖር ግራ ጦስትኖ\nወልቃ ማጋኑይታ ሾልክ አስድኖ\nንንከ ህክኖያ ድቅጣንቦሞና\nማጋኖ ሁጭኖ ወልቃ አኖንከና\nሁሉላንተኖንተ የሱስ ቄላና\n",
                        "ድንኤል ቆድኖ አማተ ሀሎ\nዶብቹ ባለ ግዶ እታምክን ጋሎ\nካካቹ ኑጉስ ሻራ ሀስሬና\nማጋኑ ጋሸዮስ ሄጦ አስሬና\nተዮኖ ሄጥኖላ ንንለዶ ኖና\n",
                        "አልብ ሀዋርያት ጣገ አስትኖ\nሁጫቶተ ናፋ ሬይኖሃ ካይስኖ\nንንከ ካይን ሙንጎሞ ዶጋና ድኒንከ\nአያናክ ሶይኖንከ ጎርዱ ማጋኖንንከ\nኬሩይ እልሽንከ እምሃ ምነንከ\n"
                        ],
                        artist: "ዘማሪ ኢያሱ ራጋሳ",
                        language_value: "ሲዳሚኛ መዝሙር"
                      },

                      {
                        id:5,
                        song_num: 5,
                       title: "ካዊ ፉላ ሀስነሞ ",
                       category:"Cat 1",
                        chorus: "ካዊ ፉላ ሀስነሞ ምቴ ቃፎ ለንደ\nሔሾተ ኡርንሳሃ ቃለክ ሄሳንጌ\nጩቡ ጥብ አማደዮንከ ድህሳትወንከ ኡርደ\nዳፉራሞ እክንና  ህኩያኖ ወርቡ\n",
                        verses: [
                            "ኑጉሳተ አልባ ሀላለክ ኩላተ ድዋጅኔሞ\nኑጉሳተ አልባ ሀላለክ ኩላተ ድዋጅኔሞ\nጮይነ ድሳሌሞ ሳልስሳኖክሀ እኮቶሁራ *2\nሶቃኖ አጉር ኮ ዳፉራማ ዶዳቶሁራ\n",
                            "አድንታይ ሞትቻ ለዶንከ ኖቶታ ጣን ኤጌንስስንከ\nፉልቶክን ፉለ ድናሆ አማማሞራ ላኦትንከ\nዱቹርች እካዎንከ አተ አፋማ መሬሮሆ ሄዱሮ 2*\nማይኖ ድዱሻዎንከ እካዎንከ ቃልክ ዳይሮ\n",
                            "ሬዮተ ጎጥቾ ጎጣይክ ገደ አት እለያ ጣዊስ\nተቾ ያና ሔዴና ጃዋችሽኤና አንጋክ ድርርስ\nወዳንዌሎታ እለ ሔዴናንሳ ባልትዮረ 2*\nሀን ላዌ ሌሎ  ማጫ ኖንሳ ካይን ዳንቅተዎረ",
                            "ማጋኑ ጋልትኖስ አስርኖ ግራማ ካታም ግዶ\nባአዎር ዳፍራ ዱንታና አት እለክ ህንድዶ \nሁንታዮ ካዮ ዶገ ቶታዬስታን ኖንከና ኩኔ  2*\nማስተ እልሽንከ ወዳንንከ ወጅ ያኖ ምኔ\n"
                        ] ,
                        artist: "ዘማሪ ለገሰ ላንቃሞ",
                        language_value: "ስዳሚኛ መዝሙር"
                      }
                    ]
            }

    ]
    const filteredSongs1 = allSongs.find(lang => lang.language_key === selectedLanguage)?.Content || [];
    const handleLanguageSelect = (language:string) => {
      setSelectedLanguage(language);
      setModalVisible(false);
      // Add any additional language change logic here
    };
    const renderSongItem = ({ item }:{item:Song}) => (
        <TouchableOpacity 
            style={styles.songItem} 
            onPress={() => {
                setSelectedSong(item)
                closeSearchModal();
            }
            }>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songCategory}>{item.category}</Text>
        </TouchableOpacity>
      );
    const searchSongs = () => {
        const results: Song[] = allSongs.flatMap((songGroup) => {
            const matchesCategory = selectedCategory
                ? songGroup.Content.some((x) => x.category === selectedCategory)
                : true;
    
            const matchesText = songGroup.Content.some((x) => x.title.toLowerCase().includes(searchText.toLowerCase()));
    
            // Return the Content if both matches are true, else return an empty array
            return matchesCategory && matchesText ? songGroup.Content : [];
        });
        setFilteredSongs(results);
    };

      const handleSongSelect = (song:any) => {
        setSelectedSong(song);
      };
      function getSongsByLanguage(languageKey:string) {
        return allSongs.filter(song => song.language_key === languageKey)
                       .flatMap(song => song.Content);
    }

  const verses = [
    { text: selectedSong?.verse_1, style: styles.verse1Style },
    { text: selectedSong?.verse_2, style: styles.verse1Style },
    { text: selectedSong?.verse_3, style: styles.verse1Style },
    { text: selectedSong?.verse_4, style: styles.verse1Style },
  ];
 const handleSwipeLeft = () => {
    if (verseIndex < verses.length - 1) {
      setVerseIndex(verseIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (verseIndex > 0) {
      setVerseIndex(verseIndex - 1);
    }
  };
  
    return (
        <View style = {styles.container}>

        <View style = {styles.navbar}>
        {selectedSong && (
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
            {/* Number Display*/}
            <Text style = {styles.number}>{selectedSong?`#${selectedSong?.id}`:''}</Text>
            {/*Search icon*/}
            <TouchableOpacity onPress={openSearchModal} >
                <Icon name = "search" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*heart icon*/}
            <TouchableOpacity onPress={() => handlePress('heart')}>
                <Icon name="plus-square" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*List icon*/}
            <TouchableOpacity onPress={() =>handlePress('list')}>
                <Icon name="list" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*play icon*/}
            <TouchableOpacity onPress={() => handlePress('play')}>
                <Icon name="play" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*setting icon*/}
            <TouchableOpacity onPress={() =>handleSettingPress()}>
                <Icon name="cog" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
             {/* Language Picker (opens modal) */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerContainer}>
        <Text style={styles.pickerText}>{selectedLanguage}</Text>
      </TouchableOpacity>

      

      {/* Modal for language selection */}
                <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                    {allSongs.map((language) => (
                        <TouchableOpacity
                        key={language.language_key}
                        onPress={() => handleLanguageSelect(language.language_key)}
                        style={styles.languageOption}
                        >
                        <Text style={styles.languageText}>{language.language_key}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </Modal>
                            <Modal
                                
                                isVisible = {isSearchModalVisible}
                                onBackdropPress={closeSearchModal}
                            >
                                <View 
                                    style = {styles.modalBackground}
                                >
                                    <View style = {styles.modalContainer}>
                                            <TextInput 
                                            style = {styles.searchInput}
                                            placeholder="Search By #, title, category, artist name"
                                            placeholderTextColor={'#888'}
                                            value={searchText}
                                            onChangeText={(text) => {
                                                setSearchText(text);
                                                searchSongs(); // Automatically filters on text change
                                            }}>    
                                        </TextInput>
                                        <TouchableOpacity onPress={searchSongs} style={styles.iconContainer}>
                                            <Ionicons name="search" size={24} color="#888" />
                                        </TouchableOpacity>
                                        {filteredSongs.length > 0 ? (
                                        <FlatList
                                        data={filteredSongs1}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={renderSongItem}
                                        numColumns={2}
                                        columnWrapperStyle={styles.columnWrapper}
                                    />
                                    ) : (
                                        <Text style={styles.noResultsText}>No songs found</Text>
                                    )}
                                    </View>
                                </View>
                            </Modal>
        </View>
{/*         
       <ScrollView 
       
       
       pagingEnabled
       showsVerticalScrollIndicator
       onScroll={handleScroll}
       contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        
       >
 
            {selectedSong && (
       
                <View style={styles.songContainer}>
                <Text style={styles.selectedSongTitle}>{selectedSong.verse_1}</Text>
                <Text style={styles.selectedSongTitle}>{selectedSong.verse_2}</Text>
                <Text style={styles.selectedSongTitle}>{selectedSong.verse_3}</Text>
                <Text style={styles.selectedSongTitle}>{selectedSong.verse_4}</Text>
                
                </View>
       
      )}
       </ScrollView> */}
         <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      style={styles.songContainer}
    >
      <Text style={[styles.selectedSongTitle, verses[verseIndex].style]}>
        {verses[verseIndex].text}
      </Text>
      <Text style={[styles.selectedSongTitle, verses[verseIndex].style]}>
        {verses[1].text}
      </Text>
      <Text style={[styles.selectedSongTitle, verses[verseIndex].style]}>
        {verses[2].text}
      </Text>
      <Text style={[styles.selectedSongTitle, verses[verseIndex].style]}>
        {verses[3].text}
      </Text>
    </GestureRecognizer>
  
        </View>
    )
    
}
export default NavbarScreen