import "./About.css";
import brunchBg from "../../assets/brunchBg.svg";

function About() {
  return (
    <section className="about-section">
      <img className="about__bg-image" src={brunchBg} alt="breakfast image" />
      <article className="about__textbox">
        <h1 className="about__textbox-heading">
          Vår Historia och Vår <span className="about__textbox-heading--orange">Passion</span> för
          Frukost
        </h1>
        <p className="about__textbox-text">
          Välkommen till Dilivery for Breakfast! Vi är en nystartad frukostrestaurang som brinner
          för att skapa den bästa starten på din dag.
          <br />
          <br />
          Vår resa började med en enkel idé: att samla det bästa av morgonens smaker i en härlig
          atmosfär där alla kan känna sig välkomna. Som grundare delar vi en passion för frukost som
          inte bara mättar, utan också skapar en stund av lugn, gemenskap och njutning.
          <br />
          <br />
          Vi tror på värdet av lokala råvaror och hållbarhet. Därför samarbetar vi med noga utvalda
          leverantörer som delar vår vision om naturliga och miljövänliga produkter. Allt från
          nybakade bröd och färska bär till vår hemgjorda granola är noggrant framtaget för att ge
          dig en smakupplevelse som både är god och omtänksam för vår planet.
        </p>
      </article>
    </section>
  );
}

export default About;

// Författare: Adréan
