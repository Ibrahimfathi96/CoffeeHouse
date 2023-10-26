import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PopUpAnimation from "../components/PopUpAnimation";
import OrderHistoryCard from "../components/OrderHistoryCard";
import styles from "./OrderHistoryScreen.styles";

const OrderHistoryScreen = ({ navigation }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push("Details", {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Order History" />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/download.json")}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={"No Order History"} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {OrderHistoryList.length > 0 ? (
        <TouchableOpacity
          style={styles.DownloadButton}
          onPress={() => {
            buttonPressHandler();
          }}
        >
          <Text style={styles.ButtonText}>Download</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default OrderHistoryScreen;
