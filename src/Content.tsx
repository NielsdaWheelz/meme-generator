import { useState } from "react"
import { useEffect } from "react"

export default function Content() {
    const [meme, setMeme] = useState({ topText: "One does not simply", bottomText: "Walk into Mordor", image: "http://i.imgflip.com/1bij.jpg" })

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target as HTMLInputElement
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    // function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = event.target
    //     setMeme(prevMeme => ({...prevMeme, [name]: value}))
    // }

    const [character, setCharacter] = useState(null)

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://swapi.dev/api/people/1")
        .then(result => result.json())
        .then(data => setCharacter(data))

    }, [meme.bottomText])


    return (
        <main>
            { character && <h1>{ character }</h1> }
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
                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={ meme.image } />
                <span className="top">{ meme.topText }</span>
                <span className="bottom">{ meme.bottomText }</span>
            </div>
        </main>
    )
}