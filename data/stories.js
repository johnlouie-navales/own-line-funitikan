const storiesDB = [
    {
        id: 1,
        title: "Ang Sakim na Kuting",
        text: `Palaging magkaaway si Kuting at Daga dahil sa pagkain. Kapag may nahahanap na pagkain si Daga, agad itong inaagaw ni Kuting.\n\nIsang araw, may nakita si Kuting na ibon sa labas ng bakuran. Nakita niyang kausap ito ni Daga. "Ah, sabay ko silang kakainin!"\n\nHabang papalapit si Kuting, sumigaw si Daga "Lipad, Ibon, lipad!"\n\nAgad namang nakalayo ang ibon. Naiinis si Kuting ngunit kalaunan ay muling nakita ang ibon na natutulog. Nilapitan niya ito at pinuri ang ganda nito.\n\n"Wag mo akong kainin!"\n\n"Hindi kita kakainin, gusto ko lang makipagkaibigan."\n\nNaniwala si Ibon at natuwa rin si Daga. Ngunit nang umalis si Daga, biglang nagbago ang isip ni Kuting.\n\n"Sa wakas, may pananghalian na ako!" bulalas niya.\n\nSakto namang dumating si Daga at tinawag ang mga kaibigan upang tulungan ang ibon. Naitakas nila si Ibon at lubos itong nagpasalamat kay Daga.\n\nARAL: Huwag basta maniniwala sa mga pangako. Kilalanin muna kung sino ang tunay na kaibigan.`,
        gameInstructions: "Basahing mabuti ang mga clue at hanapin sa kahon ang tamang sagot. I-click ang mga letra para mabuo ang salita.",
        clues: {
            "DAGA": "Isa sa mga pangunahing tauhan sa kwento",
            "IBON": "Isa pang pangunahing tauhan na muntik makain",
            "KAAWAY": "Kasing kahulugan ng kalaban o katunggali",
            "SAKIM": "Labis na pagkamasarili o pagiging gahaman",
            "BAKURAN": "Tumutukoy sa paligid ng bahay na may bakod",
            "TOTOO": "Pagiging matapat o walang kinikilingan"
        },
        gridLetters: [
            ['D', 'A', 'G', 'A', 'A', 'B', 'Z', 'K', 'L', 'M'],
            ['Z', 'Y', 'X', 'W', 'Q', 'U', 'M', 'L', 'O', 'V'],
            ['W', 'L', 'Z', 'X', 'X', 'T', 'U', 'V', 'W', 'X'],
            ['L', 'N', 'A', 'R', 'U', 'K', 'A', 'B', 'W', 'Z'],
            ['A', 'Z', 'A', 'Z', 'L', 'A', 'P', 'Q', 'K', 'Q'],
            ['K', 'T', 'U', 'M', 'S', 'A', 'K', 'I', 'M', 'X'],
            ['V', 'W', 'X', 'Z', 'U', 'W', 'M', 'I', 'C', 'L'],
            ['T', 'O', 'T', 'O', 'O', 'A', 'K', 'L', 'M', 'Z'],
            ['L', 'P', 'D', 'L', 'P', 'Y', 'K', 'Z', 'T', 'X'],
            ['Z', 'L', 'P', 'M', 'N', 'O', 'I', 'B', 'O', 'N']
        ]
    },
    {
        id: 2,
        title: "Ang Masipag na Kalabaw",
        text: `Sasapit na naman ang pasko, kaya naman ang lahat ay abala na naman sa kanilang ihahanda at ihahain sa lamesa.\n\nKabayo:"Maghapon kana riyan Kalabaw di kaba napapagod riyan ang init init?"\n\nKalabaw:"Bakit naman ako mapapagod  kailangan ko ng pera dahil may gustong laruan ang anak ko kaya nais ko sana yun bilhin para sa kanya kaya kahit mainit nakakapagod, wala akong karapatan magpahinga kahit mag reklamo."\n\nKabayo:"Ay ganon ba siguro yung laruan na tinutukoy mo ay kuromi yun?"\n\nKalabaw:"Bakit mo Kabayo nalaman ikaw ah siguro nandun ka sa bahay nung sinabi ng anak ko yan!"\n\nKabayo:"Anong pinagsasabi mo Kalabaw nalaman koyan dahil yun din ang gusto ng anak ko na i regalo ko raw sa kanya sa darating na pasko ay kaso mukhang alanganin ko yan mabibili wala pang mapag kikitaan walang trabaho."\n\nKalabaw:"Walang mapag kikitaan? Walang trabaho? Eh ang dami ngang trabaho na inaalok sayo ayaw mona man."\n\nKabayo:"Pano ba naman kasi eh ang daming inuutos nakakapagod sakit lang sa likod mapapala ko dun. Maghihintay na lang ako ng bigating trabaho para tiba tiba."\n\nKalabaw:"Aba bahala ka kung yan ang gusto mo. Magsisimula na ulit ako mag trabaho!\n\nSa pagsusumikap ni Kalabaw, sa araw araw nyang pagta trabaho napag ipunan na niya ang halaga ng laruan na gusto ng kanyang anak, samantala, itong si Kabayo ay nakatunganga pa rin dahil walang bigating trabaho ang dumating sa kanya.\n\nAnak ni Kabayo:"Itay magpapasko na nabili mona po ba yung gusto kong laruan?"\n\nKabayo:"Ah! Eh! Oo naman anak nabili kona iyon pero sa pasko kona ibibigay sayo ha."\n\nAnak ni Kabayo:"Yehey! Salamat itay mahal na mahal talaga kita itay at ipinagmamalaki ko kayo sa lahat."\n\nUmalis ng bahay si Kabayo na para bang balisa ito at hindi alam ang gagawin. Sa daan, nakita nito si Kalabaw na parang nanghihinang namumutla."\n\nKabayo:"O Kalabaw ano nangyari sayo san ka galing?"\n\nKalabaw:"Galing akong dibisorya bumili ng laruan ng anak ko."\n\nKabayo:"Ah ganun ba gusto mo ihatid na kita sainyo mukhang namumutla ka baka mapano ka pa."\n\nKalabaw:"Hindi na maraming salamat Kabayo. Mauuna nako ingat ka."\n\nSinundan ni Kabayo si Kalabaw habang ito ay naglalakad. Habang sinusundan niya ito ay bigla na lamang nahimatay at natumba sa daan si Kalabaw. Sabay tumakbo si Kabayo at nilapitan ito."\n\nKabayo:"Tulong! tulong!  Tulungan nyo kaibigan ko."\n\nAgad naman itong tinulungan ng mga kaibigan nila. Dinala na nila si Kalabaw sa bahay nila. Mga ilang oras ay nagkamalay na din si Kalabaw.\n\nKalabaw:"Maraming salamat sainyo mga kaibigan, ngunit teka may nakita ba kayong laruan? Napulot nyo ba?"\n\nMga kaibigan:"Wala kaming nakita na laruan bakit anong laruan ba yon?"\n\nKalabaw:"Isang kuromi ireregalo ko iyon sa anak ko sa darating na pasko hindi iyon pwede mawala."\n\nMga kaibigan:"Tanungin mo si Kabayo dahil siya yung nandun nung nawalan ka ng malay sa daan."\n\nPinuntahan nga nila ang bahay ni Kabayo. Agad itong nakompirma ng mga magkakaibigan\n\nKabayo:"Oh ayan anak kahit dipa pasko Ibibigay kona sayo. Diba ang ganda"\n\nKalabaw:"Walang hiya ka Kabayo bakit mo kinuha ang binili kong laruan na para sa anak ko! Alam mong pinaghirapan koyan pinag trabahohan koyan tapos kukunin mo lang! Ikaw lang naman ang nakasalubong ko sa daan at ikaw lang naman ang may posibleng kukuha nun dahil yun din ang gusto ng anak mo!"\n\nKabayo:"Magpapaliwanag ako Kalabaw sorry kung kinuha ko ang laruang binili mo. Wala kasi akong maipambili sa anak ko ng ganyang laruan dahil walang bigating trabaho ang dumating kaya naisipan kona lang kunin ang sayo patawarin moko Kalabaw."\n\nKalabaw:"Alam mong mali ang kumuha ng di saiyo pero bakit mo parin kinuha. Matutuwa ba ang anak mo na ang ibibigay mo sa kanya ay galing sa ninakaw mo?"\n\nKabayo:"Kalabaw, anak patawad mali ang aking ginawa hindi kona ulit gagawin iyon pangako."\n\nKalabaw:"Dapat lang dahil maling mali ang kumuha ng di saiyo. Ibibigay kona lang sa anak mo ang laruang iyan. Sa sunod pag trabahohan mona lang ang ano mang bagay. Mauuna na kami."\n\nAral: Maging responsableng ama, wag magnakaw dahil mali iyon. Walang trabahong madali o magaan lahat iyan ay pinag hihirapan.`,
        gameInstructions: "Pansamantala: Ang laro ay ginagawa pa lamang.",
        // PLACEHOLDERS (Update these when you get the image from the students)
        clues: {
            "KALABAW": "Masipag na hayop",
            "KABAYO": "Nagnakaw ng laruan"
        },
        gridLetters: [
            ['K', 'A', 'L', 'A', 'B', 'A', 'W', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['K', 'A', 'B', 'A', 'Y', 'O', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
        ]
    },
    {
        id: 3,
        title: "Ang Mag-asawa at ang Mang-aagaw na Ahas",
        text: `Matagal ng magkasintahan sina Leon at Elepante. Masaya silang naninirahan sa gubat at payapang namumuhay ngunit may biglang naligaw sa kanilang kagubutan si Ahas.\n\nAhas: "Tulungan nyo ako gutom na gutom na ako di ko na alam kung nasaan na ako."\n\nLeon: "Kawawa ka naman, tuloy ka sa aming munting tahanan. Ayan kumain ka muna."\n\nHabang kumakain si Ahas, palihim naman itong pinagmamasdan ng mag-asawa.\n\nElepante: "Mukhang malayo ang pinanggalingan nya, saan kaya siya galing?"\n\nLeon: "Yun nga rin naiisip ko kawawa naman at naligaw mabuti naman at dito sya napadpad natulungan pa natin siya."\n\nAhas: "Maraming salamat sa inyong tulong at pagpapatuloy sa inyong munting tahanan, hindi ko na talaga alam kung paano ko makakabalik sa pinanggalingan ko."\n\nSa labis na awa ng mag-asawa kay Ahas dahil hindi na nito alam kung saan na siya babalik, napag-isipan na ng mag-asawa na kupkupin na lamang si Ahas.\n\nLeon: "Wag kang mag-alala kung wala ka nang ibang matutuluyan dito ka na samin dahil kami lang namang mag-asawa ang naririto, mabuti nga yan at pag ako'y umaalis ay may kasama na si Elepante."\n\nAhas: "Naku maraming salamat sa inyo ang babait nyo naman."\n\nLumipas ang isang taon unti-unting napapaibig si Ahas kay Elepante dahil umano sa taglay nitong kagandahan.\n\nAhas: "Mahal na yata kita Elepante di ko na mapigilan itong nadarama ko sayo."\n\nElepante: "Anong pinagsasabi mo Ahas alam mong may asawa ako bakit mo yan nasasabi?"\n\nAhas: "Kung hindi ka man lang mapapasa akin pwes walang manginginabang sayo!"\n\nLeon: "Anong pinagsasabi mo Ahas! Pinatuloy kita sa pamamahay ko tapos ito gagawin mo isa kang taksil!"\n\nDahil sa nangyari, napagkasunduan na ng mag-asawa na paalisin na lamang si Ahas sa bahay nila, at pinagpatuloy ng mag-asawa ang kanilang tahimik na pamumuhay tulad nung dati.\n\nAral: Kilalanin muna ang taong nasa iyong paligid. Maaaring sila'y mabait sa una, ngunit hindi natin alam ang mangyayari sa susunod na araw, buwan o taon.`,
        gameInstructions: "Hanapin ang mga tauhan sa kwento (AHAS, LEON, ELEPANTE).",
        clues: {
            "AHAS": "Ang hayop na tinulungan ngunit naging taksil",
            "LEON": "Ang asawa ni Elepante",
            "ELEPANTE": "Ang maganda at tapat na asawa"
        },
        gridLetters: [
            ['A', 'H', 'A', 'S', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['L', 'E', 'O', 'N', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['E', 'L', 'E', 'P', 'A', 'N', 'T', 'E'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
        ]
    }
];