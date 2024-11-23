// Radix
import * as Dialog from '@radix-ui/react-dialog'

// Interface
import { IconPropsComponent } from '@/interfaces/icon-type';

// Components
import { Donate } from './donate';

// Lucide React
import { HandHeart} from 'lucide-react'

export const DonateDialog = (propsIcon:IconPropsComponent) => {

    // TailwindCss
    const backgroundColor = 'bg-gray-400/10'

    return(
        <Dialog.Root>
            <Dialog.Trigger className={`flex flex-col items-center justify-center py-[0.15rem] px-[0.35rem] rounded-md hover:${backgroundColor} data-[state="open"]:${backgroundColor}`}>
                {/* Icon */}
                <HandHeart {...propsIcon} />

                {/* Name */}
                <p className='text-white text-[0.8rem] font-semibold font-system'>Donate</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-1/2 left-[52%] -translate-x-1/2 -translate-y-[45%]'>
                    <Donate/>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}