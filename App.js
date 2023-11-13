import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Ionicons";


const Stack = createStackNavigator();




const S1 = ({navigation}) => {
  const [tk, setTk] = useState('')
  const [mk, setMk] = useState('')
  const [errTk, setErrTk] = useState('')
  const [errMk, setErrMk] = useState('')

  const onSubmit = async () => {
    // Đặt lại thông báo lỗi
    setErrTk('');
    setErrMk('');

    // Kiểm tra xem tên đăng nhập hoặc mật khẩu có trống không
    if (tk === '' || mk === '') {
      if (tk === '') setErrTk('Tài khoản không được rỗng');
      if (mk === '') setErrMk('Mật khẩu không được rỗng');
      return;
    }

    try {
      // Lấy dữ liệu tài khoản từ API
      const response = await axios.get('https://6540c0a745bedb25bfc284b5.mockapi.io/todo');

      // So sánh tài khoản và mật khẩu từ người dùng với dữ liệu từ API
      const matchingAccount = response.data.find(account => account.tk === tk && account.mk === mk);

      if (matchingAccount) {
        console.log('Thành công');
          // Lưu thông tin đăng nhập vào AsyncStorage
          //await AsyncStorage.setItem('userData', JSON.stringify(matchingAccount));
          navigation.navigate('S3', { dataFromAPI: matchingAccount.list });
          // Thực hiện bất kỳ hành động điều hướng hoặc khác nào đó khi đăng nhập thành công
      } else {
        console.log('Đăng nhập không thành công');
        // Xử lý đăng nhập không thành công (ví dụ: hiển thị thông báo lỗi)
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);
      // Xử lý các lỗi khác (ví dụ: vấn đề với mạng)
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ marginHorizontal: 20, marginVertical: 60 }]}>
        <View style={[{ alignItems: "center" }]}>
          <Image
            source={require("./img/logo-no-background 1.png")}
            style={styles.img}
          />
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#9747FF",
            marginVertical: 20,
          }}
        >
          Sign in
        </Text>

        <View>
          <View
            style={[
              styles.fl,
              {
                width: 330,
                height: 50,
                borderWidth: 2,
                borderColor: "#9747FF",
                borderRadius: 10,
                alignItems: "center",
                marginVertical: 16,
              },
            ]}
          >
            <Icon name="user" color="#9747FF" size={30} />
            <TextInput
              style={[styles.input, { marginLeft: 20, width: 250, height: 40 }]}
              placeholder="Email or User Name"
              onChangeText={(value) => setTk(value)}

            />
          </View>
          <Text style={{color: 'red'}}> {errTk} </Text>
          <View
            style={[
              styles.fl,
              {
                width: 330,
                height: 50,
                borderWidth: 2,
                borderColor: "#9747FF",
                borderRadius: 10,
                alignItems: "center",
                marginVertical: 16,
              },
            ]}
          >
            <Icon name="lock" color="#9747FF" size={30} />
            <TextInput
              style={[styles.input, { marginLeft: 20, width: 250, height: 40 }]}
              placeholder="Password"
              secureTextEntry = {true}
              onChangeText={(value) => setMk(value)}
            />
            <Icon1 name="eye" color="gray" size={20} />
          </View>
        </View>
        <Text style={{color: 'red'}}> {errMk} </Text>

        <View>
          <TouchableOpacity
            style={[
              styles.fl,
              styles.center,
              {
                width: 330,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#9747FF",
                marginVertical: 30,
              },
            ]}
            onPress={()=> onSubmit()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style ={{alignItems: 'center'}}>
        <Text style = {{color: "#9747FF"}}>Don’t have account ?
          <TouchableOpacity onPress={()=>navigation.navigate('S2')}>
            <Text style = {{fontSize: 16, fontWeight: 'bold'}}> Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const S2 = ({navigation}) =>{
  const [tk, setTk] = useState('')
  const [mk, setMk] = useState('')
  const [mkCF, setMkCF] = useState('')

  const [errTk, setErrTk] = useState('')
  const [errMk, setErrMk] = useState('')
  const [errMk2, setErrMk2] = useState('')


  const validateData = (tk, mk, mk2) => {
    const errTk = tk === '' ? 'Tài khoản không được rỗng' : '';
    const errMk = mk === '' ? 'Mật khẩu không được rỗng' : '';
    const errMk2 = mk2 === '' ? 'Xác nhận mật khẩu không được rỗng' : mk2 !== mk ? 'Xác nhận mật khẩu không khớp' : '';
  
    return errTk === '' && errMk === '' && errMk2 === '';
  };
  const onSubmit = () =>{
    let formData = {
      tk: tk,
      mk: mk,
      mk2: mkCF
    }
    setErrTk(formData.tk === '' ? 'Tài khoản không được rỗng' : '');
    setErrMk(formData.mk === '' ? 'Mật khẩu không được rỗng' : '');
    setErrMk2(
      formData.mk2 === '' ? 'Xác nhận mật khẩu không được rỗng' : formData.mk2 !== formData.mk ? 'Xác nhận mật khẩu không khớp' : ''
    );
  const isValid = validateData(formData.tk, formData.mk, formData.mk2);

  if (isValid) {
    console.log(formData);
    axios.post('https://6540c0a745bedb25bfc284b5.mockapi.io/todo', formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }


  }
  return(
    <View style={{ flex: 1 }}>
    <View style={[{ marginHorizontal: 20, marginVertical: 20}]}>
      <TouchableOpacity onPress={()=> navigation.navigate('S1')}>
        <Text style = {{fontWeight: "bold",color: "#9747FF", fontSize: 20}} >&lt; Back</Text>
      </TouchableOpacity>
    </View>
    <View style={[{ marginHorizontal: 20, marginVertical: 60 }]}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#9747FF",
          marginVertical: 20,
        }}
      >
        Sign up
      </Text>

      <View>
        <View
          style={[
            styles.fl,
            {
              width: 330,
              height: 50,
              borderWidth: 2,
              borderColor: "#9747FF",
              borderRadius: 10,
              alignItems: "center",
              marginVertical: 16,
            },
          ]}
        >
          <Icon name="user" color="#9747FF" size={30} />
          <TextInput
            style={[styles.input, { marginLeft: 20, width: 250, height: 40 }]}
            placeholder="Email or User Name"
            onChangeText={(value) => setTk(value)}
          />
        </View>

        <Text style={{color: 'red'}}> {errTk} </Text>

        <View
          style={[
            styles.fl,
            {
              width: 330,
              height: 50,
              borderWidth: 2,
              borderColor: "#9747FF",
              borderRadius: 10,
              alignItems: "center",
              marginVertical: 16,
            },
          ]}
        >
          <Icon name="lock" color="#9747FF" size={30} />
          <TextInput
            style={[styles.input, { marginLeft: 20, width: 250, height: 40 }]}
            secureTextEntry = {true}
            placeholder="Password"
            onChangeText={(value) => setMk(value)}
          />
          <Icon1 name="eye" color="gray" size={20} />
        </View>

        <Text style={{color: 'red'}}> {errMk} </Text>

        <View
          style={[
            styles.fl,
            {
              width: 330,
              height: 50,
              borderWidth: 2,
              borderColor: "#9747FF",
              borderRadius: 10,
              alignItems: "center",
              marginVertical: 16,
            },
          ]}
        >
          <Icon name="lock" color="#9747FF" size={30} />
          <TextInput
            style={[styles.input, { marginLeft: 20, width: 250, height: 40 }]}
            placeholder="Confirm Password"
            secureTextEntry = {true}
            onChangeText={(value) => setMkCF(value)}
          />
          <Icon1 name="eye" color="gray" size={20} />
        </View>
      </View>

      <Text style={{color: 'red'}}> {errMk2} </Text>

      <View>
        <TouchableOpacity
          style={[
            styles.fl,
            styles.center,
            {
              width: 330,
              height: 50,
              borderRadius: 10,
              backgroundColor: "#9747FF",
              marginVertical: 30,
            },
          ]}
          onPress={()=>onSubmit()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }} onPress={()=>onSubmit()}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style ={{alignItems: 'center'}}>
        <Text style = {{color: "#9747FF"}}>Already have an account ?  
          <TouchableOpacity onPress={()=> navigation.navigate('S1')}>
            <Text style = {{fontSize: 16, fontWeight: 'bold'}}> Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  </View>
  )
}

