import React from "react";
import izudinImage from "./../assets/izudinImage.jpg";
import harisImage from "./../assets/harisImage.jpg";
import almaImage from "./../assets/almaImage.jpg";
import nedimImage from "./../assets/nedimImage.jpg";
import mirzaImage from "./../assets/mirzaImage.png";
import adnanImage from "./../assets/adnanImage.png";
import mirhaImage from "./../assets/mirhaImage.jpg";
import maksumaImage from "./../assets/maksumaImage.png";
import esminImage from "./../assets/esminImage.jpg";
import ajlaImage from "./../assets/ajlaImage.jpg";
import dzenanImage from "./../assets/dzenanImage.png";
import marinaImage from "./../assets/marinaImage.png";
import daliborImage from "./../assets/daliborImage.jpg";
import enaImage from "./../assets/enaImage.jpg";
import editaImage from "./../assets/editaImage.jpg";
import aliImage from "./../assets/aliImage.jpg";
import nejraImage from "./../assets/nejraImage.jpg";
import fatimaImage from "./../assets/fatimaImage.jpg";
import dejanImage from "./../assets/dejanImage.png";
import aidaImage from "./../assets/aidaImage.jpg";
import ajdinImage from "./../assets/ajdinImage.jpg";
import adisImage from "./../assets/adisImage.jpg";
import eminImage from "./../assets/eminImage.jpg";
import amelImage from "./../assets/amelImage.jpg";
import enaSikiraImage from "./../assets/enaSikiraImage.jpg";
import GoToTop from "./GoToTop";
import "./../css/OurTeam.css";

//preuredit da radi sa bazom
function OurTeam() {
  const FadeInSection = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? " is-visible" : "ourTeamSection"}>
        {children}
      </section>
    );
  };

  return (
    <>
      <GoToTop />
      <div className="outterContainer">
        <div id="donatorField" className="heading text-center">
          <h2>NAŠ TIM</h2>
          <div className="underlineContainer"></div>
        </div>
        <div class="responsive-container-block container">
          <div class="responsive-container-block">
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={daliborImage} />
                  </div>
                  <p class="text-blk name">Dalibor Lovrić</p>
                  <p class="text-blk position">Predsjednik Skupštine</p>
                  <p class="text-blk feature-text">Aktivan od 1999.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={dzenanImage} />
                  </div>
                  <p class="text-blk name">Dženan Šarić</p>
                  <p class="text-blk position">Predsjednik Upravnog odbora</p>
                  <p class="text-blk feature-text">Aktivan od 1999.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={izudinImage} />
                  </div>
                  <p class="text-blk name">Izudin Neimarlija</p>
                  <p class="text-blk position">Član upravnog odbora</p>
                  <p class="text-blk feature-text">Aktivan od 2004.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={marinaImage} />
                  </div>
                  <p class="text-blk name">Marina Andrijević</p>
                  <p class="text-blk position">Članica upravnog odbora</p>
                  <p class="text-blk feature-text">Aktivna od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={fatimaImage} />
                  </div>
                  <p class="text-blk name">Fatima Neimarlija</p>
                  <p class="text-blk position">Članica upravnog odbora</p>
                  <p class="text-blk feature-text">Aktivna od 2017.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={esminImage} />
                  </div>
                  <p class="text-blk name">Esmin Brodlija</p>
                  <p class="text-blk position">Član upravnog odbora</p>
                  <p class="text-blk feature-text">Aktivan od 2016.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={maksumaImage} />
                  </div>
                  <p class="text-blk name">Maksuma Topalović</p>
                  <p class="text-blk position">Izvršna direktorica</p>
                  <p class="text-blk feature-text">Aktivna od 1998.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={ajlaImage} />
                  </div>
                  <p class="text-blk name">Ajla Vehab Hrusto</p>
                  <p class="text-blk position">Programska koordinatorica</p>
                  <p class="text-blk feature-text">Aktivna od 2016.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={mirhaImage} />
                  </div>
                  <p class="text-blk name">Mirha Husika</p>
                  <p class="text-blk position">Projektna koordinatorica</p>
                  <p class="text-blk feature-text">Aktivna od 1999.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={dejanImage} />
                  </div>
                  <p class="text-blk name">Dejan Terzić</p>
                  <p class="text-blk position">IT koordinator</p>
                  <p class="text-blk feature-text">Aktivan od 2016.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={nedimImage} />
                  </div>
                  <p class="text-blk name">Nedim Hasagić</p>
                  <p class="text-blk position">Projektni koordinator</p>
                  <p class="text-blk feature-text">Aktivan od 2016.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={almaImage} />
                  </div>
                  <p class="text-blk name">Alma Omerbegović</p>
                  <p class="text-blk position">Projektna koordinatorica</p>
                  <p class="text-blk feature-text">Aktivna od 2012.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={adnanImage} />
                  </div>
                  <p class="text-blk name">Adnan Hodžić</p>
                  <p class="text-blk position">Koordinator za mlade u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={mirzaImage} />
                  </div>
                  <p class="text-blk name">Mirza Neimarlija</p>
                  <p class="text-blk position">Koordinator za mlade u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={harisImage} />
                  </div>
                  <p class="text-blk name">Haris Husika</p>
                  <p class="text-blk position">Terenski koordinator</p>
                  <p class="text-blk feature-text">Aktivan od 2022.</p>
                </div>
              </div>
            </FadeInSection>
          </div>
          <FadeInSection>
            <p class="text-blk team-head-text">Kreativni inovacijski centar Kakanj</p>
          </FadeInSection>

          <div class="responsive-container-block">
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={enaSikiraImage} />
                  </div>
                  <p class="text-blk name">Ena Sikira</p>
                  <p class="text-blk position">Volonterka u KICK-u</p>
                  <p class="text-blk feature-text">Aktivna od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={ajdinImage} />
                  </div>
                  <p class="text-blk name">Ajdin Husika</p>
                  <p class="text-blk position">Volonter u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={aidaImage} />
                  </div>
                  <p class="text-blk name">Aida Tirić</p>
                  <p class="text-blk position">Volonterka u KICK-u</p>
                  <p class="text-blk feature-text">Aktivna od 2018.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={enaImage} />
                  </div>
                  <p class="text-blk name">Ena Begić</p>
                  <p class="text-blk position">Volonterka u KICK-u</p>
                  <p class="text-blk feature-text">Aktivna od 2020.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={editaImage} />
                  </div>
                  <p class="text-blk name">Edita Škulj</p>
                  <p class="text-blk position">Volonterka u KICK-u</p>
                  <p class="text-blk feature-text">Aktivna od 2020.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={aliImage} />
                  </div>
                  <p class="text-blk name">Ali-Harun Neimarlija</p>
                  <p class="text-blk position">Volonter u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2022.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={nejraImage} />
                  </div>
                  <p class="text-blk name">Nejra Begovac</p>
                  <p class="text-blk position">Volonterka u KICK-u</p>
                  <p class="text-blk feature-text">Aktivna od 2022.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={amelImage} />
                  </div>
                  <p class="text-blk name">Amel Husika</p>
                  <p class="text-blk position">Volonter u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2022.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={eminImage} />
                  </div>
                  <p class="text-blk name">Emin Hodžić</p>
                  <p class="text-blk position">Volonter u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan od 2022.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src={adisImage} />
                  </div>
                  <p class="text-blk name">Adis Alajbegović</p>
                  <p class="text-blk position">Volonter u KICK-u</p>
                  <p class="text-blk feature-text">Aktivan: 2018. - 2020.</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurTeam;
