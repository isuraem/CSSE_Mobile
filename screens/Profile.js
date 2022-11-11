import React, { useState, useRef, useEffect } from "react";
import { 
    StyleSheet,

    View,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    } from "react-native";
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
      } from 'react-native-paper';
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Fantawesome5} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function BusPick({navigation}){

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Address, setAddress] = useState("");
    const [NIC, setNIC] = useState("");
    const [Phone, setPhone] = useState("");
    const [type, setType] = useState("");

const logout = () => {
  AsyncStorage.clear()
  navigation.navigate("Login")
  
}
useEffect(() => {
  getData();
  loadData();
},[Email,type])

const loadData = () =>{
  axios.get(`http://192.168.1.23:8070/traveller/getTraveller/${type}/${Email}`).then((response)=>{
    console.log(response.data);
    setName(response.data.Name);
    setPhone(response.data.Phone);
    setAddress(response.data.Address);
    setNIC(response.data.NIC);
    setEmail(response.data.Email);
    console.log(Address);

  })

}

const getData = async () => {
  try{ 
    const email = await AsyncStorage.getItem('Email')
    const Type = await AsyncStorage.getItem('type')
   
    if(email!== null)
    setEmail(email);
    if(Type!== null)
    setType(Type);

  }catch(e){}
}
    


    return(
       <SafeAreaView style={styles.container}>
          <View style= {styles.userInfoSection}>
           <View style = {{flexDirection:'row', }}>
            <Avatar.Image
            source = {require('../assets/person.png')}
            size={80}
            />
            <View style = {{marginHorizontal:20}}>
                <Title style={styles.title}>{Name}</Title>
                <Caption styles = {styles.caption}>{Email}</Caption>
            </View>

           </View>  
        
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name = "map-marker-radius" color = "#777777" size = {30} />
              <Text style={{color:"#777777" ,marginLeft:30,marginTop:8}} >{Address}</Text>
            </View>
            <View style={styles.row}>
              <Icon name = "phone" color = "#777777" size = {30} />
              <Text style={{color:"#777777" ,marginLeft:30,marginTop:8}}>{Phone}</Text>
            </View>
            <View style={styles.row}>
              <Icon name = "email" color = "#777777" size = {30} />
              <Text style={{color:"#777777" ,marginLeft:30,marginTop:8}}>{Email}</Text>
            </View>
            <View style={styles.row}>
              <Icon name = "book" color = "#777777" size = {30} />
              <Text style={{color:"#777777" ,marginLeft:30,marginTop:8}}>{NIC}</Text>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title>$150</Title>
              <Caption>Wallet</Caption>
            </View>

          </View>
          <View style = {{marginTop:20}}>
          <TouchableOpacity
            style = {{
                backgroundColor: "#260B8C",
                height: 50,
                marginBottom:5,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 100,
                borderRadius: 24,

            }} onPress = { () => navigation.navigate("EditProfile")}>
                <Text bold medium center style = {{ color: 'white',fontSize:20}}>
                Edit
                </Text>
            </TouchableOpacity>
                
            </View>
            <View style = {{marginTop:20}}>
          <TouchableOpacity
            style = {{
                backgroundColor: "#260B8C",
                height: 50,
                marginBottom:5,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 100,
                borderRadius: 24,

            }}  onPress = { () => navigation.navigate("Home")}>
                <Text bold medium center style = {{ color: 'white',fontSize:20}}>
                Make trip
                </Text>
            </TouchableOpacity>
                
            </View>
            <View style = {{marginTop:20}}>
          <TouchableOpacity
            style = {{
                backgroundColor: "#260B8C",
                height: 50,
                marginBottom:5,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 100,
                borderRadius: 24,

            }} >
                <Text bold medium center style = {{ color: 'white',fontSize:20}}>
                Wallet
                </Text>
            </TouchableOpacity>
                
            </View>

            <View style = {{marginTop:20}}>
          <TouchableOpacity
            style = {{
                backgroundColor: "#260B8C",
                height: 50,
                marginBottom:5,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 100,
                borderRadius: 24,

            }} onPress = {logout}>
                <Text bold medium center style = {{ color: 'white',fontSize:20}}>
                Logout
                </Text>
            </TouchableOpacity>
                
            </View>

            
       </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 18,
      top: Constants.statusBarHeight,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
      marginTop:20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
      
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });