import React, { useState, useRef } from "react";
import { 
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    } from "react-native";
import {Fantawesome5} from '@expo/vector-icons';


export default function BusPick({route}){

    return(
        <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
            <Text>{route.params.distance}</Text>
            <Text>{route.params.duration}</Text>
        </View>
    )

}
