import { DistrictNote, ManifestoPoint, Text } from './types';

export const manifestoIntro: Text = {
  mr: 'शिक्षकांचे प्रश्न व कृती आराखडा — पुणे विभाग शिक्षक मतदारसंघ निवडणूक २०२६ साठी प्रा. डॉ. बब्रुवाहन पांडुरंग रोंगे (सर) यांचा संकल्पनामा.',
  en: 'Teachers’ issues and action plan — the Sankalpnama of Prof. Dr. Babruvahan Pandurang Ronge (Sir) for the Pune Division Teachers’ Constituency election, 2026.',
};

export const manifestoPoints: ManifestoPoint[] = [
  {
    id: 'pension',
    title: { mr: 'जुनी पेन्शन व निवृत्ती सुरक्षा', en: 'Old pension and retirement security' },
    items: [
      { mr: 'जुन्या पेन्शन योजनेसंदर्भातील प्रलंबित प्रश्नांचा शासनस्तरावर पाठपुरावा.', en: 'Follow-up at government level on pending old-pension cases.' },
      { mr: '१ नोव्हेंबर २००५ पूर्वी नियुक्त शिक्षकांच्या पेन्शनविषयक प्रकरणांचा विशेष निपटारा.', en: 'Special settlement of pension cases of teachers appointed before 1 November 2005.' },
      { mr: 'NPS / नवीन पेन्शन व्यवस्थेतील शिक्षकांच्या निवृत्ती सुरक्षिततेचा पुनर्विचार.', en: 'A review of retirement security for teachers under NPS / the new pension system.' },
      { mr: 'निवृत्तीपूर्व दोन वर्षे पेन्शन प्रकरणांची पूर्वतपासणी.', en: 'Pre-checking of pension cases two years before retirement.' },
      { mr: 'पेन्शन मंजुरीतील अनावश्यक विलंब टाळण्यासाठी स्वतंत्र यंत्रणा.', en: 'A separate mechanism so pension approvals are not delayed.' },
      { mr: 'कुटुंब निवृत्तीवेतनाची प्रकरणे वेळेत निकाली काढणे.', en: 'Family pension cases cleared on time.' },
      { mr: 'पेन्शनधारकांसाठी जिल्हानिहाय सहाय्य कक्ष.', en: 'A district help desk for pensioners.' },
    ],
  },
  {
    id: 'tet',
    title: { mr: 'TET सक्तीचा प्रश्न', en: 'The TET compulsion issue' },
    items: [
      { mr: 'RTE पूर्वी शिक्षकांच्या TET सक्तीचा प्रश्न सोडवण्यासाठीचा संकल्प.', en: 'A pledge to resolve the TET requirement for teachers appointed before the RTE Act.' },
      { mr: 'सेवासातत्य, पदोन्नती, ज्येष्ठ शिक्षकांची गैरसोय होऊ नये यासाठी आग्रही भूमिका मांडणार.', en: 'Will argue firmly that continuity of service, promotion, and senior teachers are not put at a disadvantage.' },
    ],
  },
  {
    id: 'grant-stages',
    title: { mr: 'टप्पा-वाढ अनुदानासाठी कृतिशील पाठपुरावा', en: 'Active follow-up for the next stage of grant' },
    items: [
      { mr: 'अंशत: अनुदानावर कार्यरत असलेल्या शिक्षक व शिक्षकेतर कर्मचाऱ्यांना शासनाने दिलेल्या आश्वासनानुसार १ एप्रिल २०२७ पासून अनुदानाचा टप्पा मिळवून देण्यासाठी पाठपुरावा करणार.', en: 'Will follow up so that teachers and non-teaching staff on partial grant receive the next grant stage from 1 April 2027, as promised by the government.' },
      { mr: 'त्रुटीपात्र शाळांना व तुकड्यांना वाढीव अनुदानासाठी प्रयत्नशील राहणार.', en: 'Will work for higher grant for schools and divisions found deficient.' },
    ],
  },
  {
    id: 'non-academic',
    title: { mr: 'अशैक्षणिक कामांपासून शिक्षकांची मुक्तता', en: 'Relief from non-academic duties' },
    items: [
      { mr: 'शिक्षकांची अशैक्षणिक कामे बंद करणे.', en: 'Stop non-academic duties for teachers.' },
      { mr: 'BLO, विविध सर्वेक्षणे व प्रशासकीय कामांसाठी पर्यायी मनुष्यबळाचा विचार.', en: 'Consider alternative staff for BLO, surveys, and administrative work.' },
      { mr: 'एकाच माहितीची विविध पोर्टलवर वारंवार मागणी टाळणे.', en: 'Stop asking for the same information again on multiple portals.' },
      { mr: 'शाळेच्या वेळेत अध्यापनाला प्राधान्य.', en: 'Teaching comes first during school hours.' },
    ],
  },
  {
    id: 'staffing-norms',
    title: { mr: 'नवीन संच मान्यता रद्द करणे', en: 'Cancelling the new staffing norms' },
    items: [
      { mr: 'नवीन संचमान्यता निकष रद्द करण्यासाठी शासनाकडे पाठपुरावा करणार.', en: 'Will follow up with the government to cancel the new staffing-norm criteria.' },
      { mr: 'संचमान्यतेतील बदलांमुळे अतिरिक्त ठरणाऱ्या शिक्षकांच्या सेवासंरक्षणाची हमी मिळवण्यासाठी प्रयत्न.', en: 'Efforts to secure a guarantee of service protection for teachers who become surplus because of the staffing-norm changes.' },
      { mr: 'कमी पटसंख्येच्या ग्रामीण व दुर्गम शाळांमधील शिक्षकपदांचे संरक्षण करून विद्यार्थ्यांचे शैक्षणिक नुकसान टाळणे.', en: 'Protect teacher posts in rural and remote schools with low enrolment, so students do not lose out on education.' },
    ],
  },
  {
    id: 'salary',
    title: { mr: 'वेतन श्रेणी निश्चिती, वेतन श्रेणी वाढ व आर्थिक प्रश्न पाठपुरावा', en: 'Pay-scale fixation, pay-scale increase, and follow-up on financial issues' },
    items: [
      { mr: 'प्रत्येक महिन्याला वेळेत वेतन.', en: 'Salary paid on time every month.' },
      { mr: 'प्रलंबित वेतनाची जिल्हानिहाय माहिती व विशेष निपटारा.', en: 'District-wise information and special clearance of pending salary.' },
      { mr: 'वेतन निश्चितीतील त्रुटी दुरुस्त करण्यासाठी विशेष कक्ष.', en: 'A special cell to correct pay-fixation errors.' },
      { mr: 'प्रलंबित वेतन फरक व भत्त्यांचा निपटारा.', en: 'Settlement of pending pay differences and allowances.' },
      { mr: 'वेतनश्रेणी निश्चितीबाबत सर्वांना समान धोरण लागू करणे.', en: 'Apply one uniform policy on pay-scale fixation to everyone.' },
      { mr: 'सेवापुस्तकातील वेतनविषयक नोंदी अद्ययावत करणे.', en: 'Keep salary entries in the service book up to date.' },
      { mr: 'वेतनाशी संबंधित तक्रारींसाठी ऑनलाइन प्रणाली.', en: 'An online system for salary complaints.' },
      { mr: 'जिल्हा पे युनिट अद्ययावत करून ऑनलाइन स्लिपची व्यवस्था केली जाईल.', en: 'The district pay unit will be upgraded and online salary slips arranged.' },
    ],
  },
  {
    id: 'health',
    title: { mr: 'कॅशलेस वैद्यकीय सुविधा व विमा संरक्षण', en: 'Cashless medical care and insurance cover' },
    items: [
      { mr: 'शिक्षक व शिक्षकेतर कर्मचाऱ्यांसाठी प्रभावी Cashless Health Insurance.', en: 'Effective cashless health insurance for teachers and non-teaching staff.' },
      { mr: 'शिक्षक, पती/पत्नी व पात्र कुटुंबीयांना आरोग्य संरक्षण.', en: 'Health cover for the teacher, spouse, and eligible family members.' },
      { mr: 'गंभीर आजारांसाठी विशेष वैद्यकीय सहाय्य.', en: 'Special medical help for serious illness.' },
      { mr: 'अपघाती विमा संरक्षण.', en: 'Accident insurance cover.' },
      { mr: 'मेडिकल बिलांच्या मंजुरीसाठी वेळमर्यादा.', en: 'A time limit for approval of medical bills.' },
      { mr: 'मान्यताप्राप्त रुग्णालयांची संख्या वाढविणे.', en: 'More empanelled hospitals.' },
    ],
  },
  {
    id: 'recruitment',
    title: { mr: 'सुलभ व पारदर्शक भरती प्रक्रिया', en: 'A simple and transparent recruitment process' },
    items: [
      { mr: 'पारदर्शक, नियमबद्ध व भ्रष्टाचारमुक्त भरती प्रक्रियेसाठी पाठपुरावा.', en: 'Follow-up for a transparent, rule-based, corruption-free recruitment process.' },
      { mr: 'रिक्त शिक्षक व शिक्षकेतर पदांची वेळेत भरती.', en: 'Timely filling of vacant teaching and non-teaching posts.' },
      { mr: 'पात्र उमेदवारांसाठी सुलभ व अडथळेमुक्त प्रक्रिया.', en: 'A simple, obstacle-free process for eligible candidates.' },
      { mr: 'गुणवत्ताधारित निवड व सर्वांना समान संधी.', en: 'Merit-based selection and equal opportunity for all.' },
      { mr: 'निश्चित कालमर्यादा, भरती प्रक्रियेची माहिती व प्रभावी तक्रार निवारण.', en: 'Fixed timelines, information on the recruitment process, and effective grievance redressal.' },
    ],
  },
  {
    id: 'unaided-grant',
    title: { mr: 'विनाअनुदानित शिक्षण संस्थांसाठी अनुदानाचा विषय', en: 'Grant for unaided educational institutions' },
    items: [
      { mr: 'प्रलंबित अनुदान तातडीने वितरित करण्यासाठी शासनाकडे ठोस पाठपुरावा.', en: 'Solid follow-up with the government to release pending grants urgently.' },
      { mr: 'विनाअनुदानित व अंशतः अनुदानित शाळांना टप्प्याटप्प्याने १००% अनुदान मिळवून देण्यासाठी प्रयत्न.', en: 'Efforts to get unaided and partially aided schools 100% grant, stage by stage.' },
      { mr: 'अनुदान वितरणातील विलंब दूर करून शिक्षक व शिक्षकेतर कर्मचाऱ्यांचे वेतन नियमित करण्यासाठी आग्रही भूमिका.', en: 'A firm stand to remove delays in grant release so teachers’ and non-teaching staff’s salaries are regular.' },
      { mr: 'अनुदानाच्या प्रलंबित प्रस्तावांना मंजुरी मिळवून देण्यासाठी पारदर्शक व कालबद्ध कार्यपद्धतीचा आग्रह.', en: 'Insist on a transparent, time-bound procedure to get pending grant proposals approved.' },
    ],
  },
  {
    id: 'service-book',
    title: { mr: 'डिजिटल सेवापुस्तक', en: 'A digital service book' },
    items: [
      { mr: 'शिक्षकांच्या संपूर्ण सेवाअभिलेखाची डिजिटल उपलब्धता.', en: 'A teacher’s complete service record available digitally.' },
      { mr: 'सेवाविषयक कागदपत्रांचे डिजिटल व्यवस्थापन व्हावे.', en: 'Digital management of service-related documents.' },
      { mr: 'सेवाविषयक नोंदींची सुरक्षितता आणि अचूकतेला प्राधान्य.', en: 'Priority to the security and accuracy of service records.' },
    ],
  },
  {
    id: 'retired',
    title: { mr: 'निवृत्त शिक्षकांसाठी सन्मान व सहाय्य', en: 'Respect and support for retired teachers' },
    items: [
      { mr: 'पेन्शन प्रकरणे.', en: 'Pension cases.' },
      { mr: 'पेन्शन पुनर्निश्चिती.', en: 'Pension re-fixation.' },
      { mr: 'वैद्यकीय सुविधा.', en: 'Medical care.' },
      { mr: 'निवृत्त शिक्षकांसाठी जिल्हानिहाय मदत कक्ष.', en: 'A district help desk for retired teachers.' },
      { mr: 'कुटुंब निवृत्तीवेतन.', en: 'Family pension.' },
    ],
  },
  {
    id: 'seniority-legal',
    title: { mr: 'सेवाज्येष्ठता व पदोन्नती', en: 'Seniority and promotion' },
    items: [
      {
        mr: 'सेवाज्येष्ठता, पदोन्नती, वेतन, पेन्शन, बदली, अनुदान, सेवाशर्ती इत्यादी प्रश्नांवर मार्गदर्शन करण्यासाठी Teacher Legal Support Cell उभारण्याचा प्रस्ताव दाखल करणार.',
        en: 'Will submit a proposal to set up a Teacher Legal Support Cell to guide on seniority, promotion, salary, pension, transfer, grants, service conditions, and similar issues.',
      },
    ],
  },
  {
    id: 'transfer',
    title: { mr: 'पारदर्शक शिक्षक बदली धोरण', en: 'A transparent teacher transfer policy' },
    items: [
      { mr: 'बदल्यांमध्ये पारदर्शकता, निर्णयात न्याय आणि शिक्षकांना दिलासा.', en: 'Transparency in transfers, fairness in decisions, and relief for teachers.' },
      { mr: 'बदली प्रक्रियेतील अन्याय, त्रुटी व विसंगती दूर करून तक्रार निवारण यंत्रणा.', en: 'Remove injustice, errors, and inconsistencies in the transfer process, with a grievance redressal mechanism.' },
      { mr: 'बदली प्रक्रियेचे डिजिटलायझेशन.', en: 'Digitisation of the transfer process.' },
    ],
  },
  {
    id: 'more',
    title: { mr: 'इतर संकल्प', en: 'Other commitments' },
    items: [
      { mr: 'उच्च तांत्रिक विद्याशाखांसाठी सेवा सुरक्षा आणि विधायक शासन नियम लागू करण्यासाठी प्रयत्न.', en: 'Efforts for service security and constructive government rules for higher technical faculties.' },
      { mr: 'स्वयंअर्थसहाय्यित शाळा/महाविद्यालयांच्या विकासाच्या वृद्धीसाठी शासकीय निधीस पात्रतेबाबत प्रयत्न.', en: 'Efforts to make self-financed schools and colleges eligible for government funds for their growth.' },
      {
        mr: 'इंजिनिअरिंग, फार्मसी, आर्किटेक्चर, आयटीआय, डिप्लोमा, मेडिकल, लॉ कॉलेज, विद्यापीठ संलग्न महाविद्यालय यांच्या प्राध्यापक, शिक्षक, व्याख्यात्यांच्या प्रश्नांची दखल घेण्यासाठी उच्च विद्या शाखांचे प्रशासकीय स्तरावर अभिव्यक्ती पोर्टल सुरू करणे.',
        en: 'Start an administrative-level expression portal for higher-education faculties, to take up the issues of professors, teachers, and lecturers in engineering, pharmacy, architecture, ITI, diploma, medical, law, and university-affiliated colleges.',
      },
      { mr: 'शालार्थ ID चा प्रश्न प्राधान्याने सोडविण्यात येईल.', en: 'The Shalarth ID issue will be resolved on priority.' },
    ],
  },
];

