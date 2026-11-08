import React, {} from "react";
import {StyleSheet, View} from "react-native";
import { Picker } from "@react-native-picker/picker";

export function PickerItem() {
    return(
       <Picker>
            <Picker.Item value="BTC" key={0} label="BTC" />
       </Picker>
    );
};

const styles = StyleSheet.create({
    
})
