import React, { useState, useRef, useEffect } from "react";
import { 
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    TouchableHighlight,
    ToastAndroid
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


function BusServiceDetails(props) {
  //setting props valuse into usestate 
    const [duration, setDuration] = useState(props.locationData.duration);
    const [PickUp, setPick] = useState(props.locationData.pick.vicinity);
    const [Destination, setDrop] = useState(props.locationData.drop.vicinity);
    const [AirCondition,setAirCondition] = useState(props.data.AirCondition);
    const [BusNumber,setBusNumber] = useState(props.data.BusNumber);
    const [BusService,setBusServiceName] = useState(props.data.BusServiceName);
    const [BusType,setBusType] = useState(props.data.BusType);
    const [WiFi,setWiFi] = useState(props.data.WiFi);
    const [id, setId] = useState(props.data._id);
    const [Price,setPrice] = useState(props.data.Price);
    const [TravelId,setTravelId] = useState("");
    const [CusName,setName] = useState("");
    const [Mobile,setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [login,setLogin] = useState("");
    const [Password, setPassword] = useState("");
    const [type, setType ] = useState("");
    const [TPrice,setTPrice] = useState("");

//set use effect to fetch details 
    useEffect(() => {
        loadData();
        getData();
        cal();
       
    },[Email,type])
 //http request for get traveller details 
    const loadData = () =>{
        axios.get(`http://192.168.1.23:8070/traveller/getTraveller/${type}/${Email}`).then((response)=>{
        
          setName(response.data.Name);
          setPhone(response.data.Phone);
          setEmail(response.data.Email);
          setPassword(response.data.Password);
          

        })
      
      }
      
      const sendData = async() =>{
       
   //http req for ading booking details   
        axios.post("http://192.168.1.23:8070/booking/addBooking",{
            CusName,
            Mobile,
            Email,
            PickUp,
            Destination,
            BusService,
            TPrice,
      }).then((res) => {            
        ToastAndroid.show(

          'Booking Added..', ToastAndroid.SHORT
        );

      props.onHide(true);
      props.refresh();
      props.show(true);
        }).catch((err)=>{
            console.log(err)
        });
            }

            const closeData = async() =>{
       
            props.onHide(true);
            props.refresh();
           
                  }
   //getdata function for fetch asyncstorage values
 const getData = async () => {
    try{ 
      const email = await AsyncStorage.getItem('Email')
      const password = await AsyncStorage.getItem('Password')
      const Type = await AsyncStorage.getItem('type')
      
      if(email!== null)
      setEmail(email);
      if(Type!== null)
      setType(Type);
      if(password!==null){
        setPassword(password)
    }
    }catch(e){}
  }
  //set trip total prices
  const cal = async () => {
    try{ 
      let TripPrice = duration * Price;
      console.log(duration)
      setTPrice(TripPrice);
      console.log(TPrice);
    }catch(e){
        console.log("error")
    }
  }
    
    return(
        <View style={styles.userInfoSection}>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Duration  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}} >{duration}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>PickUp  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}}>{PickUp}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Destination  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}}>{Destination}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>BusType  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}}>{BusType}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>AirCondition  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}} >{AirCondition}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Bus Number  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}}>{BusNumber}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Mobile  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 17,}}>{Mobile}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Customer Name  : </Text>
              <Text style={{color:"#777777" ,marginLeft:20,fontSize: 17,}}>{CusName}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{color:"#777777" ,marginLeft:30,fontSize: 18,fontWeight: "bold"}}>Total Price  : </Text>
              <Text style={{color:"#777777" ,marginLeft:30,marginTop:8}}>{TPrice}</Text>
            </View>
                <View style={styles.Btn}>
                    <View style={styles.upBtn}>
                        <TouchableHighlight underlayColor='none' style={styles.upbutton}
                        onPress={() => sendData()
                        } >
                        <Text style={styles.uptext}>Confirm</Text>
                        </TouchableHighlight>  
                    </View>
          
                    <View style={styles.delBtn}>
                        <TouchableHighlight underlayColor='none' style={styles.delbutton}
                       onPress = { () => closeData()} >
                        <Text style={styles.deltext}>Cancle</Text>
                        </TouchableHighlight> 
                     </View>
                </View>
        </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 18,
      backgroundColor: 'white',
      top: Constants.statusBarHeight,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
      marginTop:50,
      paddingTop:30,
      backgroundColor: "white",
      borderRadius:20,
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
    Btn:{
        flexDirection:'row'
     },
    upBtn:{
        marginTop:20,
        marginBottom:20,
      },
    
      upbutton: {
        width: 80,
        height: 30,
        marginLeft: 45,
        backgroundColor: "orange",
        borderRadius: 15,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 50,
        elevation: 5,
      },
      uptext: {
        marginTop: 2,
        padding: 2,
        //marginLeft: 40,
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    
      },
      delBtn:{
        // margin:12,
        marginTop:20,
        marginBottom:20,
      },
    
      delbutton: {
        width: 80,
        height: 30,
        //marginTop: 8,
        marginLeft: 60,
        backgroundColor: "red",
        borderRadius: 15,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 50,
        elevation: 5,
      },
    
      deltext: {
        marginTop: 2,
        padding: 2,
        //marginLeft: 40,
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    
      },

  });

export default BusServiceDetails;