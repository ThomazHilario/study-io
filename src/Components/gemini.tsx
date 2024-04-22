// import react
import { useState } from 'react'

// import radix
import * as ScrollArea from '@radix-ui/react-scroll-area'

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
    const [question, setQuestion] = useState('')

    //state - response
    const [response, setResponse] = useState('')

    // questionUser
    async function questionUser(){
        try {
            // Buscando resultado
            const result = await model.generateContent(question)

            // Salvando resposta na state response
            setResponse(result.response.text())

            // limpando o input
            setQuestion('')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className={`bottom-5 right-5 absolute bg-slate-800 flex flex-col justify-center items-center p-2 text-white ${isQuestion ? 'rounded-sm' : 'rounded-full'}`}>
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
                    <ScrollArea.Root className="p-3 text-justify w-full h-[65vh] rounded overflow-hidden bg-black/20">
                        <ScrollArea.Viewport className="w-full h-full rounded">
                            {response !== '' ? <p>Gemini: {response}</p> : <h1 className='text-3xl'>Ola eu sou a Gemini!!</h1>}
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
                        <textarea className='w-full resize-none bg-black/20 outline-none p-2 overflow-y-hidden rounded-sm' value={question}  rows={1} onChange={(e) => setQuestion(e.target.value)}></textarea>

                        <button onClick={questionUser}><SendHorizonal/></button>
                    </div>
                </div>
            ) : <Sparkle size={40} onClick={() => setIsQuestion(true)}/>}
        </div>
    )
}
/*
  
 */