import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import {Entypo} from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';
export function Game() {

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation()
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  useEffect(() => {
    fetch(`http://192.168.1.77:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => setDuos(data))
  },[])

  async function getDiscord(adsId:string) {
    fetch(`http://192.168.1.77:3333/ads/${adsId}/discord`)
    .then(res => res.json())
    .then(data =>setDiscordDuoSelected(data.discord))
  }

  return (
    <Background>
      <SafeAreaView style={{flex:1, alignItems: 'center'}}>
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal:32, marginTop: 28, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            ></Entypo>
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={{width: 72, height: 40}}
          ></Image>

          <View style={{width: 20, height: 20}}></View>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={{width:311, height: 160, borderRadius: 8, marginTop: 32}}
          resizeMode='cover'
        ></Image>

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        ></Heading>
        <FlatList
          horizontal
          style={[{width: '100%'}]}
          contentContainerStyle={[duos.length > 0  ? {paddingLeft: 32, paddingRight: 64, alignItems: 'flex-start'} :
          {flex: 1,justifyContent: 'center', alignItems: 'center'}]}
          showsHorizontalScrollIndicator={false}
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard onConnect={() => getDiscord(item.id)} data={item}></DuoCard>
          )}
          
          ListEmptyComponent={() => (
            <Text style={{color: THEME.COLORS.CAPTION_300, fontSize: THEME.FONT_SIZE.SM, fontFamily: THEME.FONT_FAMILY.REGULAR}}>Não há anúncios publicados para esse jogo ainda</Text>
          )}
        ></FlatList>

        <DuoMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')}></DuoMatch>
      </SafeAreaView>
    </Background>
  );
}