export const districts: DistrictNote[] = [
  {
    id: 'pune',
    name: { mr: 'पुणे', en: 'Pune' },
    note: {
      mr: 'शहरीकरण, वाढती विद्यार्थीसंख्या, प्रशासकीय भार, वाहतूक आणि शाळांची पायाभूत सुविधा.',
      en: 'Urban growth, rising student numbers, administrative load, transport, and school infrastructure.',
    },
  },
  {
    id: 'satara',
    name: { mr: 'सातारा', en: 'Satara' },
    note: {
      mr: 'दुर्गम व ग्रामीण शाळा, शिक्षक निवास, प्रवास आणि पदोन्नती.',
      en: 'Remote and rural schools, teacher housing, travel, and promotions.',
    },
  },
  {
    id: 'sangli',
    name: { mr: 'सांगली', en: 'Sangli' },
    note: {
      mr: 'अनुदानित शाळा, सेवा प्रश्न, बदली आणि प्रशासकीय प्रश्न.',
      en: 'Aided schools, service issues, transfers, and administration.',
    },
  },
  {
    id: 'kolhapur',
    name: { mr: 'कोल्हापूर', en: 'Kolhapur' },
    note: {
      mr: 'ग्रामीण-शहरी शिक्षकांचे प्रश्न, सेवाज्येष्ठता, बदली आणि शाळा सुविधा.',
      en: 'Rural and urban teacher issues, seniority, transfers, and school facilities.',
    },
  },
  {
    id: 'solapur',
    name: { mr: 'सोलापूर', en: 'Solapur' },
    note: {
      mr: 'दुर्गम भाग, शिक्षकांची कमतरता, वेतन व सेवा प्रश्न आणि निवास.',
      en: 'Remote areas, teacher shortage, salary and service issues, and housing.',
    },
  },
];
