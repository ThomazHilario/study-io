// Radix
import * as Tabs from '@radix-ui/react-tabs'

export const DonateTabs = () => {
    // TailwindCss
    const tabsTriggerCss = 'text-2xl border-b-[1px] border-transparent data-[state="active"]:border-white'

    return(
        <Tabs.Root className='mt-6' defaultValue='pix'>
            <Tabs.List className='flex gap-5 mb-5'>
                <Tabs.Trigger value='pix' className={tabsTriggerCss}>Pix</Tabs.Trigger>
                <Tabs.Trigger value='paypal' className={tabsTriggerCss}>PayPal</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className='flex justify-center items-center' value='pix'>
                <img className='h-60 w-60 rounded-md' src='https://res.cloudinary.com/dseywnx5i/image/upload/v1732555362/Study/QRCode/fg71htj2k35sjispxbdv.jpg' alt='qr code image from pix'/>
            </Tabs.Content>
            <Tabs.Content className='flex justify-center items-center text-2xl' value='paypal'>
                <h2>Ainda estamos construindo essa seção!</h2>
            </Tabs.Content>
        </Tabs.Root>
    )
}