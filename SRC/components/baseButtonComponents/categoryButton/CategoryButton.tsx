import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {whotheme} from '../../../global/variables';
import BodyText from '../../baseTextComponents/bodyText/BodyText';
export default function CategoryButton(props: {
  onPress: any;
  setActiveState?: boolean;
  style?: {};
  children: string;
}) {
  const [active, setActive] = useState<boolean>(false);
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
        //the next line specifies that only when setActiveState is true that category buttons will change color on active.
        props.setActiveState && setActive(prevState => !prevState);
      }}
      activeOpacity={0.8}
      style={[
        active ? styles.ActiveBackgroundStyle : styles.defaultStyle,
        props.style,
      ]}>
      <BodyText style={active && styles.ActiveTextStyle}>
        {props.children}
      </BodyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: whotheme.colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActiveTextStyle: {
    color: 'white',
  },
  ActiveBackgroundStyle: {
    backgroundColor: whotheme.colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: whotheme.colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
