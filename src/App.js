import { useEffect, useState } from "react"

function App() {
  const [url, setURL] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://meme-api.herokuapp.com/gimme/10")
      const data = await response.json()
      const urlList = data.memes.map((meme) => meme.url)
      setURL(urlList)
    }
    fetchData()
  }, [])

  return (
    <>
      <header>
        <h1>Meme-ory</h1>
      </header>
      <main>
        {url.map((URL) => (
          <img width="250px" key={URL} src={URL} />
        ))}
      </main>
      <footer></footer>
    </>
  )
}

export default App
