import { useState } from "react"
import { useEffect } from "react"

interface MemeImage {
    id: string
    name: string
    url: string
    width: number
    height: number
    box_count: number
}

export default function Content() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        image: "http://i.imgflip.com/1bij.jpg"
    })

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target as HTMLInputElement
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    const [images, setImages] = useState<MemeImage[]>([])

    useEffect(() => {
        fetch("/api/get_memes")
        .then(result => result.json())
        .then(data => {
            setImages(data.data.memes)
            console.log("Loaded memes:", data.data.memes)
        })
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * images.length)
        const randomMeme = images[randomNumber]
        const memeImage = randomMeme.url
        setMeme(prevMeme => ({...prevMeme, image: memeImage}))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        value={ meme.topText }
                        name="topText"
                        onChange={ onChange }
                        placeholder="Top Text"
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        value={ meme.bottomText }
                        name="bottomText"
                        onChange={ onChange }
                        placeholder="Bottom Text"
                    />
                </label>
                <button onClick={ getMemeImage }>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={ meme.image } />
                <span className="top">{ meme.topText }</span>
                <span className="bottom">{ meme.bottomText }</span>
            </div>
        </main>
    )
}