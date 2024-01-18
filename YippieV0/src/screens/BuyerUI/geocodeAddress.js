
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM");

const geocodeAddress = async (address) => {
  try {
    const response = await Geocoding.from(address);
    const { lat, lng } = response.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export { geocodeAddress };
