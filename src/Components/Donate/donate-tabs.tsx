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

            <Tabs.Content className='flex justify-center items-center' value='pix'></Tabs.Content>
            <Tabs.Content value='paypal'></Tabs.Content>
        </Tabs.Root>
    )
}