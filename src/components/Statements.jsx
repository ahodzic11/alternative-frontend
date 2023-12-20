import React from "react";
import "./../css/Statements.css";

function Statements() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const path = runningModePath + "/newuploads/staff/";

  return (
    <>
      <div id="othersAboutUsPoint"></div>
      <div class="heading text-center">
        <h2>ŠTA DRUGI KAŽU O NAMA</h2>
      </div>
      <div class="container">
        <div class="row text-center">
          <div class="col-md-12">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="500000">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
              </ol>

              <div class="carousel-inner">
                <div class="carousel-item active text-center">
                  <div className="oneContainer">
                    <img src={path + "esmin-brodlija.jpg"} alt="" class="center-block team" />
                    <h3>Esmin Brodlija</h3>
                    <h4>dipl. psiholog i geštalt psihoterapeut</h4>
                    <div className="othersDescription">
                      <p>
                        “Biti dio tima „Alternative“ Kakanj za mene predstavlja veliku čast i korak naprijed u profesionalnom i ličnom razvoju. Moj angažman u aktivnostima koje provodi NVO „Alternative“ pružio mi je mogućnost i zadovoljstvo da zajedno sa drugim članovima tima radim na unaprijeđenju mentalnog i socijalnog blagostanja, te zaštiti prava djece i roditelja, mladih, odraslih,
                        marginalizovanih grupa, te osoba koje su profesionalno angažirane da brinu o djeci i mladima. Uvid u pripreme, provođenje i evaluaciju aktivnosti daje mi za pravo da kažem da je prava čast i sreća imati „Alternative“ u BiH,a posebno u lokalnoj zajednici”.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "amila-brodlija.jpg"} alt="" class="center-block team" />
                    <h3>Amila Brodlija</h3>
                    <h4>socijalni radnik</h4>
                    <div className="othersDescription">
                      <p>
                        “Imala sam priliku učestvovati u radionicama za odrasle, ali sam i roditelj čije je dijete bilo uključeno u radionice koje je provodio tim NVO Alternative Kakanj i moje iskustvo je krajnje pozitivno, jer su radionice zabavne, inovativne, edukativne, destigmatizirajuće i promiču ljudska prava i odgovornosti. Posebno mi se dopada rad sa djecom koji u njima potiče kreativnosti
                        i uči ih pravim ljudskim vrijednostima.”
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "ajla-vehab-hrusto.jpg"} alt="" class="center-block team" />
                    <h3>Ajla Vehab Hrusto</h3>
                    <h4>magistar pedagogije</h4>
                    <div className="othersDescription">
                      <p>
                        Zahvaljujući UG „Alternative“ bogatim svoje iskustvo, stičem znanja, te razvijam vještine i umijeća, a sve pobrojano je mladoj, nezaposlenoj osobi od velikog značaja. Stekla sam nove, značajne kompetencije i usavršila postojeće radeći radionice u UG „Alternative“. Kroz trodnevnu edukaciju, družeći se sa iskusnim i stručnim osobama imala sam priliku raditi na sebi, čuti
                        nešto novo, potvrditi postojeća znanja i razviti nove vještine. Edukacija nam je omogućila širenje vidika, dolaženje do rješenja na različite načine, osvještavanje o aktuelnim problemima u našoj okolini, gledanje na stvari iz različitog ugla, te motiviranje za rad kako u lokalnoj zajednici, tako i na sebi. Svako na svoj način, iz oblasti u kojoj je stručnjak, doprinio je da
                        se edukacija uspješno privede kraju, te da se ostvari njen cilj. Moje je iskreno zadovoljstvo biti dio UG „Alternative“.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "azem-husika.jpg"} alt="" class="center-block team" />
                    <h3>Azem Husika</h3>
                    <h4>dipl. ing. saobraćaja</h4>
                    <div className="othersDescription">
                      <p>
                        Učešćem u trodnevnom treningu u okviru projekta “Alternative”: Kreativni centar – mjesto prevencije rodno zasnovanog nasilja, imao sam priliku upoznati i družiti se sa ljudima čije su ideje inspirativne i indikator su da se naše društvo razvija u pravom smjeru. Ipak, sve to ne bi bilo moguće da NVO ‘Alternative’ nije dala priliku i okupila kvalitetnu ekipu koja je dala svoj
                        doprinos razvoju ovog projekta. Ova organizacija zaista pruža ljudima različitih profila i životne dobi da sve svoje ideje pretvore u konstruktivne, i za naše društvo jako bitne projekte.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "vildana-neimarlija.jpg"} alt="" class="center-block team" />
                    <h3>Vildana Neimarlija</h3>
                    <h4>prof. pedagogije i psihologije</h4>
                    <div className="othersDescription">
                      <p>
                        „Alternative“ pratim sve vrijeme njihovog postojanja, 20 godina. U početku sam kao oduševljeni posmatrač i, većinom, pozitivni kritizer pratila raznovrsne aktivnosti „Alternativa“ čudeći se aktuelnom, kreativnom i praktičnom izboru problema i aktivnosti uvijek sposobnog tima „Alternativa“ sa Maksumom Topalović na čelu. Takvim izborom problema za projekte i aktivnosti davali
                        su uvijek veliki doprinos lokalnoj zajednici i šire. Nekim problemima su se prvo i jedino Alternative bavile.Tako je bilo i prije tri godine kada sam se kao pedagog i psiholog uključila u Projekt koji se bavi temom rodno zasnovanog nasilja i tu sam kao trener i aktivni sudionik uvidjela profesionalizam „Alternativa“ , te spoznala pravu vrijednost rada na odgoju djece i
                        mladih kroz aktivnosti fantastičnog tima ovog udruženja čiji sam član s ponosom postala i ja. Hvala „Alternativama“ i Maksumi što su mi dali priliku da radim u sjajnom i korisnom projektu, te se nadam da ćemo i ubuduće surađuvati na značajnim, inovativnim i korisnim projektima.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "admira-seper.jpg"} alt="" class="center-block team" />
                    <h3>Admira Šeper</h3>
                    <h4>prof. engleskog jezika i književnosti</h4>
                    <div className="othersDescription">
                      <p>
                        “Alternative” Kakanj ima veliki značaj u razvoju našeg društva jer zagovara pozitivne promjene u našoj zajednici. Poseban akcenat se stavlja na mlade, zapošljavanju istih te kroz redovne i raznovrsne radionice se pozitivno utiče na razvoj najmlađih-djece.. Nadam se da će u skorije vrijeme “Alternative” imati jak uticaj na podizanje kolektivne svijesti naše zajednice što je
                        ujedno i najbolji način koji omogučava veće promjene u našem društvu.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "jelena-rados.jpg"} alt="" class="center-block team" />
                    <h3>Jelena Radoš</h3>
                    <h4>prof. engleskog jezika i književnosti</h4>
                    <div className="othersDescription">
                      <p>
                        Dugi niz godina sam upoznata sa radom NVO „Alternative“, a i sama sam bila dio tima u nekim projektima i seminarima. Kroz seminare koje je organizovala NVO „Alternative“ sam definitivno naučila dosta o raznim temama i problemima, te kroz predavanja i razgovore sa stručnim osobama naučila kako doći do rješenja i glavnih ciljeva. Organizacija koja se bazira na rad sa mladima
                        definitivno treba potpunu podršku okoline i lokalne zajednice. NVO „Alternative“ je uvijek bila okružena stručnim ljudima iz raznih oblasti, te mi je veliko zadovoljstvo što sam dosta puta i sama bila dio tog tima. Sa sjajnim rezultatima i postignućima iza sebe, NVO „Alternative“ je organizacija o kojoj će se još dugo pričati.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item text-center">
                  <div className="oneContainer">
                    <img src={path + "naida-bukvic.jpg"} alt="" class="center-block team" />
                    <h3>Naida Bukvić</h3>
                    <h4>dipl. pravnica</h4>
                    <div className="othersDescription">
                      <p>
                        Osmogodišnji angažman u aktivnostima koje provodi NVO „Alternative“ za mene kao mladu osobu, osim mogućnosti da svoje slobodno vrijeme iskoristim na jedan produktivan način, doprinijelo je i razvoju komunikacijskih vještina, odgovornosti, empatije te praktičnih iskustava koja mogu biti korisna u životnim situacijama koja su pred nama. „Alternative“ nisu obična organizacija
                        sastavljena od par ljudi koji funkcionišu po ustaljenom rasporedu. Naprotiv, to je jedna mala porodica u kojoj svako na svoj način, nesebično dijeleći znanje,iskustvo i pružajući podršku teži jednom cilju, rješavanju problema . NVO „Alternative“ nerijetko i prve, u prvi plan stavljaju probleme od velike važnosti kako za lokalnu zajednicu tako i za cjelokupno društvo,
                        aktuelizira ih te javnosti nudi konkretna i praktična rješenja. Pozitivan utjecaj ove organizacije i njenog tima uveliko je djelovao na formiranje moje ličnosti i individualnog razvoja.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev control" data-target="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="fa fa-angle-left icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next control" data-target="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="fa fa-angle-right icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statements;
