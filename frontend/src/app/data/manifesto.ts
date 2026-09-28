import { DistrictNote, ManifestoPoint, Text } from './types';

export const manifestoIntro: Text = {
  mr: 'शिक्षक हा केवळ अभ्यासक्रम पूर्ण करणारा कर्मचारी नसून भावी पिढी घडवणारा शिक्षणव्यवस्थेचा केंद्रबिंदू आहे. त्यामुळे शिक्षकांच्या सेवा-सुरक्षेचे प्रश्न, वेतन व पेन्शन, पदोन्नती, बदली, आरोग्य, निवास, प्रशासकीय कामाचा भार आणि शाळांच्या मूलभूत सुविधा हे प्रश्न शिक्षणाच्या गुणवत्तेशी थेट जोडलेले आहेत. पुणे विभागातील पुणे, सातारा, सांगली, कोल्हापूर आणि सोलापूर या पाच जिल्ह्यांतील शिक्षकांचे प्रश्न एकत्रितपणे मांडण्यासाठी हा आराखडा आहे.',
  en: 'A teacher is the centre of the education system, shaping the next generation. Service security, salary and pension, promotion, transfers, health, housing, administrative workload, and basic school facilities are tied directly to the quality of education. This plan brings together the issues of teachers across Pune, Satara, Sangli, Kolhapur, and Solapur in the Pune Division.',
};

