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

const Login = ({navigation}) => {

    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = async () => {

        setLoading(true)
    
        if(!Name || !PassportNo) {
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
    
          });
    
         console.log("Sign In Success => ", data)
    
        }catch (err){
        console.log(err)
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
                
                   <UserInput  name="Name" value={Name} setValue={setName}  />
                   <UserInput  name="Password" value={Password} setValue={setPassword}  />

           </View>
           <View style = {{ flex:1,marginHorizontal:50,marginTop:10}}>

                <Text style = {{ fontSize:20, }}>
                    Forget Password ?
                    <Text style = {{ fontSize:20,fontWeight:'regular',color:'red'}}>
                    {'   '}
                        Reset
                    </Text>
                </Text>

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

            }}>
                <Text bold medium center style = {{ color: 'white',fontSize:20,}}>
                Submit
                </Text>
            </TouchableOpacity>
            </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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