import React, { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import GoToTop from "../components/GoToTop";
import "./../css/Historijat.css";

function Historijat() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
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
      <section ref={domRef} className={isVisible ? " rezime-visible" : ""}>
        {children}
      </section>
    );
  };
  const prikaziViseManje = (e) => {
    e.preventDefault();
    var prikaziViseText = document.getElementById(e.target.id);
    if (prikaziViseText.innerHTML == "Prikaži više") prikaziViseText.innerHTML = "Prikaži manje";
    else if (prikaziViseText.innerHTML == "Prikaži manje") prikaziViseText.innerHTML = "Prikaži više";
    var index = e.target.id.replace("showMore", "");
    var moreText = document.getElementById("showMoreText" + e.target.id);
    if (prikaziViseText.innerHTML == "Prikaži manje") moreText.style.maxHeight = "5000px";
    else moreText.style.maxHeight = "0px";
  };

  const FadeInSectionLeft = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries);
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
      <section ref={domRef} className={isVisible ? " is-visible" : "sectionLeft"}>
        {children}
      </section>
    );
  };

  const FadeInSectionRight = ({ children }) => {
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
      <section ref={domRef} className={isVisible ? " is-visible" : "sectionRight"}>
        {children}
      </section>
    );
  };

  //210 css file - transition: max-height 1s ease-in-out;
  return (
    <>
      <Navigation />
      <div className="historijatContainer">
        <div id="donatorField" className="heading text-center">
          <h2>HISTORIJAT</h2>
          <div className="underlineContainer"></div>
        </div>
        <div className="timeline">
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>1997</h2>
                  <p>KAKO JE SVE POČELO?</p>
                </div>
                <div className="content-text">
                  <div className="content-row">
                    Neposredno poslije rata u Bosni i Hercegovini grupa žena sa rekreacije u „Partizanu“ osnovala je udruženje „Alternative“ Kakanj s ciljem da saznaju gdje im se nalaze prijateljice koje su tokom rata napustile Kakanj i imaju li namjeru vratiti se. S obzirom na brojne opstrukcije povratku od strane vlasti, koje su se deklarativno pred međunarodnom zajednicom izjašnjavala za
                    povratak a u praksi sve činile da do povratka ne dođe, bila je hrabrost organizovati udruženje koje će podržati proces povratka.
                  </div>
                  <div id="showMoreTextshowMore0" className="showMoreText">
                    <div className="content-row">Prvi projekat udruženja „Podrška povratku raseljenih i izbjeglih osoba u općinu Kakanj“ podržan je od strane UMCOR-a – United Methodist Committe on Relief.</div>
                    <div className="content-row">Projekat je imao snažnu podršku OSCE-a – Ured za demokratizaciju u Varešu. </div>
                    <div className="content-row">Realizacija projekta se odvija u općinama: Kakanj, Drvar, Zenica,Tasovčići (Čapljina), Livno, Ljubuški, Posušje, Stolac i Vareš. </div>
                    <div className="content-row">Paralelno sa podrškom procesu povratka među prvim projektima udruženja bili su projekti i aktivnosti koji su odgovorili na potrebe djece, mladih i žena u općini Kakanj. Udruženje pokreće ekološku sekciju, muzičku školu i školu ritmike za djecu te projekte za osnaživanje djevojka i žena za aktivno učešće u razvoju zajednice.</div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/kakoJeSvePocelo.jpg"} />
                      <div className="image-description">Posjeta Celeste Sheib direktorice Američkog ORT-a kancelariji „Alternative“, DemNET/USAID program</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore0" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>1998</h2>
                  <p>OSNIVANJE</p>
                </div>
                <div className="content-text">
                  <div className="content-row">17.2.1998. Osnivačka skupština udruženja. Prisutno 30 osnivačica.</div>
                  <div className="content-row">24.2.1998. registrovano je udruženje građana pod nazivom: Forum žena "Alternative" Kakanj u Ministarstvu za pravosuđe i upravu Zeničko-dobojskog kantona.</div>
                  <div id="showMoreTextshowMore1" className="showMoreText">
                    <div className="content-row">Upis promjena u registar udruženja ZDK: </div>
                    <ul>
                      <li>12.4.2004. u skladu sa Zakonom o udruženjima građana i fondacijama, Udruženje mijenja naziv iz Forum žena „Alternative“ Kakanj u Udruženje građana „Alternative“ Kakanj </li>
                      <li>16.4.2009. Iz naziva Udruženje građana „Alternative“ Kakanj se briše riječ građana te ostaje samo Udruženje „Alternative Kakanj, u skladu sa Zakonom o Udreženjima i fondacijama </li>
                      <li>19.6.2018. - 19.6.2018. Udruženja mijenja dijelove Statuta na način da se uvodi rodno senzitivan jezik i jasnije definišu ciljevi i djelovanje udruženja </li>
                    </ul>
                    <div className="content-row">Od osnivanja pa sve do danas (2023.) “Alternative” se razvijaju u jaku i pouzdanu organizaciju - organizaciju kojoj se vjeruje. </div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/osnivanje.jpg"} />
                      <div className="image-description">Sjednica Upravnog odbora udruženja Alternative</div>
                    </div>
                  </div>
                  <div className="showMoreButton">
                    <div id="showMore1" className="showMoreButtonText" onClick={prikaziViseManje}>
                      Prikaži više
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>1998-2000</h2>
                  <p>PODRŠKA POVRATKU I IZGRADNJA POVJERENJA</p>
                </div>
                <div className="content-text">
                  <div className="content-row">Karakteristično za ovaj period su opstrukcije povratka od strane vlasti s jedne strane i strah ljudi da govore o povratku ili se vrate na svoja ognjišta, s druge strane. Naravno, treba uzeti u obzir činjenicu da se nisu svi željeli vratiti.</div>
                  <div id="showMoreTextshowMore2" className="showMoreText">
                    <div className="content-row">
                      Iz ovog perioda aktivistkinje udruženja (Forum žena „Alternative“ Kakanj) nose tužna sjećanja na prijetnje organiziranih grupa ljudi iz Kaknja i Vareša smještenih u Drvaru, da će biti kamenovane ako tamo dođu govoriti o povratku. Nisu zaboravljene ni pogrdne riječi i pljuvanje aktivistica od strane nekolicine kakanjki smještenih u izbjegličkom kampu Tasovčići, a ni otpor
                      tadašnje lokalne i drugih nivoa vlada prema povratku.{" "}
                    </div>
                    <div className="content-row">
                      Nismo se pokolebali, naprotiv. Vjetar u leđa daju nam oni ljudi koji su željno iščekivali prve informacije o svojim napuštenim domovima, rodbini, prijateljima i mogućnostima povratka. Nije izostajala ni podrška međunarodne zajednice. Alternative postaju aktivni saradnici OCCE-u (Ured za demokratizaciju u Varešu) u brojnim inicijativama podrške povratkuu općine Kakanj i Vareš
                      iz općina Drvar i Čapljina.{" "}
                    </div>
                    <div className="content-row">Važno je naglasiti da su „Alternative“ radile po principu da se nitko ne ubjeđuje ili moli na povratak već da se svima koji to žele prenesu informacije o pravu na povratak. U svim aktivnostima udruženje zagovara slobodu izbora mjesta življenja za svakog čovjeka, ali ne na tuđem ognjištu. </div>
                    <div className="content-row">Kako je vrijeme prolazilo , informiranost ljudi se poboljšavala, strah je nestajao a projekti udruženja su bili sve snažnije podržavani te multiplicirani na druga područja Bosne i Hercegovine.</div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/podrska-povratku-i-izgradnja-povjerenja.jpg"} />
                      <div className="image-description">Informativni bilten za povratnike, Realizacija Alternative Kakanj, Pokrovitelj CRS, Finansiran u saradnji sa BPRM</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore2" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2001</h2>
                  <p>PODRŠKA ODRŽIVOM POVRATKU</p>
                </div>
                <div className="content-text">
                  <div className="content-row">
                    Proces povratka postaje organiziraniji. U početku, samo deklarativna podrška vlasti, pod pritiskom Međunarodne zajednice polako i ne baš svugdje uvjerljivo, postaje konkretnija. To je vrijeme u kojem Forum žena „Alternative“ Kakanj jasno identifikuju prioritete djelovanja. Aktivnosti ohrabrivanja povratka, uključujući informiranost i izgradnju pomirenja i povjerenja u
                    zajednici, nadopunjuju se aktivnostima podrške dvosmjernom i održivom povratku.
                  </div>
                  <div id="showMoreTextshowMore3" className="showMoreText">
                    <div className="content-row">Osim projekata poboljšanja informiranosti o projektu koji uključuje i informacije sa terena o stanju obnovljenih kuća Alternative rade na pružanju psiho-socijalne podrške povratnicima u Kakanj uz podršku CRS-a (Catholic Relief Services). </div>
                    <div className="content-row">
                      Sa sudjelovanjem u projektu ASB-a u BiH (Arbeiter-Samariter-Bund) kroz CARDS program u Kaknju „Alternative“ doprinose obnovi 20 kuća i stanova i podršci razvoja obiteljskih biznisa te lobiraju za podršku lokalne samouprave u obnovi 3 kuće za povratničke porodice. Nekako u vrijeme završetka projekta sa ASB-om počinje planirana i organiziranija podrška povratku od strane BiH
                      vlade. Na lokalnu samoupravu prenose se veće odgovornosti u procesu povratka a „Alternative“ neko vrijeme imaju predstavnika u općinskoj komisiji za dodjelu sredstava namijenjenih povratnicima.
                    </div>
                    <div className="content-row">U jednom kraćem periodu udruženje Alternative uspostavlja lokalni Forum za podršku povratku kroz koji se aktivno uključuju lokalne OCD i pojedinci. </div>
                    <div className="content-row">U ovom razdoblju nismo imali podršku lokalne vlasti. Naprotiv, odbijali su nas primiti i vrlo suzdržano razgovarali s nama na sastancima i konferencijama o organizaciji Međunarodne zajednice. </div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/podrska-odrzivom-povratku.jpg"} />
                      <div className="image-description">Informativni bilten za povratnike, Realizacija Alternative Kakanj, Pokrovitelj CRS, Finansiran u saradnji sa BPRM</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore3" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2001-2002</h2>
                  <p>ZAGOVARANJE PRAVA POVRATNIKA</p>
                </div>
                <div className="content-text">
                  <div className="content-row">Iz projekata namijenjenih projektu izdvajamo: Kampanja za izmjenu Zakona o otkupu stanova i ukidanju Odluke o kontroli korištenja stanova</div>
                  <div id="showMoreTextshowMore4" className="showMoreText">
                    <div className="content-row">
                      Uspjeli smo u svojoj nakani da vlasti produže važnost certifikata kod otkupa stana za povratnike u čemu nas je podržao OSCE i OHR. Također, Skupština Ze-Do kantona u drugoj polovini Januara 2001. donosi Odluku o ukidanju kontrole korištenja stanova. U akciji smo se obratili na adrese OHR-a, OSCE-a, Vlade FBiH i Ustavnog suda ali je ključnu ulogu u donošenju odluke imalo pismo
                      kojeg su OSCE, UNMBiH, OHR, UNHCR i CRPC poslali svim kantonalnim Ministrima pravde u kojem su napisali da se prema njihovim saznanjima zakoni i propisi o inspekciji i kontroli korištenja stanova u društvenom vlasništvu često koriste na diskriminatoran način.
                    </div>
                    <div className="content-row">Organizirali smo javne tribine, potpisivanje peticije i sastanke sa raseljenim i izbjeglim osobama</div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/zagovaranje-prava-povratnika.jpg"} />
                      <div className="image-description">Informativni bilten za povratnike, Realizacija Alternative Kakanj, Pokrovitelj UMCOR</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore4" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>1999-2000</h2>
                  <p>INSTITUCIONALNO JAČANJE</p>
                </div>
                <div className="content-text">
                  <div className="content-row">DemNet</div>
                  <div className="content-row">Na putu razvoja, od neformalne grupe građana do dobro organiziranog udruženja, ključnu ulogu je imala Dem Net/ORT (Demokratska mreža) -, a kasnije DemNet/ADF podržan sredstvima USAID-a. </div>
                  <div id="showMoreTextshowMore5" className="showMoreText">
                    <div className="content-row">Udruženje „Alternative“ je među prvih deset NVO-a u BiH koje su u snažnoj konkurenciji i prema zahtjevnim kriterijima odabrane da budu prve članice DemNet u BiH.</div>
                    <div className="content-row">U prvim godinama saradnje DemNet podržava institucionalni razvoj organizacija s ciljem da ih osnaži u kreiranju projekata i željenih promjena okruženju. </div>
                    <div className="content-row">
                      U periodu podrške institucionalnog osnaživanja „Alternative“ propituju misiju, načina funkcioniranja upravnih tijela, efektivnosti rada izvršnog osoblja i provode druga istraživanja i procjene u organizaciji i u okruženju u kojem djeluje. S tim u vezi, udruženje razvija Pravilnike rada i radi na usklađivanju Statuta i drugih dokumenta sa međunarodnim standardima, po kojima
                      radi najveći broj nevladinih organizacija u razvijenim zemljama svijeta. Pri tome vodi računa o usaglašenosti sa domaćim zakonodavstvom.{" "}
                    </div>
                    <div className="content-row">Već od ranije, udruženje aktivno sudjeluje u grupi NVO-a koja je inicirala i radila na izradi nacrta Zakona o udruženjima i Fondacijama u BiH.</div>
                    <div className="content-row">Šta se suštinski promijenilo?</div>
                    <div className="content-row">
                      Uvodi se „pozitivno agresivniji“ pristup donatorima i razvija više projekata. Prati se i evaluira rad svakog pojedinca, i od svakog se traži više. Nekoliko članica ne uspijeva odgovoriti zahtjevnim zadaćama. Oni koji su ostali, danas su uspješni menadžeri, treneri i koordinatori na projektima. Njima se pridružuju mladi ljudi iz Kaknja. Svi zajedno, uspijevamo odgovoriti na
                      konkretne potrebe korisnika i sve složenije kriterije donatora.
                    </div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/institucionalno-jacanje.jpg"} />
                      <div className="image-description">Bilten Alternative, Podržava NVO Fondacija BiH, Finansirano od Care i CIDA</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore5" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2000-2004</h2>
                  <p>UKLJUČENOST GRAĐANA</p>
                </div>
                <div className="content-text">
                  <div className="content-row">Od 2000. pa nadalje, „Alternative“ razvijaju kvalitetne radionice za odrasle i čine organizaciju prepoznatljivom kod domaćih i međunarodnih organizacija. </div>
                  <div id="showMoreTextshowMore6" className="showMoreText">
                    <div className="content-row">
                      Period poslije 2000. godine karaterišu projekti građanskih inicijativa i aktivnosti usmjerene na ohrabrenje građana za učešće u procesu donošenja odluka na lokalnom nivou i preuzimanje odgovornosti u planiranju i razvoju zajednice. Paralelno s tim udruženje kontinuirano radi na uspostavljanju i unapređenju suradnje sa lokalnim vladama u području unapređenja komunikacije i
                      uvjeta za učešće građana u procesima odlučivanja. U planiranju projekata „Alternative“ se oslanjanju na istraživanja u zajednici i participaciju građana te vode računa o elementima održivog razvoja.
                    </div>
                    <div className="content-row">Prve značajne projekte zadovoljenja praktičnih i strateških gender potreba udruženje počinje implementirati od 2001. godine., a od 2004. počinje raditi na ekonomskom osnaživanju žena kroz podršku razvoju ženskog poduzetništva i solidarnosti i stvaranje okruženja za razvoj ženskog poduzetništva u ruralnim sredinama.</div>
                    <div className="content-row">
                      Tokom 2004. godine udruženje započinje značajne aktivnosti na prevenciji bolesti ovisnosti i aktivno se uključuje u promociju i podršku reformi sistema dječje zaštite. Tako je prvi plan prevencije bolesti ovisnosti u Kaknju razvijen je u okviru projekta Udruženja Alternative Kakanj implementoranog u partnerstvu sa Centrom za mentalno zdravlje Kakanj pri JU Dom zdravlja
                      Kakanj.
                    </div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/ukljucenost-gradana.jpg"} />
                      <div className="image-description">Bilten Žene u Poduzetništvu, realizacija NVO Alternative uz podršku BHWI</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore6" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2005-2006</h2>
                  <p>PRVI PROJEKTI PODRŽANI OD EU</p>
                </div>
                <div className="content-text">
                  <div className="content-row">U 2005./2006. dva projekta podržana su od EU (Delegacije Evropske Komisije u BiH). Oba projekta, osim odličnih i dobro vidljivih rezultata u 5 općina u kojima se odvijaju, pred nas stavljaju i veću odgovornost prema korisnicima i zajednicama. </div>
                  <div id="showMoreTextshowMore7" className="showMoreText">
                    <ul>
                      <li>Prvi projekat - bavi lokalnom demokratijom i EU integracijama, odobren je iz sredstava EIDHR projekta u iznosu od 76.074,00 EUR. </li>
                      <li>Iste godine (2005.) udruženje je dobilo sredstva za implementaciju projekta u oblasti turizma: Jačanje turizma kroz edukaciju i promociju regiji Centralna BiH – STEP u CBiH u iznosu od 166.665,34 EUR </li>
                    </ul>
                    <div className="content-row">Od 2005. udruženje postaje prepoznatljivo po organizaciji međunarodnih volonterkih ekoloških petnaestodnevnih kampova. </div>
                    <div className="twoImagesContainer">
                      <div className="content-image">
                        <img className="content-image-element" src={runningModePath + "/newuploads/historijat/prvi-projekti-podrzani-od-eu-1.jpg"} />
                        <div className="image-description">Bilten Jačanje turizma kroz edukaciju i promociju u regiji Centralne BiH - STEP u regiji CBIH, 2005. god.</div>
                      </div>
                      <div className="content-image">
                        <img className="content-image-element" src={runningModePath + "/newuploads/historijat/prvi-projekti-podrzani-od-eu-2.jpg"} />
                        <div className="image-description">Bilten Općine centralne BiH za Evropu, 2005. god., finansiran od Evropske Unije</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore7" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2007-2013</h2>
                  <p>JAČANJE ULOGE OCD-a</p>
                </div>
                <div className="content-text">
                  <div className="content-row">Alternative rade na Strategiji suradnje između lokalnih vlada i građana u 8 općina Centralne BiH. Projekat je podržan iz sredstava Olof Palme centar /SIDA. </div>
                  <div className="content-row">U augustu 2010. Alternative započinju projekat: „Jačanje transparentnosti u općinskim sudovima ZDK“. Projekat je finansiran iz sredstava USAID / JSDP II – sektor pravosuđa.</div>
                  <div id="showMoreTextshowMore8" className="showMoreText">
                    <div className="content-row">Iste godine NVO Alternative partner je Independent-u Zenica u projektu „Od socijalne inkluzije do socijalne zaštite“ finansiranom iz sredstava EU.</div>
                    <div className="content-row">2011. godine nastavljeni su projekti u oblasti turizma, ekologije i prevencije bolesti ovisnosti.</div>
                    <div className="content-row">U 2012. Alternative implementiraju projekat „Glasanje je naš izbor“ podržan od strane CCI iz sredstava USAID/CAPP II program - Građansko partnersko zastupanje</div>
                    <div className="content-row">2013. implementiran je projekat „Uloga lokalnih zajednica u EU integracijama“ u općinama Vitez, Busovača, Visoko, Travnik Žepče i Zavidovići, podržan sredstvima EU /IPA program – informisanje i komunikacija</div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/jacanje-uloge-ocda.jpg"} />
                      <div className="image-description">Odgovorno i održivo upravljanje mjesnim vodovodima, 2007. god.</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore8" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2014-2018</h2>
                  <p>PROMOCIJA UČEŠĆA ŽENA U POLITICI I EKOLOGIJA</p>
                </div>
                <div className="content-text">
                  <div className="content-row">2014. Udruženju „Alternative“ Kakanj odobren je prvi projekat Američka ambasade u Bosni i Hercegovini: „Ženski politički forum“ </div>
                  <div className="content-row">Projekat je fokusiran na promociju žena na kandidatskim listama – Opći izbori u BiH, i mobilizaciju građana da izađu na izbore. Kroz ovaj projekat počinjemo koristiti Formu Forum teatra kroz koji publika progovara o situaciji u lokalnoj zajednici na temelju uprizorenih scena iz svekodnevnog života. </div>
                  <div id="showMoreTextshowMore9" className="showMoreText">
                    <div className="content-row">2014. Zelena akcija, Hrvatska odobrava udruženju projekat „Budimo odgovorni u upravljanju vodama“. Projekat se implementira u okviru EU IPA PROGRAMA ETNAR – Mreža zagovaračkih NVO za održivo korištenje energije i prirodnih resursa u zemljama Zapadnog Balkana i Turskoj</div>
                    <div className="content-row">
                      Projekat se nastavlja 2015. i 2016. godine pod nešto izmijenjenim nazivom: „Održivo i odgovorno upravljanje seoskim vodovodima“. Prva MZ koju udruženje podržava da uspostavi odgovorno upravljanje vodovodom je Bukovlje u Kaknju. Podrška je podrazumijevala izradu, usvajanju i provođenju procedura uspostavljanja odgovornog upravljanja lokalnog vodovoda. Na temelju iskustava
                      udruženje priprema Vodič za uspostavljanje i odgovorno upravljanje seoskim vodovodom.
                    </div>
                    <div className="content-row">
                      2015.-2018: Prvi projekte u oblasti prevencije rodno zasnovanog nasilja podržani su sredstvima IN Fondacije – Fondacije za unapređenje socijalne inkluzije djece i mladih u BiH i Stichting Kinderpostzegels, Nederland. Alternative okupljaju tim stručnjaka za podršku projektu koji razvija kvalitetan trening materijal. U okviru ovog trogodišnjeg projekta već u prvoj godini
                      implementacije u prostoru Omladinskog centra „Alternative“ uspostavljaju Dječji kreativni centar kao sigurno mjesto za boravak i zdravo odrastanje djece i mladih.
                    </div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/promocija-ucesce-zena-u-politici-i-ekologija.jpg"} />
                      <div className="image-description">Forum teatar: "Gdje je žena u BiH društvu?"</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore9" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
          <FadeInSectionLeft>
            <div className="containersss left">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2018-2023</h2>
                  <p>KREATIVNI INOVACIJSKI CENTAR KAKANJ - KICK</p>
                </div>
                <div className="content-text">
                  <div className="content-row">Kick je uspostavljen 2018. godine podrškom Regionalnog programa lokalne demokratije na Zapadnom Balkanu – ReLOaD. Program finansira Evropska unija (EU), a implementira Razvojni program Ujedinjenih nacija (UNDP) </div>
                  <div id="showMoreTextshowMore10" className="showMoreText">
                    <div className="content-row">Od juna 2019. Kick postaje samoodrživ kroz razvoj projekata: Dječji kreativni program, Škola programiranja, Robotika, Mala škola engleskog jezika, Rođendanske zabave paralelno nastavljajući podršku mladima uključujući jednaku zastupljenost mladića i djevojaka u jačanju kompetencija za dalju edukaciju i zapošljavanje.</div>
                    <div className="content-row">Kick su u ovom periodu posjećivali brojni gosti među kojima Američki ambasador Eric Nelson i direktorica USAID-a Nancy J. Eslick posjetili su udruženje “Alternative” Kakanj i Kick . Ova posjeta potvrda je uspješnosti Alternativinih projekata.</div>
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/kreativni-inovacijski-centar-kakanj.jpg"} />
                      <div className="image-description">Otvorenje KICK-a, januar 2019. god.</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore10" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionLeft>
          <FadeInSectionRight>
            <div className="containersss right">
              <div className="content-item">
                <div className="content-headline">
                  <h2>2022-2023</h2>
                  <p>BOSNIA: BEYOND THE EMERGENCY</p>
                </div>
                <div className="content-text">
                  <div className="content-row">
                    Početak 2022. obilježen je aktivnostima namijenjenim razvoju svijesti građana o balkanskoj migrantskoj ruti i pripremi obiteljske sigurne kuće za prihvat porodice osoba u pokretu sa maloljetnom djecom – tražitelje azila. Jedno kratko vrijeme udomili smo jednu takvu porodicu na kraće vrijeme, što nam je bilo dovoljno da steknemo nova iskustva ali izgradimo i povjerenje zajednice
                    prema osobama pokretu.
                  </div>
                  <div id="showMoreTextshowMore11" className="showMoreText">
                    <div className="content-image">
                      <img className="content-image-element" src={runningModePath + "/newuploads/historijat/bosnia-beyond-the-emergency.jpg"} />
                      <div className="image-description">Prvi stanari migrantske kuće u Kaknju, novembar 2022. god.</div>
                    </div>
                  </div>
                </div>
                <div className="showMoreButton">
                  <div id="showMore11" className="showMoreButtonText" onClick={prikaziViseManje}>
                    Prikaži više
                  </div>
                </div>
              </div>
            </div>
          </FadeInSectionRight>
        </div>
        <FadeInSection>
          <div className="rezimeTitle">REZIME</div>
        </FadeInSection>
        <div className="rezimeText">
          <div className="content-row">Za prvo desetljeće rada vežu nas projekti u oblasti promocije i zaštite ljudskih prava naročito prava na povratak izbjeglih i raseljenih lica i institucionalni razvoj organizacije kroz DemNet program. </div>
          <div className="content-row">U drugom desetljeću osnažujemo građane i OCD za aktivnije učešće u životu lokalnih zajednica. Počinjemo aktivnije sudjelovanje u nadgledanju izbora i jačanju suradnje između lokalnih vlada i građana. </div>
          <div className="content-row">Tokom svih 25 godina djelovanja naša primarna ciljna grupa su mladi i žene. Kroz sve projekte vodimo računa o održivom razvoju lokalne zajednice, aktivnom učešću građana i jačanju civilnog društva.</div>
          <div className="content-row">Programski ciljevi kretali su se od podrške povratku do razvoja kulture demokracije na nivou lokalnih zajednica</div>
          <div className="content-row">Uposlenost u organizaciji kretala se od jedne do jedanaest osoba.</div>
          <div className="content-row">Svi uposleni posjeduju znanja i vještine u obavljanju poslova koji su im dodijeljeni</div>
          <div className="content-row">Upravni odbor čine ugledni ljudi u zajednici posvećeni razvoju demokratskog bosansko-hercegovačkog društva sa značajnim iskustvima i idejama koje unose u prijedloge projekata i razvoj organizacije</div>
          <div className="content-row">Tehnički smo kvalitetno, a od 2003. praktikujemo korištenje Internet učionica ili učenja na daljinu. Ovo iskustvo pomoglo nam je u vrijeme pandemije korona virusa i rad od kuće. U vrijeme pandemije organizujemo online radionice i plesne igraonice kako bismo roditeljima i djeci olakšali boravak u zatvorenom prostoru.</div>
          <div className="content-row">
            Naš trener je četiri godine aktivno surađivao sa E-net centrom pri Ekonomskom fakultetu u Sarajevu i Univerzitetom Alberta iz Kanade pružajući konsultantske i trenerske usluge u edukaciji općinskog menadžmenta na temu: „Strategija razvoja općina“ paralelno razvijajući vlastite kapacitete. U projektu „Općine središnje BiH za Evropu“ podržanog sredstvima EU, E-NET centar je partner
            udruženju Alternative Kakanj.
          </div>
          <div className="content-row">Educirali smo kvalitetne timove lokalnih trenera za razvoj vještina i znanja općinskih vijećnika posebno u području participativnog planiranja. Pripremili smo kvalitetne priručnike i timove trenera za edukaciju u oblasti prevencije rodno zasnovanog nasilja i prevencije bolesti ovisnosti. </div>
          <div className="content-row">Godišnji budžet organizacije kretao se od 8.732,84 KM do 382.819,95 KM odnosno 4.465,03 – 195.732,73 EUR.</div>
          <div className="content-row">Pored velikog broja međunarodnih donatora karakteriše nas činjenica da osiguravamo i značajna sredstva iz domaćih izvora. U početku našeg djelovanja nismo imali podršku lokalne ni drugih nivoa vlada a a danas bilježimo podršku od lokalne zajednice, preko kantona i Federacije do državnog nivoa Bosne i Hercegovine. </div>
          <div className="content-row">Godišnje u prosjeku implementiramo 5-6 projekta i 50 – 65 radionica. </div>
          <div className="content-row">U dvadesetpetogodišnjem radu implementirali smo 147 projekta i brojne aktivnosti u skladu sa našom misijom, vizijom i principima djelovanja.</div>
        </div>
      </div>
      <GoToTop />
      <Footer />
    </>
  );
}

export default Historijat;
