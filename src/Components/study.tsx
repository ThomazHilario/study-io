import { user } from "../Store/store"

export const Study = () => {

    const userData = user(state => state.user)

    return(
        <main className="h-screen ">
            {/* header */}
            <header>
                {userData?.id  }
                {userData?.username}
                {userData?.email}
            </header>

            {/* area de trabalho */}
            <div>
                <aside></aside>

                {/* Wallpaper */}
                <div>

                </div>
            </div>
        </main>
    )
}