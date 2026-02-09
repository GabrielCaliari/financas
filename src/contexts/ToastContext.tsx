import React, {createContext, useState, useCallback, useContext} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {useTheme} from './ThemeContext';

type ToastContextData = {
  show: (message: string) => void;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const TOAST_DURATION = 2500;

export function ToastProvider({children}: {children: React.ReactNode}) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const {colors, typography, spacing} = useTheme();

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(TOAST_DURATION - 400),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  }, [opacity]);

  const value = React.useMemo(() => ({show}), [show]);

  return (
    <ToastContext.Provider value={value}>
      <View style={{flex: 1}}>
        {children}
        {visible && (
          <Animated.View
          style={[
            styles.wrapper,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 12,
              marginHorizontal: spacing.xl,
              marginBottom: 100,
            },
            {opacity},
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize: typography.sizes.body,
              },
            ]}>
            {message}
            </Text>
          </Animated.View>
        )}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    textAlign: 'center',
  },
});

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
}
