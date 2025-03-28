const positions = {
    en: ['PAST', 'PRESENT', 'FUTURE'],
    es: ['PASADO', 'PRESENTE', 'FUTURO'],
    fr: ['PASSÉ', 'PRÉSENT', 'FUTUR'],
    de: ['VERGANGENHEIT', 'GEGENWART', 'ZUKUNFT'],
    it: ['PASSATO', 'PRESENTE', 'FUTURO'],
    tr: ['GEÇMİŞ', 'ŞİMDİKİ ZAMAN', 'GELECEK']
  };

  const modes = ["past", "present", "future"];

  const tarotDeck = {
    en: [
      "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
      "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
      "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
      "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
      "Judgement", "The World"
    ],
    es: [
      "El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador",
      "El Sumo Sacerdote", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
      "La Rueda de la Fortuna", "La Justicia", "El Ahorcado", "La Muerte", "La Templanza",
      "El Diablo", "La Torre", "La Estrella", "La Luna", "El Sol",
      "El Juicio", "El Mundo"
    ],
    fr: [
      "Le Fou", "Le Bateleur", "La Papesse", "L'Impératrice", "L'Empereur",
      "Le Pape", "Les Amoureux", "Le Chariot", "La Force", "L'Ermite",
      "La Roue de Fortune", "La Justice", "Le Pendu", "La Mort", "La Tempérance",
      "Le Diable", "La Maison Dieu", "L'Étoile", "La Lune", "Le Soleil",
      "Le Jugement", "Le Monde"
    ],
    de: [
      "Der Narr", "Der Magier", "Die Hohepriesterin", "Die Herrscherin", "Der Herrscher",
      "Der Hierophant", "Die Liebenden", "Der Wagen", "Die Kraft", "Der Eremit",
      "Rad des Schicksals", "Die Gerechtigkeit", "Der Gehängte", "Der Tod", "Die Mäßigkeit",
      "Der Teufel", "Der Turm", "Der Stern", "Der Mond", "Die Sonne",
      "Das Gericht", "Die Welt"
    ],
    it: [
      "Il Matto", "Il Bagatto", "La Papessa", "L'Imperatrice", "L'Imperatore",
      "Il Papa", "Gli Amanti", "Il Carro", "La Forza", "L'Eremita",
      "La Ruota della Fortuna", "La Giustizia", "L'Appeso", "La Morte", "La Temperanza",
      "Il Diavolo", "La Torre", "L'Estella", "La Luna", "Il Sole",
      "Il Giudizio", "Il Mondo"
    ],
    tr: [
      "Deli", "Sihirbaz", "Yüksek Rahibe", "İmparatoriçe", "İmparator",
      "Hierophant", "Aşıklar", "Araba", "Güç", "Seyyare",
      "Kader Çarkı", "Adalet", "Asılmış Adam", "Ölüm", "İltifat",
      "Şeytan", "Kule", "Yıldız", "Ay", "Güneş",
      "Yargı", "Dünya"
    ]
  };


  const cardMeanings = {
    "The Fool": {
      "en": {
        "past": "In your past, The Fool represents a time when you embraced new beginnings with enthusiasm. You were not afraid to take risks and step into the unknown, trusting that the journey itself would bring valuable experiences.",
        "present": "Currently, The Fool suggests that you are on the brink of a new adventure. It’s a time to be spontaneous and open to unexpected opportunities. Trust in your instincts and let go of any fears holding you back.",
        "future": "Looking ahead, The Fool signifies exciting potential and new adventures. Embrace the unknown with confidence and optimism, as your willingness to take risks will lead to growth and unexpected rewards."
      },
      "es": {
        "past": "En tu pasado, El Loco representa un tiempo en el que abrazaste nuevos comienzos con entusiasmo. No tenías miedo de correr riesgos y adentrarte en lo desconocido, confiando en que el propio viaje traería experiencias valiosas.",
        "present": "Actualmente, El Loco sugiere que estás al borde de una nueva aventura. Es un momento para ser espontáneo y estar abierto a oportunidades inesperadas. Confía en tus instintos y deja de lado cualquier miedo que te retenga.",
        "future": "Mirando hacia adelante, El Loco significa un potencial emocionante y nuevas aventuras. Abraza lo desconocido con confianza y optimismo, ya que tu disposición a tomar riesgos te llevará al crecimiento y recompensas inesperadas."
      },
      "fr": {
        "past": "Dans votre passé, Le Fou représente une période où vous avez accueilli de nouveaux départs avec enthousiasme. Vous n'aviez pas peur de prendre des risques et d'explorer l'inconnu, en faisant confiance au fait que le voyage en lui-même apporterait des expériences précieuses.",
        "present": "Actuellement, Le Fou suggère que vous êtes sur le point de commencer une nouvelle aventure. C'est le moment d'être spontané et ouvert aux opportunités inattendues. Faites confiance à vos instincts et laissez de côté vos peurs.",
        "future": "En regardant vers l'avenir, Le Fou signifie un potentiel excitant et de nouvelles aventures. Embrassez l'inconnu avec confiance et optimisme, car votre volonté de prendre des risques vous mènera à la croissance et à des récompenses inattendues."
      },
      "de": {
        "past": "In Ihrer Vergangenheit repräsentiert Der Narr eine Zeit, in der Sie neue Anfänge mit Begeisterung angenommen haben. Sie hatten keine Angst, Risiken einzugehen und ins Unbekannte zu treten, im Vertrauen darauf, dass die Reise selbst wertvolle Erfahrungen bringen würde.",
        "present": "Derzeit deutet Der Narr darauf hin, dass Sie am Rande eines neuen Abenteuers stehen. Es ist an der Zeit, spontan zu sein und offen für unerwartete Gelegenheiten. Vertrauen Sie auf Ihre Instinkte und lassen Sie alle Ängste los, die Sie zurückhalten.",
        "future": "Mit Blick auf die Zukunft zeigt Der Narr aufregendes Potenzial und neue Abenteuer an. Begrüßen Sie das Unbekannte mit Zuversicht und Optimismus, da Ihre Bereitschaft, Risiken einzugehen, zu Wachstum und unerwarteten Belohnungen führen wird."
      },
      "it": {
        "past": "Nel tuo passato, Il Matto rappresenta un periodo in cui hai abbracciato nuovi inizi con entusiasmo. Non avevi paura di correre rischi e di avventurarti nell'ignoto, fidandoti che il viaggio stesso avrebbe portato esperienze preziose.",
        "present": "Attualmente, Il Matto suggerisce che sei sul punto di iniziare una nuova avventura. È un momento per essere spontaneo e aperto a opportunità inaspettate. Fidati dei tuoi istinti e lascia andare tutte le paure che ti trattengono.",
        "future": "Guardando al futuro, Il Matto significa un potenziale entusiasmante e nuove avventure. Abbraccia l'ignoto con fiducia e ottimismo, poiché la tua volontà di correre rischi porterà a crescita e ricompense inaspettate."
      },
      "tr": {
        "past": "Geçmişinde, Aptal kartı, yeni başlangıçları hevesle kucakladığın bir dönemi temsil ediyor. Risk almaktan ve bilinmeyene adım atmaktan korkmadın, yolculuğun kendisinin değerli deneyimler getireceğine inanıyordun.",
        "present": "Şu anda, Aptal kartı yeni bir maceranın eşiğinde olduğunu gösteriyor. Spontane olma ve beklenmedik fırsatlara açık olma zamanı. İçgüdülerine güven ve seni geri tutan korkuları bırak.",
        "future": "Geleceğe baktığında, Aptal kartı heyecan verici potansiyel ve yeni maceralar anlamına geliyor. Bilinmeyeni güven ve iyimserlikle kucakla, çünkü risk almaya istekli olman büyüme ve beklenmedik ödüllere yol açacak."
      }
    },
    "The Magician": {
      "en": {
        "past": "In your past, The Magician signifies a time when you harnessed your talents and skills to achieve your goals. You were resourceful and confident, using your abilities to create opportunities and make things happen.",
        "present": "Currently, The Magician suggests that you have the power to manifest your desires. It's a time to tap into your potential and use your skills to transform your ideas into reality. Believe in your capabilities and take decisive action.",
        "future": "Looking ahead, The Magician indicates a future filled with potential and possibility. Your ability to focus and channel your energy will lead to successful outcomes. Embrace your power and use it wisely to shape your destiny."
      },
      "es": {
        "past": "En tu pasado, El Mago significa un tiempo en el que aprovechaste tus talentos y habilidades para alcanzar tus objetivos. Eras ingenioso y seguro, utilizando tus capacidades para crear oportunidades y hacer que las cosas sucedan.",
        "present": "Actualmente, El Mago sugiere que tienes el poder de manifestar tus deseos. Es un momento para aprovechar tu potencial y usar tus habilidades para transformar tus ideas en realidad. Cree en tus capacidades y toma acciones decisivas.",
        "future": "Mirando hacia adelante, El Mago indica un futuro lleno de potencial y posibilidad. Tu capacidad para enfocarte y canalizar tu energía llevará a resultados exitosos. Abraza tu poder y úsalo sabiamente para moldear tu destino."
      },
      "fr": {
        "past": "Dans votre passé, Le Magicien symbolise une période où vous avez exploité vos talents et compétences pour atteindre vos objectifs. Vous étiez ingénieux et confiant, utilisant vos capacités pour créer des opportunités et faire avancer les choses.",
        "present": "Actuellement, Le Magicien suggère que vous avez le pouvoir de manifester vos désirs. C'est le moment de puiser dans votre potentiel et d'utiliser vos compétences pour transformer vos idées en réalité. Croyez en vos capacités et prenez des mesures décisives.",
        "future": "En regardant vers l'avenir, Le Magicien indique un futur rempli de potentiel et de possibilités. Votre capacité à vous concentrer et à canaliser votre énergie mènera à des résultats réussis. Embrassez votre pouvoir et utilisez-le sagement pour façonner votre destin."
      },
      "de": {
        "past": "In Ihrer Vergangenheit symbolisiert Der Magier eine Zeit, in der Sie Ihre Talente und Fähigkeiten genutzt haben, um Ihre Ziele zu erreichen. Sie waren einfallsreich und selbstbewusst, nutzten Ihre Fähigkeiten, um Chancen zu schaffen und Dinge zu verwirklichen.",
        "present": "Derzeit deutet Der Magier darauf hin, dass Sie die Macht haben, Ihre Wünsche zu manifestieren. Es ist an der Zeit, Ihr Potenzial zu nutzen und Ihre Fähigkeiten einzusetzen, um Ihre Ideen in die Realität umzusetzen. Glauben Sie an Ihre Fähigkeiten und ergreifen Sie entschlossene Maßnahmen.",
        "future": "Mit Blick auf die Zukunft zeigt Der Magier ein Potenzial und Möglichkeiten. Ihre Fähigkeit, sich zu konzentrieren und Ihre Energie zu kanalisieren, wird zu erfolgreichen Ergebnissen führen. Nutzen Sie Ihre Macht und nutzen Sie sie weise, um Ihr Schicksal zu gestalten."
      },
      "it": {
        "past": "Nel tuo passato, Il Mago rappresenta un periodo in cui hai sfruttato i tuoi talenti e abilità per raggiungere i tuoi obiettivi. Eri ingegnoso e sicuro di te, usando le tue capacità per creare opportunità e far accadere le cose.",
        "present": "Attualmente, Il Mago suggerisce che hai il potere di manifestare i tuoi desideri. È il momento di sfruttare il tuo potenziale e utilizzare le tue abilità per trasformare le tue idee in realtà. Credi nelle tue capacità e prendi decisioni decisive.",
        "future": "Guardando al futuro, Il Mago indica un futuro pieno di potenziale e possibilità. La tua capacità di concentrarti e incanalare la tua energia porterà a risultati di successo. Abbraccia il tuo potere e usalo saggiamente per plasmare il tuo destino."
      },
      "tr": {
        "past": "Geçmişinde, Büyücü kartı, yeteneklerini ve becerilerini hedeflerine ulaşmak için kullandığın bir dönemi simgeliyor. Kaynaklarını iyi kullanan ve kendine güvenen biriydin, fırsatlar yaratmak ve işleri gerçekleştirmek için yeteneklerini kullanıyordun.",
        "present": "Şu anda, Büyücü kartı, arzularını gerçekleştirme gücüne sahip olduğunu gösteriyor. Potansiyelini kullanmanın ve becerilerini fikirlerini gerçeğe dönüştürmek için kullanmanın zamanı. Yeteneklerine inan ve kararlı adımlar at.",
        "future": "Geleceğe baktığında, Büyücü kartı, potansiyel ve olasılıklarla dolu bir geleceği işaret ediyor. Enerjini odaklama ve yönlendirme yeteneğin başarılı sonuçlara yol açacak. Gücünü kucakla ve kaderini şekillendirmek için onu akıllıca kullan."
      }
    },
    "The High Priestess": {
      "en": {
        "past": "In your past, The High Priestess represents a time when you relied on your intuition and inner wisdom. You were in tune with your subconscious mind and trusted your inner voice to guide you through complex situations.",
        "present": "Currently, The High Priestess suggests that you should listen to your inner voice and pay attention to your dreams and instincts. It’s a time to seek answers within and trust your intuition in making decisions.",
        "future": "Looking ahead, The High Priestess indicates a future where your intuition will play a crucial role. Embrace your inner wisdom and let it guide you through upcoming challenges. Trust that the answers you seek are within you."
      },
      "es": {
        "past": "En tu pasado, La Sacerdotisa representa un tiempo en el que confiabas en tu intuición y sabiduría interior. Estabas en sintonía con tu mente subconsciente y confiabas en tu voz interior para guiarte a través de situaciones complejas.",
        "present": "Actualmente, La Sacerdotisa sugiere que debes escuchar tu voz interior y prestar atención a tus sueños e instintos. Es un momento para buscar respuestas dentro de ti y confiar en tu intuición al tomar decisiones.",
        "future": "Mirando hacia adelante, La Sacerdotisa indica un futuro en el que tu intuición jugará un papel crucial. Abraza tu sabiduría interior y deja que te guíe a través de los desafíos que se presenten. Confía en que las respuestas que buscas están dentro de ti."
      },
      "fr": {
        "past": "Dans votre passé, La Papesse représente une période où vous vous appuyiez sur votre intuition et votre sagesse intérieure. Vous étiez en harmonie avec votre subconscient et faisiez confiance à votre voix intérieure pour vous guider à travers des situations complexes.",
        "present": "Actuellement, La Papesse suggère que vous devriez écouter votre voix intérieure et prêter attention à vos rêves et instincts. C'est le moment de chercher des réponses en vous et de faire confiance à votre intuition pour prendre des décisions.",
        "future": "En regardant vers l'avenir, La Papesse indique un futur où votre intuition jouera un rôle crucial. Embrassez votre sagesse intérieure et laissez-la vous guider à travers les défis à venir. Faites confiance au fait que les réponses que vous cherchez sont en vous."
      },
      "de": {
        "past": "In Ihrer Vergangenheit repräsentiert Die Hohepriesterin eine Zeit, in der Sie auf Ihre Intuition und innere Weisheit vertrauten. Sie waren im Einklang mit Ihrem Unterbewusstsein und vertrauten auf Ihre innere Stimme, um Sie durch komplexe Situationen zu führen.",
        "present": "Derzeit deutet Die Hohepriesterin darauf hin, dass Sie auf Ihre innere Stimme hören und auf Ihre Träume und Instinkte achten sollten. Es ist an der Zeit, Antworten in sich selbst zu suchen und Ihrer Intuition bei Entscheidungen zu vertrauen.",
        "future": "Mit Blick auf die Zukunft zeigt Die Hohepriesterin eine Zukunft an, in der Ihre Intuition eine entscheidende Rolle spielen wird. Nutzen Sie Ihre innere Weisheit und lassen Sie sich von ihr durch kommende Herausforderungen führen. Vertrauen Sie darauf, dass die Antworten, die Sie suchen, in Ihnen liegen."
      },
      "it": {
        "past": "Nel tuo passato, La Papessa rappresenta un periodo in cui ti affidavi alla tua intuizione e saggezza interiore. Eri in sintonia con il tuo subconscio e ti fidavi della tua voce interiore per guidarti attraverso situazioni complesse.",
        "present": "Attualmente, La Papessa suggerisce che dovresti ascoltare la tua voce interiore e prestare attenzione ai tuoi sogni e istinti. È il momento di cercare risposte dentro di te e di fidarti della tua intuizione nel prendere decisioni.",
        "future": "Guardando al futuro, La Papessa indica un futuro in cui la tua intuizione giocherà un ruolo cruciale. Abbraccia la tua saggezza interiore e lascia che ti guidi attraverso le sfide future. Fidati che le risposte che cerchi sono dentro di te."
      },
      "tr": {
        "past": "Geçmişinde, Baş Rahibe kartı, sezgine ve içsel bilgeliğine güvendiğin bir dönemi temsil ediyor. Bilinçaltınla uyum içindeydin ve karmaşık durumlarda sana rehberlik etmesi için iç sesine güveniyordun.",
        "present": "Şu anda, Baş Rahibe kartı, iç sesini dinlemen ve rüyalarına ve içgüdülerine dikkat etmen gerektiğini gösteriyor. Yanıtları içinde aramanın ve kararlar alırken sezgine güvenmenin zamanı.",
        "future": "Geleceğe baktığında, Baş Rahibe kartı, sezginin önemli bir rol oynayacağı bir geleceği işaret ediyor. İçsel bilgeliğini kucakla ve onun seni gelecek zorluklarda yönlendirmesine izin ver. Aradığın yanıtların içinde olduğuna güven."
      }
    },
    "The Empress": {
      "en": {
        "past": "In your past, The Empress signifies a time of nurturing and growth. You were deeply connected to your creative energy and provided care and support to those around you, fostering a harmonious environment.",
        "present": "Currently, The Empress suggests that you are in a period of abundance and creativity. It's a time to embrace your nurturing side and focus on creating beauty and harmony in your life. Trust in the natural flow of life and enjoy the fruits of your labor.",
        "future": "Looking ahead, The Empress indicates a future filled with prosperity and growth. Your efforts to nurture and care for your projects and relationships will lead to abundant rewards. Embrace your creative energy and let it guide you to success."
      },
      "es": {
        "past": "En tu pasado, La Emperatriz simboliza un tiempo de cuidado y crecimiento. Estabas profundamente conectado con tu energía creativa y brindabas cuidado y apoyo a los que te rodeaban, fomentando un ambiente armonioso.",
        "present": "Actualmente, La Emperatriz sugiere que estás en un período de abundancia y creatividad. Es un momento para abrazar tu lado nutritivo y centrarte en crear belleza y armonía en tu vida. Confía en el flujo natural de la vida y disfruta de los frutos de tu trabajo.",
        "future": "Mirando hacia adelante, La Emperatriz indica un futuro lleno de prosperidad y crecimiento. Tus esfuerzos para nutrir y cuidar tus proyectos y relaciones te llevarán a recompensas abundantes. Abraza tu energía creativa y deja que te guíe al éxito."
      },
      "fr": {
        "past": "Dans votre passé, L'Impératrice représente une période de soins et de croissance. Vous étiez profondément connecté à votre énergie créative et apportiez soins et soutien à ceux qui vous entouraient, favorisant un environnement harmonieux.",
        "present": "Actuellement, L'Impératrice suggère que vous êtes dans une période d'abondance et de créativité. C'est le moment d'embrasser votre côté nourricier et de vous concentrer sur la création de beauté et d'harmonie dans votre vie. Faites confiance au flux naturel de la vie et profitez des fruits de votre travail.",
        "future": "En regardant vers l'avenir, L'Impératrice indique un futur rempli de prospérité et de croissance. Vos efforts pour nourrir et prendre soin de vos projets et relations vous mèneront à des récompenses abondantes. Embrassez votre énergie créative et laissez-la vous guider vers le succès."
      },
      "de": {
        "past": "In Ihrer Vergangenheit symbolisiert Die Kaiserin eine Zeit der Fürsorge und des Wachstums. Sie waren tief mit Ihrer kreativen Energie verbunden und boten denen um Sie herum Fürsorge und Unterstützung, wodurch eine harmonische Umgebung entstand.",
        "present": "Derzeit deutet Die Kaiserin darauf hin, dass Sie sich in einer Zeit des Überflusses und der Kreativität befinden. Es ist an der Zeit, Ihre nährende Seite zu umarmen und sich darauf zu konzentrieren, Schönheit und Harmonie in Ihrem Leben zu schaffen. Vertrauen Sie auf den natürlichen Fluss des Lebens und genießen Sie die Früchte Ihrer Arbeit.",
        "future": "Mit Blick auf die Zukunft zeigt Die Kaiserin eine Zukunft voller Wohlstand und Wachstum an. Ihre Bemühungen, Ihre Projekte und Beziehungen zu pflegen und zu betreuen, werden zu reichen Belohnungen führen. Nutzen Sie Ihre kreative Energie und lassen Sie sich von ihr zum Erfolg führen."
      },
      "it": {
        "past": "Nel tuo passato, L'Imperatrice rappresenta un periodo di cura e crescita. Eri profondamente connesso alla tua energia creativa e fornivi cura e supporto a coloro che ti circondavano, favorendo un ambiente armonioso.",
        "present": "Attualmente, L'Imperatrice suggerisce che sei in un periodo di abbondanza e creatività. È il momento di abbracciare il tuo lato nutritivo e concentrarti sulla creazione di bellezza e armonia nella tua vita. Fidati del flusso naturale della vita e goditi i frutti del tuo lavoro.",
        "future": "Guardando al futuro, L'Imperatrice indica un futuro pieno di prosperità e crescita. I tuoi sforzi per nutrire e prenderti cura dei tuoi progetti e delle tue relazioni porteranno a ricche ricompense. Abbraccia la tua energia creativa e lascia che ti guidi al successo."
      },
      "tr": {
        "past": "Geçmişinde, İmparatoriçe kartı, besleyici ve büyüme dolu bir dönemi simgeliyor. Yaratıcı enerjinle derin bir bağ kurmuş ve etrafındaki insanlara bakım ve destek sağlamış, uyumlu bir ortam yaratmıştın.",
        "present": "Şu anda, İmparatoriçe kartı bolluk ve yaratıcılık döneminde olduğunu gösteriyor. Besleyici yanını kucaklamanın ve hayatında güzellik ve uyum yaratmaya odaklanmanın zamanı. Hayatın doğal akışına güven ve emeğinin meyvelerinin tadını çıkar.",
        "future": "Geleceğe baktığında, İmparatoriçe kartı, bolluk ve büyümeyle dolu bir geleceği işaret ediyor. Projelerine ve ilişkilerine gösterdiğin özen ve bakım, bol ödüller getirecek. Yaratıcı enerjini kucakla ve onun seni başarıya götürmesine izin ver."
      }
    },
    "The Emperor": {
      "en": {
        "past": "In your past, The Emperor signifies a time of establishing structure and order in your life. You took on a leadership role, creating stability and setting clear boundaries to achieve your goals.",
        "present": "Currently, The Emperor suggests that you are in a position of authority and control. It’s a time to assert your power and make strategic decisions. Embrace your leadership qualities to create order and success in your endeavors.",
        "future": "Looking ahead, The Emperor indicates a future where your ability to lead and establish order will bring you great success. Your disciplined approach and strong sense of responsibility will pave the way for achievements and recognition."
      },
      "es": {
        "past": "En tu pasado, El Emperador simboliza un tiempo de establecer estructura y orden en tu vida. Asumiste un rol de liderazgo, creando estabilidad y estableciendo límites claros para alcanzar tus objetivos.",
        "present": "Actualmente, El Emperador sugiere que estás en una posición de autoridad y control. Es un momento para afirmar tu poder y tomar decisiones estratégicas. Abraza tus cualidades de liderazgo para crear orden y éxito en tus esfuerzos.",
        "future": "Mirando hacia adelante, El Emperador indica un futuro en el que tu capacidad de liderar y establecer orden te traerá gran éxito. Tu enfoque disciplinado y fuerte sentido de responsabilidad abrirán el camino para logros y reconocimiento."
      },
      "fr": {
        "past": "Dans votre passé, L'Empereur représente une période d'établissement de structure et d'ordre dans votre vie. Vous avez assumé un rôle de leadership, créant de la stabilité et fixant des limites claires pour atteindre vos objectifs.",
        "present": "Actuellement, L'Empereur suggère que vous êtes en position d'autorité et de contrôle. C'est le moment d'affirmer votre pouvoir et de prendre des décisions stratégiques. Embrassez vos qualités de leadership pour créer de l'ordre et du succès dans vos entreprises.",
        "future": "En regardant vers l'avenir, L'Empereur indique un futur où votre capacité à diriger et à établir l'ordre vous apportera un grand succès. Votre approche disciplinée et votre fort sens des responsabilités ouvriront la voie à des réalisations et à une reconnaissance."
      },
      "de": {
        "past": "In Ihrer Vergangenheit symbolisiert Der Kaiser eine Zeit, in der Sie Struktur und Ordnung in Ihrem Leben etablierten. Sie übernahmen eine Führungsrolle, schufen Stabilität und setzten klare Grenzen, um Ihre Ziele zu erreichen.",
        "present": "Derzeit deutet Der Kaiser darauf hin, dass Sie sich in einer Position der Autorität und Kontrolle befinden. Es ist an der Zeit, Ihre Macht durchzusetzen und strategische Entscheidungen zu treffen. Nutzen Sie Ihre Führungsqualitäten, um Ordnung und Erfolg in Ihren Unternehmungen zu schaffen.",
        "future": "Mit Blick auf die Zukunft zeigt Der Kaiser eine Zukunft, in der Ihre Fähigkeit zu führen und Ordnung zu schaffen, großen Erfolg bringen wird. Ihr disziplinierter Ansatz und starkes Verantwortungsbewusstsein werden den Weg für Erfolge und Anerkennung ebnen."
      },
      "it": {
        "past": "Nel tuo passato, L'Imperatore rappresenta un periodo in cui hai stabilito struttura e ordine nella tua vita. Hai assunto un ruolo di leadership, creando stabilità e fissando confini chiari per raggiungere i tuoi obiettivi.",
        "present": "Attualmente, L'Imperatore suggerisce che sei in una posizione di autorità e controllo. È il momento di affermare il tuo potere e prendere decisioni strategiche. Abbraccia le tue qualità di leadership per creare ordine e successo nei tuoi sforzi.",
        "future": "Guardando al futuro, L'Imperatore indica un futuro in cui la tua capacità di guidare e stabilire l'ordine ti porterà grande successo. Il tuo approccio disciplinato e il forte senso di responsabilità apriranno la strada per realizzazioni e riconoscimenti."
      },
      "tr": {
        "past": "Geçmişinde, İmparator kartı, hayatında yapı ve düzen kurduğun bir dönemi simgeliyor. Liderlik rolü üstlendin, istikrar sağladın ve hedeflerine ulaşmak için net sınırlar koydun.",
        "present": "Şu anda, İmparator kartı, otorite ve kontrol pozisyonunda olduğunu gösteriyor. Gücünü ortaya koymanın ve stratejik kararlar almanın zamanı. Liderlik niteliklerini kucaklayarak çabalarında düzen ve başarı yarat.",
        "future": "Geleceğe baktığında, İmparator kartı, liderlik yapma ve düzen kurma yeteneğinin büyük başarı getireceğini gösteriyor. Disiplinli yaklaşımın ve güçlü sorumluluk duygun, başarılar ve takdir için yol açacak."
      }
    },
    "The Hierophant": {
      "en": {
        "past": "In your past, The Hierophant represents a time when you sought guidance from traditional sources or established institutions. You adhered to conventional wisdom and found support in established structures, such as mentors or religious practices.",
        "present": "Currently, The Hierophant suggests that you may benefit from seeking advice from a mentor, following established traditions, or adhering to conventional approaches. It’s a time to honor tradition and seek wisdom from established sources to guide your current situation.",
        "future": "Looking ahead, The Hierophant indicates a future where traditional values and structured guidance will play an important role. Embrace the wisdom of established practices and institutions, as they will help you navigate future challenges and find stability."
      },
      "es": {
        "past": "En tu pasado, El Hierofante representa un tiempo en el que buscaste orientación de fuentes tradicionales o instituciones establecidas. Te ceñiste a la sabiduría convencional y encontraste apoyo en estructuras establecidas, como mentores o prácticas religiosas.",
        "present": "Actualmente, El Hierofante sugiere que puedes beneficiarte al buscar consejo de un mentor, seguir tradiciones establecidas o ceñirte a enfoques convencionales. Es un momento para honrar la tradición y buscar sabiduría en fuentes establecidas para guiar tu situación actual.",
        "future": "Mirando hacia adelante, El Hierofante indica un futuro en el que los valores tradicionales y la orientación estructurada jugarán un papel importante. Abraza la sabiduría de las prácticas e instituciones establecidas, ya que te ayudarán a enfrentar futuros desafíos y encontrar estabilidad."
      },
      "fr": {
        "past": "Dans votre passé, Le Hiérophante représente une période où vous cherchiez des conseils auprès de sources traditionnelles ou d'institutions établies. Vous adhériez à la sagesse conventionnelle et trouviez du soutien dans des structures établies, telles que des mentors ou des pratiques religieuses.",
        "present": "Actuellement, Le Hiérophante suggère que vous pourriez bénéficier de la recherche de conseils auprès d'un mentor, de suivre des traditions établies ou d'adhérer à des approches conventionnelles. C'est le moment d'honorer la tradition et de chercher la sagesse dans des sources établies pour guider votre situation actuelle.",
        "future": "En regardant vers l'avenir, Le Hiérophante indique un futur où les valeurs traditionnelles et l'orientation structurée joueront un rôle important. Embrassez la sagesse des pratiques et institutions établies, car elles vous aideront à naviguer dans les défis futurs et à trouver de la stabilité."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Hierophant für eine Zeit, in der Sie Rat von traditionellen Quellen oder etablierten Institutionen gesucht haben. Sie hielten sich an konventionelle Weisheit und fanden Unterstützung in etablierten Strukturen wie Mentoren oder religiösen Praktiken.",
        "present": "Derzeit deutet Der Hierophant darauf hin, dass Sie von der Suche nach Rat bei einem Mentor, dem Befolgen etablierter Traditionen oder dem Festhalten an konventionellen Ansätzen profitieren könnten. Es ist an der Zeit, Traditionen zu ehren und Weisheit aus etablierten Quellen zu suchen, um Ihre aktuelle Situation zu lenken.",
        "future": "Mit Blick auf die Zukunft zeigt Der Hierophant eine Zukunft, in der traditionelle Werte und strukturierte Anleitung eine wichtige Rolle spielen werden. Nutzen Sie die Weisheit etablierter Praktiken und Institutionen, da sie Ihnen helfen werden, zukünftige Herausforderungen zu bewältigen und Stabilität zu finden."
      },
      "it": {
        "past": "Nel tuo passato, Il Papa rappresenta un periodo in cui cercavi guida da fonti tradizionali o istituzioni consolidate. Ti attenevi alla saggezza convenzionale e trovavi supporto in strutture stabilite, come mentori o pratiche religiose.",
        "present": "Attualmente, Il Papa suggerisce che potresti trarre beneficio dal cercare consigli da un mentore, seguire tradizioni consolidate o aderire ad approcci convenzionali. È il momento di onorare la tradizione e cercare saggezza in fonti consolidate per guidare la tua situazione attuale.",
        "future": "Guardando al futuro, Il Papa indica un futuro in cui i valori tradizionali e la guida strutturata giocheranno un ruolo importante. Abbraccia la saggezza delle pratiche e istituzioni consolidate, poiché ti aiuteranno ad affrontare le sfide future e trovare stabilità."
      },
      "tr": {
        "past": "Geçmişinde, Başrahip kartı, geleneksel kaynaklardan veya kurumsal yapıdan rehberlik aradığın bir dönemi simgeliyor. Geleneksel bilgilere sadık kaldın ve mentörler veya dini uygulamalar gibi kurulmuş yapıların desteğini buldun.",
        "present": "Şu anda, Başrahip kartı, bir mentörden tavsiye almanın, geleneklere uymanın veya geleneksel yaklaşımları benimsemenin faydalı olabileceğini gösteriyor. Gelenekleri onurlandırmanın ve mevcut durumunu yönlendirmek için kurulmuş kaynaklardan bilgi edinmenin zamanı.",
        "future": "Geleceğe baktığında, Başrahip kartı, geleneksel değerler ve yapılandırılmış rehberliğin önemli bir rol oynayacağı bir geleceği işaret ediyor. Kurulmuş uygulamalar ve kurumların bilgeliğini kucakla, çünkü bunlar seni gelecekteki zorluklarla başa çıkmanda ve istikrar bulmanda yardımcı olacak."
      }
    },
    "The Lovers": {
      "en": {
        "past": "In your past, The Lovers card signifies a time when you faced significant choices related to relationships or personal values. This period involved deep connections and emotional bonds that shaped your path forward.",
        "present": "Currently, The Lovers card suggests that you are at a crossroads where important decisions need to be made, particularly in relationships or matters of the heart. It’s a time to follow your heart and align your choices with your true values.",
        "future": "Looking ahead, The Lovers card indicates a future where meaningful relationships and harmonized choices will play a crucial role. Your decisions will lead to deeper connections and a greater sense of unity and love."
      },
      "es": {
        "past": "En tu pasado, La Carta de Los Enamorados simboliza un tiempo en el que enfrentaste elecciones significativas relacionadas con las relaciones o valores personales. Este período implicó conexiones profundas y vínculos emocionales que moldearon tu camino hacia adelante.",
        "present": "Actualmente, La Carta de Los Enamorados sugiere que estás en una encrucijada donde se deben tomar decisiones importantes, particularmente en relaciones o asuntos del corazón. Es un momento para seguir tu corazón y alinear tus elecciones con tus verdaderos valores.",
        "future": "Mirando hacia adelante, La Carta de Los Enamorados indica un futuro donde las relaciones significativas y las elecciones armonizadas jugarán un papel crucial. Tus decisiones te llevarán a conexiones más profundas y un mayor sentido de unidad y amor."
      },
      "fr": {
        "past": "Dans votre passé, La Carte des Amoureux représente une période où vous avez fait face à des choix importants liés aux relations ou aux valeurs personnelles. Cette période impliquait des connexions profondes et des liens émotionnels qui ont façonné votre chemin.",
        "present": "Actuellement, La Carte des Amoureux suggère que vous êtes à un carrefour où des décisions importantes doivent être prises, en particulier dans les relations ou les questions de cœur. C'est le moment de suivre votre cœur et d'aligner vos choix avec vos vraies valeurs.",
        "future": "En regardant vers l'avenir, La Carte des Amoureux indique un futur où les relations significatives et les choix harmonisés joueront un rôle crucial. Vos décisions conduiront à des connexions plus profondes et à un plus grand sentiment d'unité et d'amour."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Liebenden-Karte für eine Zeit, in der Sie vor wichtigen Entscheidungen im Zusammenhang mit Beziehungen oder persönlichen Werten standen. Diese Periode beinhaltete tiefe Verbindungen und emotionale Bindungen, die Ihren weiteren Weg geprägt haben.",
        "present": "Derzeit deutet Die Liebenden-Karte darauf hin, dass Sie an einem Scheideweg stehen, an dem wichtige Entscheidungen getroffen werden müssen, insbesondere in Beziehungen oder Herzensangelegenheiten. Es ist an der Zeit, Ihrem Herzen zu folgen und Ihre Entscheidungen mit Ihren wahren Werten in Einklang zu bringen.",
        "future": "Mit Blick auf die Zukunft zeigt Die Liebenden-Karte eine Zukunft, in der bedeutungsvolle Beziehungen und harmonisierte Entscheidungen eine entscheidende Rolle spielen werden. Ihre Entscheidungen werden zu tieferen Verbindungen und einem stärkeren Gefühl von Einheit und Liebe führen."
      },
      "it": {
        "past": "Nel tuo passato, La Carta degli Amanti rappresenta un periodo in cui hai affrontato scelte significative riguardanti relazioni o valori personali. Questo periodo ha coinvolto connessioni profonde e legami emotivi che hanno plasmato il tuo cammino futuro.",
        "present": "Attualmente, La Carta degli Amanti suggerisce che sei a un bivio dove devono essere prese decisioni importanti, particolarmente nelle relazioni o nelle questioni di cuore. È il momento di seguire il tuo cuore e allineare le tue scelte con i tuoi veri valori.",
        "future": "Guardando al futuro, La Carta degli Amanti indica un futuro in cui relazioni significative e scelte armonizzate giocheranno un ruolo cruciale. Le tue decisioni porteranno a connessioni più profonde e a un maggiore senso di unità e amore."
      },
      "tr": {
        "past": "Geçmişinde, Aşıklar kartı, ilişkiler veya kişisel değerlerle ilgili önemli seçimlerle yüzleştiğin bir dönemi simgeliyor. Bu dönem, ileriye dönük yolunu şekillendiren derin bağlar ve duygusal ilişkiler içeriyordu.",
        "present": "Şu anda, Aşıklar kartı, özellikle ilişkiler veya kalp meselelerinde önemli kararlar alman gereken bir yol ayrımında olduğunu gösteriyor. Kalbini takip etmenin ve seçimlerini gerçek değerlerinle uyumlu hale getirmenin zamanı.",
        "future": "Geleceğe baktığında, Aşıklar kartı, anlamlı ilişkilerin ve uyumlu seçimlerin önemli bir rol oynayacağı bir geleceği işaret ediyor. Kararların daha derin bağlantılara ve daha büyük bir birlik ve sevgi hissine yol açacak."
      }
    },
    "The Chariot": {
      "en": {
        "past": "In your past, The Chariot signifies a time when you took control of your direction and overcame obstacles through determination and willpower. You successfully navigated challenges by staying focused and disciplined.",
        "present": "Currently, The Chariot suggests that you are in a position where focus, determination, and control are essential. It’s a time to harness your inner strength and drive to achieve your goals. Stay disciplined and keep your eyes on the prize.",
        "future": "Looking ahead, The Chariot indicates a future where your perseverance and strong willpower will lead to significant achievements. Your ability to maintain control and direction will help you overcome future challenges and reach your desired destination."
      },
      "es": {
        "past": "En tu pasado, El Carro simboliza un tiempo en el que tomaste el control de tu dirección y superaste obstáculos a través de la determinación y la fuerza de voluntad. Navegaste con éxito los desafíos manteniéndote enfocado y disciplinado.",
        "present": "Actualmente, El Carro sugiere que estás en una posición donde el enfoque, la determinación y el control son esenciales. Es el momento de aprovechar tu fuerza interior y tu impulso para lograr tus objetivos. Mantente disciplinado y enfocado en la meta.",
        "future": "Mirando hacia adelante, El Carro indica un futuro donde tu perseverancia y fuerte fuerza de voluntad te llevarán a logros significativos. Tu capacidad para mantener el control y la dirección te ayudará a superar futuros desafíos y alcanzar tu destino deseado."
      },
      "fr": {
        "past": "Dans votre passé, Le Chariot représente une période où vous avez pris le contrôle de votre direction et surmonté les obstacles grâce à la détermination et à la volonté. Vous avez navigué avec succès les défis en restant concentré et discipliné.",
        "present": "Actuellement, Le Chariot suggère que vous êtes dans une position où la concentration, la détermination et le contrôle sont essentiels. C'est le moment d'exploiter votre force intérieure et votre dynamisme pour atteindre vos objectifs. Restez discipliné et gardez les yeux sur le prix.",
        "future": "En regardant vers l'avenir, Le Chariot indique un futur où votre persévérance et votre forte volonté vous mèneront à des réalisations significatives. Votre capacité à maintenir le contrôle et la direction vous aidera à surmonter les défis futurs et à atteindre votre destination souhaitée."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Wagen für eine Zeit, in der Sie die Kontrolle über Ihre Richtung übernommen und Hindernisse durch Entschlossenheit und Willenskraft überwunden haben. Sie haben Herausforderungen erfolgreich gemeistert, indem Sie fokussiert und diszipliniert geblieben sind.",
        "present": "Derzeit deutet Der Wagen darauf hin, dass Sie sich in einer Position befinden, in der Fokus, Entschlossenheit und Kontrolle unerlässlich sind. Es ist an der Zeit, Ihre innere Stärke und Ihren Antrieb zu nutzen, um Ihre Ziele zu erreichen. Bleiben Sie diszipliniert und behalten Sie Ihr Ziel im Auge.",
        "future": "Mit Blick auf die Zukunft zeigt Der Wagen eine Zukunft, in der Ihre Ausdauer und starke Willenskraft zu bedeutenden Erfolgen führen werden. Ihre Fähigkeit, Kontrolle und Richtung beizubehalten, wird Ihnen helfen, zukünftige Herausforderungen zu überwinden und Ihr gewünschtes Ziel zu erreichen."
      },
      "it": {
        "past": "Nel tuo passato, Il Carro rappresenta un periodo in cui hai preso il controllo della tua direzione e hai superato gli ostacoli con determinazione e forza di volontà. Hai navigato con successo le sfide rimanendo concentrato e disciplinato.",
        "present": "Attualmente, Il Carro suggerisce che sei in una posizione in cui la concentrazione, la determinazione e il controllo sono essenziali. È il momento di sfruttare la tua forza interiore e la tua spinta per raggiungere i tuoi obiettivi. Rimani disciplinato e tieni gli occhi sul premio.",
        "future": "Guardando al futuro, Il Carro indica un futuro in cui la tua perseveranza e la forte forza di volontà porteranno a realizzazioni significative. La tua capacità di mantenere il controllo e la direzione ti aiuterà a superare le sfide future e a raggiungere la destinazione desiderata."
      },
      "tr": {
        "past": "Geçmişinde, Savaş Arabası kartı, yönünü kontrol altına aldığın ve azim ile irade gücü sayesinde engelleri aştığın bir dönemi simgeliyor. Odaklanarak ve disiplinli kalarak zorlukları başarıyla aştın.",
        "present": "Şu anda, Savaş Arabası kartı, odaklanma, kararlılık ve kontrolün önemli olduğu bir pozisyonda olduğunu gösteriyor. İçsel gücünü ve itici gücünü hedeflerine ulaşmak için kullanmanın zamanı. Disiplinli ol ve gözünü ödülden ayırma.",
        "future": "Geleceğe baktığında, Savaş Arabası kartı, azmin ve güçlü iradenin önemli başarılara yol açacağını gösteriyor. Kontrolü ve yönü koruma yeteneğin, gelecekteki zorlukları aşmana ve istediğin hedefe ulaşmana yardımcı olacak."
      }
    },
    "Strength": {
      "en": {
        "past": "In your past, Strength signifies a period when you demonstrated courage and inner resilience. You overcame challenges by tapping into your inner strength and maintaining a calm and composed demeanor.",
        "present": "Currently, Strength suggests that you are in a situation where your patience, compassion, and inner fortitude are being tested. It’s a time to draw on your inner power and face your challenges with grace and confidence.",
        "future": "Looking ahead, Strength indicates a future where your ability to stay strong and compassionate will lead to significant personal growth and success. Your resilience and calm approach will help you navigate future obstacles effectively."
      },
      "es": {
        "past": "En tu pasado, La Fuerza simboliza un período en el que demostraste coraje y resiliencia interior. Superaste desafíos aprovechando tu fuerza interior y manteniendo una actitud tranquila y serena.",
        "present": "Actualmente, La Fuerza sugiere que estás en una situación donde se están poniendo a prueba tu paciencia, compasión y fortaleza interior. Es el momento de recurrir a tu poder interior y enfrentar tus desafíos con gracia y confianza.",
        "future": "Mirando hacia adelante, La Fuerza indica un futuro donde tu capacidad para mantenerte fuerte y compasivo te llevará a un crecimiento personal significativo y éxito. Tu resiliencia y enfoque calmado te ayudarán a superar futuros obstáculos de manera efectiva."
      },
      "fr": {
        "past": "Dans votre passé, La Force représente une période où vous avez fait preuve de courage et de résilience intérieure. Vous avez surmonté des défis en puisant dans votre force intérieure et en maintenant un comportement calme et posé.",
        "present": "Actuellement, La Force suggère que vous êtes dans une situation où votre patience, votre compassion et votre force intérieure sont mises à l'épreuve. C'est le moment de puiser dans votre pouvoir intérieur et de faire face à vos défis avec grâce et confiance.",
        "future": "En regardant vers l'avenir, La Force indique un futur où votre capacité à rester fort et compatissant mènera à une croissance personnelle significative et à du succès. Votre résilience et votre approche calme vous aideront à surmonter efficacement les obstacles futurs."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Kraft für eine Zeit, in der Sie Mut und innere Widerstandskraft gezeigt haben. Sie haben Herausforderungen überwunden, indem Sie Ihre innere Stärke angezapft und eine ruhige und gelassene Haltung beibehalten haben.",
        "present": "Derzeit deutet Die Kraft darauf hin, dass Sie sich in einer Situation befinden, in der Ihre Geduld, Ihr Mitgefühl und Ihre innere Stärke auf die Probe gestellt werden. Es ist an der Zeit, Ihre innere Kraft zu nutzen und Ihren Herausforderungen mit Anmut und Zuversicht zu begegnen.",
        "future": "Mit Blick auf die Zukunft zeigt Die Kraft eine Zukunft, in der Ihre Fähigkeit, stark und mitfühlend zu bleiben, zu bedeutendem persönlichen Wachstum und Erfolg führen wird. Ihre Widerstandsfähigkeit und ruhige Herangehensweise werden Ihnen helfen, zukünftige Hindernisse effektiv zu bewältigen."
      },
      "it": {
        "past": "Nel tuo passato, La Forza rappresenta un periodo in cui hai dimostrato coraggio e resilienza interiore. Hai superato sfide attingendo alla tua forza interiore e mantenendo un atteggiamento calmo e composto.",
        "present": "Attualmente, La Forza suggerisce che sei in una situazione in cui la tua pazienza, compassione e forza interiore sono messe alla prova. È il momento di attingere al tuo potere interiore e affrontare le tue sfide con grazia e fiducia.",
        "future": "Guardando al futuro, La Forza indica un futuro in cui la tua capacità di rimanere forte e compassionevole porterà a una crescita personale significativa e al successo. La tua resilienza e il tuo approccio calmo ti aiuteranno a superare efficacemente gli ostacoli futuri."
      },
      "tr": {
        "past": "Geçmişinde, Güç kartı cesaret ve içsel dayanıklılık sergilediğin bir dönemi simgeliyor. İçsel gücünü kullanarak ve sakin ve soğukkanlı bir tavır koruyarak zorlukları aştın.",
        "present": "Şu anda, Güç kartı, sabrının, merhametinin ve içsel direncinin test edildiği bir durumda olduğunu gösteriyor. İçsel gücüne başvurmanın ve zorluklarınla zarafet ve güvenle yüzleşmenin zamanı.",
        "future": "Geleceğe baktığında, Güç kartı, güçlü ve merhametli kalma yeteneğinin önemli kişisel büyüme ve başarıya yol açacağını gösteriyor. Direncin ve sakin yaklaşımın, gelecekteki engelleri etkili bir şekilde aşmana yardımcı olacak."
      }
    },
    "The Hermit": {
      "en": {
        "past": "In your past, The Hermit signifies a time of introspection and solitude. You sought wisdom and understanding by withdrawing from the external world and reflecting on your inner self.",
        "present": "Currently, The Hermit suggests that you may benefit from taking a step back and seeking solitude. It’s a time to reflect, meditate, and gain deeper insight into your situation. Trust your inner guidance.",
        "future": "Looking ahead, The Hermit indicates a future where introspection and inner wisdom will be essential. Embrace solitude and self-reflection, as these practices will lead to profound personal growth and enlightenment."
      },
      "es": {
        "past": "En tu pasado, El Ermitaño simboliza un tiempo de introspección y soledad. Buscaste sabiduría y comprensión retirándote del mundo exterior y reflexionando sobre tu yo interior.",
        "present": "Actualmente, El Ermitaño sugiere que podrías beneficiarte de dar un paso atrás y buscar la soledad. Es un momento para reflexionar, meditar y obtener una comprensión más profunda de tu situación. Confía en tu guía interior.",
        "future": "Mirando hacia adelante, El Ermitaño indica un futuro donde la introspección y la sabiduría interior serán esenciales. Abraza la soledad y la autorreflexión, ya que estas prácticas te llevarán a un profundo crecimiento personal e iluminación."
      },
      "fr": {
        "past": "Dans votre passé, L'Hermite représente une période d'introspection et de solitude. Vous avez cherché la sagesse et la compréhension en vous retirant du monde extérieur et en réfléchissant sur vous-même.",
        "present": "Actuellement, L'Hermite suggère que vous pourriez bénéficier de prendre du recul et de chercher la solitude. C'est le moment de réfléchir, de méditer et de gagner une compréhension plus profonde de votre situation. Faites confiance à votre guidance intérieure.",
        "future": "En regardant vers l'avenir, L'Hermite indique un futur où l'introspection et la sagesse intérieure seront essentielles. Embrassez la solitude et l'autoréflexion, car ces pratiques mèneront à une croissance personnelle profonde et à l'illumination."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Eremit für eine Zeit der Introspektion und Einsamkeit. Sie suchten Weisheit und Verständnis, indem Sie sich aus der äußeren Welt zurückzogen und über Ihr inneres Selbst nachdachten.",
        "present": "Derzeit deutet Der Eremit darauf hin, dass Sie davon profitieren könnten, einen Schritt zurückzutreten und die Einsamkeit zu suchen. Es ist eine Zeit zum Nachdenken, Meditieren und zum Erlangen eines tieferen Verständnisses Ihrer Situation. Vertrauen Sie auf Ihre innere Führung.",
        "future": "Mit Blick auf die Zukunft zeigt Der Eremit eine Zukunft, in der Introspektion und innere Weisheit entscheidend sein werden. Nutzen Sie die Einsamkeit und Selbstreflexion, da diese Praktiken zu einem tiefen persönlichen Wachstum und Erleuchtung führen werden."
      },
      "it": {
        "past": "Nel tuo passato, L'Eremita rappresenta un periodo di introspezione e solitudine. Hai cercato saggezza e comprensione ritirandoti dal mondo esterno e riflettendo su te stesso.",
        "present": "Attualmente, L'Eremita suggerisce che potresti beneficiare di fare un passo indietro e cercare la solitudine. È il momento di riflettere, meditare e ottenere una comprensione più profonda della tua situazione. Fidati della tua guida interiore.",
        "future": "Guardando al futuro, L'Eremita indica un futuro in cui l'introspezione e la saggezza interiore saranno essenziali. Abbraccia la solitudine e l'auto-riflessione, poiché queste pratiche porteranno a una profonda crescita personale e illuminazione."
      },
      "tr": {
        "past": "Geçmişinde, Münzevi kartı içsel düşünce ve yalnızlık zamanını simgeliyor. Dış dünyadan uzaklaşarak ve iç benliğini düşünerek bilgelik ve anlayış aradın.",
        "present": "Şu anda, Münzevi kartı, bir adım geri atmanın ve yalnızlık aramanın faydalı olabileceğini gösteriyor. Durumu yansıtmak, meditasyon yapmak ve daha derin bir anlayış kazanmak için bir zaman. İç rehberine güven.",
        "future": "Geleceğe baktığında, Münzevi kartı, içsel düşünce ve içsel bilgeliklerin önemli olacağı bir geleceği işaret ediyor. Yalnızlığı ve öz yansımayı benimse, çünkü bu uygulamalar derin kişisel büyümeye ve aydınlanmaya yol açacak."
      }
    },
    "Wheel of Fortune": {
      "en": {
        "past": "In your past, the Wheel of Fortune signifies a time of significant change and turning points. You experienced shifts in your circumstances that were beyond your control, but these changes ultimately led to new opportunities and growth.",
        "present": "Currently, the Wheel of Fortune suggests that you are in a phase of change and flux. Embrace the cycles and rhythms of life, as they are bringing new possibilities and challenges. Adaptability and openness will help you navigate this period effectively.",
        "future": "Looking ahead, the Wheel of Fortune indicates that further changes and transformations are on the horizon. Prepare for shifts in your circumstances and embrace the opportunities that arise. Your ability to adapt will be key to making the most of the coming changes."
      },
      "es": {
        "past": "En tu pasado, La Rueda de la Fortuna simboliza un tiempo de cambios significativos y puntos de inflexión. Experimentaste alteraciones en tus circunstancias que estaban fuera de tu control, pero estos cambios finalmente llevaron a nuevas oportunidades y crecimiento.",
        "present": "Actualmente, La Rueda de la Fortuna sugiere que estás en una fase de cambio y flujo. Acepta los ciclos y ritmos de la vida, ya que están trayendo nuevas posibilidades y desafíos. La adaptabilidad y apertura te ayudarán a navegar este período de manera efectiva.",
        "future": "Mirando hacia adelante, La Rueda de la Fortuna indica que hay más cambios y transformaciones en el horizonte. Prepárate para alteraciones en tus circunstancias y abraza las oportunidades que surjan. Tu capacidad para adaptarte será clave para aprovechar al máximo los cambios venideros."
      },
      "fr": {
        "past": "Dans votre passé, La Roue de la Fortune représente une période de changements significatifs et de points tournants. Vous avez vécu des changements dans vos circonstances qui étaient hors de votre contrôle, mais ces changements ont finalement conduit à de nouvelles opportunités et à la croissance.",
        "present": "Actuellement, La Roue de la Fortune suggère que vous êtes dans une phase de changement et de flux. Acceptez les cycles et les rythmes de la vie, car ils apportent de nouvelles possibilités et défis. L'adaptabilité et l'ouverture d'esprit vous aideront à naviguer efficacement pendant cette période.",
        "future": "En regardant vers l'avenir, La Roue de la Fortune indique que d'autres changements et transformations sont à l'horizon. Préparez-vous à des modifications dans vos circonstances et saisissez les opportunités qui se présentent. Votre capacité à vous adapter sera essentielle pour tirer le meilleur parti des changements à venir."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Das Rad des Schicksals für eine Zeit signifikanter Veränderungen und Wendepunkte. Sie erlebten Verschiebungen in Ihren Umständen, die außerhalb Ihrer Kontrolle lagen, aber diese Veränderungen führten letztlich zu neuen Möglichkeiten und Wachstum.",
        "present": "Derzeit deutet Das Rad des Schicksals darauf hin, dass Sie sich in einer Phase des Wandels und Flusses befinden. Akzeptieren Sie die Zyklen und Rhythmen des Lebens, da sie neue Möglichkeiten und Herausforderungen bringen. Anpassungsfähigkeit und Offenheit werden Ihnen helfen, diese Zeit effektiv zu bewältigen.",
        "future": "Mit Blick auf die Zukunft zeigt Das Rad des Schicksals, dass weitere Veränderungen und Transformationen bevorstehen. Bereiten Sie sich auf Veränderungen in Ihren Umständen vor und nutzen Sie die sich bietenden Chancen. Ihre Fähigkeit zur Anpassung wird entscheidend sein, um das Beste aus den kommenden Veränderungen zu machen."
      },
      "it": {
        "past": "Nel tuo passato, La Ruota della Fortuna rappresenta un periodo di cambiamenti significativi e punti di svolta. Hai vissuto cambiamenti nelle tue circostanze che erano al di fuori del tuo controllo, ma questi cambiamenti hanno portato a nuove opportunità e crescita.",
        "present": "Attualmente, La Ruota della Fortuna suggerisce che sei in una fase di cambiamento e flusso. Accetta i cicli e i ritmi della vita, poiché portano nuove possibilità e sfide. L'adattabilità e l'apertura ti aiuteranno a navigare efficacemente in questo periodo.",
        "future": "Guardando al futuro, La Ruota della Fortuna indica che ulteriori cambiamenti e trasformazioni sono all'orizzonte. Preparati per cambiamenti nelle tue circostanze e abbraccia le opportunità che si presentano. La tua capacità di adattamento sarà fondamentale per sfruttare al meglio i cambiamenti in arrivo."
      },
      "tr": {
        "past": "Geçmişinde, Şans Çarkı kartı önemli değişimlerin ve dönüm noktalarının yaşandığı bir dönemi simgeliyor. Kontrolün dışında olan bu değişimler, sonunda yeni fırsatlar ve büyüme sağladı.",
        "present": "Şu anda, Şans Çarkı kartı değişim ve akış döneminde olduğunu gösteriyor. Hayatın döngülerini ve ritimlerini kabul et, çünkü bunlar yeni olasılıklar ve zorluklar getiriyor. Uyumluluk ve açıklık, bu dönemi etkili bir şekilde yönetmene yardımcı olacak.",
        "future": "Geleceğe baktığında, Şans Çarkı kartı daha fazla değişim ve dönüşümün ufukta olduğunu işaret ediyor. Koşullarındaki değişikliklere hazırlıklı ol ve çıkan fırsatları kucakla. Adaptasyon yeteneğin, gelen değişimlerden en iyi şekilde yararlanmanı sağlayacak."
      }
    },
    "Justice": {
      "en": {
        "past": "In your past, Justice signifies a time when fairness, truth, and balance were crucial. You may have faced situations where you had to make difficult decisions or seek justice, and your actions were guided by a strong sense of integrity.",
        "present": "Currently, Justice suggests that you are dealing with issues related to fairness, accountability, and balance. It’s a time to seek the truth and ensure that your actions and decisions are aligned with your values and principles. Fairness and honesty are key.",
        "future": "Looking ahead, Justice indicates that you will face situations where fairness and integrity will be essential. Prepare to confront challenges that require a balanced and ethical approach. The outcomes will depend on how well you uphold your values and seek justice."
      },
      "es": {
        "past": "En tu pasado, La Justicia simboliza un tiempo en el que la equidad, la verdad y el equilibrio eran cruciales. Puede que hayas enfrentado situaciones en las que tuviste que tomar decisiones difíciles o buscar justicia, y tus acciones fueron guiadas por un fuerte sentido de integridad.",
        "present": "Actualmente, La Justicia sugiere que estás lidiando con cuestiones relacionadas con la equidad, la responsabilidad y el equilibrio. Es un momento para buscar la verdad y asegurar que tus acciones y decisiones estén alineadas con tus valores y principios. La equidad y la honestidad son clave.",
        "future": "Mirando hacia adelante, La Justicia indica que enfrentarás situaciones en las que la equidad y la integridad serán esenciales. Prepárate para afrontar desafíos que requieran un enfoque equilibrado y ético. Los resultados dependerán de cuán bien mantengas tus valores y busques justicia."
      },
      "fr": {
        "past": "Dans votre passé, La Justice représente une période où l'équité, la vérité et l'équilibre étaient cruciaux. Vous avez peut-être été confronté à des situations où vous deviez prendre des décisions difficiles ou rechercher la justice, et vos actions étaient guidées par un fort sens de l'intégrité.",
        "present": "Actuellement, La Justice suggère que vous traitez des questions liées à l'équité, à la responsabilité et à l'équilibre. C'est le moment de rechercher la vérité et de vous assurer que vos actions et décisions sont alignées avec vos valeurs et principes. L'équité et l'honnêteté sont essentielles.",
        "future": "En regardant vers l'avenir, La Justice indique que vous serez confronté à des situations où l'équité et l'intégrité seront essentielles. Préparez-vous à affronter des défis qui nécessitent une approche équilibrée et éthique. Les résultats dépendront de la manière dont vous maintenez vos valeurs et recherchez la justice."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Gerechtigkeit für eine Zeit, in der Fairness, Wahrheit und Balance entscheidend waren. Sie haben möglicherweise Situationen erlebt, in denen Sie schwierige Entscheidungen treffen oder nach Gerechtigkeit suchen mussten, und Ihre Handlungen waren von einem starken Sinn für Integrität geleitet.",
        "present": "Derzeit deutet Die Gerechtigkeit darauf hin, dass Sie mit Fragen der Fairness, Verantwortlichkeit und Balance konfrontiert sind. Es ist an der Zeit, die Wahrheit zu suchen und sicherzustellen, dass Ihre Handlungen und Entscheidungen mit Ihren Werten und Prinzipien übereinstimmen. Fairness und Ehrlichkeit sind entscheidend.",
        "future": "Mit Blick auf die Zukunft zeigt Die Gerechtigkeit, dass Sie mit Situationen konfrontiert werden, in denen Fairness und Integrität unerlässlich sein werden. Bereiten Sie sich darauf vor, Herausforderungen zu begegnen, die einen ausgewogenen und ethischen Ansatz erfordern. Die Ergebnisse hängen davon ab, wie gut Sie Ihre Werte aufrechterhalten und Gerechtigkeit suchen."
      },
      "it": {
        "past": "Nel tuo passato, La Giustizia rappresenta un periodo in cui equità, verità ed equilibrio erano cruciali. Potresti aver affrontato situazioni in cui hai dovuto prendere decisioni difficili o cercare giustizia, e le tue azioni erano guidate da un forte senso di integrità.",
        "present": "Attualmente, La Giustizia suggerisce che stai affrontando questioni legate all'equità, alla responsabilità e all'equilibrio. È il momento di cercare la verità e assicurarti che le tue azioni e decisioni siano allineate con i tuoi valori e principi. L'equità e l'onestà sono fondamentali.",
        "future": "Guardando al futuro, La Giustizia indica che affronterai situazioni in cui equità e integrità saranno essenziali. Preparati a confrontarti con sfide che richiedono un approccio equilibrato ed etico. I risultati dipenderanno da quanto bene mantieni i tuoi valori e cerchi giustizia."
      },
      "tr": {
        "past": "Geçmişinde, Adalet kartı adalet, doğruluk ve denge zamanlarını simgeliyor. Zorlu kararlar vermek ya da adalet aramak zorunda kaldığın durumlarla karşılaşmış olabilirsin ve hareketlerin güçlü bir bütünlük duygusu tarafından yönlendirilmişti.",
        "present": "Şu anda, Adalet kartı, adalet, sorumluluk ve dengenin önemli olduğu konularla ilgilendiğini gösteriyor. Gerçekleri aramak ve eylem ve kararlarının değerlerin ve prensiplerinle uyumlu olmasını sağlamak için bir zaman. Adalet ve dürüstlük ön planda.",
        "future": "Geleceğe baktığında, Adalet kartı, adalet ve bütünlüğün gerekli olduğu durumlarla karşılaşacağını gösteriyor. Dengeli ve etik bir yaklaşım gerektiren zorluklarla yüzleşmeye hazırlıklı ol. Sonuçlar, değerlerini ne kadar iyi koruduğuna ve adalet arayışına bağlı olacak."
      }
    },
    "The Hanged Man": {
      "en": {
        "past": "In your past, The Hanged Man represents a period of suspension and self-reflection. You may have experienced a situation where progress was halted, prompting you to pause and reevaluate your approach and beliefs.",
        "present": "Currently, The Hanged Man suggests that you are in a phase of waiting or feeling stuck. It’s a time to embrace this pause and gain new perspectives. Reflect on your situation and consider alternative viewpoints to find clarity.",
        "future": "Looking ahead, The Hanged Man indicates that you will encounter a period where patience and a shift in perspective will be crucial. Prepare to let go of old patterns and embrace a new way of thinking. This will lead to personal growth and deeper understanding."
      },
      "es": {
        "past": "En tu pasado, El Colgado representa un período de suspensión y auto-reflexión. Puede que hayas experimentado una situación en la que el progreso se detuvo, lo que te llevó a hacer una pausa y reevaluar tu enfoque y creencias.",
        "present": "Actualmente, El Colgado sugiere que estás en una fase de espera o te sientes estancado. Es un momento para abrazar esta pausa y obtener nuevas perspectivas. Reflexiona sobre tu situación y considera puntos de vista alternativos para encontrar claridad.",
        "future": "Mirando hacia adelante, El Colgado indica que encontrarás un período donde la paciencia y un cambio en la perspectiva serán cruciales. Prepárate para soltar viejos patrones y adoptar una nueva forma de pensar. Esto llevará a un crecimiento personal y una comprensión más profunda."
      },
      "fr": {
        "past": "Dans votre passé, Le Pendu représente une période de suspension et d'auto-réflexion. Vous avez peut-être vécu une situation où le progrès a été interrompu, vous poussant à faire une pause et à réévaluer votre approche et vos croyances.",
        "present": "Actuellement, Le Pendu suggère que vous êtes dans une phase d'attente ou de blocage. C'est le moment d'accepter cette pause et de gagner de nouvelles perspectives. Réfléchissez à votre situation et envisagez des points de vue alternatifs pour trouver de la clarté.",
        "future": "En regardant vers l'avenir, Le Pendu indique que vous rencontrerez une période où la patience et un changement de perspective seront cruciaux. Préparez-vous à lâcher prise des anciens schémas et à adopter une nouvelle façon de penser. Cela mènera à une croissance personnelle et à une compréhension plus profonde."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Gehängte für eine Zeit der Unterbrechung und Selbstreflexion. Sie haben möglicherweise eine Situation erlebt, in der der Fortschritt gestoppt wurde, was Sie dazu veranlasste, eine Pause einzulegen und Ihre Vorgehensweise und Überzeugungen neu zu bewerten.",
        "present": "Derzeit deutet Der Gehängte darauf hin, dass Sie sich in einer Phase des Wartens oder Feststeckens befinden. Es ist eine Zeit, diese Pause zu akzeptieren und neue Perspektiven zu gewinnen. Reflektieren Sie über Ihre Situation und ziehen Sie alternative Sichtweisen in Betracht, um Klarheit zu finden.",
        "future": "Mit Blick auf die Zukunft zeigt Der Gehängte, dass Sie eine Phase erleben werden, in der Geduld und ein Perspektivwechsel entscheidend sein werden. Bereiten Sie sich darauf vor, alte Muster loszulassen und eine neue Denkweise zu übernehmen. Dies wird zu persönlichem Wachstum und tieferem Verständnis führen."
      },
      "it": {
        "past": "Nel tuo passato, L'Appeso rappresenta un periodo di sospensione e auto-riflessione. Potresti aver vissuto una situazione in cui il progresso è stato interrotto, spingendoti a fare una pausa e a rivalutare il tuo approccio e le tue convinzioni.",
        "present": "Attualmente, L'Appeso suggerisce che sei in una fase di attesa o di stagnazione. È il momento di accettare questa pausa e ottenere nuove prospettive. Rifletti sulla tua situazione e considera punti di vista alternativi per trovare chiarezza.",
        "future": "Guardando al futuro, L'Appeso indica che incontrerai un periodo in cui la pazienza e un cambiamento di prospettiva saranno cruciali. Preparati a lasciare andare i vecchi schemi e ad adottare un nuovo modo di pensare. Questo porterà a una crescita personale e a una comprensione più profonda."
      },
      "tr": {
        "past": "Geçmişinde, Asılmış Adam kartı bir duraksama ve öz yansıma dönemini simgeliyor. İlerlemenin durduğu bir durum yaşamış olabilir ve bu, yaklaşımını ve inançlarını yeniden değerlendirmek için bir ara vermene neden olmuş olabilir.",
        "present": "Şu anda, Asılmış Adam kartı bekleme veya sıkışmış hissetme aşamasında olduğunu gösteriyor. Bu duraklamayı kabul etme ve yeni bakış açıları kazanma zamanı. Durumunu üzerinde düşün ve netlik bulmak için alternatif bakış açılarını değerlendir.",
        "future": "Geleceğe baktığında, Asılmış Adam kartı sabır ve perspektif değişiminin kritik olacağı bir dönemle karşılaşacağını gösteriyor. Eski kalıpları bırakmaya ve yeni bir düşünme biçimini benimsemeye hazırlan. Bu, kişisel büyümeye ve daha derin bir anlayışa yol açacak."
      }
    },
    "Death": {
      "en": {
        "past": "In your past, Death signifies a period of significant transformation and endings. You may have experienced a major shift or the conclusion of a chapter in your life, which paved the way for new beginnings and growth.",
        "present": "Currently, Death suggests that you are undergoing a period of transition and transformation. It’s a time to let go of what no longer serves you and embrace change. Allow yourself to move through this process with acceptance and openness to what’s new.",
        "future": "Looking ahead, Death indicates that you will face further transformations and endings. Prepare for significant changes and be ready to release old patterns or situations. Embracing these transitions will lead to renewal and new opportunities."
      },
      "es": {
        "past": "En tu pasado, La Muerte simboliza un período de transformación significativa y finales. Puede que hayas experimentado un cambio importante o la conclusión de un capítulo en tu vida, que preparó el camino para nuevos comienzos y crecimiento.",
        "present": "Actualmente, La Muerte sugiere que estás atravesando un período de transición y transformación. Es un momento para dejar ir lo que ya no te sirve y aceptar el cambio. Permítete pasar por este proceso con aceptación y apertura a lo nuevo.",
        "future": "Mirando hacia adelante, La Muerte indica que enfrentarás más transformaciones y finales. Prepárate para cambios significativos y estar listo para soltar viejos patrones o situaciones. Aceptar estas transiciones conducirá a la renovación y nuevas oportunidades."
      },
      "fr": {
        "past": "Dans votre passé, La Mort représente une période de transformation significative et de fins. Vous avez peut-être vécu un changement majeur ou la conclusion d'un chapitre de votre vie, ce qui a préparé le terrain pour de nouveaux commencements et une croissance.",
        "present": "Actuellement, La Mort suggère que vous traversez une période de transition et de transformation. C'est le moment de laisser aller ce qui ne vous sert plus et d'accepter le changement. Permettez-vous de passer par ce processus avec acceptation et ouverture à ce qui est nouveau.",
        "future": "En regardant vers l'avenir, La Mort indique que vous ferez face à d'autres transformations et fins. Préparez-vous à des changements significatifs et soyez prêt à abandonner les anciens schémas ou situations. Accepter ces transitions mènera à un renouvellement et à de nouvelles opportunités."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Tod für eine Zeit signifikanter Transformation und Enden. Sie haben möglicherweise einen großen Wandel oder den Abschluss eines Kapitels in Ihrem Leben erlebt, der den Weg für neue Anfänge und Wachstum ebnete.",
        "present": "Derzeit deutet Der Tod darauf hin, dass Sie eine Phase der Transition und Transformation durchlaufen. Es ist eine Zeit, loszulassen, was Ihnen nicht mehr dient, und den Wandel zu akzeptieren. Lassen Sie sich auf diesen Prozess mit Akzeptanz und Offenheit für das Neue ein.",
        "future": "Mit Blick auf die Zukunft zeigt Der Tod, dass weitere Transformationen und Enden bevorstehen. Bereiten Sie sich auf bedeutende Veränderungen vor und seien Sie bereit, alte Muster oder Situationen loszulassen. Die Akzeptanz dieser Übergänge wird zu Erneuerung und neuen Chancen führen."
      },
      "it": {
        "past": "Nel tuo passato, La Morte rappresenta un periodo di trasformazione significativa e conclusioni. Potresti aver vissuto un grande cambiamento o la conclusione di un capitolo nella tua vita, che ha preparato il terreno per nuovi inizi e crescita.",
        "present": "Attualmente, La Morte suggerisce che stai attraversando un periodo di transizione e trasformazione. È il momento di lasciar andare ciò che non ti serve più e accogliere il cambiamento. Permettiti di passare attraverso questo processo con accettazione e apertura a ciò che è nuovo.",
        "future": "Guardando al futuro, La Morte indica che affronterai ulteriori trasformazioni e conclusioni. Preparati a cambiamenti significativi e sii pronto a lasciare andare vecchi schemi o situazioni. Accettare queste transizioni porterà a rinnovamento e nuove opportunità."
      },
      "tr": {
        "past": "Geçmişinde, Ölüm kartı önemli bir dönüşüm ve sonlar dönemini simgeliyor. Büyük bir değişim yaşamış olabilir ya da hayatında bir bölümün son bulduğunu deneyimlemiş olabilirsin, bu da yeni başlangıçlar ve büyüme için zemin hazırlamış olabilir.",
        "present": "Şu anda, Ölüm kartı bir geçiş ve dönüşüm döneminden geçtiğini gösteriyor. Artık sana hizmet etmeyen şeyleri bırakma ve değişimi kabul etme zamanı. Bu süreci kabul ile ve yeniliğe açık bir şekilde geçirmene izin ver.",
        "future": "Geleceğe baktığında, Ölüm kartı daha fazla dönüşüm ve sonlarla karşılaşacağını işaret ediyor. Önemli değişikliklere hazırlıklı ol ve eski kalıpları ya da durumları bırakmaya hazır ol. Bu geçişleri kabul etmek, yenilenme ve yeni fırsatlar getirecektir."
      }
    },
    "Temperance": {
      "en": {
        "past": "In your past, Temperance signifies a time of balance, moderation, and harmony. You may have experienced a period where you were able to integrate different aspects of your life and find a sense of equilibrium. This balance brought peace and stability.",
        "present": "Currently, Temperance suggests that you are in a phase where finding balance and moderation is key. It’s important to blend different elements of your life and work towards harmony. Patience and adaptability will help you achieve a state of equilibrium.",
        "future": "Looking ahead, Temperance indicates that you will need to focus on achieving balance and harmony in your life. Prepare to integrate various aspects and find a middle ground. This will lead to personal growth and a more harmonious future."
      },
      "es": {
        "past": "En tu pasado, La Templanza simboliza un tiempo de equilibrio, moderación y armonía. Puede que hayas experimentado un período en el que pudiste integrar diferentes aspectos de tu vida y encontrar un sentido de equilibrio. Este equilibrio trajo paz y estabilidad.",
        "present": "Actualmente, La Templanza sugiere que estás en una fase donde encontrar equilibrio y moderación es clave. Es importante combinar diferentes elementos de tu vida y trabajar hacia la armonía. La paciencia y la adaptabilidad te ayudarán a alcanzar un estado de equilibrio.",
        "future": "Mirando hacia adelante, La Templanza indica que necesitarás centrarte en lograr equilibrio y armonía en tu vida. Prepárate para integrar varios aspectos y encontrar un punto medio. Esto conducirá al crecimiento personal y a un futuro más armonioso."
      },
      "fr": {
        "past": "Dans votre passé, La Tempérance représente une période d'équilibre, de modération et d'harmonie. Vous avez peut-être vécu une période où vous avez pu intégrer différents aspects de votre vie et trouver un sentiment d'équilibre. Cet équilibre a apporté paix et stabilité.",
        "present": "Actuellement, La Tempérance suggère que vous êtes dans une phase où trouver l'équilibre et la modération est crucial. Il est important de mélanger différents éléments de votre vie et de travailler vers l'harmonie. La patience et l'adaptabilité vous aideront à atteindre un état d'équilibre.",
        "future": "En regardant vers l'avenir, La Tempérance indique que vous devrez vous concentrer sur l'obtention d'équilibre et d'harmonie dans votre vie. Préparez-vous à intégrer divers aspects et à trouver un terrain d'entente. Cela mènera à une croissance personnelle et à un avenir plus harmonieux."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Mäßigkeit für eine Zeit des Gleichgewichts, der Mäßigung und der Harmonie. Sie haben möglicherweise eine Phase erlebt, in der Sie verschiedene Aspekte Ihres Lebens integrieren und ein Gefühl der Ausgeglichenheit finden konnten. Dieses Gleichgewicht brachte Frieden und Stabilität.",
        "present": "Derzeit deutet Die Mäßigkeit darauf hin, dass es wichtig ist, Balance und Mäßigung zu finden. Es ist wichtig, verschiedene Elemente Ihres Lebens zu vereinen und auf Harmonie hinzuarbeiten. Geduld und Anpassungsfähigkeit werden Ihnen helfen, einen Zustand des Gleichgewichts zu erreichen.",
        "future": "Mit Blick auf die Zukunft zeigt Die Mäßigkeit, dass Sie sich auf das Erreichen von Balance und Harmonie in Ihrem Leben konzentrieren müssen. Bereiten Sie sich darauf vor, verschiedene Aspekte zu integrieren und einen Mittelweg zu finden. Dies wird zu persönlichem Wachstum und einer harmonischeren Zukunft führen."
      },
      "it": {
        "past": "Nel tuo passato, La Temperanza rappresenta un periodo di equilibrio, moderazione e armonia. Potresti aver vissuto una fase in cui sei riuscito a integrare diversi aspetti della tua vita e a trovare un senso di equilibrio. Questo equilibrio ha portato pace e stabilità.",
        "present": "Attualmente, La Temperanza suggerisce che sei in una fase in cui trovare equilibrio e moderazione è fondamentale. È importante mescolare diversi elementi della tua vita e lavorare verso l'armonia. La pazienza e l'adattabilità ti aiuteranno a raggiungere uno stato di equilibrio.",
        "future": "Guardando al futuro, La Temperanza indica che dovrai concentrarti sul raggiungimento di equilibrio e armonia nella tua vita. Preparati a integrare vari aspetti e trovare un punto di mezzo. Questo porterà a una crescita personale e a un futuro più armonioso."
      },
      "tr": {
        "past": "Geçmişinde, Ölçülülük kartı denge, ılımlılık ve uyum zamanlarını simgeliyor. Farklı yaşam alanlarını birleştirip bir denge bulabildiğin bir dönem yaşamış olabilirsin. Bu denge, huzur ve istikrar getirdi.",
        "present": "Şu anda, Ölçülülük kartı denge ve ılımlılığın önemli olduğunu gösteriyor. Hayatının çeşitli unsurlarını birleştirip uyum sağlamaya çalışman önemli. Sabır ve uyum sağlama yeteneğin, bir denge durumuna ulaşmana yardımcı olacak.",
        "future": "Geleceğe baktığında, Ölçülülük kartı yaşamında denge ve uyum sağlama üzerine odaklanman gerektiğini gösteriyor. Farklı unsurları birleştirmeye ve bir orta yol bulmaya hazırlıklı ol. Bu, kişisel büyüme ve daha uyumlu bir gelecek getirecek."
      }
    },
    "The Devil": {
      "en": {
        "past": "In your past, The Devil represents a time when you may have been bound by negative influences or unhealthy patterns. This could have involved addictions, materialism, or toxic relationships that kept you feeling trapped and limited.",
        "present": "Currently, The Devil suggests that you may be facing issues related to temptation, control, or dependency. It’s important to recognize these influences and work on freeing yourself from anything that restricts your growth and happiness. Awareness and action are key.",
        "future": "Looking ahead, The Devil indicates that you may encounter further challenges related to control and temptation. Prepare to confront these issues and make choices that lead to liberation and personal empowerment. Overcoming these obstacles will open the path to greater freedom and fulfillment."
      },
      "es": {
        "past": "En tu pasado, El Diablo representa un tiempo en el que podrías haber estado atado a influencias negativas o patrones poco saludables. Esto podría haber implicado adicciones, materialismo o relaciones tóxicas que te hacían sentir atrapado y limitado.",
        "present": "Actualmente, El Diablo sugiere que podrías estar enfrentando problemas relacionados con la tentación, el control o la dependencia. Es importante reconocer estas influencias y trabajar para liberarte de cualquier cosa que limite tu crecimiento y felicidad. La conciencia y la acción son clave.",
        "future": "Mirando hacia adelante, El Diablo indica que podrías encontrar más desafíos relacionados con el control y la tentación. Prepárate para confrontar estos problemas y tomar decisiones que lleven a la liberación y el empoderamiento personal. Superar estos obstáculos abrirá el camino hacia una mayor libertad y satisfacción."
      },
      "fr": {
        "past": "Dans votre passé, Le Diable représente une période où vous avez pu être lié par des influences négatives ou des schémas malsains. Cela pourrait avoir impliqué des addictions, du matérialisme ou des relations toxiques qui vous faisaient sentir piégé et limité.",
        "present": "Actuellement, Le Diable suggère que vous pourriez être confronté à des problèmes liés à la tentation, au contrôle ou à la dépendance. Il est important de reconnaître ces influences et de travailler à vous libérer de tout ce qui restreint votre croissance et votre bonheur. La prise de conscience et l'action sont essentielles.",
        "future": "En regardant vers l'avenir, Le Diable indique que vous pourriez rencontrer de nouveaux défis liés au contrôle et à la tentation. Préparez-vous à affronter ces problèmes et à faire des choix qui mènent à la libération et à l'autonomisation personnelle. Surmonter ces obstacles ouvrira la voie à une plus grande liberté et épanouissement."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Teufel für eine Zeit, in der Sie möglicherweise von negativen Einflüssen oder ungesunden Mustern gebunden waren. Dies könnte Abhängigkeiten, Materialismus oder toxische Beziehungen umfasst haben, die Sie sich gefangen und begrenzt fühlen ließen.",
        "present": "Derzeit deutet Der Teufel darauf hin, dass Sie möglicherweise mit Problemen im Zusammenhang mit Versuchung, Kontrolle oder Abhängigkeit konfrontiert sind. Es ist wichtig, diese Einflüsse zu erkennen und daran zu arbeiten, sich von allem zu befreien, was Ihr Wachstum und Ihr Glück einschränkt. Bewusstsein und Handeln sind entscheidend.",
        "future": "Mit Blick auf die Zukunft zeigt Der Teufel, dass Sie möglicherweise weiteren Herausforderungen im Zusammenhang mit Kontrolle und Versuchung begegnen werden. Bereiten Sie sich darauf vor, diese Probleme anzugehen und Entscheidungen zu treffen, die zu Befreiung und persönlicher Ermächtigung führen. Das Überwinden dieser Hindernisse wird den Weg zu größerer Freiheit und Erfüllung ebnen."
      },
      "it": {
        "past": "Nel tuo passato, Il Diavolo rappresenta un periodo in cui potresti essere stato vincolato da influenze negative o schemi malsani. Questo potrebbe aver comportato dipendenze, materialismo o relazioni tossiche che ti facevano sentire intrappolato e limitato.",
        "present": "Attualmente, Il Diavolo suggerisce che potresti affrontare problemi legati alla tentazione, al controllo o alla dipendenza. È importante riconoscere queste influenze e lavorare per liberarti da tutto ciò che limita la tua crescita e felicità. Consapevolezza e azione sono fondamentali.",
        "future": "Guardando al futuro, Il Diavolo indica che potresti incontrare ulteriori sfide legate al controllo e alla tentazione. Preparati ad affrontare questi problemi e a fare scelte che portino alla liberazione e all'autoefficacia. Superare questi ostacoli aprirà la strada a una maggiore libertà e soddisfazione."
      },
      "tr": {
        "past": "Geçmişinde, Şeytan kartı negatif etkiler veya sağlıksız kalıplar tarafından bağlı olabileceğin bir dönemi simgeliyor. Bu, bağımlılıklar, materyalizm veya seni tuzağa düşüren ve sınırlayan toksik ilişkileri içermiş olabilir.",
        "present": "Şu anda, Şeytan kartı, cezbeye, kontrole veya bağımlılığa dair sorunlarla karşılaşabileceğini gösteriyor. Bu etkileri tanımak ve büyümeni ve mutluluğunu kısıtlayan her şeyden kendini kurtarmak için çalışmak önemli. Farkındalık ve eylem anahtar olacak.",
        "future": "Geleceğe baktığında, Şeytan kartı kontrol ve cezbeye dair daha fazla zorlukla karşılaşabileceğini gösteriyor. Bu sorunları yüzleşmeye ve seni özgürleştirecek ve kişisel güçlenme sağlayacak kararlar almaya hazırlan. Bu engelleri aşmak, daha fazla özgürlük ve tatmin yolu açacaktır."
      }
    },
    "The Tower": {
      "en": {
        "past": "In your past, The Tower represents a period of sudden upheaval and unexpected change. You may have experienced a dramatic shift or a crisis that shook the foundations of your life. This event, though challenging, was a catalyst for necessary transformation.",
        "present": "Currently, The Tower suggests that you might be facing a period of upheaval or disruption. It’s important to confront and address these changes directly. Though it may feel chaotic, this time of upheaval is clearing the way for new structures and growth.",
        "future": "Looking ahead, The Tower indicates that you may encounter further disruptions or sudden changes. Prepare for potential shocks and be ready to adapt. Embracing these changes with resilience will help you rebuild and create a stronger foundation for the future."
      },
      "es": {
        "past": "En tu pasado, La Torre representa un período de agitación repentina y cambio inesperado. Puede que hayas experimentado un cambio dramático o una crisis que sacudió los cimientos de tu vida. Este evento, aunque desafiante, fue un catalizador para una transformación necesaria.",
        "present": "Actualmente, La Torre sugiere que podrías estar enfrentando un período de agitación o disrupción. Es importante confrontar y abordar estos cambios directamente. Aunque pueda parecer caótico, este tiempo de agitación está despejando el camino para nuevas estructuras y crecimiento.",
        "future": "Mirando hacia adelante, La Torre indica que podrías encontrar más disrupciones o cambios repentinos. Prepárate para posibles choques y estate listo para adaptarte. Abrazar estos cambios ile dirençle yaklaşmak, gelecekte daha güçlü bir temel inşa etmene yardımcı olacak."
      },
      "fr": {
        "past": "Dans votre passé, La Tour représente une période de bouleversement soudain et de changement inattendu. Vous avez peut-être vécu un changement dramatique ou une crise qui a secoué les fondations de votre vie. Cet événement, bien que difficile, a été un catalyseur pour une transformation nécessaire.",
        "present": "Actuellement, La Tour suggère que vous pourriez faire face à une période de bouleversement ou de disruption. Il est important d'affronter ces changements de manière directe. Bien que cela puisse sembler chaotique, ce temps de bouleversement ouvre la voie à de nouvelles structures et à la croissance.",
        "future": "En regardant vers l'avenir, La Tour indique que vous pourriez rencontrer davantage de disruptions ou de changements soudains. Préparez-vous à des chocs potentiels et soyez prêt à vous adapter. Accepter ces changements avec résilience vous aidera à reconstruire et à créer une base plus solide pour l'avenir."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Turm für eine Zeit plötzlicher Umwälzungen und unerwarteter Veränderungen. Sie haben möglicherweise einen dramatischen Wandel oder eine Krise erlebt, die die Grundlagen Ihres Lebens erschütterte. Dieses Ereignis, obwohl herausfordernd, war ein Katalysator für notwendige Transformationen.",
        "present": "Derzeit deutet Der Turm darauf hin, dass Sie möglicherweise eine Phase der Umwälzung oder Störung durchleben. Es ist wichtig, diese Veränderungen direkt zu konfrontieren und anzugehen. Auch wenn es chaotisch erscheinen mag, räumt diese Zeit der Umwälzung den Weg für neue Strukturen und Wachstum frei.",
        "future": "Mit Blick auf die Zukunft zeigt Der Turm, dass Sie möglicherweise weiteren Störungen oder plötzlichen Veränderungen begegnen werden. Bereiten Sie sich auf mögliche Schocks vor und seien Sie bereit, sich anzupassen. Diese Veränderungen mit Resilienz anzunehmen, wird Ihnen helfen, eine stärkere Grundlage für die Zukunft zu schaffen."
      },
      "it": {
        "past": "Nel tuo passato, La Torre rappresenta un periodo di sconvolgimenti improvvisi e cambiamenti inaspettati. Potresti aver vissuto un cambiamento drammatico o una crisi che ha scosso le fondamenta della tua vita. Questo evento, sebbene difficile, è stato un catalizzatore per una trasformazione necessaria.",
        "present": "Attualmente, La Torre suggerisce che potresti affrontare un periodo di sconvolgimenti o interruzioni. È importante affrontare e gestire questi cambiamenti direttamente. Anche se può sembrare caotico, questo periodo di sconvolgimenti sta aprendo la strada a nuove strutture e crescita.",
        "future": "Guardando al futuro, La Torre indica che potresti incontrare ulteriori interruzioni o cambiamenti improvvisi. Preparati a potenziali shock e sii pronto ad adattarti. Abbracciare questi cambiamenti con resilienza ti aiuterà a ricostruire e a creare una base più solida per il futuro."
      },
      "tr": {
        "past": "Geçmişinde, Kule kartı ani yıkımlar ve beklenmedik değişimler dönemini simgeliyor. Hayatının temellerini sarsan dramatik bir değişim veya kriz yaşamış olabilirsin. Bu olay, zorlu olsa da gerekli bir dönüşümün katalizörüydü.",
        "present": "Şu anda, Kule kartı, bir tür sarsıntı veya kesinti dönemi geçirebileceğini gösteriyor. Bu değişimlerle doğrudan yüzleşmen ve bunları ele alman önemli. Kaotik görünebilir, ancak bu sarsıntı dönemi yeni yapılar ve büyüme için yolu açıyor.",
        "future": "Geleceğe baktığında, Kule kartı, daha fazla kesinti veya ani değişimlerle karşılaşabileceğini gösteriyor. Potansiyel şoklara hazırlıklı ol ve uyum sağlamaya hazır ol. Bu değişimleri dirençle karşılamak, gelecekte daha sağlam bir temel inşa etmene yardımcı olacak."
      }
    },
    "The Star": {
      "en": {
        "past": "In your past, The Star represents a time of hope, inspiration, and renewal. You may have experienced a period of healing and a renewed sense of optimism and purpose. This time helped you regain faith and clarity in your life’s direction.",
        "present": "Currently, The Star suggests that you are in a period of hope and inspiration. It’s a time for you to focus on your dreams and aspirations with renewed faith and positivity. Embrace the sense of renewal and allow it to guide you towards your goals.",
        "future": "Looking ahead, The Star indicates that you will continue to experience hope and inspiration. Expect a period of clarity and guidance as you move towards your future. Trust in the process and maintain your optimism, as it will help you achieve your aspirations."
      },
      "es": {
        "past": "En tu pasado, La Estrella representa un tiempo de esperanza, inspiración y renovación. Puede que hayas experimentado un período de curación y un renovado sentido de optimismo y propósito. Este tiempo te ayudó a recuperar la fe y la claridad en la dirección de tu vida.",
        "present": "Actualmente, La Estrella sugiere que estás en un período de esperanza e inspiración. Es un momento para que te concentres en tus sueños y aspiraciones con fe y positividad renovadas. Abrazar el sentido de renovación y permitir que te guíe hacia tus metas.",
        "future": "Mirando hacia adelante, La Estrella indica que continuarás experimentando esperanza e inspiración. Espera un período de claridad y orientación mientras te diriges hacia tu futuro. Confía en el proceso y mantén tu optimismo, ya que te ayudará a alcanzar tus aspiraciones."
      },
      "fr": {
        "past": "Dans votre passé, L'Étoile représente une période d'espoir, d'inspiration et de renouveau. Vous avez peut-être vécu une période de guérison et un renouvellement de l'optimisme et du but. Ce temps vous a aidé à retrouver la foi et la clarté dans la direction de votre vie.",
        "present": "Actuellement, L'Étoile suggère que vous êtes dans une période d'espoir et d'inspiration. C'est le moment pour vous de vous concentrer sur vos rêves et aspirations avec une foi et une positivité renouvelées. Embrasser ce sentiment de renouveau et permettre qu'il vous guide vers vos objectifs.",
        "future": "En regardant vers l'avenir, L'Étoile indique que vous continuerez à vivre de l'espoir et de l'inspiration. Attendez-vous à une période de clarté et d'orientation en avançant vers votre futur. Ayez confiance dans le processus et maintenez votre optimisme, car cela vous aidera à réaliser vos aspirations."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Stern für eine Zeit der Hoffnung, Inspiration und Erneuerung. Sie haben möglicherweise eine Phase der Heilung und ein erneuertes Gefühl von Optimismus und Zweck erlebt. Diese Zeit half Ihnen, Glauben und Klarheit in die Richtung Ihres Lebens zurückzugewinnen.",
        "present": "Derzeit deutet Der Stern darauf hin, dass Sie sich in einer Phase der Hoffnung und Inspiration befinden. Es ist eine Zeit, sich mit neuem Glauben und Positivität auf Ihre Träume und Ziele zu konzentrieren. Nutzen Sie das Gefühl der Erneuerung und lassen Sie es Sie zu Ihren Zielen führen.",
        "future": "Mit Blick auf die Zukunft zeigt Der Stern, dass Sie weiterhin Hoffnung und Inspiration erfahren werden. Erwarten Sie eine Zeit der Klarheit und Orientierung, während Sie sich auf Ihre Zukunft zubewegen. Vertrauen Sie dem Prozess und bewahren Sie Ihren Optimismus, da dies Ihnen hilft, Ihre Ziele zu erreichen."
      },
      "it": {
        "past": "Nel tuo passato, La Stella rappresenta un periodo di speranza, ispirazione e rinnovamento. Potresti aver vissuto un periodo di guarigione e un rinnovato senso di ottimismo e scopo. Questo tempo ti ha aiutato a ritrovare la fede e la chiarezza nella direzione della tua vita.",
        "present": "Attualmente, La Stella suggerisce che ti trovi in un periodo di speranza e ispirazione. È un momento per concentrarti sui tuoi sogni e aspirazioni con una fede e una positività rinnovate. Abbraccia il senso di rinnovamento e permetti che ti guidi verso i tuoi obiettivi.",
        "future": "Guardando al futuro, La Stella indica che continuerai a vivere speranza e ispirazione. Aspettati un periodo di chiarezza e orientamento mentre ti muovi verso il futuro. Fidati del processo e mantieni il tuo ottimismo, poiché ti aiuterà a raggiungere le tue aspirazioni."
      },
      "tr": {
        "past": "Geçmişinde, Yıldız kartı umut, ilham ve yenilenme dönemini simgeliyor. Bir iyileşme dönemi ve yeniden canlanan bir iyimserlik ve amaç duygusu yaşamış olabilirsin. Bu dönem, hayatının yönü hakkında inanç ve netlik kazanmanı sağladı.",
        "present": "Şu anda, Yıldız kartı umut ve ilham içinde olduğun bir dönemde olduğunu gösteriyor. Bu, hayallerin ve hedeflerin üzerinde yenilenmiş bir inanç ve pozitiflikle yoğunlaşma zamanı. Yenilenme hissini kucakla ve seni hedeflerine yönlendirmesine izin ver.",
        "future": "Geleceğe baktığında, Yıldız kartı umut ve ilham yaşamaya devam edeceğini gösteriyor. Geleceğe doğru hareket ederken netlik ve yönlendirme dönemi bekleyebilirsin. Sürece güven ve iyimserliğini koru, çünkü bu, hedeflerine ulaşmana yardımcı olacak."
      }
    },
    "The Moon": {
      "en": {
        "past": "In your past, The Moon represents a period of confusion, illusion, and uncertainty. You may have faced deceptive situations or had difficulty distinguishing reality from fantasy. This time was marked by emotional turbulence and a sense of being lost or unsure.",
        "present": "Currently, The Moon suggests that you may be experiencing confusion or facing illusions. It’s important to navigate through this period with caution and seek clarity. Trust your intuition and be mindful of misleading appearances. Reflect on your emotions and seek inner guidance.",
        "future": "Looking ahead, The Moon indicates that you may encounter further uncertainty or deceptive situations. Prepare to face potential illusions and remain vigilant. By relying on your intuition and seeking deeper understanding, you will be able to navigate through these challenges and find clarity."
      },
      "es": {
        "past": "En tu pasado, La Luna representa un período de confusión, ilusión e incertidumbre. Puede que hayas enfrentado situaciones engañosas o tenido dificultad para distinguir la realidad de la fantasía. Este tiempo estuvo marcado por turbulencias emocionales y una sensación de pérdida o inseguridad.",
        "present": "Actualmente, La Luna sugiere que podrías estar experimentando confusión o enfrentando ilusiones. Es importante navegar a través de este período con cautela y buscar claridad. Confía en tu intuición y ten cuidado con las apariencias engañosas. Reflexiona sobre tus emociones y busca orientación interior.",
        "future": "Mirando hacia adelante, La Luna indica que podrías encontrar más incertidumbre o situaciones engañosas. Prepárate para enfrentar posibles ilusiones y mantente alerta. Al confiar en tu intuición y buscar una comprensión más profunda, podrás navegar a través de estos desafíos y encontrar claridad."
      },
      "fr": {
        "past": "Dans votre passé, La Lune représente une période de confusion, d'illusion et d'incertitude. Vous avez peut-être été confronté à des situations trompeuses ou eu du mal à distinguer la réalité de la fantaisie. Ce temps était marqué par une turbulence émotionnelle et un sentiment de perte ou d'incertitude.",
        "present": "Actuellement, La Lune suggère que vous pourriez vivre de la confusion ou faire face à des illusions. Il est important de naviguer avec prudence pendant cette période et de chercher de la clarté. Faites confiance à votre intuition et méfiez-vous des apparences trompeuses. Réfléchissez à vos émotions et recherchez une guidance intérieure.",
        "future": "En regardant vers l'avenir, La Lune indique que vous pourriez rencontrer davantage d'incertitude ou de situations trompeuses. Préparez-vous à affronter des illusions potentielles et restez vigilant. En vous fiant à votre intuition et en cherchant une compréhension plus profonde, vous serez capable de naviguer à travers ces défis et de trouver de la clarté."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Der Mond für eine Zeit der Verwirrung, Illusion und Unsicherheit. Sie haben möglicherweise täuschenden Situationen gegenübergestanden oder hatten Schwierigkeiten, Realität von Fantasie zu unterscheiden. Diese Zeit war durch emotionale Turbulenzen und ein Gefühl des Verloren- oder Unsicherseins geprägt.",
        "present": "Derzeit deutet Der Mond darauf hin, dass Sie möglicherweise Verwirrung erleben oder mit Illusionen konfrontiert sind. Es ist wichtig, in dieser Zeit mit Vorsicht vorzugehen und Klarheit zu suchen. Vertrauen Sie Ihrer Intuition und seien Sie vorsichtig bei irreführenden Erscheinungen. Reflektieren Sie Ihre Emotionen und suchen Sie innere Führung.",
        "future": "Mit Blick auf die Zukunft zeigt Der Mond, dass Sie möglicherweise weiteren Unsicherheiten oder täuschenden Situationen begegnen werden. Bereiten Sie sich darauf vor, potenzielle Illusionen zu begegnen und bleiben Sie wachsam. Indem Sie auf Ihre Intuition vertrauen und ein tieferes Verständnis suchen, werden Sie in der Lage sein, durch diese Herausforderungen zu navigieren und Klarheit zu finden."
      },
      "it": {
        "past": "Nel tuo passato, La Luna rappresenta un periodo di confusione, illusione e incertezza. Potresti aver affrontato situazioni ingannevoli o avuto difficoltà a distinguere la realtà dalla fantasia. Questo tempo è stato caratterizzato da turbolenze emotive e un senso di smarrimento o insicurezza.",
        "present": "Attualmente, La Luna suggerisce che potresti vivere confusione o affrontare illusioni. È importante navigare attraverso questo periodo con cautela e cercare chiarezza. Fidati della tua intuizione e fai attenzione alle apparenze ingannevoli. Rifletti sulle tue emozioni e cerca una guida interiore.",
        "future": "Guardando al futuro, La Luna indica che potresti incontrare ulteriori incertezze o situazioni ingannevoli. Preparati ad affrontare potenziali illusioni e rimani vigile. Affidandoti alla tua intuizione e cercando una comprensione più profonda, sarai in grado di navigare attraverso queste sfide e trovare chiarezza."
      },
      "tr": {
        "past": "Geçmişinde, Ay kartı kafa karışıklığı, yanılsama ve belirsizlik dönemini simgeliyor. Aldatıcı durumlarla karşılaşmış veya gerçeği fanteziden ayırt etmekte zorlanmış olabilirsin. Bu dönem duygusal çalkantılar ve kaybolmuş veya güvensiz hissetme ile karakterize edildi.",
        "present": "Şu anda, Ay kartı kafa karışıklığı ya da yanılsamalarla karşılaşabileceğini gösteriyor. Bu dönemi dikkatle geçmek ve netlik aramak önemli. İçgüdüne güven ve yanıltıcı görünümlerden kaçın. Duygularını gözden geçir ve içsel bir rehberlik arayışında ol.",
        "future": "Geleceğe baktığında, Ay kartı daha fazla belirsizlik veya yanıltıcı durumlarla karşılaşabileceğini gösteriyor. Potansiyel yanılsamalara hazırlıklı ol ve dikkatli ol. İçgüdüne güvenerek ve daha derin bir anlayış arayarak bu zorlukların üstesinden gelmeye çalış, böylece netlik bulabileceksin."
      }
    },
    "The Sun": {
      "en": {
        "past": "In your past, The Sun represents a period of joy, success, and positivity. You may have experienced a time of happiness and accomplishment, where everything seemed to fall into place. This period was marked by clarity, optimism, and a sense of well-being.",
        "present": "Currently, The Sun suggests that you are in a time of positivity and success. It’s a period filled with energy, joy, and clarity. Embrace this moment of brightness and allow it to uplift your spirit and guide you towards achieving your goals.",
        "future": "Looking ahead, The Sun indicates that you will continue to experience success and joy. Expect a period of growth and happiness as things align favorably for you. Maintain your optimism and confidence, as this will help you continue to shine brightly and achieve your aspirations."
      },
      "es": {
        "past": "En tu pasado, El Sol representa un período de alegría, éxito y positividad. Puede que hayas experimentado un tiempo de felicidad y logros, donde todo parecía encajar a la perfección. Este período se caracterizó por claridad, optimismo y un sentido de bienestar.",
        "present": "Actualmente, El Sol sugiere que estás en un momento de positividad y éxito. Es un período lleno de energía, alegría y claridad. Abraza este momento de brillantez y permite que eleve tu espíritu y te guíe hacia la consecución de tus metas.",
        "future": "Mirando hacia adelante, El Sol indica que seguirás experimentando éxito y alegría. Espera un período de crecimiento y felicidad mientras las cosas se alinean favorablemente para ti. Mantén tu optimismo y confianza, ya que esto te ayudará a seguir brillando y alcanzar tus aspiraciones."
      },
      "fr": {
        "past": "Dans votre passé, Le Soleil représente une période de joie, de succès et de positivité. Vous avez peut-être vécu un moment de bonheur et de réussite, où tout semblait se mettre en place. Cette période était marquée par la clarté, l'optimisme et un sentiment de bien-être.",
        "present": "Actuellement, Le Soleil suggère que vous êtes dans une période de positivité et de succès. C'est un moment rempli d'énergie, de joie et de clarté. Profitez de ce moment de brillance et laissez-le élever votre esprit et vous guider vers la réalisation de vos objectifs.",
        "future": "En regardant vers l'avenir, Le Soleil indique que vous continuerez à vivre du succès et de la joie. Attendez-vous à une période de croissance et de bonheur alors que les choses s'alignent favorablement pour vous. Gardez votre optimisme et votre confiance, car cela vous aidera à continuer à briller et à atteindre vos aspirations."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Sonne für eine Zeit der Freude, des Erfolgs und der Positivität. Sie haben möglicherweise eine Phase des Glücks und der Erfüllung erlebt, in der alles zu passen schien. Diese Zeit war geprägt von Klarheit, Optimismus und Wohlbefinden.",
        "present": "Derzeit deutet Die Sonne darauf hin, dass Sie sich in einer Phase der Positivität und des Erfolgs befinden. Es ist eine Zeit voller Energie, Freude und Klarheit. Nutzen Sie diesen Moment des Lichts und lassen Sie ihn Ihren Geist erheben und Sie zu Ihren Zielen führen.",
        "future": "Mit Blick auf die Zukunft zeigt Die Sonne, dass Sie weiterhin Erfolg und Freude erleben werden. Erwarten Sie eine Zeit des Wachstums und des Glücks, während sich die Dinge günstig für Sie ausrichten. Behalten Sie Ihren Optimismus und Ihr Selbstvertrauen bei, da dies Ihnen helfen wird, weiterhin hell zu strahlen und Ihre Ziele zu erreichen."
      },
      "it": {
        "past": "Nel tuo passato, Il Sole rappresenta un periodo di gioia, successo e positività. Potresti aver vissuto un momento di felicità e realizzazione, in cui tutto sembrava andare per il meglio. Questo periodo è stato caratterizzato da chiarezza, ottimismo e un senso di benessere.",
        "present": "Attualmente, Il Sole suggerisce che ti trovi in un periodo di positività e successo. È un momento pieno di energia, gioia e chiarezza. Abbraccia questo momento di luminosità e lascia che elevi il tuo spirito e ti guidi verso il raggiungimento dei tuoi obiettivi.",
        "future": "Guardando al futuro, Il Sole indica che continuerai a sperimentare successo e gioia. Aspettati un periodo di crescita e felicità mentre le cose si allineano favorevolmente per te. Mantieni il tuo ottimismo e la tua fiducia, poiché questo ti aiuterà a continuare a brillare e a raggiungere le tue aspirazioni."
      },
      "tr": {
        "past": "Geçmişinde, Güneş kartı sevinç, başarı ve pozitiflik dönemini simgeliyor. Her şeyin yoluna girdiği bir mutluluk ve başarı zamanı yaşamış olabilirsin. Bu dönem netlik, iyimserlik ve iyi olma hali ile karakterize edildi.",
        "present": "Şu anda, Güneş kartı pozitiflik ve başarı içinde olduğun bir dönemde olduğunu gösteriyor. Bu, enerji, neşe ve netlik dolu bir zaman. Bu parlak anı kucakla ve ruhunu yükseltmesine ve hedeflerine ulaşmanda sana rehberlik etmesine izin ver.",
        "future": "Geleceğe baktığında, Güneş kartı başarının ve neşenin devam edeceğini gösteriyor. Şeylerin senin lehine uyum sağladığı bir büyüme ve mutluluk dönemi bekleyebilirsin. İyimserliğini ve güvenini koru, çünkü bu sana parlak bir şekilde devam etme ve hedeflerine ulaşma konusunda yardımcı olacak."
      }
    },
    "Judgement": {
      "en": {
        "past": "In your past, Judgement represents a period of self-reflection and evaluation. You may have gone through a significant phase of reckoning, where you faced the consequences of your actions and decisions. This time was marked by a profound assessment of your life’s direction and purpose.",
        "present": "Currently, Judgement suggests that you are in a phase of awakening and self-evaluation. It’s a time to reflect on your past actions and decisions and to make amends if necessary. Embrace this period of introspection and use it to guide your future path with renewed clarity and understanding.",
        "future": "Looking ahead, Judgement indicates that you will face a period of reckoning and transformation. Expect to undergo a significant evaluation of your life’s choices and direction. This period will be marked by self-discovery and a chance to make important decisions that will shape your future."
      },
      "es": {
        "past": "En tu pasado, El Juicio representa un período de auto-reflexión y evaluación. Puede que hayas atravesado una fase significativa de ajuste de cuentas, donde enfrentaste las consecuencias de tus acciones y decisiones. Este tiempo se caracterizó por una profunda evaluación de la dirección y el propósito de tu vida.",
        "present": "Actualmente, El Juicio sugiere que estás en una fase de despertar y auto-evaluación. Es un momento para reflexionar sobre tus acciones y decisiones pasadas y hacer enmiendas si es necesario. Abraza este período de introspección y utilízalo para guiar tu camino futuro con renovada claridad y comprensión.",
        "future": "Mirando hacia adelante, El Juicio indica que enfrentarás un período de ajuste de cuentas y transformación. Espera someterte a una evaluación significativa de tus elecciones y dirección en la vida. Este período estará marcado por el auto-descubrimiento y una oportunidad para tomar decisiones importantes que darán forma a tu futuro."
      },
      "fr": {
        "past": "Dans votre passé, Le Jugement représente une période d'auto-réflexion et d'évaluation. Vous avez peut-être traversé une phase importante de bilan, où vous avez fait face aux conséquences de vos actions et décisions. Cette période était marquée par une évaluation profonde de la direction et du but de votre vie.",
        "present": "Actuellement, Le Jugement suggère que vous êtes dans une phase d'éveil et d'auto-évaluation. C'est le moment de réfléchir à vos actions et décisions passées et de faire des amendes si nécessaire. Profitez de cette période d'introspection pour guider votre chemin futur avec une clarté et une compréhension renouvelées.",
        "future": "En regardant vers l'avenir, Le Jugement indique que vous serez confronté à une période de bilan et de transformation. Attendez-vous à subir une évaluation significative de vos choix et de votre direction dans la vie. Cette période sera marquée par la découverte de soi et une chance de prendre des décisions importantes qui façonneront votre avenir."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Das Gericht für eine Zeit der Selbstreflexion und Bewertung. Möglicherweise haben Sie eine bedeutende Phase des Abgleichs durchlaufen, in der Sie sich den Konsequenzen Ihrer Handlungen und Entscheidungen gestellt haben. Diese Zeit war geprägt von einer tiefen Bewertung der Richtung und des Zwecks Ihres Lebens.",
        "present": "Derzeit deutet Das Gericht darauf hin, dass Sie sich in einer Phase des Erwachens und der Selbstbewertung befinden. Es ist eine Zeit, über Ihre vergangenen Handlungen und Entscheidungen nachzudenken und gegebenenfalls Korrekturen vorzunehmen. Nutzen Sie diese Phase der Introspektion, um Ihren zukünftigen Weg mit erneuter Klarheit und Verständnis zu lenken.",
        "future": "Mit Blick auf die Zukunft zeigt Das Gericht, dass Sie eine Phase des Abgleichs und der Transformation durchleben werden. Erwarten Sie eine bedeutende Bewertung Ihrer Lebensentscheidungen und -richtung. Diese Zeit wird von Selbstentdeckung und der Gelegenheit geprägt sein, wichtige Entscheidungen zu treffen, die Ihre Zukunft gestalten werden."
      },
      "it": {
        "past": "Nel tuo passato, Il Giudizio rappresenta un periodo di auto-riflessione e valutazione. Potresti aver attraversato una fase significativa di resa dei conti, dove hai affrontato le conseguenze delle tue azioni e decisioni. Questo periodo è stato caratterizzato da una valutazione profonda della direzione e del senso della tua vita.",
        "present": "Attualmente, Il Giudizio suggerisce che ti trovi in una fase di risveglio e auto-valutazione. È un momento per riflettere sulle tue azioni e decisioni passate e fare correzioni se necessario. Abbraccia questo periodo di introspezione e usalo per guidare il tuo percorso futuro con chiarezza e comprensione rinnovate.",
        "future": "Guardando al futuro, Il Giudizio indica che affronterai un periodo di resa dei conti e trasformazione. Aspettati di sottoporsi a una valutazione significativa delle tue scelte e direzioni nella vita. Questo periodo sarà caratterizzato da auto-scoperta e un'opportunità per prendere decisioni importanti che plasmeranno il tuo futuro."
      },
      "tr": {
        "past": "Geçmişinde, Yargı kartı öz-değerlendirme ve kendini sorgulama dönemini simgeliyor. Yaptığın eylemler ve kararların sonuçlarıyla yüzleştiğin önemli bir dönem geçirmiş olabilirsin. Bu zaman, hayatının yönü ve amacı hakkında derin bir değerlendirme ile karakterize edildi.",
        "present": "Şu anda, Yargı kartı uyanış ve öz-evaluation döneminde olduğunu gösteriyor. Geçmişteki eylemlerini ve kararlarını düşünme ve gerekirse düzeltmeler yapma zamanı. Bu içsel değerlendirme dönemini kucakla ve gelecekteki yolunu yenilenmiş netlik ve anlayışla yönlendirmeye çalış.",
        "future": "Geleceğe baktığında, Yargı kartı hesaplaşma ve dönüşüm dönemine gireceğini gösteriyor. Hayatındaki seçimler ve yön hakkında önemli bir değerlendirme yapmanı bekleyebilirsin. Bu dönem kendini keşfetme ve geleceğini şekillendirecek önemli kararlar alma fırsatı ile işaretlenecek."
      }
    },
    "The World": {
      "en": {
        "past": "In your past, The World represents a time of completion and fulfillment. You may have reached a significant milestone or achieved a major goal, bringing a sense of accomplishment and harmony. This period was marked by a feeling of wholeness and the successful culmination of a long journey.",
        "present": "Currently, The World suggests that you are experiencing a period of fulfillment and success. You may be concluding a significant phase of your life or achieving a major goal. Embrace this moment of completion and use it as a foundation for new beginnings and further growth.",
        "future": "Looking ahead, The World indicates that you will enter a period of new achievements and global understanding. Expect to complete important projects or reach significant milestones. This card promises a time of celebration and the successful integration of your efforts into a greater whole."
      },
      "es": {
        "past": "En tu pasado, El Mundo representa un tiempo de finalización y plenitud. Puede que hayas alcanzado un hito importante o logrado un objetivo importante, trayendo un sentido de realización y armonía. Este período se caracterizó por una sensación de integridad y la culminación exitosa de un largo viaje.",
        "present": "Actualmente, El Mundo sugiere que estás experimentando un período de plenitud y éxito. Puedes estar concluyendo una fase importante de tu vida o logrando un gran objetivo. Abraza este momento de finalización y utilízalo como base para nuevos comienzos y crecimiento adicional.",
        "future": "Mirando hacia adelante, El Mundo indica que entrarás en un período de nuevos logros y comprensión global. Espera completar proyectos importantes o alcanzar hitos significativos. Esta carta promete un tiempo de celebración y la exitosa integración de tus esfuerzos en un todo más grande."
      },
      "fr": {
        "past": "Dans votre passé, Le Monde représente une période de complétion et d'accomplissement. Vous avez peut-être atteint un jalon important ou réalisé un objectif majeur, apportant un sentiment d'accomplissement et d'harmonie. Cette période était marquée par un sentiment de plénitude et l'achèvement réussi d'un long voyage.",
        "present": "Actuellement, Le Monde suggère que vous vivez une période de réalisation et de succès. Vous pourriez être en train de conclure une phase importante de votre vie ou d'atteindre un objectif majeur. Profitez de ce moment de complétion et utilisez-le comme base pour de nouveaux commencements et une croissance supplémentaire.",
        "future": "En regardant vers l'avenir, Le Monde indique que vous entrerez dans une période de nouveaux accomplissements et de compréhension globale. Attendez-vous à terminer des projets importants ou à atteindre des jalons significatifs. Cette carte promet un temps de célébration et l'intégration réussie de vos efforts dans un tout plus grand."
      },
      "de": {
        "past": "In Ihrer Vergangenheit steht Die Welt für eine Zeit der Vollendung und Erfüllung. Sie haben möglicherweise einen bedeutenden Meilenstein erreicht oder ein großes Ziel erreicht, was ein Gefühl von Erfolg und Harmonie gebracht hat. Diese Zeit war geprägt von einem Gefühl der Ganzheit und dem erfolgreichen Abschluss einer langen Reise.",
        "present": "Derzeit deutet Die Welt darauf hin, dass Sie eine Phase der Erfüllung und des Erfolgs erleben. Möglicherweise schließen Sie eine wichtige Phase Ihres Lebens ab oder erreichen ein großes Ziel. Nutzen Sie diesen Moment der Vollendung als Grundlage für neue Anfänge und weiteres Wachstum.",
        "future": "Mit Blick auf die Zukunft zeigt Die Welt, dass Sie in eine Phase neuer Errungenschaften und globalen Verständnisses eintreten werden. Erwarten Sie, wichtige Projekte abzuschließen oder bedeutende Meilensteine zu erreichen. Diese Karte verspricht eine Zeit der Feier und die erfolgreiche Integration Ihrer Bemühungen in ein größeres Ganzes."
      },
      "it": {
        "past": "Nel tuo passato, Il Mondo rappresenta un periodo di completamento e realizzazione. Potresti aver raggiunto un traguardo importante o realizzato un grande obiettivo, portando un senso di soddisfazione e armonia. Questo periodo è stato caratterizzato da una sensazione di completezza e dalla conclusione riuscita di un lungo viaggio.",
        "present": "Attualmente, Il Mondo suggerisce che stai vivendo un periodo di realizzazione e successo. Potresti essere alla conclusione di una fase importante della tua vita o aver raggiunto un grande obiettivo. Abbraccia questo momento di completamento e usalo come base per nuovi inizi e ulteriori crescita.",
        "future": "Guardando al futuro, Il Mondo indica che entrerai in un periodo di nuove realizzazioni e comprensione globale. Aspettati di completare progetti importanti o raggiungere traguardi significativi. Questa carta promette un tempo di celebrazione e l'integrazione riuscita dei tuoi sforzi in un tutto più grande."
      },
      "tr": {
        "past": "Geçmişinde, Dünya kartı bir tamamlanma ve tatmin dönemi temsil ediyor. Önemli bir kilometre taşı ya da büyük bir hedefe ulaşmış olabilirsin, bu da sana başarı ve uyum duygusu getirmiştir. Bu dönem, uzun bir yolculuğun başarılı bir şekilde tamamlanması ve bütünlük hissi ile karakterize edildi.",
        "present": "Şu anda, Dünya kartı tatmin ve başarı döneminde olduğunu gösteriyor. Hayatında önemli bir aşamanın sonuna gelmiş veya büyük bir hedefe ulaşmış olabilirsin. Bu tamamlanma anını kucakla ve yeni başlangıçlar ve daha fazla büyüme için bir temel olarak kullan.",
        "future": "Geleceğe baktığında, Dünya kartı yeni başarılar ve küresel anlayış dönemine gireceğini gösteriyor. Önemli projeleri tamamlamanı veya önemli kilometre taşlarına ulaşmanı bekleyebilirsin. Bu kart, kutlama zamanı ve çabalarının daha büyük bir bütünün parçası haline gelmesi sözünü veriyor."
      }
    }
  };

  const translations = {
    en: {
      title: "Tarot Reader",
      shareText: "My Tarot Reading:",
      meaningTitle: "Card Meanings:",
      clickToReveal: "Select three cards for your reading. They represent your past, present, and future.",
    },
    es: {
      title: "Lector de Tarot",
      shareText: "Mi Lectura de Tarot:",
      meaningTitle: "Significados de las Cartas:",
      clickToReveal: "Selecciona tres cartas para tu lectura. Representan tu pasado, presente y futuro.",
    },
    fr: {
      title: "Lecteur de Tarot",
      shareText: "Ma Lecture de Tarot:",
      meaningTitle: "Significations des Cartes:",
      clickToReveal: "Sélectionnez trois cartes pour votre lecture. Elles représentent votre passé, présent et futur."
    },
    de: {
      title: "Tarot-Leser",
      shareText: "Meine Tarot-Lesung:",
      meaningTitle: "Kartenbedeutungen:",
      clickToReveal: "Wähle drei Karten für deine Lesung aus. Sie repräsentieren deine Vergangenheit, Gegenwart und Zukunft."
    },
    it: {
      title: "Lettore di Tarocchi",
      shareText: "La mia Lettura dei Tarocchi:",
      meaningTitle: "Significati delle Carte:",
      clickToReveal: "Seleziona tre carte per la tua lettura. Rappresentano il tuo passato, presente e futuro."
    },
    tr: {
      title: "Tarot Okuyucu",
      shareText: "Tarot Okuması:",
      meaningTitle: "Kart Anlamları:",
      clickToReveal: "Okumanız için üç kart seçin. Kartlar geçmişinizi, şu anınızı ve geleceğinizi temsil eder."
    }
  };

  export { positions, modes, tarotDeck, cardMeanings, translations };
