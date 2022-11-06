import React from 'react';
import {View ,TextInput} from 'react-native';
import Text from '@kaloraat/react-native-text';

const UserInput = ({ name, value, setValue}) => {

    return (
        <View style = {{ marginHorizontal: 30}}>
        <Text semi style = {{
            fontSize:15,
            fontWeight: 'bold',
        }}>{name} </Text>
        <TextInput
        style= {{
            backgroundColor: '#ffffff',
            borderRadius:15,
            height: 48,
            marginBottom: 10,
            marginTop:10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
            fontSize:13,

            elevation: 17,

        }}

        value = {value}
        onChangeText = {(text) => setValue(text)}

        />

        

        </View>
    );
};

export default UserInput;