import { districts } from './manifesto';
import { Album, Award, NavItem, Stat, Text } from './types';

function frames(folder: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, index) => `/media/${folder}/${String(index + 1).padStart(2, '0')}.jpg`,
  );
}

export const profile = {
  name: { mr: 'प्रा. डॉ. बब्रुवाहन पांडुरंग रोंगे', en: 'Prof. Dr. Babruvahan Pandurang Ronge' } satisfies Text,
  shortName: { mr: 'डॉ. बी. पी. रोंगे', en: 'Dr. B. P. Ronge' } satisfies Text,
  constituency: {
    mr: 'पुणे विभाग शिक्षक मतदारसंघ',
    en: 'Pune Division Teachers’ Constituency',
  } satisfies Text,
  slogan: {
    mr: 'शिक्षकांचा सन्मान  |  सेवासुरक्षा  |  सामाजिक सुरक्षा  |  गुणवत्तापूर्ण शिक्षण',
    en: 'Dignity of teachers  |  Service security  |  Social security  |  Quality education',
  } satisfies Text,
  phone: '9545193434',
  phoneDisplay: '95451 93434',
  email: 'rongebp62@gmail.com',
  whatsapp: 'https://wa.me/919545193434',
  facebook: 'https://www.facebook.com/share/1EWjKrxc31/',
  instagram: 'https://www.instagram.com/dr.bpronge/',
  address: {
    mr: 'प्लॉट नं. १६, गट नं. ५८, गोल्डन कॉलनी, गेंड वस्ती, कराड रोड, पंढरपूर – ४१३३०४, जिल्हा सोलापूर',
    en: 'Plot 16, Gat 58, Golden Colony, Gend Vasti, Karad Road, Pandharpur 413304, Solapur district',
  } satisfies Text,
  portrait: '/media/portrait-white.jpg',
  portraitSuit: '/media/portrait-suit.jpg',
};

export const nav: NavItem[] = [
  { path: '/', label: { mr: 'मुख्य पान', en: 'Home' }, exact: true },
  { path: '/election', label: { mr: 'जाहीरनामा', en: 'Manifesto' } },
  { path: '/voters', label: { mr: 'मतदार यादी', en: 'Voter list' } },
  { path: '/about', label: { mr: 'व्यक्तिगत माहिती', en: 'About' } },
  { path: '/news', label: { mr: 'महत्त्वाच्या बातम्या', en: 'News' } },
  { path: '/gallery', label: { mr: 'गॅलरी', en: 'Gallery' } },
  { path: '/problems', label: { mr: 'समस्या नोंदणी', en: 'Register a problem' } },
  { path: '/contact', label: { mr: 'संपर्क', en: 'Contact' } },
];

export const stats: Stat[] = [
  { value: '४०', label: { mr: 'वर्षे शिक्षण क्षेत्राचा अनुभव', en: 'Years of experience in education' } },
  { value: '१९९८', label: { mr: 'स्वेरी, पंढरपूर स्थापना', en: 'SVERI, Pandharpur founded' } },
  { value: '५,०००', label: { mr: 'विद्यार्थी, मुख्य परिसर', en: 'Students on the main campus' } },
  { value: '✔', label: { mr: 'शिक्षकांच्या विकासासाठी कटिबद्ध', en: 'Committed to teachers’ development' } },
];

export const heroLead: Text = {
  mr: 'पंढरपूर तालुक्यातील खर्डी येथील शेतकरी कुटुंबातून शिक्षण, तंत्रज्ञान आणि शिक्षक चळवळीपर्यंतचा प्रवास. पुणे विभाग शिक्षक मतदारसंघासाठी २०२६ चा कृती आराखडा शिक्षकांच्या सेवासुरक्षा, सन्मान आणि शाळांच्या सुविधांभोवती उभा आहे.',
  en: 'From a farming family in Khardi, Pandharpur taluka, to engineering education and the teachers’ movement. The 2026 plan for the Pune Division Teachers’ Constituency stands on service security, dignity, and better schools.',
};

