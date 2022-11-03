import { useEffect, useState } from "react"

function App() {
  const [url, setURL] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://meme-api.herokuapp.com/gimme")
      const data = await response.json()
      setURL([...url, data.url])
    }
    fetchData()
  })

  return (
    <>
      <header>
        <h1>Meme-ory</h1>
      </header>
      <main>
        <img src={url[0]} />
      </main>
      <footer></footer>
    </>
  )
}

export default App
