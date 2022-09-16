import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import {  GameController} from 'phosphor-react-native'
import { styles } from './styles';
import { ThemeProvider } from '@react-navigation/native';

export interface DuoCardProps {
    hourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}


export function DuoCard({data, onConnect}: Props) {
  return (
    <View style={{width: 200, backgroundColor: THEME.COLORS.SHAPE, borderRadius: 8, padding: 20, marginRight: 16, alignItems: 'center'}}>
        <DuoInfo
            label='Nome'
            value={data.name}
        ></DuoInfo>
        <DuoInfo
            label='Tempo de jogo'
            value={`${data.yearsPlaying} ano(s)`}
        ></DuoInfo>
        <DuoInfo
            label='Disponibilidade'
            value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        ></DuoInfo>
        <DuoInfo
            label='Chamada de áudio'
            value={data.useVoiceChannel ? 'Sim' : 'Não'}
            colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        ></DuoInfo>

        <TouchableOpacity
            onPress={onConnect}
            style={{width: '100%', height: 36, borderRadius: 6, backgroundColor: THEME.COLORS.PRIMARY,flexDirection: 'row',
            alignItems: 'center', justifyContent: 'center'}}
        >
            <GameController
                color='white'
                size={20}
            ></GameController>

            <Text style={{color: THEME.COLORS.TEXT, fontFamily: THEME.FONT_FAMILY.SEMI_BOLD, fontSize: THEME.FONT_SIZE.SM, marginLeft:8}}>Conectar</Text>


        </TouchableOpacity>
    </View>
  );
}