export const aboutLead: Text = {
  mr: 'वीरमाता जिजाबाई टेक्नॉलॉजिकल इन्स्टिट्यूट, मुंबई येथून अभियांत्रिकी पदवी, आयआयटी मुंबई येथून इंडस्ट्रियल मॅनेजमेंटमध्ये एम.टेक., आणि पुण्यश्लोक अहिल्यादेवी होळकर सोलापूर विद्यापीठातून पीएच.डी. मुंबईत नोकरी न करता गावाकडे परतल्यावर त्यांनी १९९८ साली पंढरपूर येथे कार्यशाळेच्या शेडमध्ये अभियांत्रिकी महाविद्यालयाची मुहूर्तमेढ रोवली.',
  en: 'An engineering degree from VJTI Mumbai, an M.Tech. in Industrial Management from IIT Bombay, and a Ph.D. from Punyashlok Ahilyadevi Holkar Solapur University. He returned home instead of taking a job in Mumbai, and in 1998 started an engineering college in a workshop shed at Pandharpur.',
};

export const experience: Text[] = [
  { mr: 'मॅनेजमेंट कौन्सिल सदस्य — तीन टर्म', en: 'Member, Management Council — three terms' },
  { mr: 'सिनेट सदस्य — तीन टर्म', en: 'Member, Senate — three terms' },
  { mr: 'ॲकॅडमिक कौन्सिल सदस्य — चार टर्म', en: 'Member, Academic Council — four terms' },
  { mr: 'अभियांत्रिकी विद्याशाखेचे अधिष्ठाता — पाच वर्षे', en: 'Dean, Faculty of Engineering — five years' },
  { mr: 'स्वेरीज कॉलेज ऑफ इंजिनिअरिंग, पंढरपूर येथे प्राचार्य — अध्यापनात बावीस वर्षे', en: 'Principal, SVERI’s College of Engineering, Pandharpur — twenty-two years in teaching there' },
  { mr: 'अभियांत्रिकी शिक्षकाचा एकूण अनुभव — चाळीस वर्षे', en: 'Forty years as an engineering teacher, from assistant professor to professor' },
];

export const institutions: Text[] = [
  {
    mr: 'संस्थापक, श्री विठ्ठल एज्युकेशन अँड रिसर्च इन्स्टिट्यूट, पंढरपूर — पदविका व पदवी अभियांत्रिकी, फार्मसी, एमबीए, एमसीए आणि लॉ कॉलेज.',
    en: 'Founder, Shri Vithal Education and Research Institute, Pandharpur — diploma and degree engineering, pharmacy, MBA, MCA, and a law college.',
  },
  {
    mr: 'संस्थापक व सचिव, श्री विठ्ठल इन्स्टिट्यूट ऑफ प्रोग्रेसिव्ह एज्युकेशन, पंढरपूर — सीबीएसई शाळा, कनिष्ठ महाविद्यालय, बीसीए आणि बी.एस्सी. (ईसीएस).',
    en: 'Founder and secretary, Shri Vithal Institute of Progressive Education, Pandharpur — a CBSE school, junior college, BCA, and B.Sc. (ECS).',
  },
  {
    mr: 'अध्यक्ष, स्वामी विवेकानंद प्रतिष्ठान, सोलापूर. २०२२-२३ मध्ये बंद पडत चाललेली संस्था घेऊन स्वामी विवेकानंद इन्स्टिट्यूट ऑफ टेक्नॉलॉजी पुन्हा सुरू केले. २०२५-२६ मध्ये पदवी अभ्यासक्रमांसह एमबीए व एमसीए सुरू.',
    en: 'Chairman, Swami Vivekanand Pratishthan, Solapur. In 2022–23 he took over a failing campus and revived Swami Vivekanand Institute of Technology. Degree programmes, MBA, and MCA started in 2025–26.',
  },
  {
    mr: 'संस्थापक, विठाई नागरी सहकारी पतसंस्था मर्यादित, पंढरपूर.',
    en: 'Founder, Vithai Urban Cooperative Credit Society, Pandharpur.',
  },
  {
    mr: 'संस्थापक व चेअरमन, आरसेस हेल्थकेअर प्रायव्हेट लिमिटेड आणि आरसेस टेक्नॉलॉजी सोल्युशन्स प्रायव्हेट लिमिटेड.',
    en: 'Founder and chairman, Aarses Healthcare Private Limited and Aarses Technology Solutions Private Limited.',
  },
  {
    mr: 'उपाध्यक्ष, असोसिएशन ऑफ मॅनेजमेंट ऑफ इंजिनिअरिंग कॉलेजेस, कोल्हापूर — वीस वर्षांहून अधिक. सचिव, असोसिएशन ऑफ मॅनेजमेंट ऑफ अनएडेड प्रोफेशनल कॉलेजेस, महाराष्ट्र — सात वर्षांहून अधिक.',
    en: 'Vice-president, Association of Management of Engineering Colleges, Kolhapur, for more than twenty years. Secretary, Association of Management of Unaided Professional Colleges, Maharashtra, for more than seven years.',
  },
];

