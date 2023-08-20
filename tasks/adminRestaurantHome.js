/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import * as  React from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, ActivityIndicator, Dimensions, I18nManager, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import StarRating from 'react-native-star-rating'
import axios from 'axios'
import NetInfo from "@react-native-community/netinfo"
import { color, backgroundColor, emptyStarColor, fullStarColor } from '../tasks/Colors'
import * as ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get('screen');

export default class adminRestaurantHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant: [

            ],
            // , loading: true,
            // network: false,
            Modalvisible1: false,
            Modalvisible2: false,
            Modalvisible3: false,
            img: '',
            restaurantName: '',
            restaurantAddress: '',
            restaurantTelephone: '',
            restaurantWhatsapp: '',
            restaurantWorkHours: '',
            restaurantFacebook: '',
            restaurantType: '',
            restaurantDescription: 'مهمتنا هي جعل العملاء سعداء. مهمتنا هي مشاركة الوصفات الأصلية اللذيذة مع معكم',
            restaurantShow: '1',
            restaurant_starCount: '0',
            // restaurant_imgSwiper: [
            // ],
            ModalData: '',



            edit_item_name: '',
            edit_item_address: '',
            edit_item_index: '',
            edit_item_phone: '',
            edit_item_whats: '',
            edit_item_hours: '',
            edit_item_facebook: '',
            edit_item_type: '',
            edit_item_image: '',

        }
    }


    async componentDidMount() {

        this.requestCameraPermission()
        this.getdata()


    }


    addItem() {
        let dataToSend = {

            restaurant_name: this.state.restaurantName,
            restaurant_description: this.state.restaurantDescription,
            restaurant_starCount: this.state.restaurant_starCount,
            restaurant_show: this.state.restaurantShow,
            restaurant_mobileNumber: this.state.restaurantTelephone,
            restaurant_link: this.state.restaurantFacebook,
            restaurant_active: this.state.restaurantWorkHours,
            restaurant_address: this.state.restaurantAddress,
            restaurant_type: this.state.restaurantType,
            restaurant_image: this.state.img,
            restaurant_whatsapp: this.state.restaurantWhatsapp,

        }
        axios.post("http://192.168.1.2/api/InsertRestaurant.php", dataToSend).then(
            res => {
                console.log(res.data);
                if (res.data == "Success") {
                    alert('Your restaurant Added Successfully ✔');
                } else if (res.data == "Error") {
                    alert('حدث خطأ ما');
                }
            }
        )

    }


    // cancel(index) {
    //     console.log(index)
    //     let newArray = this.state.restaurant
    //     let restaurant_id = newArray[index].restaurant_id;
    //     let dataToSend = {
    //         restaurant_id: restaurant_id
    //     }
    //     axios.post("http://192.168.1.2/api/DeleteRestaurant.php", dataToSend).then(res => {
    //         console.log(res.data)
    //         if (res.data == "success") {
    //             newArray.splice(index, 1)
    //             this.setState({ restaurant: newArray })
    //         } else if (res.data == "Error") {
    //             alert("حدث خطأ ما")
    //         } else {
    //             alert("restaurant Not Found..!");
    //         }
    //     })
    // }

    // edits() {
    //     let arr = this.state.restaurant;
    //     let dataToSend = {
    //         restaurant_id: arr.restaurant_id,
    //         restaurant_name: arr.restaurant_name,
    //         restaurant_mobileNumber: arr.restaurant_mobileNumber,
    //         restaurant_link: arr.restaurant_link,
    //         restaurant_active: arr.restaurant_active,
    //         restaurant_address: arr.restaurant_address,
    //         restaurant_type: arr.restaurant_type,
    //         restaurant_image: arr.restaurant_image,
    //         restaurant_whatsapp: arr.restaurant_whatsapp,

    //     }
    //     axios.post("http://192.168.1.2/api/UpdateRestaurant.php", dataToSend).then(
    //         res => {
    //             console.log(res.data);
    //             if (res.data == "Success") {
    //                 alert(' Successfully ');
    //             } else if (res.data == "Error") {
    //                 alert('error');
    //             } else {
    //                 alert("restaurant not found");
    //             }
    //         }
    //     )
    //     this.setState({ restaurant: arr });
    // }


    getdata() {
        axios.get('http://192.168.1.2/api/SelectRestaurant.php').then(res => {
            if (res.status == 200) {
                if (res.data != "error") {
                    if (Array.isArray(res.data)) {
                        if (res.data.length == 0) {
                            this.setState({ res_data: "empty" })

                        } else {
                            this.setState({ res_data: "have_data", restaurant: res.data })

                        }
                    }
                } else {
                    this.setState({ res_data: "error" })
                }

            }
        })
    }









    select_first_photo() {



        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
            // console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                this.setState({
                    img: res.uri
                });
                // console.log(res)
            }
        });


    }

    delete(index) {
        let arr = this.state.restaurant
        arr.splice(index, 1)
        this.setState({ restaurant: arr })
    }


    edit(index) {
        let arr = this.state.restaurant
        this.setState({
            edit_item_index: index,
            edit_item_name: arr[index].restaurantName,
            edit_item_address: arr[index].restaurantAddress,
            edit_item_phone: arr[index].restaurantTelephone,
            edit_item_whats: arr[index].restaurantWhatsapp,
            edit_item_hours: arr[index].restaurantWorkHours,
            edit_item_facebook: arr[index].restaurantFacebook,
            edit_item_type: arr[index].restaurantType,
            edit_item_image: arr[index].restaurantImage
        })
        this.setState({ restaurant: arr })
    }

    update() {
        let arr = this.state.restaurant
        arr[this.state.edit_item_index].restaurantName = this.state.edit_item_name
        arr[this.state.edit_item_index].restaurantAddress = this.state.edit_item_address
        arr[this.state.edit_item_index].restaurantTelephone = this.state.edit_item_phone
        arr[this.state.edit_item_index].restaurantWhatsapp = this.state.edit_item_whats
        arr[this.state.edit_item_index].restaurantWorkHours = this.state.edit_item_hours
        arr[this.state.edit_item_index].restaurantFacebook = this.state.edit_item_facebook
        arr[this.state.edit_item_index].restaurantType = this.state.edit_item_type
        arr[this.state.edit_item_index].restaurantImage = this.state.edit_item_image

        this.setState({
            restaurant: arr
        })
    }



    addNewRestaurant() {
        let arr = this.state.restaurant
        if (this.state.restaurantName != '' && this.state.restaurantAddress != '' && this.state.restaurantType != ''
            && this.state.img != '' && this.state.restaurantTelephone != '' && this.state.restaurantWhatsapp != ''
            && this.state.restaurantFacebook != '' && this.state.restaurantWorkHours != '') {
            let newObj = {
                restaurantName: this.state.restaurantName,
                restaurantType: this.state.restaurantType,
                restaurantAddress: this.state.restaurantAddress,
                restaurantImage: this.state.img,
                restaurantFacebook: this.state.restaurantFacebook,
                restaurantWorkHours: this.state.restaurantWorkHours,
                restaurantTelephone: this.state.restaurantTelephone,
                restaurantWhatsapp: this.state.restaurantWhatsapp
            }
            arr.push(newObj)
            this.setState({
                restaurant: arr, Modalvisible1: false, restaurantName: '', restaurantType: '', restaurantAddress: '',
                img: '', restaurantTelephone: '', restaurantWhatsapp: '', restaurantWorkHours: '', restaurantFacebook: ''
            })
        } else {
            null
        }
    }







    onStarRatingPress(rating, index) {
        let newstar = this.state.restaurant
        newstar[index].restaurant_starCount = rating
        this.setState({
            restaurant: newstar
        });
    }

    render() {
        return (
            <>

                <View
                    style={{
                        backgroundColor: color,
                        flex: 1,
                        width: width
                    }}
                >
                    {/* header */}

                    <StatusBar
                        backgroundColor={color} />
                    <View style={{
                        width: '100%',
                        alignItems: 'center', justifyContent: 'center', backgroundColor: color, height: height * .13,
                        marginBottom: 15
                    }}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: backgroundColor,
                            marginTop: 5
                        }}>المطاعم</Text>
                    </View>


                    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -35, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                        <ScrollView style={{ marginTop: '1%' }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: "1%", marginBottom: width * 0.5, marginRight: '1%' }}>
                                {this.state.restaurant.map((add, index) => (
                                    <>

                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor: backgroundColor,
                                                marginTop: 15,
                                                borderRadius: 15,
                                                width: '45%',
                                                elevation: 2,
                                                marginLeft: 13
                                            }}
                                        >

                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    this.setState({ Modalvisible2: true, ModalData: add })

                                                }}

                                            >
                                                <View >
                                                    <View>
                                                        <Image source={{ uri: add.restaurantImage }}
                                                            style={{
                                                                width: '100%',
                                                                height: 90,
                                                                borderTopRightRadius: 15,
                                                                borderTopLeftRadius: 15,
                                                            }} />
                                                        <TouchableOpacity
                                                            onPress={
                                                                () => {
                                                                    this.setState({ Modalvisible2: false })
                                                                    this.delete(index)
                                                                    // this.cancel(index)
                                                                }
                                                            }
                                                            style={{
                                                                width: width * 0.1,
                                                                height: 40,
                                                                borderRadius: 45,
                                                                backgroundColor: backgroundColor,
                                                                alignSelf: 'center',
                                                                marginTop: width * -0.25,
                                                                //borderWidth:1,
                                                                //borderColor:'#000',
                                                                marginBottom: width * 0.06,
                                                                marginRight: width * 0.3
                                                            }}
                                                        >


                                                            <Icon name='trash' size={20} style={{
                                                                alignSelf: 'center',
                                                                marginTop: width * 0.03,
                                                                color: '#f00'
                                                            }}></Icon>



                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={
                                                                () => {
                                                                    this.setState({ Modalvisible3: true })
                                                                    this.edit(index)
                                                                }
                                                            }
                                                            style={{
                                                                width: width * 0.1,
                                                                height: 40,
                                                                borderRadius: 45,
                                                                backgroundColor: backgroundColor,
                                                                alignSelf: 'center',
                                                                marginTop: width * -0.17,
                                                                //borderWidth:1,
                                                                //borderColor:'#000',
                                                                marginBottom: width * 0.13,
                                                                marginLeft: width * 0.3
                                                            }}
                                                        >

                                                            <Icon name='edit' size={20} style={{
                                                                alignSelf: 'center',
                                                                marginTop: width * 0.025,
                                                                color: "#000"
                                                            }}></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{
                                                            fontSize: 19,
                                                            fontWeight: '800',
                                                            color: "#333"

                                                        }}>{add.restaurantName}</Text>
                                                        <Text style={{
                                                            fontSize: 18,
                                                            color: '#9B9A9B'
                                                            , alignSelf: 'center'
                                                        }}>{add.restaurantType}</Text>
                                                        <Text style={{
                                                            fontSize: 18,
                                                            color: '#9B9A9B'
                                                            , alignSelf: 'center'
                                                        }}>{add.restaurantAddress}</Text>

                                                        <View
                                                            style={{
                                                                alignSelf: 'center',
                                                                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
                                                            }}
                                                        >
                                                            <StarRating
                                                                emptyStarColor={emptyStarColor}
                                                                fullStarColor={fullStarColor}
                                                                starSize={20}
                                                                disabled={false}
                                                                maxStars={5}
                                                                rating={0}
                                                                animation='flash'
                                                                selectedStar={(rating) =>
                                                                    this.onStarRatingPress(rating, index)}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                    </>
                                ))}

                                <View

                                    style={{
                                        backgroundColor: backgroundColor,
                                        marginTop: 15,
                                        borderRadius: 15,
                                        width: '45%',
                                        elevation: 2,
                                        marginLeft: 13
                                    }}
                                >

                                    <TouchableOpacity

                                        onPress={() => {
                                            this.setState({ Modalvisible1: true })

                                        }}
                                        style={{ height: width * 0.52 }}
                                    >
                                        <View
                                            style={{
                                                width: '30%',
                                                height: 50,
                                                borderRadius: 25,
                                                alignSelf: 'center',
                                                marginTop: width * 0.18,
                                                borderColor: color,
                                                borderWidth: 1.5
                                            }}
                                        >
                                            <Icon name='plus' style={{ alignSelf: 'center', marginTop: width * 0.04, color: color }} size={19}></Icon>
                                        </View>

                                    </TouchableOpacity>

                                </View>



                            </View>
                        </ScrollView>
                    </View>
                </View>
                <Modal
                    visible={this.state.Modalvisible1}
                    onRequestClose={
                        () => {
                            this.setState({ Modalvisible1: false })
                        }
                    }
                >

                    <View
                        style={{
                            backgroundColor: color,
                            flex: 1,
                            width: width
                        }}
                    >
                        {/* header */}

                        <StatusBar
                            backgroundColor={color} />
                        <View style={{
                            width: '100%',
                            alignItems: 'center', justifyContent: 'center', backgroundColor: color, height: height * .13,
                            marginBottom: 5
                        }}>
                            <Text style={{
                                fontSize: 19,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: backgroundColor,
                                // marginTop: 5
                            }}>اضافة مطعم</Text>
                        </View>


                        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -30, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                            <ScrollView style={{ marginTop: '1%' }}>
                                <TouchableOpacity
                                    // key={index}
                                    onPress={() => {
                                        this.select_first_photo()
                                    }}
                                // style={{ height: width * 0.52 }}
                                >
                                    <View
                                        style={{
                                            width: width * 0.9,
                                            height: width * 0.45,
                                            borderRadius: 35,
                                            // backgroundColor: '#f0f',
                                            alignSelf: 'center',
                                            marginTop: 5,
                                            borderColor: (this.state.img == '') ? '#eee' : '#fff',
                                            borderWidth: 1.5,

                                        }}
                                    >
                                        {this.state.img == '' ?
                                            (<Icon name='plus' style={{ alignSelf: 'center', marginTop: width * 0.17 }} size={25}></Icon>)
                                            :
                                            (<Image source={{ uri: this.state.img }}
                                                style={{
                                                    width: width * 0.9,
                                                    height: width * 0.45,
                                                    borderRadius: 35,
                                                }}
                                                resizeMode='cover'
                                            ></Image>
                                            )
                                        }
                                    </View>

                                </TouchableOpacity>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>اسم المطعم</Text>
                                <TextInput
                                    placeholder='اسم المطعم'
                                    placeholderTextColor='#ddd'
                                    // keyboardType='email-address'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee',
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantName}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantName: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>العنوان</Text>
                                <TextInput
                                    placeholder='العنوان'
                                    placeholderTextColor='#ddd'
                                    // keyboardType='email-address'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee',
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantAddress}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantAddress: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>رقم الهاتف</Text>
                                <TextInput
                                    placeholder='رقم الهاتف'
                                    placeholderTextColor='#ddd'
                                    keyboardType='number-pad'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee'
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantTelephone}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantTelephone: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>رقم الواتساب</Text>
                                <TextInput
                                    placeholder='رقم الواتساب'
                                    placeholderTextColor='#ddd'
                                    keyboardType='number-pad'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee'
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantWhatsapp}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantWhatsapp: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>مواعيد العمل</Text>
                                <TextInput
                                    placeholder='مواعيد العمل'
                                    placeholderTextColor='#ddd'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee'
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantWorkHours}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantWorkHours: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 22,
                                    fontWeight: 'bold'
                                }}>لينك الفيسبوك</Text>
                                <TextInput
                                    placeholder='لينك الفيسبوك'
                                    placeholderTextColor='#ddd'
                                    keyboardType='email-address'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee',
                                        // marginBottom: width * 0.05
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantFacebook}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantFacebook: value })
                                    }}
                                ></TextInput>
                                <Text style={{
                                    marginTop: width * 0.06,
                                    marginLeft: 23,
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>نوع المطعم</Text>
                                <TextInput
                                    placeholder='نوع المطعم'
                                    placeholderTextColor='#ddd'
                                    // keyboardType='email-address'
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        color: '#000',
                                        padding: 15,
                                        borderRadius: 17,
                                        // borderWidth: 1.5,
                                        // borderColor: '#eee',
                                        marginBottom: width * 0.05,
                                        elevation: 3
                                    }}
                                    value={this.state.restaurantType}
                                    onChangeText={(value) => {
                                        this.setState({ restaurantType: value })
                                    }}
                                ></TextInput>

                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.addItem()
                                            this.addNewRestaurant()

                                        }
                                    }
                                    style={{
                                        width: width * 0.3,
                                        height: 53,
                                        borderRadius: 40,
                                        backgroundColor: color,
                                        alignSelf: 'center',
                                        // marginTop: 60,
                                        //borderWidth:1,
                                        //borderColor:'#000',
                                        marginBottom: width * 0.06
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textAlign: 'center',
                                        marginTop: 15,
                                        //marginLeft:30
                                    }}>اضافه</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>


                </Modal>
                <Modal
                    visible={this.state.Modalvisible2}
                    onRequestClose={
                        () => {
                            this.setState({ Modalvisible2: false })
                        }
                    }
                >
                    <StatusBar
                        backgroundColor={color} />
                    <View style={{
                        width: '100%',
                        alignItems: 'center', justifyContent: 'center', backgroundColor: color, height: height * .13,
                        marginBottom: 5
                    }}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: backgroundColor,
                            // marginTop: 5
                        }}>بيانات المطعم</Text>
                    </View>


                    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -30, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                        <ScrollView style={{ marginTop: '1%' }}>



                            <View
                                style={{
                                    width: width * 0.9,
                                    height: width * 0.45,
                                    borderRadius: 35,
                                    // backgroundColor: '#f0f',
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    borderColor: (this.state.img == '') ? '#eee' : '#fff',
                                    borderWidth: 1.5
                                }}
                            >
                                <Image source={{ uri: this.state.ModalData.restaurantImage }}
                                    style={{
                                        width: width * 0.9,
                                        height: width * 0.45,
                                        borderRadius: 35,
                                    }}
                                    resizeMode='cover'
                                ></Image>

                            </View>


                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>اسم المطعم</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}


                                >{this.state.ModalData.restaurantName}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>العنوان</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}


                                >{this.state.ModalData.restaurantAddress}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>رقم الهاتف</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}


                                >{this.state.ModalData.restaurantTelephone}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>رقم الواتساب</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}


                                >{this.state.ModalData.restaurantWhatsapp}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>مواعيد العمل</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}

                                >{this.state.ModalData.restaurantWorkHours}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>لينك الفيسبوك</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}


                                >{this.state.ModalData.restaurantFacebook}</Text>
                            </View>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>نوع المطعم</Text>
                            <View
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    // color: '#000',
                                    // padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                            >
                                <Text

                                    style={{

                                        color: '#000',
                                        padding: 15,

                                    }}

                                >{this.state.ModalData.restaurantType}</Text>
                            </View>


                            <TouchableOpacity
                                onPress={
                                    () => {

                                    }
                                }
                                style={{
                                    width: width * 0.4,
                                    height: 58,
                                    borderRadius: 45,
                                    backgroundColor: color,
                                    alignSelf: 'center',
                                    marginBottom: width * 0.06,

                                }}
                            >


                                <Text style={{
                                    fontSize: 20,
                                    textAlign: 'center',
                                    color: '#fff',
                                    marginTop: width * 0.05,
                                    fontWeight: 'bold'
                                }}> الاقسام</Text>



                            </TouchableOpacity>




                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.Modalvisible3}
                    onRequestClose={
                        () => {
                            this.setState({ Modalvisible3: false, Modalvisible2: false })
                        }
                    }

                >
                    <StatusBar
                        backgroundColor={color} />
                    <View style={{
                        width: '100%',
                        alignItems: 'center', justifyContent: 'center', backgroundColor: color, height: height * .13,
                        marginBottom: 5
                    }}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: backgroundColor,
                            // marginTop: 5
                        }}>تعديل</Text>
                    </View>


                    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -30, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                        <ScrollView style={{ marginTop: '1%' }}>
                            <TouchableOpacity
                                // key={index}
                                onPress={() => {
                                    this.select_first_photo()
                                }}
                            // style={{ height: width * 0.52 }}
                            >
                                <View
                                    style={{
                                        width: width * 0.9,
                                        height: width * 0.45,
                                        borderRadius: 35,
                                        // backgroundColor: '#f0f',
                                        alignSelf: 'center',
                                        marginTop: 5,
                                        borderColor: (this.state.edit_item_image == '') ? '#eee' : '#fff',
                                        borderWidth: 1.5
                                    }}
                                >
                                    {this.state.edit_item_image == '' ?
                                        (<Icon name='plus' style={{ alignSelf: 'center', marginTop: width * 0.17 }} size={25}></Icon>)
                                        :
                                        (<Image source={{ uri: this.state.edit_item_image }}
                                            style={{
                                                width: width * 0.9,
                                                height: width * 0.45,
                                                borderRadius: 35,
                                            }}
                                            resizeMode='cover'
                                        ></Image>
                                        )
                                    }
                                </View>

                            </TouchableOpacity>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>اسم المطعم</Text>
                            <TextInput
                                placeholder='اسم المطعم'
                                placeholderTextColor='#ddd'
                                // keyboardType='email-address'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee'
                                    elevation: 3,
                                    marginBottom: width * 0.02,

                                }}
                                value={this.state.edit_item_name}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_name: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>العنوان</Text>
                            <TextInput
                                placeholder='العنوان'
                                placeholderTextColor='#ddd'
                                // keyboardType='email-address'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee'
                                    elevation: 3,
                                    marginBottom: width * 0.02,

                                }}
                                value={this.state.edit_item_address}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_address: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>رقم الهاتف</Text>
                            <TextInput
                                placeholder='رقم الهاتف'
                                placeholderTextColor='#ddd'
                                keyboardType='number-pad'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee'
                                    elevation: 3,
                                    marginBottom: width * 0.02,

                                }}
                                value={this.state.edit_item_phone}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_phone: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>رقم الواتساب</Text>
                            <TextInput
                                placeholder='رقم الواتساب'
                                placeholderTextColor='#ddd'
                                keyboardType='number-pad'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee'
                                    elevation: 3,
                                    marginBottom: width * 0.02,

                                }}
                                value={this.state.edit_item_whats}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_whats: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>مواعيد العمل</Text>
                            <TextInput
                                placeholder='مواعيد العمل'
                                placeholderTextColor='#ddd'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee'
                                    elevation: 3,
                                    marginBottom: width * 0.02,

                                }}
                                value={this.state.edit_item_hours}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_hours: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>لينك الفيسبوك</Text>
                            <TextInput
                                placeholder='لينك الفيسبوك'
                                placeholderTextColor='#ddd'
                                // keyboardType='email-address'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                                value={this.state.edit_item_facebook}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_facebook: value })
                                }}
                            ></TextInput>
                            <Text style={{
                                marginTop: width * 0.06,
                                marginLeft: 23,
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>نوع المطعم</Text>
                            <TextInput
                                placeholder='نوع المطعم'
                                placeholderTextColor='#ddd'
                                // keyboardType='email-address'
                                style={{
                                    width: '90%',
                                    height: 50,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    color: '#000',
                                    padding: 15,
                                    borderRadius: 17,
                                    // borderWidth: 1.5,
                                    // borderColor: '#eee',
                                    marginBottom: width * 0.02,
                                    elevation: 3
                                }}
                                value={this.state.edit_item_type}
                                onChangeText={(value) => {
                                    this.setState({ edit_item_type: value })
                                }}
                            ></TextInput>

                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.setState({ Modalvisible3: false, Modalvisible2: false })
                                        this.update()
                                        // this.edits()
                                    }
                                }
                                style={{
                                    width: width * 0.4,
                                    height: 53,
                                    borderRadius: 40,
                                    backgroundColor: color,
                                    alignSelf: 'center',
                                    // marginTop: 60,
                                    //borderWidth:1,
                                    //borderColor:'#000',
                                    marginBottom: width * 0.06
                                }}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    marginTop: 15,
                                    //marginLeft:30
                                }}>تعديل</Text>
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </Modal>
            </>
        )
    }
}
