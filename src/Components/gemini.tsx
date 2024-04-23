// import react
import { useState } from 'react'

// import radix
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Skeleton } from '@radix-ui/themes'

// import gemini
import { GoogleGenerativeAI } from '@google/generative-ai'

// import icon
import { SendHorizonal, Sparkle, Minus } from 'lucide-react'

export const Gemini = () => {

    // Api key
    const geminiIa = new GoogleGenerativeAI('AIzaSyC2GQItzSVd2jlMQ9PQW2qrGU7gfZ2h6LY')

    // Modelo 
    const model = geminiIa.getGenerativeModel({model:'gemini-pro'})

    // state- isQuestion
    const [isQuestion, setIsQuestion] = useState<boolean>(false)

    // state - question
    const [question, setQuestion] = useState<string>('')

    // state  isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //state - response
    const [responseList, setResponseList] = useState<string[]>([
        'Olá eu sou a Gemini, Como posso Ajudar ?'
    ])

    // questionUser
    async function questionUser(){
        try {
            // Alterando o valor do isLoading para true
            setIsLoading(true)

            // Buscando resultado
            const result = await model.generateContent(question)

            // Salvando resposta na state response
            setResponseList([...responseList, question, result.response.text()])

            // limpando o input
            setQuestion('')
        } catch (e) {
            console.log(e)
        } finally{
            // Alterando o valor do isLoading para false
            setIsLoading(false)
        }
    }

    return(
        <div className={`bottom-5 right-5 absolute bg-slate-800 flex flex-col justify-center items-center p-2 text-white ${isQuestion ? 'rounded-sm' : 'rounded-full cursor-pointer'}`}>
            {isQuestion ? (
                <div className='w-[500px] flex flex-col gap-3'>
                    {/* Sair do chat */}
                    <div className='flex justify-end'>
                        <Minus className='cursor-pointer' onClick={() => setIsQuestion(false)}/>
                    </div>

                    {/* Div indicando que esta funcionalidade e um beta */}
                    <div className='flex justify-end'>
                        <span className='py-1 px-3 bg-black/20 rounded-sm'>Beta</span>
                    </div>

                    {/* Chat adaptdo a scroll area */}
                    <ScrollArea.Root className="p-2 text-justify w-full h-[65vh] rounded overflow-hidden bg-black/20">
                        <ScrollArea.Viewport className="w-full h-full rounded">
                            {responseList.map((item, idx) => {
                                return(
                                    <div key={idx} className={idx % 2 === 0 ? 'flex justify-start' : 'flex justify-end'}>
                                        <p className={`w-[450px] p-2 rounded-sm flex ${idx % 2 !== 0 && 'w-[400px]'} my-1 mb-3 bg-black/10`}>{idx % 2 === 0 ? `Gemini: ${item}` : `Voce: ${item}`}</p>
                                    </div>
                                )
                            })}
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="vertical"
                        >
                        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="horizontal"
                        >
                        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner className="bg-blackA5" />
                    </ScrollArea.Root>

                    <div className='flex gap-2'>
                        <Skeleton loading={isLoading} className='w-full'>
                            <textarea className='w-full resize-none bg-black/20 outline-none p-2 overflow-y-hidden rounded-sm' value={question} placeholder='Faça uma pergunta...' autoFocus rows={1} onChange={(e) => setQuestion(e.target.value)}></textarea>

                            <button onClick={questionUser}><SendHorizonal/></button>
                        </Skeleton>
                    </div>
                </div>
            ) : <Sparkle size={40} onClick={() => setIsQuestion(true)}/>}
        </div>
    )
}
/*
  
 */