import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';

import { styles } from './styles';
import { GAMES} from '../../utils/games'
import {SafeAreaView} from 'react-native-safe-area-context'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';



export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({id, title, bannerUrl} : GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl})
  }

  useEffect(() => {
    fetch('http://192.168.1.77:3333/games')
    .then(res => res.json())
    .then(data => setGames(data))
  },[])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
        
        <Image source={logoImg} style={styles.logo}/>

        <Heading title='Encontre seu duo' subtitle='Selecione o game que deseja jogar...'></Heading>

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => (
            <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        ></FlatList>
    </SafeAreaView>
    </Background>
  );
}