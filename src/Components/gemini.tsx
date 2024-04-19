// import react
import { useState } from 'react'

// import gemini
import { GoogleGenerativeAI } from '@google/generative-ai'

// import icon
import { SendHorizonal } from 'lucide-react'

export const Gemini = () => {
    // Api key
    const geminiIa = new GoogleGenerativeAI('AIzaSyC2GQItzSVd2jlMQ9PQW2qrGU7gfZ2h6LY')

    // Modelo 
    const model = geminiIa.getGenerativeModel({model:'gemini-pro'})

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
        <div className='w-[500px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute bg-slate-800 flex flex-col justify-between p-2 text-white rounded-sm'>
            <div className='flex justify-end'>
                <span className='py-1 px-3 bg-black/20 rounded-sm'>Beta</span>
            </div>
            <div>
                {response !== '' ? <p>Gemini:{response}</p> : <h1 className='text-3xl'>Ola eu sou a Gemini!!</h1>}
            </div>

            <div className='flex gap-2'>
                <textarea className='w-full resize-none bg-black/20 outline-none p-2 overflow-y-hidden rounded-sm' value={question}  rows={1} onChange={(e) => setQuestion(e.target.value)}></textarea>

                <button onClick={questionUser}><SendHorizonal/></button>
            </div>
        </div>
    )
}