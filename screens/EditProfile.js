import React, { useState, useEffect }  from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import { 
     ScrollView,
     ImageBackground, 
     Dimensions, 
     Image, 
     View, 
     StyleSheet,
     TouchableOpacity,
    } from "react-native";
import SelectList from 'react-native-dropdown-select-list';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({navigation}) => {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Phone, setPhone] = useState("");
    const [PassportNo, setPassport] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType ] = useState("");
    const [NIC,setNIC] = useState("");
    const [Address,setAddress] = useState("");
    
    
  
useEffect(() => {
    getData();
    loadData();
  },[Email,type])
  
  const loadData = () =>{
    axios.get(`http://172.28.11.148:8070/traveller/getTraveller/${type}/${Email}`).then((response)=>{
      console.log(response.data);
      setName(response.data.Name);
      setPhone(response.data.Phone);
      setAddress(response.data.Address);
      setNIC(response.data.NIC);
      setEmail(response.data.Email);
      setPassword(response.data.Password);
      console.log(Address);
  
    })
  
  }

           
    const handleSubmit = async () => {

        setLoading(true)

        if(!Email || !Password || !Phone || !Address || !NIC) {
          alert("all Field are required");
          setLoading(false);
          return;
        }
        const updateLocal = {
            Name,
            Address,
            Phone,
            Email,
            NIC,
        }
    
        axios.put(`http://172.28.11.148:8070/traveller/updateTraveller/${type}/${Email}`,updateLocal).then((response)=>{
            alert("Local Passenger Details Updated Successfully!");
            navigation.navigate("Profile")
        }).catch((err)=>{
            console.log(err)
            alert("Error occured !");
        });
    
    }
    const getData = async () =>{
        try{
            const email = await AsyncStorage.getItem('Email')
            const password = await AsyncStorage.getItem('Password')
            const type = await AsyncStorage.getItem('type')

            if(email!==null){
                setEmail(email)
            }
            if(password!==null){
                setPassword(password)
            }
            if(type!==null){
                setType(type)
            }
     
        } catch(e){

        }
     }  

    return(

    <ScrollView style={{flex:1,backgroundColor:"#FFFFFF"}} showsVerticalScrollIndicator ={false}>
    <ImageBackground source = { require('../assets/background2.jpg')}
    style = {{
        height: Dimensions.get('window').height/2.5,

    }}> 
    <View style= {{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source= {require('../assets/location.png')}/>
        <Text style = {styles.brandViewText}>Trip Me </Text>
    </View>
        
    </ImageBackground>
    <View style = {styles.bottomView}>
        <View style = {{ padding:40}}>
            <Text style = {{color:'#0047AB',fontSize:30,fontWeight:"bold"}}>Edit Profile</Text>
                
           <View style= {{marginTop:30}}>
                
                <UserInput name="Name" value={Name} setValue={setName}  autoCorrect={false} />
                <UserInput name="Email" value={Email} setValue={setEmail} autoCompleteType = "email" keyBoardType ="email-address" />
                <UserInput name="NIC" value={NIC} setValue={setNIC} />
                <UserInput name="Address" value={Address} setValue={setAddress} />
                <UserInput name="Phone" value={Phone} setValue={setPhone} />
                <UserInput name="Password" value={Password} setValue={setPassword} autoCompleteType = "password" secureTextEntry = {true}/>
                   </View>
           </View>
           
           <View style= {{marginTop:30}}>
           <TouchableOpacity
            style = {{
                backgroundColor: "#260B8C",
                height: 50,
                marginBottom:20,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 100,
                borderRadius: 24,

            }} onPress={handleSubmit}>
                <Text bold medium center style = {{ color: 'white',fontSize:20,}}>
                Submit
                </Text>
            </TouchableOpacity>
           
            </View>
                
           
        </View>

 

    </ScrollView>

    );

};

const styles = StyleSheet.create({
    brandViewText:{
        color:'#FFFFFF',
        fontSize:40,
        fontWeight: 'bold',
    },
    bottomView:{

        flex:1.5,
        bottom:40,
        backgroundColor: '#FFFFFF',
        borderTopStartRadius: 30,
        borderTopEndRadius:30,

    }
});

export default EditProfile;