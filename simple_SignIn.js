
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
export default class New1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      <View style={{height:50,backgroundColor:'#845EC2'}}>
        <Text style={{color:"#FFF",fontSize:20,marginTop:10,marginLeft:20,fontWeight:'bold'}}>SIGN IN</Text>
      </View>
        <View style={{ flex: 1  }}>
 
<TextInput style={styles.textStyle}
placeholder={"Enter your email address "}/>
<TextInput style={styles.textStyle}
placeholder={"Enter your password"}/>
        <TouchableOpacity style={ {height:50,width:250,backgroundColor:'#845EC2',margin:30,marginLeft:55,borderRadius:10}}
           onPress={
            ()=>{this.props.navigation.navigate("Task_n3")}
      } >
            <Text style={{alignSelf:'center',marginTop:10,fontSize:20,color:'#fff',fontWeight:'bold'}}>SIGN IN </Text>
          </TouchableOpacity >
        </View>
      </>
    )
  }
}
const styles =StyleSheet.create({
  textStyle:{height:40,width:300,borderWidth:2,borderColor:'#845EC2',marginLeft:30,marginTop:20,borderRadius:10,padding:5}

})