export const campus: Text[] = [
  {
    mr: '१९९८ साली १६० विद्यार्थी, ८ शिक्षक आणि २ शिक्षकेतर कर्मचारी यांच्यासह १३,००० चौरस फुटांच्या शेडमध्ये सुरुवात.',
    en: 'In 1998 it began with 160 students, 8 teachers, and 2 non-teaching staff in a 13,000-square-foot shed.',
  },
  {
    mr: 'आज सुमारे २७ एकर परिसरात पाच महाविद्यालये, सुमारे २६० शिक्षक, २०० शिक्षकेतर कर्मचारी आणि ५,००० विद्यार्थी. बांधकाम सात लाख चौरस फुटांहून अधिक.',
    en: 'Today, about 27 acres hold five colleges, roughly 260 teachers, 200 non-teaching staff, and 5,000 students. Built area is more than seven lakh square feet.',
  },
  {
    mr: 'व्यावसायिक शिक्षण संकुलात कमवा व शिका योजना — दरवर्षी सुमारे ९० लाख रुपयांची तरतूद. गुणवंत विद्यार्थ्यांसाठी सुमारे १५ लाख रुपयांची शिष्यवृत्ती.',
    en: 'An earn-and-learn scheme with about Rs 90 lakh set aside each year, and about Rs 15 lakh in merit support for students.',
  },
  {
    mr: 'इमारतींच्या छतावर ४०० किलोवॅट सौर ऊर्जा प्रकल्प. संस्था कर्जमुक्त.',
    en: 'A 400-kilowatt solar plant on the rooftops. The institution is debt-free.',
  },
  {
    mr: 'दुसऱ्या सात एकर परिसरात सीबीएसई शाळा, कनिष्ठ महाविद्यालय आणि पदवी अभ्यासक्रम — सुमारे १,७०० विद्यार्थी.',
    en: 'A second campus of seven acres with a CBSE school, junior college, and degree courses — about 1,700 students.',
  },
];

export const socialWork: Text[] = [
  { mr: '२०२०: कोविड काळात मुख्यमंत्री सहाय्यता निधीला ४ लाख आणि पंतप्रधान सहाय्यता निधीला ३ लाख — एकूण ७ लाखांची देणगी.', en: '2020: Rs 4 lakh to the Chief Minister’s Relief Fund and Rs 3 lakh to the Prime Minister’s fund during Covid — Rs 7 lakh in all.' },
  { mr: '२०२०: सुमारे एक लाख रुपयांचे जीवनावश्यक साहित्य वाटप.', en: '2020: About Rs 1 lakh of essential supplies distributed.' },
  { mr: '२०१९: सांगली-कोल्हापूर पूरग्रस्तांसाठी मुख्यमंत्री सहाय्यता निधीला ५ लाख.', en: '2019: Rs 5 lakh to the Chief Minister’s Relief Fund for Sangli–Kolhapur flood relief.' },
  { mr: '२०१८: केरळ पूरग्रस्तांसाठी मुख्यमंत्री सहाय्यता निधीला ५ लाख.', en: '2018: Rs 5 lakh to the Chief Minister’s Relief Fund for Kerala flood relief.' },
  { mr: 'तावशी, गादेगाव आणि केसकरवाडी येथील अपघात व आत्महत्याग्रस्त कुटुंबांच्या नावे मुदत ठेवी.', en: 'Fixed deposits in the names of families hit by accidents at Tavshi and Keskarwadi, and by a farmer’s death at Gadegaon.' },
  { mr: 'ग्रामीण भागातील रेश्मा पवार या विद्यार्थिनीच्या अभियांत्रिकी शिक्षणाचा खर्च.', en: 'Support for the engineering education of Reshma Pawar, a student from a rural area.' },
  { mr: 'भाभा अणुसंशोधन केंद्र, मुंबई यांच्याशी सामंजस्य करार — शेतकरी व ग्रामीण विकासासाठी तंत्रज्ञानाचा प्रसार.', en: 'A memorandum with the Bhabha Atomic Research Centre, Mumbai, to take technology to farmers and rural communities.' },
];

