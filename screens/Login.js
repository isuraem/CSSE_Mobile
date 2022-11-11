import React, { useState }  from "react";
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

const Login = ({navigation}) => {

    const [selected, setSelected] = React.useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [login,setLogin] = useState("");
    const [type,setType] = useState("");
    const [loading, setLoading] = useState(false);
    // const [TravelId,setTravelId] = useState("");
    // const [CusName,setCusName] = useState("");
    // const [Phone,setPhone] = useState("");
    
    const data = [{key:'LocalTraveller',value:'LocalTraveller'},
                  {key:'ForeignTraveller',value:'ForeignTraveller'}  ];

     const storetype = () =>{
        setType(selected);
        console.log(type)
     }         
    const handleSubmit = async () => {

        setLoading(true)

        if(!Email || !Password || !type) {
          alert("all Field are required");
          setLoading(false);
          return;
        }
       
            axios.get(`http://192.168.1.23:8070/traveller/getUser/${Email}/${Password}/${type}`).then((response)=>{
                console.log("data",response.data);
                setLogin(response.data.login);
                // setTravelId(response.data.login._id);
                // setCusName(response.data.login.Name);
                // setPhone(response.data.login.Phone);

                if(response.data.login === null){
                    alert("User not available")
                }else{
                    alert("Success!");
                    AsyncStorage.setItem('Email',Email);
                    AsyncStorage.setItem('Password',Password);
                    AsyncStorage.setItem('type',type);
                    // AsyncStorage.setItem('TravelId',TravelId);
                    // AsyncStorage.setItem('CusName',CusName);
                    // AsyncStorage.setItem('Phone',Phone);
                    navigation.navigate("Profile")
                }
    
            }).catch((err)=>{
                alert(err.response.data.error)
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
        <View style = {{ padding:25}}>
            <Text style = {{color:'#0047AB',fontSize:30,fontWeight:"bold"}}>Welcome</Text>
                <Text style = {{fontSize:20}}>Don't have an account ?
                    <Text style = {{fontSize:20,color:'red',marginLeft:10}} onPress = { () => navigation.navigate("Signup")}>
                    { '  '}
                        Register 
                    </Text>
            </Text>
           <View style= {{marginTop:30}}>
                
                   <UserInput  name="Email" value={Email} setValue={setEmail}  />
                   <UserInput  name="Password" value={Password} setValue={setPassword}  />
                   <View style= {{marginHorizontal:30,marginTop:15}}>
                   <SelectList setSelected={setSelected} data={data} onSelect={() => storetype()}/>
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
            <View style = {{ 
            flex:1,
            marginHorizontal:30,
            marginTop:10,
           }}>

                <Text style = {{ fontSize:20, }}>
                    Forget Password ?
                    <Text style = {{ fontSize:20,fontWeight:'regular',color:'red'}}>
                    {'   '}
                        Reset
                    </Text>
                </Text>

           </View>
            </View>
                <View style={{flexDirection: 'row', alignItems: 'center',marginTop:20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                        <View>
                            <Text style={{width: 50, textAlign: 'center'}}>or</Text>
                        </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>
                  
           
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

export default Login;