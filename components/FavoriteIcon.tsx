import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const FavoriteIcon = ({ isFavorite = false, onPress = () => {} }) => {
  const favoriteIconName = isFavorite ? "heart" : "heart-outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
    >
      <Ionicons name={favoriteIconName} size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
};