export const universityWork: Text[] = [
  { mr: '२००० मध्ये शिवाजी विद्यापीठ मॅनेजमेंट कौन्सिलच्या निवडणुकीत विजय. २०१७ मध्ये पुण्यश्लोक अहिल्यादेवी होळकर सोलापूर विद्यापीठाच्या मॅनेजमेंट कौन्सिलच्या निवडणुकीत विजय.', en: 'Elected to the Management Council of Shivaji University in 2000, and of Punyashlok Ahilyadevi Holkar Solapur University in 2017.' },
  { mr: 'अनुदानित महाविद्यालयाचे विद्यापीठाशी होणारे असंलग्नीकरण थांबवले. दोन महाविद्यालयांत प्रशासक येण्यापासून रोखले.', en: 'Stopped the disaffiliation of an aided college, and prevented administrators being imposed on two colleges.' },
  { mr: 'शिक्षकांचे परीक्षा मानधन वाढवण्याच्या प्रक्रियेत सहभाग.', en: 'Worked to raise examination remuneration for teachers.' },
  { mr: '२००५ ते २०१० या काळात अभियांत्रिकी विद्याशाखेचे अधिष्ठाता म्हणून परीक्षा निकाल ३० ते ४५ दिवसांत लावण्यात यश.', en: 'As Dean of Engineering from 2005 to 2010, examination results were declared in 30 to 45 days.' },
  { mr: 'विद्यापीठस्तरीय युवा महोत्सवाचे तीन वेळा प्राचार्य म्हणून आयोजन. क्रीडा स्पर्धांचे सातत्याने आयोजन.', en: 'Director of the university youth festival three times, and a regular organiser of sports competitions.' },
  { mr: 'शिक्षक प्रशिक्षण परिषदा आणि शिक्षक-विद्यार्थीभिमुख कामकाजासाठी मॅनेजमेंट कौन्सिल, ॲकॅडमिक कौन्सिल व सिनेटमध्ये सातत्याने सहभाग.', en: 'A continuing voice for teachers and students in the Management Council, Academic Council, and Senate, including teacher-training conferences.' },
];

export const awards: Award[] = [
  { year: '२०२०', title: { mr: 'पुण्यश्लोक अहिल्यादेवी होळकर सोलापूर विद्यापीठाचा उत्कृष्ट प्राचार्य पुरस्कार', en: 'Best Principal Award, Punyashlok Ahilyadevi Holkar Solapur University' } },
  { year: '२०१९', title: { mr: 'चिंचवड देवस्थान ट्रस्टतर्फे मोरया गोसावी गौरव', en: 'Morya Gosavi Gaurav, Chinchwad Devasthan Trust' } },
  { year: '२०२०', title: { mr: 'ग्लोबल इंग्लिश मीडियम स्कूल, उंब्रज, कराड तर्फे ग्लोबल कृष्णा गौरव', en: 'Global Krishna Gaurav, Global English Medium School, Umbraj, Karad' } },
  { year: '२०१९', title: { mr: 'सकाळ, सोलापूर — एक्सलन्स इन सामाजिक व शैक्षणिक कार्य', en: 'Sakal, Solapur — Excellence in Social and Educational Work' } },
  { year: '—', title: { mr: 'दिव्य मराठी, सोलापूर — प्राउड महाराष्ट्रीयन', en: 'Divya Marathi, Solapur — Proud Maharashtrian' } },
  { year: '२०२२', title: { mr: 'आदर्श प्राचार्य पुरस्कार, पंडित दादासाहेब पाटील स्मारक समिती', en: 'Ideal Principal Award, Pandit Dadasaheb Patil Memorial Committee' } },
  { year: '२०२३', title: { mr: 'महात्मा फुले–सावित्रीबाई फुले राज्यस्तरीय गुणवंत शिक्षक पुरस्कार', en: 'Mahatma Phule–Savitribai Phule state-level quality teacher award' } },
  { year: '२०२३', title: { mr: 'दैनिक नवराष्ट्र एज्युकेशन समिट — उत्कृष्ट शिक्षण संस्था चालक', en: 'Dainik Navarashtra Education Summit — outstanding education-institution leader' } },
  { year: '२०२४', title: { mr: 'दैनिक एकमत — शैक्षणिक कृतज्ञता सन्मान', en: 'Dainik Ekmat — educational gratitude honour' } },
  { year: '२०२४', title: { mr: 'डॉ. कलाम राष्ट्र उभारणी प्रेरणा पुरस्कार', en: 'Dr. Kalam nation-building inspiration award' } },
];

