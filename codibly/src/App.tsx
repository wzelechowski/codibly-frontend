import EnergyCharts from './components/EnergyCharts';
import ChargingForm from './components/ChargingForm';

function App() {
    return (
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                UK Energy Dashboard
            </h1>

            <section>
                <EnergyCharts />
            </section>

            <section>
                <ChargingForm />
            </section>
        </main>
    );
}

export default App;