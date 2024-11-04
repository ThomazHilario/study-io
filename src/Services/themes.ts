export async function getThemes(){
    try {

        // Making Request
        const response = await fetch('https://study-io-api.vercel.app/themes')

        // Return data
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}