//S3

const S3 = ({ route, navigation }) => {
  const { dataFromAPI } = route.params;
  // const [danhSach, setDanhSach] = useState(dataFromAPI);
  const [updatedList, setUpdatedList] = useState(dataFromAPI);
  useEffect(() => {
    setUpdatedList(dataFromAPI);
  }, [dataFromAPI]);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.fl, { alignItems: 'center', justifyContent: 'space-between', width: 'auto', height: 50, backgroundColor: '#9747FF' }]}>
        <Icon1 name="menu" size={24} color={'white'} style={{ marginHorizontal: 10 }} />
        <Text style={{ marginHorizontal: 10, fontSize: 20, color: 'white', fontWeight: 'bold' }}>My note</Text>
      </View>

      {updatedList.map((item) => (
        <View key={item.id} style={{ backgroundColor: '#EDDFFF', marginHorizontal: 20, marginVertical: 20 }}>
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.tieuDe}</Text>
            <Text style={{ fontWeight: '600', fontSize: 14 }}>{item.noiDung}</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity>
              <Icon3 name="trash" style={{ fontSize: 30, color: '#9747FF', marginRight: 5 }} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('S4')}>
          <Icon3 name="add-circle-outline" style={{ fontSize: 60, color: '#9747FF', marginRight: 5 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//S4

const S4 = ({ route, navigation, danhSach, setDanhSach }) => {
  const [tieuDe, setTieuDe] = useState('');
  const [noiDung, setNoiDung] = useState('');

  if (!danhSach || !Array.isArray(danhSach)) {
    console.error('Biến danhSach không được định nghĩa hoặc không phải là một mảng.');
    return;
  }
  const luuDuLieu = () => {
    // Kiểm tra xem tiêu đề và nội dung có được nhập không
    if (tieuDe === '' || noiDung === '') {
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
      console.log('Tiêu đề và nội dung không được để trống');
      return;
    }

    // Tạo đối tượng mới để thêm vào danh sách
    const newItem = {
      id: (danhSach.length + 1).toString(), // Tạo ID mới, bạn có thể cải tiến cách tạo ID này
      tieuDe: tieuDe,
      noiDung: noiDung,
    };
  
    // Tạo mảng mới với phần tử mới
    const updatedList = [...danhSach, newItem];
  
    // Lưu trạng thái danh sách
    setDanhSach(updatedList);
  
    // Chuyển hướng về trang S3 với dữ liệu mới
    navigation.navigate('S3', { dataFromAPI: updatedList });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.fl, { alignItems: 'center', justifyContent: 'space-between', width: 'auto', height: 50, backgroundColor: '#9747FF' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('S3')}>
          <Icon2 name="close" size={24} color={'white'} style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>

        <Text style={{ marginHorizontal: 10, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Thêm mới</Text>
      </View>

      <View>
        <View style={[{ justifyContent: 'center', marginHorizontal: 20, marginVertical: 10, borderWidth: 2, borderColor: '#9747FF', height: 50, borderRadius: 10 }]}>
          <TextInput
            placeholder="Tiêu đề"
            style={{ marginHorizontal: 16, height: 30 }}
            onChangeText={(value) => setTieuDe(value)}
          />
        </View>

        <View style={[{ justifyContent: 'center', marginHorizontal: 20, marginVertical: 10, borderWidth: 2, borderColor: '#9747FF', height: 300, borderRadius: 10 }]}>
          <TextInput
            placeholder="Nội dung"
            style={{ marginHorizontal: 16, height: 390, marginVertical: 16 }}
            multiline={true}
            onChangeText={(value) => setNoiDung(value)}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.center, { height: 50, backgroundColor: '#9747FF', width: 350, borderRadius: 10, marginVertical: 20 }]}
          onPress={luuDuLieu}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default function App() {
  const [danhSach, setDanhSach] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="S1" component={S1}></Stack.Screen>
        <Stack.Screen name="S2" component={S2}></Stack.Screen>
        <Stack.Screen name="S3">
  {(props) => <S3 {...props} danhSach={danhSach} setDanhSach={setDanhSach} />}
</Stack.Screen>
<Stack.Screen name="S4">
  {(props) => <S4 {...props} danhSach={danhSach} setDanhSach={setDanhSach} />}
</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  fl: {
    flexDirection: "row",
  },
});
