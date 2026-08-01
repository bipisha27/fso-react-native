import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useState } from "react";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderMap = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  onSelectOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  const OrderPicker = () => (
    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedOrder} onValueChange={onSelectOrder}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate(`/repository/${item.id}`);
          }}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={OrderPicker}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const { orderBy, orderDirection } = orderMap[selectedOrder];

  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onSelectOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
