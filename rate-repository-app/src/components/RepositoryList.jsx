import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    outlineStyle: "none",
  },
  pickerContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 4,
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
  searchKeyword,
  onChangeSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

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
      ListHeaderComponent={
        <View>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search repositories ..."
              value={searchKeyword}
              onChangeText={onChangeSearchKeyword}
            />
            {searchKeyword.length > 0 && (
              <Pressable onPress={() => onChangeSearchKeyword("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </Pressable>
            )}
          </View>

          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedOrder} onValueChange={onSelectOrder}>
              <Picker.Item label="Latest repositories" value="latest" />
              <Picker.Item label="Highest rated repositories" value="highest" />
              <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
          </View>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { orderBy, orderDirection } = orderMap[selectedOrder];

  const { repositories } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearchKeyword,
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onSelectOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      onChangeSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
