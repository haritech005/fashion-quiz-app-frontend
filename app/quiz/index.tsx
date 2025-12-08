// app/quiz/index.tsx
import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import OutfitCard from "../../components/quiz/OutfitCard";
import { useQuizStore } from "../../store/quizStore";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";
import { Outfit } from "../../types/outfit";

const quizData: Outfit[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Outfit ${i + 1}`,
  image: "https://via.placeholder.com/300x400",
  category: i % 3 === 0 ? "Casual" : i % 3 === 1 ? "Formal" : "Traditional",
}));

const QuizScreen: React.FC = () => {
  const router = useRouter();
  const { likeOutfit, dislikeOutfit } = useQuizStore();
  const swiperRef = useRef<Swiper<Outfit>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe Right → Like
  const handleSwipeRight = useCallback(
    (index: number) => {
      const outfit = quizData[index];
      if (outfit) {
        likeOutfit(outfit);
      }
      setCurrentIndex(index + 1);
    },
    [likeOutfit]
  );

  // Swipe Left → Dislike
  const handleSwipeLeft = useCallback(
    (index: number) => {
      const outfit = quizData[index];
      if (outfit) {
        dislikeOutfit(outfit);
      }
      setCurrentIndex(index + 1);
    },
    [dislikeOutfit]
  );

  // All cards swiped → go to loading
  const handleSwipedAll = useCallback(() => {
    router.push("/quiz/loading");
  }, [router]);

  // Render card with key prop for proper reconciliation
  const renderCard = useCallback((card: Outfit, index: number) => {
    if (!card) {
      console.log("Card is null at index:", index);
      return null;
    }
    return <OutfitCard key={card.id} outfit={card} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick Your Style</Text>
      <Text style={styles.counter}>
        {currentIndex + 1} / {quizData.length}
      </Text>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={quizData}
          renderCard={renderCard}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          onSwipedAll={handleSwipedAll}
          cardIndex={0}
          stackSize={3}
          stackScale={10}
          stackSeparation={15}
          infinite={false}
          verticalSwipe={false}
          horizontalThreshold={120}
          disableTopSwipe
          disableBottomSwipe
          animateCardOpacity
          backgroundColor="transparent"
          // CRITICAL FIX: Set to true for Android compatibility
          useViewOverflow={true}
          // Add these props for better stability
          outputRotationRange={["-10deg", "0deg", "10deg"]}
          inputRotationRange={[-255, 0, 255]}
          // Disable overlay labels temporarily to test if they're causing issues
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: COLORS.warning,
                  color: COLORS.background,
                  fontSize: 24,
                  fontWeight: "700",
                  padding: 10,
                  borderRadius: 8,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: COLORS.success,
                  color: COLORS.background,
                  fontSize: 24,
                  fontWeight: "700",
                  padding: 10,
                  borderRadius: 8,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: 60,
    marginBottom: 10,
    textAlign: "center",
  },
  counter: {
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 20,
  },
  swiperContainer: {
    flex: 1,
    width: "100%",
  },
});

export default QuizScreen;
