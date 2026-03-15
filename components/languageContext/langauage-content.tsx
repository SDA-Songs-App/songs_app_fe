type VerseLocalization = {
 langId:number
  titleTop: string
  titleMain: string
  titleMain2:string
  selectHeader:string
  buttonText: string
  scriptureTitle: string
  contents_translation:Verse[]
}
export type Verse = {
    id:string,
    book:string,
    reference:string,
    verse_text:string
}

export const versesLLocalization: Record<string, VerseLocalization> = {
  አማርኛ: {
    langId:1,
    titleTop: "በኢትዮጵያ",
    titleMain:"ሰባተኛ ቀን አድቬንቲስት ቤተክርስቲያን",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "ቀጥል",
    scriptureTitle: "✨ የዕለቱ የመጽሐፍ ቅዱስ ጥቅስ",
    contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        },
        {
            id:"2",
            book:"መዝሙረ ዳዊት",
            reference:"46:1",
            verse_text:"እግዚአብሔር መጠጊያችንና ኃይላችን ነው፤ በመከራ ጊዜ የሚገኝ ረዳት ነው።"
        },
         {
            id:"3",
            book:"መዝሙረ ዳዊት",
            reference:"119:105",
            verse_text:"ቃልህ ለእግሬ መብራት ለመንገዴም ብርሃን ነው።"
        }
    ]
  },

  oromo: {
    langId:2,
    titleTop: "Itoophiyaa",
    titleMain: "Mana Kiristaanaa Adventistii Guyyaa Torbaffaa",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "Itti fufi",
    scriptureTitle: "✨ Dubbii Guyyaa",
    // value: "Dubbiin kee miilla koo irratti ibsa dha.",
    // ref: "Faar 119:105"
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        }
    ]
  },

  ትግረኛ: {
    langId:3,
    titleTop: "ኣብ ኢትዮጵያ",
    titleMain: "ቤተ ክርስቲያን ኣድቬንቲስት",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "ቀጽል",
    scriptureTitle: "✨ ናይ ሎሚ ቃል",
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"ቃልካ ንእግረይ መብራህቲ እዩ::"
        }
    ]
  },

  ጉራጊኛ: {
    langId:4,
    titleTop: "ኢትዮጵያ",
    titleMain: "አድቬንቲስት ቤተክርስቲያን",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "ጅመር",
    scriptureTitle: "✨ የዕለቱ ቃል",
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105"
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        }
    ]
  },

  ከምባትኛ: {
    langId:5,
    titleTop: "ኢትዮጵያ",
    titleMain: "አድቬንቲስት ቤተክርስቲያን",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ላገተ ዶ'ር",
    buttonText: "ጅመር",
    scriptureTitle: "✨ የዕለቱ ቃል",
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105",
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        }
    ]
  },

  ሲዳሚኛ: {
    langId:6,
    titleTop: "ኢትዮጵያ",
    titleMain: "አድቬንቲስት ቤተክርስቲያን",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "ጅመር",
    scriptureTitle: "✨ የዕለቱ ቃል",
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105",
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        }
    ]
  },

  Nuer: {
    langId:8,
    titleTop: "Ethiopia",
    titleMain: "Seventh Day Adventist Church",
    titleMain2:"በተለያዩ ቋንቋዎች የተዘጋጀ የመዝሙር መተግበሪያ",
    selectHeader:"ቋንቋ ይምረጡ",
    buttonText: "Continue",
    scriptureTitle: "✨ Daily Verse",
    // value: "Your word is a lamp to my feet",
    // ref: "Psalm 119:105"
     contents_translation:[
        {
            id:"1",
            book:"መዝሙር",
            reference:"23:1",
            verse_text:"እግዚአብሔር እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።"
        }
    ]
  }
}