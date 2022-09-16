import * as Dialog from '@radix-ui/react-dialog'
import {MagnifyingGlassPlus} from 'phosphor-react'

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden'>
        <div className='bg-[#2a2634] px-8 py-6  flex justify-between items-center'>
          <div className='flex flex-col'>
            <strong className='text-2xl text-white font-black'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block!'>Publique um anúncio para encontrar novos players</span>
          </div>

          <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-700 flex items-center gap-3 duration-200'>
            <MagnifyingGlassPlus size={24}></MagnifyingGlassPlus>
            Publicar anúncio
          </Dialog.Trigger>
        </div>

      </div>
    )
}