export const manifestoPoints: ManifestoPoint[] = [
  {
    id: 'pension',
    title: { mr: 'जुनी पेन्शन व निवृत्ती सुरक्षा', en: 'Old pension and retirement security' },
    lead: {
      mr: 'जुनी पेन्शन ही २०२६ मधील शिक्षक आंदोलनांतील प्रमुख मागण्यांपैकी एक आहे.',
      en: 'The old pension scheme is one of the main demands in the 2026 teacher movement.',
    },
    items: [
      { mr: 'जुन्या पेन्शन योजनेसंबंधी प्रलंबित प्रश्नांचा शासनस्तरावर पाठपुरावा.', en: 'Follow-up at government level on pending old-pension cases.' },
      { mr: '१ नोव्हेंबर २००५ पूर्वी नियुक्त शिक्षकांच्या पेन्शन प्रकरणांचा विशेष निपटारा.', en: 'Special settlement for teachers appointed before 1 November 2005.' },
      { mr: 'एनपीएस / नवीन पेन्शन व्यवस्थेतील शिक्षकांच्या निवृत्ती सुरक्षिततेचा पुनर्विचार.', en: 'A review of retirement security for teachers under NPS.' },
      { mr: 'निवृत्तीपूर्व दोन वर्षे पेन्शन प्रकरणांची पूर्वतपासणी.', en: 'Pre-checking of pension cases two years before retirement.' },
      { mr: 'पेन्शन मंजुरीतील अनावश्यक विलंब टाळण्यासाठी स्वतंत्र यंत्रणा.', en: 'A separate mechanism so pension approvals are not delayed.' },
      { mr: 'कुटुंब निवृत्तिवेतनाची प्रकरणे वेळेत निकाली काढणे.', en: 'Family pension cases cleared on time.' },
      { mr: 'पेन्शनधारकांसाठी जिल्हानिहाय सहाय्य कक्ष.', en: 'A district help desk for pensioners.' },
    ],
  },
  {
    id: 'seniority',
    title: { mr: 'सेवाज्येष्ठता व पदोन्नती', en: 'Seniority and promotion' },
    lead: { mr: 'सेवाज्येष्ठतेचा सन्मान — पदोन्नतीचा अधिकार.', en: 'Respect for seniority, and the right to promotion.' },
    items: [
      { mr: 'सेवाज्येष्ठता यादी वेळेत प्रसिद्ध करणे.', en: 'Publish seniority lists on time.' },
      { mr: 'सेवाज्येष्ठतेवरील हरकतींसाठी पारदर्शक प्रक्रिया.', en: 'A transparent process for objections to seniority.' },
      { mr: 'सेवाज्येष्ठतेनुसार पदोन्नती प्रक्रिया वेळबद्ध करणे.', en: 'Time-bound promotions according to seniority.' },
      { mr: 'मुख्याध्यापक, पर्यवेक्षक व इतर रिक्त पदांवरील पदोन्नती जलद करणे.', en: 'Faster promotions to headmaster, supervisor, and other vacant posts.' },
      { mr: 'पदोन्नती प्रकरणांसाठी ऑनलाइन ट्रॅकिंग व्यवस्था.', en: 'Online tracking for promotion cases.' },
      { mr: 'न्यायालयीन प्रकरणांमुळे प्रलंबित पदोन्नतींसाठी स्पष्ट मार्गदर्शक धोरण.', en: 'A clear policy where promotions are stuck because of court cases.' },
      { mr: 'पदोन्नतीतील पात्रता व निकष आधीच स्पष्ट करणे.', en: 'Eligibility and criteria stated in advance.' },
    ],
  },
  {
    id: 'non-academic',
    title: { mr: 'अशैक्षणिक कामांपासून शिक्षकांची मुक्तता', en: 'Relief from non-academic duties' },
    lead: { mr: 'शिक्षकाचा वेळ — विद्यार्थ्यांसाठी.', en: 'A teacher’s time belongs with students.' },
    items: [
      { mr: 'शिक्षकांना अनावश्यक अशैक्षणिक कामे देण्याचे प्रमाण कमी करणे.', en: 'Reduce unnecessary non-academic work assigned to teachers.' },
      { mr: 'बीएलओ, विविध सर्वेक्षणे व प्रशासकीय कामांसाठी पर्यायी मनुष्यबळ.', en: 'Alternative staff for BLO, surveys, and administrative tasks.' },
      { mr: 'एसआयआर किंवा इतर निवडणूकविषयक कामांचा अध्यापनावर होणारा परिणाम कमी करणे.', en: 'Limit the effect of SIR and other election work on teaching.' },
      { mr: 'एकाच माहितीची विविध पोर्टलवर वारंवार मागणी टाळणे.', en: 'Stop asking for the same information again on multiple portals.' },
      { mr: 'शाळेच्या वेळेत अध्यापनाला प्राधान्य.', en: 'Teaching comes first during school hours.' },
      { mr: 'शिक्षकांच्या प्रशासकीय कामाचा वार्षिक वर्कलोड ऑडिट.', en: 'A yearly audit of teachers’ administrative workload.' },
      { mr: 'डिजिटल सिंगल विंडो प्रणाली.', en: 'A digital single-window system.' },
    ],
  },
  {
    id: 'salary',
    title: { mr: 'वेतन व आर्थिक प्रश्न', en: 'Salary and financial issues' },
    lead: { mr: 'वेळेवर वेतन — सन्मानाने सेवा.', en: 'Salary on time, and service with dignity.' },
    items: [
      { mr: 'प्रत्येक महिन्याला वेळेत वेतन.', en: 'Salary paid on time every month.' },
      { mr: 'प्रलंबित वेतनाची जिल्हानिहाय माहिती व विशेष निपटारा.', en: 'District-wise information and special clearance of pending salary.' },
      { mr: 'वेतननिश्चितीतील त्रुटी दुरुस्त करण्यासाठी विशेष कक्ष.', en: 'A special cell to correct pay-fixation errors.' },
      { mr: 'प्रलंबित वेतन फरक व भत्त्यांचा निपटारा.', en: 'Settlement of pending pay differences and allowances.' },
      { mr: 'सेवापुस्तकातील वेतनविषयक नोंदी अद्ययावत करणे.', en: 'Keep salary entries in the service book up to date.' },
      { mr: 'वेतनाशी संबंधित तक्रारींसाठी ऑनलाइन प्रणाली.', en: 'An online system for salary complaints.' },
    ],
  },
  {
    id: 'health',
    title: { mr: 'वैद्यकीय सुविधा व विमा संरक्षण', en: 'Medical care and insurance' },
    lead: { mr: 'शिक्षकांच्या आरोग्याची सामाजिक सुरक्षा.', en: 'Social security for teachers’ health.' },
    items: [
      { mr: 'शिक्षक व शिक्षकेतर कर्मचाऱ्यांसाठी प्रभावी कॅशलेस आरोग्य विमा.', en: 'Effective cashless health insurance for teachers and non-teaching staff.' },
      { mr: 'शिक्षक, पती/पत्नी व पात्र कुटुंबीयांना आरोग्य संरक्षण.', en: 'Health cover for the teacher, spouse, and eligible family members.' },
      { mr: 'गंभीर आजारांसाठी विशेष वैद्यकीय सहाय्य.', en: 'Special medical help for serious illness.' },
      { mr: 'अपघाती विमा संरक्षण.', en: 'Accident insurance.' },
      { mr: 'मेडिकल बिलांच्या मंजुरीसाठी वेळमर्यादा.', en: 'A time limit for approval of medical bills.' },
      { mr: 'मान्यताप्राप्त रुग्णालयांची संख्या वाढवणे.', en: 'More empanelled hospitals.' },
      { mr: 'विमा किंवा मेडिकल क्लेम नाकारल्यास अपील व्यवस्था.', en: 'An appeal if an insurance or medical claim is rejected.' },
      { mr: 'प्रत्येक जिल्ह्यात वैद्यकीय सहाय्य कक्ष.', en: 'A medical help desk in every district.' },
    ],
  },
  {
    id: 'headquarters',
    title: { mr: 'मुख्यालयी राहण्याचा प्रश्न', en: 'Living at headquarters' },
    items: [
      { mr: 'मुख्यालयी राहण्याबाबत स्पष्ट व एकसमान नियम.', en: 'Clear and uniform rules on living at headquarters.' },
      { mr: 'शाळेपासून अत्यंत दूर राहणाऱ्या शिक्षकांच्या परिस्थितीचा विचार.', en: 'Consider teachers who live very far from the school.' },
      { mr: 'महिला शिक्षक, दिव्यांग शिक्षक आणि गंभीर आजार असलेल्यांसाठी मानवीय निकष.', en: 'Humane criteria for women teachers, teachers with disabilities, and those with serious illness.' },
      { mr: 'दुर्गम भागातील शिक्षकांसाठी निवास सुविधा.', en: 'Housing for teachers in remote areas.' },
      { mr: 'शिक्षक निवासाची उपलब्धता वाढवणे.', en: 'More teacher quarters.' },
      { mr: 'मुख्यालयासंबंधी तक्रारींसाठी ऑनलाइन अपील व्यवस्था.', en: 'An online appeal for headquarters-related complaints.' },
    ],
  },
  {
    id: 'transfer',
    title: { mr: 'पारदर्शक शिक्षक बदली धोरण', en: 'A transparent transfer policy' },
    lead: { mr: 'बदलीमध्ये पारदर्शकता — शिक्षकांना न्याय.', en: 'Transparency in transfers, and fairness for teachers.' },
    items: [
      { mr: 'पूर्णपणे पारदर्शक ऑनलाइन बदली प्रक्रिया.', en: 'A fully transparent online transfer process.' },
      { mr: 'बदलीचे निकष पूर्वप्रसिद्ध करणे.', en: 'Publish transfer criteria in advance.' },
      { mr: 'पती-पत्नी एकत्रीकरणाला योग्य प्राधान्य.', en: 'Due priority for spouses to be posted together.' },
      { mr: 'दिव्यांग शिक्षकांसाठी विशेष तरतूद.', en: 'A special provision for teachers with disabilities.' },
      { mr: 'गंभीर आजार असलेल्या शिक्षकांसाठी विशेष विचार.', en: 'Special consideration for teachers with serious illness.' },
      { mr: 'महिला शिक्षकांच्या कौटुंबिक परिस्थितीचा विचार.', en: 'Consider the family circumstances of women teachers.' },
      { mr: 'दुर्गम भागात सेवा केलेल्या शिक्षकांसाठी योग्य प्रोत्साहन.', en: 'A fair incentive for service in remote areas.' },
      { mr: 'बदलीनंतर अपीलची प्रभावी व्यवस्था.', en: 'An effective appeal after transfer.' },
    ],
  },
  {
    id: 'surplus',
    title: { mr: 'अधिशेष शिक्षकांचे समायोजन', en: 'Adjustment of surplus teachers' },
    items: [
      { mr: 'अधिशेष शिक्षकांची माहिती पारदर्शक पद्धतीने प्रसिद्ध करणे.', en: 'Publish surplus-teacher information in a transparent way.' },
      { mr: 'शक्यतो त्याच जिल्हा किंवा विभागात समायोजनाचा विचार.', en: 'Prefer adjustment in the same district or division.' },
      { mr: 'शिक्षकांचा पसंतीक्रम विचारात घेणे.', en: 'Take the teacher’s preference order into account.' },
      { mr: 'विषयानुसार शिक्षकांची आवश्यकता लक्षात घेणे.', en: 'Match adjustment to the subject-wise need.' },
      { mr: 'विद्यार्थी-शिक्षक प्रमाण ठरवताना ग्रामीण व शहरी परिस्थितीचा स्वतंत्र विचार.', en: 'Treat rural and urban pupil-teacher ratios separately.' },
      { mr: 'समायोजन प्रक्रियेत तक्रार निवारणाची संधी.', en: 'A chance to raise a grievance during adjustment.' },
    ],
  },
  {
    id: 'grant',
    title: { mr: 'अनुदानित व विनाअनुदानित शिक्षकांचे प्रश्न', en: 'Aided and unaided teachers' },
    items: [
      { mr: 'पात्र शाळांना अनुदान प्रक्रियेत अनावश्यक विलंब टाळणे.', en: 'Avoid needless delay in grants for eligible schools.' },
      { mr: 'अनुदानाच्या पुढील टप्प्यांसाठी स्पष्ट वेळापत्रक.', en: 'A clear timetable for the next stages of grant.' },
      { mr: 'अंशतः अनुदानित शिक्षकांचे वेतनविषयक प्रश्न.', en: 'Salary issues of partially aided teachers.' },
      { mr: 'पदमान्यता व संचमान्यता प्रक्रियेत पारदर्शकता.', en: 'Transparency in post approval and staffing approval.' },
      { mr: 'मान्यता, अनुदान व वेतन यांमधील प्रशासकीय विलंब कमी करणे.', en: 'Reduce administrative delay between approval, grant, and salary.' },
      { mr: 'दीर्घकाळ सेवा केलेल्या शिक्षकांच्या सेवाविषयक प्रश्नांचा स्वतंत्र आढावा.', en: 'A separate review of service issues for teachers with long service.' },
    ],
  },
  {
    id: 'tet',
    title: { mr: 'टीईटी व पात्रतेचे प्रश्न', en: 'TET and eligibility' },
    items: [
      { mr: 'कार्यरत अनुभवी शिक्षकांच्या टीईटी संदर्भातील प्रश्नांचा पुनर्विचार.', en: 'Reconsider TET issues of experienced teachers already in service.' },
      { mr: 'शासन व न्यायालयीन निर्णयांच्या पार्श्वभूमीवर स्पष्ट मार्गदर्शक सूचना.', en: 'Clear guidance in light of government and court decisions.' },
      { mr: 'दीर्घ सेवा, अनुभव व शैक्षणिक कौशल्य यांचा योग्य विचार.', en: 'Give due weight to long service, experience, and teaching skill.' },
      { mr: 'शिक्षकांच्या सेवासुरक्षेला बाधा न आणता गुणवत्तेचे निकष कायम ठेवणे.', en: 'Keep quality standards without harming service security.' },
      { mr: 'टीईटी व पात्रतेच्या प्रलंबित प्रकरणांसाठी विशेष मार्गदर्शन कक्ष.', en: 'A special guidance cell for pending TET and eligibility cases.' },
    ],
  },
  {
    id: 'progress',
    title: { mr: '१०-२०-३० आर्थिक प्रगती योजना', en: 'The 10-20-30 career progression scheme' },
    items: [
      { mr: '१०, २० आणि ३० वर्षांच्या सेवेनंतर पात्र लाभ वेळेत देणे.', en: 'Give eligible benefits on time after 10, 20, and 30 years of service.' },
      { mr: 'प्रलंबित प्रकरणांचा विशेष निपटारा.', en: 'Special clearance of pending cases.' },
      { mr: 'पात्र शिक्षकांना लाभ मिळण्याची ऑनलाइन माहिती.', en: 'Online information so eligible teachers can see their benefit.' },
      { mr: 'लाभासाठी आवश्यक कागदपत्रांची सिंगल विंडो व्यवस्था.', en: 'A single window for the papers required for the benefit.' },
    ],
  },
  {
    id: 'women',
    title: { mr: 'महिला शिक्षकांसाठी विशेष धोरण', en: 'A policy for women teachers' },
    items: [
      { mr: 'सुरक्षित कार्यस्थळ.', en: 'A safe workplace.' },
      { mr: 'पती-पत्नी एकत्रीकरण.', en: 'Posting spouses together.' },
      { mr: 'प्रसूती व बालसंगोपनाशी संबंधित वैधानिक सुविधांची प्रभावी अंमलबजावणी.', en: 'Effective implementation of maternity and childcare provisions.' },
      { mr: 'गंभीर कौटुंबिक परिस्थितीत बदलीसाठी संवेदनशील निकष.', en: 'Sensitive transfer criteria in serious family circumstances.' },
      { mr: 'महिला शिक्षकांच्या आरोग्यविषयक गरजांचा विचार.', en: 'Attention to women teachers’ health needs.' },
      { mr: 'कार्यस्थळी लैंगिक छळविरोधी यंत्रणेची प्रभावी अंमलबजावणी.', en: 'An effective workplace mechanism against sexual harassment.' },
    ],
  },
  {
    id: 'disability',
    title: { mr: 'दिव्यांग व गंभीर आजार असलेल्या शिक्षकांसाठी', en: 'Teachers with disability or serious illness' },
    items: [
      { mr: 'जवळच्या शाळेत नियुक्तीचा विचार.', en: 'Consider posting near home.' },
      { mr: 'विशेष बदली सवलत.', en: 'A special transfer concession.' },
      { mr: 'वैद्यकीय कारणांवरील अर्जासाठी सुलभ प्रक्रिया.', en: 'A simple process for applications on medical grounds.' },
      { mr: 'दिव्यांग-अनुकूल शाळा व कार्यालये.', en: 'Accessible schools and offices.' },
      { mr: 'सहाय्यक उपकरणांची उपलब्धता.', en: 'Availability of assistive devices.' },
    ],
  },
  {
    id: 'service-book',
    title: { mr: 'डिजिटल सेवापुस्तक', en: 'A digital service book' },
    lead: { mr: 'एक शिक्षक — एक डिजिटल सेवापुस्तक.', en: 'One teacher, one digital service book.' },
    items: [
      {
        mr: 'नियुक्ती, सेवाज्येष्ठता, वेतन, पदोन्नती, बदली, रजा, प्रशिक्षण आणि पेन्शन ही संपूर्ण सेवा माहिती एकाच डिजिटल प्रणालीमध्ये उपलब्ध करणे.',
        en: 'Appointment, seniority, salary, promotion, transfer, leave, training, and pension available in one digital system.',
      },
    ],
  },
  {
    id: 'grievance',
    title: { mr: 'शिक्षक तक्रार निवारण प्रणाली', en: 'Teacher grievance tracking' },
    lead: { mr: 'प्रत्येक तक्रारीला क्रमांक, मुदत आणि निर्णय.', en: 'Every complaint gets a number, a deadline, and a decision.' },
    items: [
      {
        mr: 'तक्रार नोंदणी, ट्रॅकिंग नंबर, संबंधित अधिकारी, वेळमर्यादा, निर्णय आणि अपील ही संपूर्ण प्रक्रिया ऑनलाइन उपलब्ध करणे.',
        en: 'Registration, a tracking number, the officer concerned, a time limit, a decision, and an appeal — all online.',
      },
    ],
  },
  {
    id: 'training',
    title: { mr: 'शिक्षक प्रशिक्षणात बदल', en: 'Better teacher training' },
    items: [
      { mr: 'केवळ कागदोपत्री प्रशिक्षणाऐवजी प्रत्यक्ष वर्गातील उपयोगी प्रशिक्षण.', en: 'Training that is useful in the classroom, not only on paper.' },
      { mr: 'विषयवार प्रगत प्रशिक्षण.', en: 'Advanced training by subject.' },
      { mr: 'डिजिटल शिक्षण.', en: 'Digital teaching.' },
      { mr: 'एआय आणि नवीन तंत्रज्ञानाचे प्रशिक्षण.', en: 'Training in AI and new technology.' },
      { mr: 'नवीन शैक्षणिक धोरणाशी संबंधित प्रशिक्षण.', en: 'Training linked to the new education policy.' },
      { mr: 'अनुभवी शिक्षकांना मास्टर ट्रेनर म्हणून संधी.', en: 'A chance for experienced teachers to serve as master trainers.' },
    ],
  },
  {
    id: 'facilities',
    title: { mr: 'शाळेतील मूलभूत सुविधा', en: 'Basic facilities in every school' },
    lead: { mr: 'प्रत्येक शाळेत टप्प्याटप्प्याने विकास.', en: 'Step-by-step improvement in every school.' },
    items: [
      { mr: 'सुरक्षित इमारत, पिण्याचे पाणी आणि स्वच्छतागृह.', en: 'A safe building, drinking water, and toilets.' },
      { mr: 'इंटरनेट, संगणक, प्रयोगशाळा आणि ग्रंथालय.', en: 'Internet, computers, a laboratory, and a library.' },
      { mr: 'क्रीडा साहित्य, स्मार्ट शिक्षण सुविधा आणि शिक्षकांसाठी स्टाफ रूम.', en: 'Sports material, smart-classroom facilities, and a staff room.' },
    ],
  },
  {
    id: 'staff',
    title: { mr: 'शिक्षकेतर कर्मचाऱ्यांची उपलब्धता', en: 'Non-teaching staff' },
    lead: {
      mr: 'शिक्षकांना कार्यालयीन कामाचा अतिरिक्त भार पडू नये.',
      en: 'Teachers should not carry extra office work.',
    },
    items: [
      { mr: 'गरजेनुसार लिपिक.', en: 'Clerks where they are needed.' },
      { mr: 'प्रयोगशाळा कर्मचारी व ग्रंथपाल.', en: 'Laboratory staff and a librarian.' },
      { mr: 'शिपाई व आवश्यक सहायक कर्मचारी.', en: 'Peons and other essential support staff.' },
    ],
  },
  {
    id: 'rural',
    title: { mr: 'ग्रामीण व दुर्गम भागातील शिक्षक', en: 'Teachers in rural and remote areas' },
    items: [
      { mr: 'शिक्षक निवास आणि इंटरनेट सुविधा.', en: 'Teacher housing and internet.' },
      { mr: 'प्रवासाच्या अडचणींचा विचार.', en: 'Account for travel difficulties.' },
      { mr: 'विषय शिक्षकांची उपलब्धता.', en: 'Subject teachers available where they are needed.' },
      { mr: 'दुर्गम सेवेसाठी प्रोत्साहनपर धोरण.', en: 'An incentive policy for remote service.' },
      { mr: 'विद्यार्थी-शिक्षक प्रमाणाचा स्थानिक परिस्थितीनुसार विचार.', en: 'Pupil-teacher ratios that reflect local conditions.' },
    ],
  },
  {
    id: 'retired',
    title: { mr: 'निवृत्त शिक्षकांसाठी सन्मान व सहाय्य', en: 'Respect and support for retired teachers' },
    items: [
      { mr: 'पेन्शन प्रकरणे व पेन्शन पुनर्नियोजन.', en: 'Pension cases and pension revision.' },
      { mr: 'वैद्यकीय सुविधा व कुटुंब निवृत्तिवेतन.', en: 'Medical care and family pension.' },
      { mr: 'निवृत्त शिक्षकांसाठी जिल्हानिहाय हेल्पडेस्क.', en: 'A district help desk for retired teachers.' },
    ],
  },
  {
    id: 'legal',
    title: { mr: 'शिक्षकांसाठी कायदेशीर सहाय्य', en: 'Legal support for teachers' },
    items: [
      {
        mr: 'सेवाज्येष्ठता, पदोन्नती, वेतन, पेन्शन, बदली, अनुदान आणि सेवाशर्ती या प्रश्नांवर मार्गदर्शन करण्यासाठी शिक्षक कायदेशीर सहाय्य कक्ष उभारणे.',
        en: 'A Teacher Legal Support Cell for guidance on seniority, promotion, salary, pension, transfer, grants, and service conditions.',
      },
    ],
  },
  {
    id: 'dignity',
    title: { mr: 'शिक्षकांच्या सन्मानाचा प्रश्न', en: 'The dignity of teachers' },
    lead: {
      mr: 'शिक्षक हा प्रशासकीय कर्मचारी नव्हे, शिक्षणव्यवस्थेचा भागीदार.',
      en: 'A teacher is a partner in the education system, not only an administrative employee.',
    },
    items: [
      { mr: 'उत्कृष्ट शिक्षकांच्या कार्याची पारदर्शक दखल.', en: 'Public recognition of outstanding teachers.' },
      { mr: 'ग्रामीण शिक्षकांच्या योगदानाचा गौरव.', en: 'Honour for the work of rural teachers.' },
      { mr: 'शैक्षणिक नवोपक्रमांना प्रोत्साहन.', en: 'Support for educational initiatives.' },
      { mr: 'शिक्षकांच्या शैक्षणिक स्वायत्ततेचा विचार.', en: 'Respect for teachers’ academic autonomy.' },
      { mr: 'शिक्षकांचा धोरणनिर्मितीत सहभाग.', en: 'A place for teachers in policy making.' },
    ],
  },
  {
    id: 'report',
    title: { mr: 'दरवर्षी शिक्षक प्रश्नांचा सार्वजनिक अहवाल', en: 'A yearly public teacher report' },
    lead: { mr: 'दरवर्षी एक अहवाल: Teacher Report – Pune Division.', en: 'A yearly Teacher Report for the Pune Division.' },
    items: [
      { mr: 'किती प्रश्न प्राप्त झाले आणि किती शासनाकडे पाठवले.', en: 'How many issues were received, and how many were sent to the government.' },
      { mr: 'किती प्रश्न विधानपरिषदेत मांडले.', en: 'How many were raised in the Legislative Council.' },
      { mr: 'किती प्रश्न निकाली निघाले आणि कोणते प्रलंबित आहेत.', en: 'How many were resolved, and which remain pending.' },
      { mr: 'कोणत्या प्रश्नासाठी शासन निर्णय आवश्यक आहे.', en: 'Which issues still need a government decision.' },
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
