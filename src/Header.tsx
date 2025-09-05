import viteLogo from '/vite.svg'


export default function Header() {
    return (
        <header className="header">
            <img 
                src={viteLogo} 
            />
            <h1>Meme Generator</h1>
        </header>

    )
}