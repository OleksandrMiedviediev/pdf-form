import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import css from "./InfoMeldunek.module.css";

export default function InfoMeldunek() {
  return (
    <Accordion className={css.infoBox}>

      <AccordionItem className={css.item} header="Kto składa dokumenty / Who submits documents? / Хто подає документи?">
        <p>Możesz się zameldować osobiście lub przez pełnomocnika. Swojego pełnomocnictwa możesz mu udzielić wyłącznie na piśmie.</p>
        <p>Rodzic, opiekun prawny lub opiekun faktyczny, który sprawuje opiekę w miejscu wspólnego pobytu, może zameldować osobę, która:</p>
        <ul>
          <li>nie ma zdolności do czynności prawnych (osoby całkowicie ubezwłasnowolnione, dzieci do 13 lat)</li>
          <li>ma ograniczoną zdolność do czynności prawnych (osoby częściowo ubezwłasnowolnione, dzieci w wieku od 13 do 18 lat)</li>
        </ul>

        <p>You can register yourself or via an authorized person. The authorization must be given in writing.</p>
        <p>A parent, legal guardian, or actual caregiver at the same residence can register a person who:</p>
        <ul>
          <li>has no legal capacity (fully incapacitated persons, children under 13)</li>
          <li>has limited legal capacity (partially incapacitated persons, children 13–18 years)</li>
        </ul>

        <p>Ви можете зареєструватися особисто або через уповноважену особу. Доручення має бути у письмовій формі.</p>
        <p>Батько, законний опікун або фактичний опікун на спільному місці проживання може зареєструвати особу, яка:</p>
        <ul>
          <li>не має правоздатності (повністю недієздатні, діти до 13 років)</li>
          <li>має обмежену правоздатність (частково недієздатні, діти від 13 до 18 років)</li>
        </ul>
      </AccordionItem>

      <AccordionItem className={css.item} header="Co musisz przygotować? / What to prepare? / Що потрібно підготувати?">
        <p>Formularz zgłoszenia pobytu czasowego, ważny dokument podróży, wizę.</p>
        <p>Jeśli jesteś w Polsce w ramach ruchu bezwizowego albo czekasz na wydanie decyzji w sprawie udzielenia zezwolenia na pobyt czasowy lub stały, przygotuj:</p>
        <ul>
          <li>ważny dokument podróży</li>
          <li>JEDEN z poniższych dokumentów:
            <ul>
              <li>tymczasowe zaświadczenie tożsamości cudzoziemca</li>
              <li>kartę pobytu</li>
              <li>zezwolenie na pobyt czasowy</li>
              <li>zezwolenie na pobyt stały</li>
              <li>zezwolenie na pobyt rezydenta długoterminowego UE</li>
              <li>decyzję o nadaniu statusu uchodźcy lub ochrony</li>
            </ul>
          </li>
          <li>Jeśli jesteś właścicielem lub masz inny tytuł prawny do mieszkania, przygotuj JEDEN dokument, np.:
            <ul>
              <li>umowę najmu</li>
              <li>odpis z księgi wieczystej</li>
              <li>decyzję administracyjną</li>
              <li>orzeczenie sądu</li>
            </ul>
          </li>
          <li>Jeśli meldujesz inną osobę, musisz dodatkowo przygotować dokument potwierdzający uprawnienia do działania w jej imieniu oraz dokument tożsamości.</li>
        </ul>

        <p>Temporary residence registration form, valid travel document, visa.</p>
        <p>If you are in Poland visa-free or awaiting a decision on temporary or permanent residence, prepare:</p>
        <ul>
          <li>valid travel document</li>
          <li>ONE of the following documents:
            <ul>
              <li>temporary foreigner ID</li>
              <li>residence card</li>
              <li>temporary residence permit</li>
              <li>permanent residence permit</li>
              <li>long-term EU resident permit</li>
              <li>refugee or complementary protection decision</li>
            </ul>
          </li>
          <li>If you own the apartment or have other legal title, prepare ONE document, e.g.:
            <ul>
              <li>rental agreement</li>
              <li>land and mortgage register excerpt</li>
              <li>administrative decision</li>
              <li>court judgment</li>
            </ul>
          </li>
          <li>If registering another person, also prepare authorization and identity document.</li>
        </ul>

        <p>Форма заяви на тимчасове проживання, дійсний проїзний документ, віза.</p>
        <p>Якщо ви перебуваєте в Польщі без візи або очікуєте рішення про тимчасове або постійне проживання, підготуйте:</p>
        <ul>
          <li>дійсний проїзний документ</li>
          <li>ОДИН з наведених документів:
            <ul>
              <li>тимчасове посвідчення особи іноземця</li>
              <li>карта перебування</li>
              <li>тимчасовий дозвіл на проживання</li>
              <li>постійний дозвіл на проживання</li>
              <li>дозвіл на проживання довгострокового резидента ЄС</li>
              <li>рішення про надання статусу біженця або додаткового захисту</li>
            </ul>
          </li>
          <li>Якщо ви власник або маєте інше право на квартиру, підготуйте ОДИН документ, наприклад:
            <ul>
              <li>договір оренди</li>
              <li>виписка з земельної книги</li>
              <li>адміністративне рішення</li>
              <li>судове рішення</li>
            </ul>
          </li>
          <li>Якщо реєструєте іншу особу, підготуйте доручення та документ, що посвідчує особу.</li>
        </ul>
      </AccordionItem>

    </Accordion>
  );
}
