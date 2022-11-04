import { useEffect, useState } from "react"
import styled from "styled-components"
import "./styles/index.css"
import app from "./styles/App.module.css"

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #ff006e;
  color: #ff006e;
  width: 300px;
  padding: 10px 0;
  align-self: center;
  font-size: large;
  &:hover {
    background-color: #ff006e;
    color: white;
  }
`
function App() {
  const [url, setURL] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clicked, setClicked] = useState([])
  useEffect(() => {
    getMemes()
  }, [])

  async function getMemes() {
    const response = await fetch(
      "https://meme-api.herokuapp.com/gimme/ProgrammerHumor/15"
    )
    const data = await response.json()
    const urlList = data.memes.map((meme) => meme.url)
    setURL(urlList)
  }

  function handleClick(e) {
    if (clicked.includes(e.target.getAttribute("src"))) {
      getMemes()
      setScore(0)
      setClicked([])
      return
    }

    let array = [...url]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    setURL(array)
    setScore(score + 1)
    if (score >= bestScore) setBestScore((bestScore) => bestScore + 1)
    console.log(e.target.getAttribute("src"))
    setClicked([...clicked, e.target.getAttribute("src")])
  }

  return (
    <>
      <header className={app.header}>
        <h1>Meme-ory</h1>
        <div className={app.score}>
          <h3>Click on unique images to gain points</h3>
          <div>
            <h3>Score: {score}</h3>
            <h3>Best Score: {bestScore}</h3>
          </div>
        </div>
        <Button onClick={getMemes}>Get New Memes</Button>
      </header>
      <main className={app.main}>
        {url.map((URL) => (
          <img onClick={handleClick} className={app.img} key={URL} src={URL} />
        ))}
      </main>
      <footer></footer>
    </>
  )
}

export default App
