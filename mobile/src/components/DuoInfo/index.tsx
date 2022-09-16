import React from 'react';
import { ColorValue, Text, View } from 'react-native';
import { THEME } from '../../theme';

interface Props {
    label: string;
    value: string;
    colorValue?: ColorValue;
}

export function DuoInfo({label, value, colorValue = THEME.COLORS.TEXT}: Props) {
  return (
    <View style={{width: '100%', marginBottom: 16}}>
        <Text 
            style={{
                color: THEME.COLORS.CAPTION_300, 
                fontSize: THEME.FONT_SIZE.SM, 
                fontFamily: THEME.FONT_FAMILY.REGULAR, 
                marginBottom: 4
                }}> 
                    {label}
        </Text>
        <Text 
            numberOfLines={1}
            style={{
                    color: colorValue,
                    fontSize: THEME.FONT_SIZE.SM,
                    fontFamily: THEME.FONT_FAMILY.BOLD
                }}>{value}
        </Text>
    </View>
  );
}