export const albums: Album[] = [
  {
    id: 'andolan',
    title: { mr: 'शिक्षक धरणे आंदोलन', en: 'Teachers’ sit-in' },
    summary: {
      mr: 'शिक्षक समन्वय संघ, महाराष्ट्र राज्य यांच्या धरणे आंदोलनातील क्षण. पेन्शन, अनुदान आणि सुरक्षित भविष्याच्या मागण्यांसह शिक्षकांची गर्दी.',
      en: 'Moments from the sit-in of the Teachers’ Coordination Committee, Maharashtra, with demands on pension, grants, and a secure future.',
    },
    cover: '/media/andolan/01.jpg',
    images: frames('andolan', 22),
  },
  {
    id: 'teachers',
    title: { mr: 'शिक्षकांसोबतचे फोटो', en: 'With teachers' },
    summary: {
      mr: 'केसेगाव, मिरज आणि ग्रामीण शाळांमधील बैठका, संवाद आणि शिक्षक भेटी.',
      en: 'Meetings and visits with teachers in Kasegaon, Miraj, and rural schools.',
    },
    cover: '/media/teachers/09.jpg',
    images: frames('teachers', 32),
  },
  {
    id: 'press',
    title: { mr: 'वृत्तपत्रातील बातम्या', en: 'In the press' },
    summary: {
      mr: 'डॉ. रोंगे सरांच्या शिक्षक भेटी आणि कार्याबद्दल वृत्तपत्रांत प्रसिद्ध झालेल्या बातम्या.',
      en: 'Newspaper coverage of Dr. Ronge’s teacher visits and work.',
    },
    cover: '/media/press/01.jpg',
    images: frames('press', 15),
  },
];

export const videosNote: Text = {
  mr: 'सभा, आंदोलन आणि शिक्षक भेटींचे व्हिडिओ येथे दिले जातील. सध्या या विभागात व्हिडिओ जोडलेले नाहीत.',
  en: 'Videos of meetings, the movement, and teacher visits will appear here. No videos have been added to this section yet.',
};

export const pageTitles: Record<string, Text> = {
  home: { mr: 'मुख्य पान', en: 'Home' },
  election: { mr: 'जाहीरनामा', en: 'Manifesto' },
  voters: { mr: 'मतदार यादी', en: 'Voter list' },
  about: { mr: 'व्यक्तिगत माहिती', en: 'About' },
  news: { mr: 'महत्त्वाच्या बातम्या', en: 'News' },
  gallery: { mr: 'गॅलरी', en: 'Gallery' },
  problems: { mr: 'समस्या नोंदणी', en: 'Register a problem' },
  contact: { mr: 'संपर्क', en: 'Contact' },
};

export const voterDistricts: { id: string; name: Text; color: string; icon: string }[] = [
  { id: 'pune', name: { mr: 'पुणे', en: 'Pune' }, color: '#0c2340', icon: '/icons/pune.svg?v=3' },
  { id: 'kolhapur', name: { mr: 'कोल्हापूर', en: 'Kolhapur' }, color: '#0e7490', icon: '/icons/kolhapur.svg?v=3' },
  { id: 'sangli', name: { mr: 'सांगली', en: 'Sangli' }, color: '#c56a32', icon: '/icons/sangli.svg?v=3' },
  { id: 'satara', name: { mr: 'सातारा', en: 'Satara' }, color: '#1d4e89', icon: '/icons/satara.svg?v=3' },
  { id: 'solapur', name: { mr: 'सोलापूर', en: 'Solapur' }, color: '#0f766e', icon: '/icons/solapur.svg?v=3' },
];

export interface VoterRecord {
  name: string;
  district: string;
  part: string;
  serial: string;
}

/** Public teacher-roll rows. Empty until the constituency list is added. */
export const voterRoll: VoterRecord[] = [];

export { districts };
