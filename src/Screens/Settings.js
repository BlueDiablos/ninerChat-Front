import React from "react";
import { getToken } from "../components/Storage";
import Axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
  Button,
  TouchEvent,
  Alert,
  SafeAreaView
} from "react-native";
import Hamburger from "../components/Hamburger";
import { TextInput, FlatList } from "react-native-gesture-handler";

export default class Settings extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      username: "",
      email: "",
      college: "",
      major: "",
      admin: "",
      isLoading: true
    };
  }

  _fetchToken = async () => {
    let t = await getToken();
    this.setState({ token: t });
    console.log("Settings Token: " + this.state.token);
  };

  _fetchProfile = () => {
    let url = global.URL + "/api/profile";
    let collection = {
      token: this.state.token
    };
    console.log(JSON.stringify(collection));
    Axios({
      method: "post",
      url: url,
      data: collection
    })
      .then(response => {
        let r = response.data;
        this.setState({ username: r.name });
        this.setState({ email: r.email });
        this.setState({ admin: r.admin });
        this.setState({ major: r.major });
        this.setState({ college: r.college });
        this._isMounted = true;
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    
    this._navLister = this.props.navigation.addListener("didFocus", () => {
        this._fetchToken().then(() => {
          this._fetchProfile();
          if (this._isMounted) {
            this.setState({isLoading: false});
          }
        });
      
    });
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  submit = ev => {
    this.props.navigation.navigate("Update");
  };

  render() {
    let DATA = [
      {
        title: "Username",
        data: [this.state.username]
      },
      {
        title: "Email",
        data: [this.state.email]
      },
      {
        title: "Major",
        data: [this.state.major]
      },
      {
        title: "College",
        data: [this.state.college]
      }
    ];
    return (
      <View style={styles.container}>
        <Hamburger navigation={this.props.navigation} />

        <SectionList
          style={styles.list}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />

        <TouchableOpacity
          onPress={() => this.submit()}
          style={styles.buttonSignup}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function Item({ title }) {
  return (
    <View style={styles.itemBox}>
      <Text style={styles.item}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1B",
    padding: 50
  },
  list: {
    paddingHorizontal: 17
  },
  itemBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonSignup: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#006940",
    color: "#fff",
    position: "absolute",
    bottom: 1,
    right: 0,
    left: 0,
    borderColor: "#006940",
    paddingHorizontal: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },

  item: {
    backgroundColor: "#006940",
    color: "white",
    width: 200,
    marginTop: "3%",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: "10%",
    marginLeft: "4%"
  },
  title: {
    color: "white",
    fontSize: 24,
    marginTop: "15%",
    marginLeft: "25%"
  }
});
