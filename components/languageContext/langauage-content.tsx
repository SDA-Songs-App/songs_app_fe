import amharic from './data/amharic_verses_final.json'
import oromo from './data/oromo_verses.json'
import gurage from './data/gurage_verses.json'
import kembata from './data/kambata_verses.json'
import welayta from './data/wolayitta_verses.json'
import hadya from './data/hadiyya_verses.json'
import sidama from './data/sidama_verses.json'
import tigre from './data/tigre_verses.json'
import nuer from './data/nuer_verses.json'
import english from './data/english_verses.json'
import { Share } from 'react-native'
type VerseLocalization = {
  setting:SettingType
  userGuide:userGuideType
  about:aboutType
  sharing:ShareType
  privacyPolicy:PrivacyPolicyType
  shareLyricsWithUs:shareLyricsWithUsType
  contributors:contributorsType
  contactUS:contactUsType
  more:moreType
  langId:number
  titleTop: string
  titleMain: string
  titleMain2:string
  selectHeader:string
  buttonText: string
  scriptureTitle: string
  contents_translation:Verse[]
}
export type SettingType ={
   title:string
}
type userGuideType = {
  title:string
}
type aboutType ={
  title:string
  titleDescription:string
}
type ShareType ={
  title:string
}
type PrivacyPolicyType ={
  title:string
}
type contributorsType ={
  title:string
}
type shareLyricsWithUsType={
  title:string
}
type contactUsType={
  title:string
}
type moreType={
  title:string
}
export type Verse = {
    id:number,
    book:string,
    reference:string,
    verse_text:string
}

