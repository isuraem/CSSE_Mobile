import React, { useState } from "react";
import { 
  ScrollView,
  ImageBackground, 
  Dimensions, 
  Image, 
  View, 
  StyleSheet,
  TouchableOpacity,
  
 } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const Signup = ({navigation}) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [PassportNo, setPassport] = useState("");
  const [loading, setLoading] = useState(false);
  // 192.168.1.23
  const handleSubmit = async () => {

    setLoading(true)

    if(!Name|| !Email || !Phone || !PassportNo || !Password) {
      alert("all Field are required");
      setLoading(false);
      return;
    }
    try{

      const {data}= await axios.post("http://192.168.1.23:8070/traveller/addForeignT",{
        Name,
        Email,
        Phone,
        PassportNo,
        Password,

      });

     console.log("Sign In Success => ", data)

    }catch (err){
    console.log(err)
    } 
  }

  return (


    
    <KeyboardAwareScrollView style={{flex:1,backgroundColor:"#FFFFFF"}} >
        <ImageBackground source = { require('../assets/background2.jpg')}
        style = {{
            height: Dimensions.get('window').height/2.7,

        }}> 
            <View style= {{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Image source= {require('../assets/location.png')}/>
                <Text style = {styles.brandViewText}>Trip Me </Text>
            </View>
            
        </ImageBackground>
        <View style = {styles.bottomView}>
            <View style = {{ padding:25}}>
              <View style = {{justifyContent:'center',alignItems:'center'}}>
              <Text style = {{color:'#0047AB',fontSize:30,fontWeight:"bold"}}>Sign Up</Text>
              </View>
              <View style = {{ flex:1,flexDirection:"row",marginTop:10,justifyContent:'center'}}>
                  <TouchableOpacity disabled={true}
                        style = {{
                            backgroundColor: "#260B8C",
                            height: 30,
                            marginBottom:20,
                            justifyContent:'center',
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            paddingLeft:20,
                            paddingRight:20,
                            borderLeftColor:'white',
                            

                        }}>
                            <Text bold medium center style = {{ color: 'white',fontSize:15,}}>
                            Foreign
                            </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                        style = {{
                            backgroundColor: "#260B8C",
                            height: 30,
                            marginBottom:20,
                            paddingLeft:20,
                            paddingRight:20,
                            justifyContent:'center',
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            borderLeftColor:'white',

                        }} >
                            <Text bold medium center style = {{ color: 'white',fontSize:15,}} onPress = { () => navigation.navigate("Signuplocal")}>
                            Local
                            </Text>
                    </TouchableOpacity>
              </View>
              
              <View style= {{marginTop:5}}>
                    
                <UserInput name="Name" value={Name} setValue={setName}  autoCorrect={false} />
                <UserInput name="Email" value={Email} setValue={setEmail} autoCompleteType = "email" keyBoardType ="email-address" />
                <UserInput name="Passport" value={PassportNo} setValue={setPassport} />
                <UserInput name="Phone" value={Phone} setValue={setPhone} />
                <UserInput name="Password" value={Password} setValue={setPassword} autoCompleteType = "password" secureTextEntry = {true}/>

              </View>
              
                <View style= {{marginTop:20}}>
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
                  
              <View style= { {flex:1,marginHorizontal:50} }>
                <Text style = {{ fontSize:15}}>Already have an account?
                <Text style = {{ fontSize:20,fontWeight:'regular',color:'red'}} onPress = { () => navigation.navigate("Login")}>
                    {'   '}
                        Login
                    </Text>
                </Text>
              </View>
              
            </View>

        </View>

    </KeyboardAwareScrollView>
    
     
    //  <View style={{flex:1,justifyContent:"center"}} >
   
    //   <Text title center style={{ marginBottom: 5}}>
    //     Sign Up
    //   </Text>

    //   <UserInput name="Name" value={name} setValue={setName}  autoCorrect={false} />
    //   <UserInput name="Email" value={email} setValue={setEmail} autoCompleteType = "email" keyBoardType ="email-address" />
    //   <UserInput name="Passport" value={passport} setValue={setPassport} />
    //   <UserInput name="Phone" value={phone} setValue={setPhone} />
    //   <UserInput name="Password" value={password} setValue={setPassword} autoCompleteType = "password" secureTextEntry = {true}/>
      
    //   <TouchableOpacity
    //    style = {{
    //     backgroundColor: "#2F00E0",
    //     height: 50,
    //     marginBottom:20,
    //     justifyContent: "center",
    //     alignItems:"center",
    //     marginHorizontal: 150,
    //     borderRadius: 24,

    //    }}>
    //     <Text bold medium center style = {{ color: 'white' }}>
    //       Submit
    //     </Text>
    //   </TouchableOpacity>
    
    
    //   </View>
     


    
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

// const style = StyleSheet.create({
//   signupContainer : {
//     marginTop: 30,
//     flex:1,
//     backgroundColor: '#e3e34d',
//     borderRadius: 30,
//     marginBottom:10
    


//   }
// })

export default Signup;
