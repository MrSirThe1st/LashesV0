import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "@rneui/base";
import { StyleSheet } from "react-native";

const SkeletonHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stickyHeader}>
        <Skeleton
          circle
          width={40}
          height={40}
          skeletonStyle={{ backgroundColor: "#eaf5ff" }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.SearchContainer}>
          <Skeleton
            height={40}
            style={styles.Skeleton}
            borderRadius={5}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
        </View>
        <View style={styles.Carousel}>
          <Skeleton
            width={110}
            height={90}
            borderRadius={5}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
          <Skeleton
            width={110}
            height={90}
            borderRadius={5}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
          <Skeleton
            width={110}
            height={90}
            borderRadius={5}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
        </View>
        <View style={styles.Cardlists}>
          <Skeleton
            animation="pulse"
            height={134}
            borderRadius={12}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
          <Skeleton
            animation="pulse"
            height={134}
            borderRadius={12}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
          <Skeleton
            animation="pulse"
            height={134}
            borderRadius={12}
            skeletonStyle={{ backgroundColor: "#eaf5ff" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  stickyHeader: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    marginLeft:12
  },
  content: {
    flex: 1,
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
  },
  Carousel: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
  },
  Cardlists: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    margin: 12,
  },
});

export default SkeletonHome;
