import NotificationButton from "./Components/NotificationButton";
import Header from "./Components/Header";
import SalesCard from "./Components/SalesCard"

function App() {
    return (
        <div className="Container">
            <Header></Header>
            <main>
                <section id="sales">
                    <div className="dsmeta-container">
                      <SalesCard></SalesCard>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
