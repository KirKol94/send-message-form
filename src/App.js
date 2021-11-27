import React, { useState } from 'react'
import Form from './components/Form'
import Info from './components/Info'
import Result from './components/Result'

export default function App() {
  const [showResult, setShowResult] = useState(false)
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="app row">

      <div className="col-12">
        {showForm && (
          <Form
            setShowResult={setShowResult}
            setShowForm={setShowForm}
          />
        )}

        {showResult && (
          <Result
            setShowResult={setShowResult}
            setShowForm={setShowForm}
          />
        )}

        <Info />
      </div>
    </div>
  )
}
