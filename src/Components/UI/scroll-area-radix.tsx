// React
import { ReactNode } from 'react'

// radix-ui
import * as ScrollArea from '@radix-ui/react-scroll-area'

export const ScrollAreaForm = ({children}:{children:ReactNode}) => {
    return(
        <ScrollArea.Root>
            <ScrollArea.Viewport>
                {children}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
                className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
            ></ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}