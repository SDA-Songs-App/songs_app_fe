import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome5';
const styles = StyleSheet.create({

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
    searchInput:{
        height:40, 
        borderColor:'#ccc', 
        borderRadius:5, 
        borderWidth:1, 
        width:'100%',
        paddingHorizontal: 10, 
        marginBottom: 15
    }
})
const NavbarScreen = () =>{
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearchModalVisible, setSearchModalVisible] = useState(false)
    const [searchText, setSearchText] = useState('');
    const toggleTheme = () =>{
        setIsDarkMode(!isDarkMode);
    }
    const openSearchModal = () =>{
        setSearchModalVisible(true)
    }
    const closeSearchModal = () =>{
        setSearchModalVisible(false);
    }
    const handlePress = (actionName :string) =>{
        console.log(`${actionName} component to be implemented`)
    };

    return (
        <View style = {styles.navbar}>
            {/* Number Display*/}
            <Text style = {styles.number}>#42</Text>
            {/*Search icon*/}
            <TouchableOpacity onPress={openSearchModal} >
                <Icon name = "search" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*heart icon*/}
            <TouchableOpacity onPress={() => handlePress('heart')}>
                <Icon name="heart" size={20} color={'#fff'}></Icon>
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
            <TouchableOpacity onPress={() =>handlePress('setting')}>
                <Icon name="cog" size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            {/*theme toggle icon*/}
            <TouchableOpacity onPress={toggleTheme}>
                <Icon name={isDarkMode ? "sun" : "moon"} size={20} color={'#fff'}></Icon>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent = {true}
                visible = {isSearchModalVisible}
                onRequestClose={closeSearchModal}
            >
                <View 
                    style = {styles.modalBackground}
                >
                    <View style = {styles.modalContainer}>
                        <Text style = {styles.modalTitle}> Search Song</Text>
                        <TextInput 
                            style = {styles.searchInput}
                            placeholder="Search By #, title, category, artist name"
                            placeholderTextColor={'#888'}
                            value={searchText}
                            onChangeText={setSearchText}>    
                        </TextInput>
                        <Button title="Close" onPress={closeSearchModal}></Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
    
}
export default NavbarScreen