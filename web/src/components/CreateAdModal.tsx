
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './Form/Input'
import { Check, GameController } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>(['1'])
    const [voiceChannel, setVoiceChannel] = useState<boolean>(false)

    useEffect(() => {
      axios('http://localhost:3333/games')
      .then(res=> setGames(res.data))
    },[])

    async function handleCreateAd(event: FormEvent) {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)
      console.log(data)

      if(!data.name) {
        return
      }

      try {        
        await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: voiceChannel
        })
        alert('Anúncio criado com sucesso!')
      } catch (error) {
        alert('Erro ao criar o anúncio!')
        console.log(error)
      }
    }

    return (
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-blue/90'>
            <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>

              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <select
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none' 
                    id='game'
                    name='game'
                    defaultValue=''
                  >
                    <option disabled selected value=''>Selecione o game que deseja jogar</option>
                    {games.map(game =>{
                      return <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
                </div>

                <div  className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser zero' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name='discord' id='discord' type="text" placeholder='Usuario#0000'/>
                  </div>
                </div>

                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="weekDays">Quando costuma jogar?</label>

                        <ToggleGroup.Root value={weekDays} onValueChange={setWeekDays} type='multiple' className='grid grid-cols-4 gap-2'>
                          <ToggleGroup.Item value='0' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo'>D</ToggleGroup.Item>
                          <ToggleGroup.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda'>S</ToggleGroup.Item>
                          <ToggleGroup.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça'>T</ToggleGroup.Item>
                          <ToggleGroup.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta'>Q</ToggleGroup.Item>
                          <ToggleGroup.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta'>Q</ToggleGroup.Item>
                          <ToggleGroup.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta'>S</ToggleGroup.Item>
                          <ToggleGroup.Item value='6' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sábado'>S</ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor="hourStart">Qual horário do dia?</label>
                      <div className='grid grid-cols-2 gap-2'>
                        <Input name='hourStart' id='hourStart' type="time" placeholder='De'/>
                        <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até'/>
                      </div>
                    </div>
                  </div>

                  <label className='mt-2 flex items-center gap-2 text-sm cursor-pointer'>
                    <Checkbox.Root checked={voiceChannel} onCheckedChange={(checked) => {checked === true ? setVoiceChannel(true) : setVoiceChannel(false)}} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                        <Checkbox.CheckboxIndicator>
                            <Check className='w-4 h-4 text-emerald-400'></Check>
                        </Checkbox.CheckboxIndicator>
                    </Checkbox.Root>
                        Costumo conectar-me ao chat de voz
                  </label>

                  <footer className='mt-4 flex justify-end gap-4'>
                    <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 duration-75'>Cancelar</Dialog.Close>
                    <button className=' flex items-center  gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 duration-75' type='submit'>
                      <GameController className='w-6 h-6'/> Encontrar duo</button>
                  </footer>
              </form>
          </Dialog.Content>
      </Dialog.Portal>
  )
}