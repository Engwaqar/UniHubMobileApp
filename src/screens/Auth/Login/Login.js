import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { hp, screenHeight, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import { loginUser, SigInAsGuest } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Fonts from "../../../helpers/Fonts";
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";
import { routeName } from "../../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,LoginButton
} from 'react-native-fbsdk';
import { _toast } from "../../../constants/Index";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import AsyncStorage from "@react-native-community/async-storage";

// import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';

const Login = ({ navigation }) => {
  const loading = useSelector(
    (state) => state.userReducers.loginScreen?.refreshing
  );
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  
  console.log('MyProfile=====', MyProfile)
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [User, setUser] = React.useState();

  //Redux Action Called
  const dispatch = useDispatch();
  const userLogin = () => {
    const formdata=new FormData();
    formdata.append('email',userName);
    formdata.append('password',password);

    dispatch(
      loginUser({
        params: formdata,
        navigation: navigation,
      })
    );
  };
  
  const SignInAsGuest = async () => {
    console.log('SignInAsGuest clicked')
    let data = { user_type: "Guest" }
    navigation.replace(routeName.BOTTOM_TABS);
    await AsyncStorage.setItem("user_type", "Guest");

    dispatch(
      SigInAsGuest({
        ...data,
      })
    );
  }

  // const BinarySearch=(arr,value,startPos,EndPos)=>{
  //   if(startPos>EndPos)return -1
  //   let middleIndex=Math.floor(startPos+EndPos)/2
  //   if(arr[middleIndex]==value) return middleIndex

  //   else if(arr[middleIndex]>value){
  //     return BinarySearch(arr,value,startPos,middleIndex-1)
  //   }else{
  //     return BinarySearch(arr,value,middleIndex+1,EndPos)

  //   }
  // }
  
  // const rotateRight=(array,rotation)=>{
  //   if (rotation==0) {
  //     return array
  //   }
  //   for (let index = 0; index < rotation; index++) {
  //     var element = array.pop();
  //     array.unshift(element)
  //     console.log('aray', array)
  //   }
  //   return array
  // }

  const Validation = (item) => {
    // navigation.replace(routeName.BOTTOM_TABS);

    // BinarySearch()
    // rotateRight([44, 1, 22, 111], 5); // Returns [111,44,1,22]   
    // rotateRight([2, 3, 4, 5, 7], 3); // Return [4,5,7,2,3]


    // return false
    setErrorString("");
    if (userName === "" && password === "") {
      setErrorString("Email and password are required");
    } else if (userName === "" || userName === null) {
      setErrorString("Username is missing");
    } else if (password === "") {
      setErrorString("Password is missing");
    } else {
      userLogin();
      setErrorString("");
    }
  };

  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     androidClientId: '571600851616-6csbr1dmggogdbm2ojudvssr6viuog2g.apps.googleusercontent.com',
  //     iosClientId: '',
  //  });
  //   isSignedIn()
  // },[])


    const social_login = async (userInfo) => {
      console.log(' === social login ==== ', userInfo)
      try {
      const formData = new FormData();
      formData.append('email',userInfo.user?.email);
      formData.append("name", userInfo.user?.name);
      formData.append("google_login_id", userInfo?.user.id);

      const res = await Api.post(urls.SOCIAL_LOGIN, formData);
      console.log("==== res social login ====", res);

      if (res && res.status == 200) {
        console.log('==== res while social login ====', res)
        AsyncStorage.setItem("@token", res.token);
        AsyncStorage.setItem("@userId",JSON.stringify(res.user.id));
        navigation.replace(routeName.BOTTOM_TABS);
      }else {
        _toast(res.message);
      }
      } catch (error) {
        _toast(error);
        console.log('==== error while social login ====', error)
      }
    }

    const signInAsGoogle = async () =>{
      try {
        console.log('==== before signInAsGoogle ', GoogleSignin)

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('==== signInAsGoogle userInfo ====', userInfo)
        social_login(userInfo)
        // setUser(userInfo)
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('user cancelled the login flow')
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('operation (e.g. sign in) is in progress already')
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('play services not available or outdated')
          // play services not available or outdated
        } else {
          console.log('some other error happened',error)
          // some other error happened
        }
      }
  };

  const isSignedIn = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if(!!isSignedIn){
        getCurrentUserInfo();
      }else{
        console.log('please login')
      }
    } catch (error) {
      console.log('error while trigger isSignedIn', error)
    }
  };

  const getCurrentUserInfo = async () => {
    try{
    const userInfo = await GoogleSignin.signInSilently();
  console.log('userinfo__________', User)
  // setUser(userInfo)
    }catch(error){
      if(error.code == statusCodes.SIGN_IN_REQUIRED){
        console.log('user has not signed yes',error)
      }else{
        console.log('sonthing went wrong.', error)
      }
    }
  };

  const signOut = async () => {
    // want to signout from google
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signIn();
    // setUser({});
  } catch (error) {
    console.log('error while signout')
  }
  }

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile","email"]).then(
      login => {
        console.log('login', login)
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('data', data)
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
          // console.log(
          //   "Login success with permissions: " +
          //     result.grantedPermissions.toString()
          // );
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getInfoFromToken = async (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      async (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('==== result ==== ', result)
        if(!result.email)  _toast('email access private at facebook')
        // social_login(result)

          // let payload = {
          //   facebook_login_id: result?.id,
          //   name: result?.name,
          //   email: result?.email
          // }
          // try {
          //   const res = await authApi('third_party_login', payload)
          //   console.log("===res", res)
          //   if (res.data.token) {
          //     dispatch(addToken(res.data.token))
          //     dispatch(addUserData(res.data.user))

          //   } else {
          //     props.navigation.navigate('Sign Up', {
          //       id: result?.id,
          //       name: result?.name,
          //       email: result?.email
          //     })
          //   }
          // } catch (error) {
          //   console.log("===error", error)
          // }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  // async function onAppleButtonPress() {
  //   // performs login request
  //   // const appleAuthRequestResponse = await appleAuth.performRequest({
  //   //   requestedOperation: appleAuth.Operation.LOGIN,
  //   //   requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   // });
  
  //   // // get current authentication state for user
  //   // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //   // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
  //   // // use credentialState response to ensure the user is authenticated
  //   // if (credentialState === appleAuth.State.AUTHORIZED) {
  //   //   // user is authenticated
  //   // }
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     nonceEnabled: false,
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
  // });
  // const credentialState = await appleAuth.getCredentialStateForUser(
  //     appleAuthRequestResponse.user
  // );
  // if (credentialState === appleAuth.State.AUTHORIZED) {
  //   console.log('appleAuthRequestResponse', appleAuthRequestResponse)
  // }
  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        
      <Image style={styles.Rectangle} source={globalPath.Rectangle} />
      <AuthHeader
        navigation={navigation} title={"Sign in"} 
        />
      <View style={{ marginTop: hp(35), marginHorizontal: wp(10), flex: 1 }}>
      <Dots  />

        <ResponsiveText
          margin={[20, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          weight={"bold"}
          size={5}
          color={colors.primary}
        >
          Welcome Back!
        </ResponsiveText>
        <ResponsiveText
          margin={[10, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          size={3.5}
          color={colors.black}
        >
          Sign in to continue
        </ResponsiveText>
        <Input
          placeholder={"Email Address"}
          onChnageText={(text) => setUserName(text)}
          leftIcon={globalPath.EmailIcon}
          value={userName}
        />

        <Input
          placeholder={"Password"}
          value={password}
          secureTextEntry
          // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
          onChnageText={(text) => setPassword(text)}
          leftIcon={globalPath.LockIcon}
        />
        <TouchableOpacity onPress={()=>navigation.navigate(routeName.FORGOT_PASSWORD)}
         style={{alignSelf:'flex-end',margin:10}} >
          <ResponsiveText color={colors.primary} weight={'bold'} >Forgot password? </ResponsiveText>
        </TouchableOpacity>
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 0]}>
          {errorString}
        </ResponsiveText>
        <RnButton
          margin={[10, 0, 0, 0]}
          title={"Sign in"}
          onPress={() => Validation()}
        />
        {/* <ResponsiveText
          margin={[20, 0, 20, 0]}
          size={3}
          color={colors.grey1}
          textAlign={"center"}
        >
          Or continue with
        </ResponsiveText> */}
        {/* <LoginButton
    onLoginFinished={
      (error, result) => {
        if (error) {
          alert("login has error: " + error);
          console.log('error', error)
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result)
                  alert('Success fetching data: ' + result.toString());
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )

        }
      }
    }
    onLogoutFinished={() => alert("logout.")}/> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: wp(70),
            alignSelf: "center",
          }}
        >
          <TouchableOpacity 
            onPress={()=> signInAsGoogle()}> 
            <Icon size={30} source={globalPath.Google} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>loginWithFacebook()} >
          <Icon size={30} source={globalPath.Facebook} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>console.log('apple login')} >
          <Icon size={30} source={globalPath.Apple} />
          </TouchableOpacity>

        </View> */}
         
      <View style={styles.footer}>
        <ResponsiveText margin={[0, 10]} color={colors.black}>
          New to UNIHUB?{' '}
          <ResponsiveText
            fontFamily="Bold"
            color={colors.primary}
            onPress={() => navigation.navigate(routeName.SIGN_UP)}
          >
            Sign up
          </ResponsiveText>

        </ResponsiveText>

            <View style={{marginTop: screenHeight * 0.02}}>
              <ResponsiveText
                fontFamily="Bold"
                color={colors.primary}
                onPress={() => SignInAsGuest()}
              >
                Continue as Guest
              </ResponsiveText>
            </View>
      </View>
      </View>
      </ScrollView>
      {loading?<Loader/>:null}
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Rectangle: {
    height: hp(65),
    width: wp(130),
    top: hp(-30),
    left: wp(-20),
    position: "absolute",
    // resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    marginVertical: hp(5),
  },
});
