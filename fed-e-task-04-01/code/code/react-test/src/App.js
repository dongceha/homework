import * as React from "react"

function App() {
  React.useEffect(() => {
    console.log("useEffect")
  }, [])
  return <div>hello App works</div>
}

// class App extends React.Component {
//   componentDidMount() {
//     console.log("componentDidMount")
//   }
//   render() {
//     return <div>class component</div>
//   }
// }

export default App
