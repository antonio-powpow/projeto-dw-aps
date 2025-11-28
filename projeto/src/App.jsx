import styles from './App.module.css'
import seta from '/src/assets/seta.png';


function App() {


  return (
    <>
      <div className={styles.body}>
        <div className={styles.card}>
          <div className={styles.titleCard}><img src={seta} alt="seta" className={styles.setaCard} />
            Quiz da gincana da UTFPR</div>
          <div>"Teste seus conhecimentos e prepare-se para a gincana. A vitória começa aqui!"</div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default App
