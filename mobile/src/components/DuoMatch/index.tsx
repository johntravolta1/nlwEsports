import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import {MaterialIcons} from '@expo/vector-icons'
import {CheckCircle} from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard'
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest} : Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord copiado!', `Usuário ${discord} copiado para você colar no seu discord!`)
    setIsCopping(false)
  }

  return (
    <Modal animationType='slide' transparent {...rest} >
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.COLORS.OVERLAY}}>
      <View style={{width: 311, backgroundColor: THEME.COLORS.SHAPE, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={onClose} style={{alignSelf: 'flex-end', margin: 16}}>
          <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500}></MaterialIcons>
        </TouchableOpacity>

        <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold'></CheckCircle>

        <Heading title="Let's play!" subtitle='Agora é só começar a jogar!'
                style={{alignItems: 'center', marginTop: 24}}
        ></Heading>

        <Text style={{color: THEME.COLORS.TEXT, 
                     fontFamily: THEME.FONT_FAMILY.SEMI_BOLD, 
                     fontSize: THEME.FONT_SIZE.MD,
                     marginTop: 24, 
                     marginBottom: 8}}>Adicione seu discord</Text>

        <TouchableOpacity onPress={handleCopyDiscordToClipboard}
                          style={{width: 231, height: 48, backgroundColor: THEME.COLORS.BACKGROUND_900, 
                          justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginBottom: 32}}
                          disabled={isCopping}
                          >

                    <Text style={{color: THEME.COLORS.TEXT, fontFamily: THEME.FONT_FAMILY.REGULAR, fontSize: THEME.FONT_SIZE.MD}}>
                       {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                    </Text>

        </TouchableOpacity>


      </View>
    </View>
    </Modal>
  );
}