import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialIcons } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customContent: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fafdff",
  },
  addProduct: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  addText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  Content: {
    flex: 1,
  },
  containerSettings: {
    paddingVertical: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  section: {
    padding: 24,
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 13,
    fontWeight: "500",
    marginRight: 6,
  },
  innerpicker: {
    flexDirection: "row",
  },
  picker: {
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  modal: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 12,
    elevation: 1,
  },

  rowIconClose: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
  
    right:-330,
    
  },

});

export default Styles;
