import {View,
        Text,
        StyleSheet,
        RefreshControl,
        ScrollView,
        TouchableOpacity,
        Modal } from 'react-native'
import Swipeable from 'react-native-gesture-handler';
import React , {useState, useEffect} from 'react';
import axios from 'axios';
import Constants from "expo-constants";
import BusServiceDetails from './BusServiceDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BusPick({route}) {


    const [busList, setBusList] =useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [id, setId] = useState("");
    const [duration, setDuration] = useState(null);
    const [pick, setPick] = useState(null);
    const [drop, setDrop] = useState(null);
    const [dataobj,setdDataobj] = useState({});
 
    const onRefresh = React.useCallback(() => {

        setRefreshing(true);

        wait(500).then(() => setRefreshing(false));

        axios.get(`http://192.168.1.23:8070/busService/allBusServices`).then((res) => {            
                setBusList(res.data);
        }).catch((err) => {
            alert("error", err);

        })

    }, []);

    useEffect(() => {
        setData();
        axios.get(`http://192.168.1.23:8070/busService/allBusServices`).then((res) => {            
                setBusList(res.data);
        }).catch((err) => {
            alert("error", err);

        })
    }, [])

    const setData = () =>{
        try{
            const duration =  route.params.distance;
            const pick =  route.params.pick;
            const drop = route.params.drop;
            let dataobj = {
                duration : duration,
                pick : pick,
                drop : drop,
            }
            setdDataobj(dataobj);
            if(duration!==null){
                setDuration(duration)
                console.log(duration);
            }
            if(pick!==null){
                setPick(pick)
                console.log(pick);
            }
            if(drop!==null){
                setDrop(drop)
                console.log(drop);
            }
            if(Email || Password || type) {
                    AsyncStorage.setItem('duration',duration);
                    AsyncStorage.setItem('pick',pick);
                    AsyncStorage.setItem('drop',drop);
              }
                    

     
        } catch(e){

        }
     }  

    const list = () => {
        return busList.map((element) => {
            return (
            <View key={element._id}>
        
        
        
            <TouchableOpacity
                        onPress={() => { setId(element._id), setModalData(element) ,setModalVisible(true) }}
                        >

                <View style={[styles.itemList,styles.elevation]}>
        
                
                <Text style={styles.titleID}>{element.BusServiceName}</Text>
                {/* <View style={styles.fuellist}> */}
                <View style={styles.location}>
                <Text style={styles.titleData}>{element.BusType}</Text>
                {/* </View> */}
                </View>
        
                <View style={styles.list3}>
                <Text style={styles.list}>From    </Text>
        
                <View style={styles.fuellist}>
                <Text style={styles.time}>From :  </Text>
                <Text style={styles.list1} > {element.DepartureTime} </Text>
                <Text style={styles.time}>To :  </Text>
                <Text  style={styles.list1}>{element.JourneyTime} </Text>
                </View>
                </View>
            
            
            
                </View>
            </TouchableOpacity>
            
            </View>
                )
                })
            }

            
    return (
        <View style ={styles.body}>
                    
            <ScrollView
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                    }
                    >
                <View style={{ flex: 1, paddingTop: 20 }}>
                <Text style={styles.header}>
                                Bus Service Details
                            </Text>
                    <View>{list()}</View>

                </View>


                <Modal

                    animationType="slide"

                    transparent={true}

                    onHide={() => setModalVisible(false)}





                    visible={modalVisible}

                    onRequestClose={() => {

                        // Alert.alert("Modal has been closed.");

                        setModalVisible(false);

            }}

            >

            <BusServiceDetails

                locationData={dataobj}

                data={modalData}

                onHide={() => setModalVisible(false)}

                refresh ={onRefresh}

            />



            </Modal>

            </ScrollView>


                {/* <Text >Fuel Details</Text> */}
                </View>
        )
        }
    
       



const styles = StyleSheet.create({
    body: {
        // alignItems: 'center',
        paddingTop: 50,
        margin:12,
      
       
    },

    header:{
        textAlign: 'left',
        fontSize: 40,
        marginLeft:15,
    },

    titleData: {
        color:'#75CEFF',
        fontSize: 18,
        fontWeight:'bold',
        marginLeft: 0,

    },

    titleID: {

        fontWeight: 'bold',
        color:'white',
        fontSize: 20,

    },

    itemList: {

        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "#111B34",
        borderRadius: 10,
        marginLeft: 17,
        borderColor: "#D8D8D8",
        borderWidth: 0.5,
        top: Constants.statusBarHeight,

    },

    elevation: {

        shadowColor: "Black",
        elevation: 2,

    },

    fuellist: {
       
        // marginTop:5,
        marginLeft:30,
        flexDirection : "row",
        alignItems : 'flex-start'
        // justifyContent: "center",
    },

    location :{
        flexDirection : "row",
        alignItems:"flex-end"
    },

    time:{
        fontWeight:'bold',
        color:'white'
    },


    list:{
        fontWeight:'bold',
        color:'white'
    },

    list1:{
        color:'#F2CD41'
    },

    list3 :{
        marginTop : 5,
    },
})

// export default BusPick;