export const versesLLocalization: Record<string, VerseLocalization> = {
  አማርኛ: {
    langId:1,
    setting:amharic.setting,
    userGuide:amharic.userGuide,
    about:amharic.about,
    sharing:amharic.sharing,
    privacyPolicy:amharic.privacyPolicy,
    shareLyricsWithUs:amharic.shareLyricsWithUs,
    contributors:amharic.contributors,
    contactUS:amharic.contactUs,
    more:amharic.more,
    titleTop: amharic.titleTop,
    titleMain:amharic.titleMain,
    titleMain2:amharic.titleMain2,
    selectHeader:amharic.selectHeader,
    buttonText: amharic.buttonText,
    scriptureTitle: amharic.scriptureTitle,
    contents_translation:amharic.contents_translations as Verse[],
  },

  oromo: {
    langId:2,
    titleTop: oromo.titleTop,
    titleMain: oromo.titleMain,
    titleMain2:oromo.titleMain2,
    selectHeader:oromo.selectHeader,
    buttonText: oromo.buttonText,
    scriptureTitle: oromo.scriptureTitle,
    // value: "Dubbiin kee miilla koo irratti ibsa dha.",
    // ref: "Faar 119:105"
     contents_translation:oromo.contents_translations as Verse[], 
     setting:oromo.setting,
     userGuide:oromo.userGuide,
     about:oromo.about,
     sharing:oromo.sharing,
     privacyPolicy:oromo.privacyPolicy,
     shareLyricsWithUs:oromo.shareLyricsWithUs,
     contributors:oromo.contributors,
     contactUS:oromo.contactUs,
     more:oromo.more
  },

  ትግርኛ: {
    langId:3,
    setting:tigre.setting,
    userGuide:tigre.userGuide,
    about:tigre.about,
    sharing:tigre.sharing,
    shareLyricsWithUs:oromo.shareLyricsWithUs,
    privacyPolicy:tigre.privacyPolicy,
    contributors:tigre.contributors,
    contactUS:tigre.contactUs,
    more:tigre.more,
    titleTop: tigre.titleTop,
    titleMain: tigre.titleMain,
    titleMain2:tigre.titleMain2,
    selectHeader:tigre.selectHeader,
    buttonText: tigre.buttonText,
    scriptureTitle: tigre.scriptureTitle,
     contents_translation:tigre.contents_translations as Verse[]
  },

  ጉራጊኛ: {
    langId:4,
    setting:gurage.setting,
    userGuide:gurage.userGuide,
    about:gurage.about,
    sharing:gurage.sharing,
    privacyPolicy:gurage.privacyPolicy,
    shareLyricsWithUs:gurage.shareLyricsWithUs,
    contributors:gurage.contributors,
    contactUS:gurage.contactUs,
    more:gurage.more,
    titleTop: gurage.titleTop,
    titleMain: gurage.titleMain,
    titleMain2:gurage.titleMain2,
    selectHeader:gurage.selectHeader,
    buttonText: gurage.buttonText,
    scriptureTitle: gurage.scriptureTitle,
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105"
     contents_translation:gurage.contents_translations as Verse[]
  },

  ከምባትኛ: {
    langId:5,
    setting:kembata.setting,
    userGuide:kembata.userGuide,
    about:kembata.about,
    sharing:kembata.sharing,
    privacyPolicy:kembata.privacyPolicy,
    shareLyricsWithUs:kembata.shareLyricsWithUs,
    contributors:kembata.contributors,
    contactUS:kembata.contactUs,
    more:kembata.more,
    titleTop: kembata.titleTop,
    titleMain: kembata.titleMain,
    titleMain2:kembata.titleMain2,
    selectHeader:kembata.selectHeader,
    buttonText: kembata.buttonText,
    scriptureTitle: kembata.scriptureTitle,
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105",
     contents_translation:kembata.contents_translations as Verse[]
  },

  ሲዳሚኛ: {
    langId:6,
    setting:sidama.setting,
    userGuide:sidama.userGuide,
    about:sidama.about,
    sharing:sidama.sharing,
    privacyPolicy:sidama.privacyPolicy,
    shareLyricsWithUs:sidama.shareLyricsWithUs,
    contributors:sidama.contributors,
    contactUS:sidama.contactUs,
    more:sidama.more,
    titleTop: sidama.titleTop,
    titleMain: sidama.titleMain,
    titleMain2:sidama.titleMain2,
    selectHeader:sidama.selectHeader,
    buttonText: sidama.buttonText,
    scriptureTitle: sidama.scriptureTitle,
    // value: "ቃልህ ለእግርህ ብርሃን ነው",
    // ref: "መዝ 119:105",
     contents_translation:sidama.contents_translations as Verse[]
  },

  Nuer: {
    langId:8,
    setting:nuer.setting,
    userGuide:nuer.userGuide,
    about:nuer.about,
    sharing:nuer.sharing,
    privacyPolicy:nuer.privacyPolicy,
    shareLyricsWithUs:nuer.shareLyricsWithUs,
    contributors:nuer.contributors,
    contactUS:nuer.contactUs,
    more:nuer.more,
    titleTop: nuer.titleTop,
    titleMain: nuer.titleMain,
    titleMain2:nuer.titleMain2,
    selectHeader:nuer.selectHeader,
    buttonText: nuer.buttonText,
    scriptureTitle: nuer.scriptureTitle,
     contents_translation:nuer.contents_translations as Verse[]
  },
  ሀዲይኛ:{
    langId:8,
    setting:hadya.setting,
    userGuide:hadya.userGuide,
    about:hadya.about,
    sharing:hadya.sharing,
    privacyPolicy:hadya.privacyPolicy,
    shareLyricsWithUs:hadya.shareLyricsWithUs,
    contributors:hadya.contributors,
    contactUS:hadya.contactUs,
    more:hadya.more,
    titleTop: hadya.titleTop,
    titleMain: hadya.titleMain,
    titleMain2:hadya.titleMain2,
    selectHeader:hadya.selectHeader,
    buttonText: hadya.buttonText,
    scriptureTitle: hadya.scriptureTitle,
    // value: "Your word is a lamp to my feet",
    // ref: "Psalm 119:105"
     contents_translation:hadya.contents_translations as Verse[]
  },
  ወላይትኛ: {
     langId:8,
     setting:welayta.setting,
     userGuide:welayta.userGuide,
     about:welayta.about,
     sharing:welayta.sharing,
     privacyPolicy:welayta.privacyPolicy,
     shareLyricsWithUs:welayta.shareLyricsWithUs,
     contributors:welayta.contributors,
     contactUS:welayta.contactUs,
     more:welayta.more,
    titleTop: welayta.titleTop,
    titleMain: welayta.titleMain,
    titleMain2:welayta.titleMain2,
    selectHeader:welayta.selectHeader,
    buttonText: welayta.buttonText,
    scriptureTitle: welayta.scriptureTitle,
     contents_translation:welayta.contents_translations as Verse[]
  },
}