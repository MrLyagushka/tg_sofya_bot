import { useState } from "react"

import Header from "./components/Header"
import Info from "./components/Info"
import VozmoznoctiBota from "./components/VozmoznoctiBota"
import InFuture from "./components/InFuture"
import FeedBack from "./components/FeedBack"
import TabSection from "./components/TabSection"

export default function App() {
   const [tab, setTab] = useState('feedback')

  return (
    <div>
      <Header />
      <main>
        <TabSection active={tab} onChange={(current) => setTab(current)} />

        {tab === 'main' && <> 
        <VozmoznoctiBota />
        <InFuture />
        </>}
        {tab === 'feedback' && <> 
        <FeedBack />
        </>}
        
        
      </main>
    </div>
  )
}