import React from 'react';
import {View ,TextInput} from 'react-native';
import Text from '@kaloraat/react-native-text';

const SubmitButton = ({ name, value, setValue}) => {

    return (
        <View style = {{ marginLeft:40,}}>
        <Text semi>{name} </Text>
        <TextInput
        style= {{
            borderBottomWidth: 0.5,
            height: 48,
            borderBottomColor: "#8e93a1",
            marginBottom: 20,
  
        }}

        value = {value}
        onChangeText = {(text) => setValue(text)}

        />

        

        </View>
    );
};

export default SubmitButton;