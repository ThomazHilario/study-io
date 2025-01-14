export const ResponseOrQuestion = ({idx, response}:{idx:number, response:string}) => {
    return(
        <div className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <p className={`p-2 rounded-sm flex ${idx % 2 !== 0 && 'w-10/12'} my-1 mb-3 bg-black/10`}>{idx % 2 === 0 ? `Gemini: ${response}` : `Voce: ${response}`}</p>
        </div>
    )
}