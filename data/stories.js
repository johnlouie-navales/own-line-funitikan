const storiesDB = [
    {
        id: 1,
        title: "Ang Sakim na Kuting",
        scenes: [
            {
                image: "assets/images/story-1/scene-1.webp",
                speaker: "Narrator",
                text: "Palaging magkaaway si Kuting at Daga dahil sa pagkain. Kapag may nahahanap na pagkain si Daga, agad itong inaagaw ni Kuting."
            },
            {
                image: "assets/images/story-1/scene-2.webp",
                speaker: "Narrator",
                text: "Isang araw, may nakita si Kuting na ibon sa labas ng bakuran. Nakita niyang kausap ito ni Daga."
            },
            {
                image: "assets/images/story-1/scene-3.webp",
                speaker: "Kuting",
                text: "Ah, sabay ko silang kakainin!"
            },
            {
                image: "assets/images/story-1/scene-4.webp",
                speaker: "Daga",
                text: "Lipad, Ibon, lipad!"
            },
            {
                image: "assets/images/story-1/scene-5.webp",
                speaker: "Narrator",
                text: "Agad namang nakalayo ang ibon. Naiinis si Kuting ngunit kalaunan ay muling nakita ang ibon na natutulog. Nilapitan niya ito at pinuri ang ganda nito."
            },
            {
                image: "assets/images/story-1/scene-6.webp",
                speaker: "Ibon",
                text: "Wag mo akong kainin."
            },
            {
                image: "assets/images/story-1/scene-7.webp",
                speaker: "Kuting",
                text: "Hindi kita kakainin, gusto ko lang makipagkaibigan."
            },
            {
                image: "assets/images/story-1/scene-8.webp",
                speaker: "Narrator",
                text: "Naniwala si Ibon at natuwa rin si Daga."
            },
            {
                image: "assets/images/story-1/scene-9.webp",
                speaker: "Narrator",
                text: "Ngunit nang umalis si Daga, biglang nagbago ang isip ni Kuting."
            },
            {
                image: "assets/images/story-1/scene-10.webp",
                speaker: "Kuting",
                text: "“Sa wakas, may pananghalian na ako!” bulalas niya."
            },
            {
                image: "assets/images/story-1/scene-11.webp",
                speaker: "Narrator",
                text: "Sakto namang dumating si Daga at tinawag ang mga kaibigan upang tulungan ang ibon. Naitakas nila si Ibon at lubos itong nagpasalamat kay Daga."
            },
            {
                image: "assets/images/story-1/scene-12.webp",
                speaker: "Aral",
                text: "Huwag basta maniniwala sa mga pangako. Kilalanin muna kung sino ang tunay na kaibigan."
            }
        ],
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
        scenes: [
            {
                image: "assets/images/story-2/scene-1.webp",
                speaker: "Narrator",
                text: "Sasapit na naman ang pasko, kaya naman ang lahat ay abala na naman sa kanilang ihahanda at ihahain sa lamesa."
            },
            {
                image: "assets/images/story-2/scene-2.webp",
                speaker: "Kabayo",
                text: "Maghapon kana riyan Kalabaw di kaba napapagod riyan ang init init?"
            },
            {
                image: "assets/images/story-2/scene-3.webp",
                speaker: "Kalabaw",
                text: "Bakit naman ako mapapagod  kailangan ko ng pera dahil may gustong laruan ang anak ko kaya nais ko sana yun bilhin para sa kanya kaya kahit mainit nakakapagod, wala akong karapatan magpahinga kahit mag reklamo."
            },
            {
                image: "assets/images/story-2/scene-4.webp",
                speaker: "Kabayo",
                text: "Ay ganon ba siguro yung laruan na tinutukoy mo ay kuromi yun"
            },
            {
                image: "assets/images/story-2/scene-5.webp",
                speaker: "Kalabaw",
                text: "Bakit mo kabayo nalaman ikaw a siguro nandun ka sa bahay nung sinabi ng anak ko yan."
            },
            {
                image: "assets/images/story-2/scene-6.webp",
                speaker: "Kabayo",
                text: "Anong pinagsasabi mo kalabaw nalaman koyan dahil yun din ang gusto ng anak ko na i regalo ko raw sa kanya sa darating na pasko ay kaso mukhang alanganin ko yan mabibili wala pang mapag kikitaan walang trabaho."
            },
            {
                image: "assets/images/story-2/scene-7.webp",
                speaker: "Kalabaw",
                text: "Walang mapag kikitaan? Walang trabaho? Eh ang dami ngang trabaho na inaalok sayo ayaw mona man."
            },
            {
                image: "assets/images/story-2/scene-8.webp",
                speaker: "Kabayo",
                text: "Pano ba naman kasi eh ang daming inuutos nakakapagod sakit lang sa likod mapapala ko dun. Maghihintay na lang ako ng bigating trabaho para tiba tiba."
            },
            {
                image: "assets/images/story-2/scene-9.webp",
                speaker: "Kalabaw",
                text: "Aba bahala ka kung yan ang gusto mo. Magsisimula na ulit ako mag trabaho."
            },
            {
                image: "assets/images/story-2/scene-10.webp",
                speaker: "Narrator",
                text: "Sa pagsusumikap ni kalabaw, sa araw araw nyang pagta trabaho napag ipunan na niya ang halaga ng laruan na gusto ng kanyang anak, samantala, itong si kabayo ay nakatunganga pa rin dahil walang bigating trabaho ang dumating sa kanya."
            },
            {
                image: "assets/images/story-2/scene-11.webp",
                speaker: "Anak ni Kabayo",
                text: "Itay magpapasko na nabili mona po ba yung gusto kong laruan?"
            },
            {
                image: "assets/images/story-2/scene-12.webp",
                speaker: "Kabayo",
                text: "Ah! Eh! Oo naman anak nabili kona iyon pero sa pasko kona Ibibigay sayo ha"
            },
            {
                image: "assets/images/story-2/scene-13.webp",
                speaker: "Anak ni Kabayo",
                text: "Yehey! Salamat itay mahal na mahal talaga kita itay at ipinagmamalaki ko kayo sa lahat."
            },
            {
                image: "assets/images/story-2/scene-14.webp",
                speaker: "Narrator",
                text: "Umalis ng bahay si kabayo na para bang balisa ito at hindi alam ang gagawin. Sa daan, nakita nito si kalabaw na parang nanghihinang namumutla."
            },
            {
                image: "assets/images/story-2/scene-15.webp",
                speaker: "Kabayo",
                text: "O kalabaw ano nangyari sayo san ka galing?"
            },
            {
                image: "assets/images/story-2/scene-16.webp",
                speaker: "Kalabaw",
                text: "Galing akong dibisorya bumili ng laruan ng anak ko."
            },
            {
                image: "assets/images/story-2/scene-17.webp",
                speaker: "Kabayo",
                text: "Ah ganun ba gusto mo ihatid na kita sainyo mukhang namumutla ka baka mapano ka pa."
            },
            {
                image: "assets/images/story-2/scene-18.webp",
                speaker: "Kalabaw",
                text: "Hindi na maraming salamat kabayo. Mauuna nako ingat ka."
            },
            {
                image: "assets/images/story-2/scene-19.webp",
                speaker: "Narrator",
                text: "Sinundan ni kabayo si kalabaw habang ito ay naglalakad. Habang sinusundan niya ito ay bigla na lamang nahimatay at natumba sa daan si Kalabaw. Sabay tumakbo si kabayo at nilapitan ito."
            },
            {
                image: "assets/images/story-2/scene-20.webp",
                speaker: "Kabayo",
                text: "Tulong! tulong!  Tulungan nyo kaibigan ko."
            },
            {
                image: "assets/images/story-2/scene-21.webp",
                speaker: "Narrator",
                text: "Agad naman itong tinulungan ng mga kaibigan nila. Dinala na nila si kalabaw sa bahay nila. Mga ilang oras ay nagkamalay na din si kalabaw. "
            },
            {
                image: "assets/images/story-2/scene-22.webp",
                speaker: "Kalabaw",
                text: "Maraming salamat sainyo mga kaibigan, ngunit teka may nakita ba kayong laruan? Napulot nyo ba?"
            },
            {
                image: "assets/images/story-2/scene-23.webp",
                speaker: "Mga kaibigan",
                text: "Wala kaming nakita na laruan bakit anong laruan ba yon?"
            },
            {
                image: "assets/images/story-2/scene-24.webp",
                speaker: "Kalabaw",
                text: "Isang kuromi ireregalo ko iyon sa anak ko sa darating na pasko hindi iyon pwede mawala."
            },
            {
                image: "assets/images/story-2/scene-25.webp",
                speaker: "Mga kaibigan",
                text: "Tanungin mo si kabayo dahil siya yung nandun nung nawalan ka ng malay sa daan."
            },
            {
                image: "assets/images/story-2/scene-26.webp",
                speaker: "Narrator",
                text: "Pinuntahan nga nila ang bahay ni kabayo. Agad itong nakompirma ng mga magkakaibigan"
            },
            {
                image: "assets/images/story-2/scene-27.webp",
                speaker: "Kabayo",
                text: "Oh ayan anak kahit dipa pasko ibibigay kona sayo, diba ang ganda?"
            },
            {
                image: "assets/images/story-2/scene-28.webp",
                speaker: "Kalabaw",
                text: "Walang hiya ka kabayo bakit mo kinuha ang binili kong laruan para sa anak ko. Alam mong pinaghirapan koyan pinag trabahohan koyan tapos kukunin mo lang. Ikaw lang naman ang nakasalubong ko sa daan at ikaw lang naman ang may posibleng kukuha nun dahil yun din ang gusto ng anak mo"
            },
            {
                image: "assets/images/story-2/scene-29.webp",
                speaker: "Kabayo",
                text: "Magpapaliwanag ako kalabaw sorry kung kinuha ko ang laruang binili mo. Wala kasi akong maipambili sa anak ko ng ganyang laruan dahil walang bigating trabaho ang dumating kaya naisipan kona lang kunin ang sayo patawarin moko kalabaw."
            },
            {
                image: "assets/images/story-2/scene-30.webp",
                speaker: "Kalabaw",
                text: "Alam mong mali ang kumuha ng di saiyo pero bakit mo parin kinuha. Matutuwa ba ang anak mo na ang Ibibigay mo sa kanya ay galing sa ninakaw mo?"
            },
            {
                image: "assets/images/story-2/scene-31.webp",
                speaker: "Kabayo",
                text: "Kalabaw, anak patawad mali ang aking ginawa hindi kona ulit gagawin iyon pangako."
            },
            {
                image: "assets/images/story-2/scene-32.webp",
                speaker: "Kalabaw",
                text: "Dapat lang dahil maling mali ang kumuha ng di saiyo. Ibibigay kona lang sa anak mo ang laruang iyan. Sa sunod pag trabahohan mona lang ang ano mang bagay. Mauuna na kami."
            },
            {
                image: "assets/images/story-2/scene-33.webp",
                speaker: "Aral",
                text: "Maging responsableng ama, wag magnakaw dahil mali iyon. Walang trabahong madali o magaan lahat iyan ay pinag hihirapan."
            }
        ],
        gameInstructions: "Pansamantala: Ang laro ay ginagawa pa lamang.",
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
        scenes: [
            {
                image: "assets/images/story-3/scene-1.webp",
                speaker: "Narrator",
                text: "Matagal ng magkasintahan sina Leon at Elepante. Masaya silang naninirahan sa gubat at payapang namumuhay ngunit may biglang naligaw sa kanilang kagubutan si Ahas."
            },
            {
                image: "assets/images/story-3/scene-2.webp",
                speaker: "Ahas",
                text: "Tulungan nyo ako gutom na gutom na ako di ko na alam kung nasaan na ako."
            },
            {
                image: "assets/images/story-3/scene-3.webp",
                speaker: "Leon",
                text: "Kawawa ka naman, tuloy ka sa aming munting tahanan. Ayan kumain ka muna."
            },
            {
                image: "assets/images/story-3/scene-4.webp",
                speaker: "Narrator",
                text: "Habang kumakain si Ahas, palihim naman itong pinagmamasdan ng mag-asawa."
            },
            {
                image: "assets/images/story-3/scene-5.webp",
                speaker: "Elepante",
                text: "Mukhang malayo ang pinanggalingan nya, saan kaya siya galing?"
            },
            {
                image: "assets/images/story-3/scene-6.webp",
                speaker: "Leon",
                text: "Yun nga rin naiisip ko kawawa naman at naligaw mabuti naman at dito sya napadpad natulungan pa natin siya."
            },
            {
                image: "assets/images/story-3/scene-7.webp",
                speaker: "Ahas",
                text: "Maraming salamat sa inyong tulong at pagpapatuloy sa inyong munting tahanan, hindi ko na talaga alam kung paano ko makakabalik sa pinanggalingan ko."
            },
            {
                image: "assets/images/story-3/scene-8.webp",
                speaker: "Narrator",
                text: "Sa labis na awa ng mag-asawa kay Ahas dahil hindi na nito alam kung saan na siya babalik, napag-isipan na ng mag-asawa na kupkupin na lamang si Ahas."
            },
            {
                image: "assets/images/story-3/scene-9.webp",
                speaker: "Leon",
                text: "Wag kang mag-alala kung wala ka nang ibang matutuluyan dito ka na samin dahil kami lang namang mag-asawa ang naririto, mabuti nga yan at pag ako'y umaalis ay may kasama na si Elepante."
            },
            {
                image: "assets/images/story-3/scene-10.webp",
                speaker: "Ahas",
                text: "Naku maraming salamat sa inyo ang babait nyo naman."
            },
            {
                image: "assets/images/story-3/scene-11.webp",
                speaker: "Narrator",
                text: "Lumipas ang isang taon unti-unting napapaibig si Ahas kay Elepante dahil umano sa taglay nitong kagandahan."
            },
            {
                image: "assets/images/story-3/scene-12.webp",
                speaker: "Ahas",
                text: "Mahal na yata kita Elepante dikona mapigilan itong nadarama ko sayo."
            },
            {
                image: "assets/images/story-3/scene-13.webp",
                speaker: "Elepante",
                text: "Anong pinagsasabi mo ahas alam mong may asawa ako bakit moyan nasasabi?"
            },
            {
                image: "assets/images/story-3/scene-14.webp",
                speaker: "Ahas",
                text: "Kung hindi ka man lang mapapasa akin pwes walang manginginabang sayo"
            },
            {
                image: "assets/images/story-3/scene-15.webp",
                speaker: "Leon",
                text: "Anong pinagsasabi mo ahas! Pinatuloy kita sa pamamahay ko tapos ito gagawin mo isa kang taksil!"
            },
            {
                image: "assets/images/story-3/scene-16.webp",
                speaker: "Narrator",
                text: "Dahil sa nangyari, napag kasunduan na ng mag asawa na paalisin na lamang si ahas sa bahay nila, at pinag patuloy ng mag asawa ang kanilang tahimik na pamumuhay tulad  nung dati."
            },
            {
                image: "assets/images/story-3/scene-17.webp",
                speaker: "Aral",
                text: "Kilalanin muna ang taong nasa iyong paligid. Maaaring sila'y mabait sa una, ngunit hindi natin alam ang mangyayari sa susunod na araw, buwan o taon ."
            }
        ],
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