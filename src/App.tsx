import './App.css'
import { Button, Card, SecurityBar, SectionTitle } from './components/ui'

function App() {
  return (
    <>
      <SecurityBar />
      <section style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', backgroundColor: '#0f0f11', color: 'white', minHeight: '100vh' }}>
        <SectionTitle title="UI Components Showcase" subtitle="Here are the custom components you built" />
        
        <Card title="Example Card" description="This is an example card component using your UI library." style={{ maxWidth: '400px', width: '100%' }}>
          <p style={{ marginBottom: '1rem', color: '#888' }}>You can place any content inside the card.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" isLoading>Loading</Button>
          </div>
        </Card>
      </section>
    </>
  )
}

export default App
