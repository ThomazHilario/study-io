export async function getThemes(){
    try {

        // Making Request
        const response = await fetch(import.meta.env.VITE_REACT_API_THEMES)

        // Return data
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}